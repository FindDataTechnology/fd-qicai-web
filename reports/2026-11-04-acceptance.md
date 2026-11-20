# add-qicai-line-website 收口验收件（2026-11-04）

四判据（tasks 7.3）逐条结果：

## ① 公网 200 + 非占位 body + 预期标记串
- `curl -s https://qicai.finddatatech.cloud/` → 200；含「判过许可」（新页）；
  旧占位页 noindex 已消失；`/robots.txt` 真件（User-agent: * / Allow: /）。
- `/docs/mcp/` → 200。旧 `/opt/fd/qidi-web` 已改名 `.retired-20261104`（内外名分歧收口）。

## ② 右栏真响应与端点一致（对拍）
- 浏览器真机水合（IAB 1440px）：右栏渲染 `"status": "ok"` envelope，首条
  `edu.book.gutenberg.852`（cc0_pd）＝同刻直连 tailnet 端点 `edu_search`
  ("Democracy and Education") 返回逐字同源；概况带实时数 2730 条 / 9 通道 +
  as_of（edu_overview 同刻对拍一致）。
- 签名交互：点卡「许可」字段 → 右栏 `license_layer` 行点亮（hl+active 双态实测）。
- 门 A：检索 "calculus" → 4 张 MIT OCW 课程卡，琥珀骑缝条 + 禁商用红章（commercial_ok=false）。

## ③ 断端点如实降级
- `astro preview`（无 /api 代理=真断端点）真机验证：右栏红字「连接公开端点失败：
  endpoint 404（本页不摆拍…）」；左卡保留样例并挂「未实时确认」注记；概况带
  「实时概况读取失败：端点未连接（首屏 initialize 已失败）」（修复过一版：原裸
  TypeError 文案不达报因标准）。断点证据注入路径=预览服务器 404，非 mock。

## ④ 文案无 Facts 禁项
- 无用户数/客户案例/「世界最好」；播客仅作为来源类型提及、docs 明写「无文字稿」；
  论文实时层归凭证层不当公开卖点；OER Commons/萬星子栏目未列在册。
- 许可图例=edu_overview 实际五桶（normLayer 前端归一），docs 词表含 public-enclosure。

## detect 门
`impeccable detect`（项目级 + --target index.astro）→ exit 0，findings 空。

## 部署件
- 构建：Astro 静态 `dist/`（26M，@fontsource 本地子集）→ rsync 边缘主机 `/opt/fd/qicai-web`。
- Caddy（host 级，非 GitOps 管）：qicai 块 root 换 qicai-web + `handle /api/mcp*`
  rewrite→`/public/mcp` reverse_proxy `<匿名只读端点>`（flush_interval -1）+
  `systemctl restart caddy`；改前备份 `/etc/caddy/Caddyfile.bak-qicai-20261104`。
- SafeLine 443 链零改动（cert61 域已含 qicai）。

## 偏离与挂账
- design D1 允许薄代理回退——实际走 Caddy 同源反代（更优形态，CORS 头仍全开）。
- surface brief 首屏样例原写「MIT OCW 琥珀+红章」——实查目录中 Dewey 为 Gutenberg
  公版（松绿条/可商用），按「真数据赢」原则改以实查条目上卡；琥珀+红章在门 A
  检索结果中自然呈现。DESIGN.md 已按建成世界回写。
- 目录侧 license_layer 原始串脏点：官网已容错，后端治本挂账（见 docs/education/qicai-site-contract.md）。
