import { defineConfig } from 'astro/config';

// 启材线官网（add-qicai-line-website）。域名 qicai.finddatatech.cloud。
// 静态构建（对齐 fd-marketing-web 先例，Caddy file_server 直出）；
// 右栏「机器读」经浏览器直连 #2 匿名只读端点（/public/mcp，见 design D1）。
export default defineConfig({
  site: 'https://qicai.finddatatech.cloud',
  vite: {
    server: {
      // 本机 dev：把 /api/mcp 代理到匿名只读端点（生产由 Caddy 反代同源，不走这里）。
      // 端点地址经环境变量注入，不写死在仓里——本仓公开，内网拓扑不该进仓库。
      // 用法：QICAI_MCP_DEV_TARGET=http://<端点> npm run dev
      proxy: process.env.QICAI_MCP_DEV_TARGET
        ? {
            '/api/mcp': {
              target: process.env.QICAI_MCP_DEV_TARGET,
              rewrite: () => '/public/mcp',
              changeOrigin: true,
            },
          }
        : undefined,
    },
  },
});
