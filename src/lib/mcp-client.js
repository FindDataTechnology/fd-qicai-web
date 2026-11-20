// 浏览器侧 MCP streamable-http 客户端（design D1：静态站 + 浏览器直连匿名只读端点）。
// 经 Caddy 同源反代 /api/mcp → pod /public/mcp，故无跨域；仍容错 SSE 与纯 JSON 两种响应。

const ENDPOINT = "/api/mcp";
const PROTOCOL = "2025-03-26";

function parseBody(text, contentType) {
  // SSE：取 data: 行；否则按 JSON 解析。
  if (contentType && contentType.includes("text/event-stream")) {
    let last = null;
    for (const line of text.split(/\r?\n/)) {
      if (line.startsWith("data:")) {
        try { last = JSON.parse(line.slice(5).trim()); } catch { /* skip */ }
      }
    }
    return last;
  }
  try { return JSON.parse(text); } catch { return null; }
}

export class McpClient {
  constructor(endpoint = ENDPOINT) {
    this.endpoint = endpoint;
    this.sessionId = null;
    this._id = 0;
  }

  async _post(payload, extra = {}) {
    const headers = {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      ...extra,
    };
    if (this.sessionId) headers["mcp-session-id"] = this.sessionId;
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok && res.status !== 202) {
      throw new Error(`endpoint ${res.status}`);
    }
    const sid = res.headers.get("mcp-session-id");
    if (sid) this.sessionId = sid;
    const text = await res.text();
    return parseBody(text, res.headers.get("content-type"));
  }

  async initialize() {
    await this._post({
      jsonrpc: "2.0", id: ++this._id, method: "initialize",
      params: {
        protocolVersion: PROTOCOL,
        capabilities: {},
        clientInfo: { name: "qicai-web", version: "0.1.0" },
      },
    });
    // notifications/initialized（无响应体）
    await this._post({ jsonrpc: "2.0", method: "notifications/initialized" }).catch(() => {});
  }

  async callTool(name, args) {
    const msg = await this._post({
      jsonrpc: "2.0", id: ++this._id, method: "tools/call",
      params: { name, arguments: args },
    });
    if (!msg) throw new Error("empty response");
    if (msg.error) throw new Error(msg.error.message || "tool error");
    const text = msg.result?.content?.[0]?.text;
    if (text == null) throw new Error("no content");
    return JSON.parse(text);
  }
}
