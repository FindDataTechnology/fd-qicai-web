# DESIGN — 启材线官网（qicai.finddatatech.cloud）

> new-work 收口回写（2026-11-04）。方向契约见 `.impeccable/surfaces/qicai-site.md`；
> 本文件记录建成后的真世界，供后续 refine/extract 消费。

## World: 编目卡抽屉（library card catalog）

- **Mode**: Persuade。单页 + 门 B 契约页（`/docs/mcp/`，Read 辅助面）。
- **材质**: 牛皮卡纸 `#EDE3CF` 底 / 墨黑 `#211D1A`；dark 方案反转（纸=深褐 `#201C17`，墨=米白）。
- **许可色标骑缝条**（世界本体，也是数据编码，卡顶部 8px 通条）:
  cc0_pd 松绿 `#3E6B4F` / oa_cc_by 靛蓝 `#2B4B6F` / cc-by-nc 琥珀 `#B5732A` /
  metadata_only 石墨 `#5A5652` / public-enclosure 紫 `#6B4C7A`；dark 下全体提亮一档。
- **禁商用红骑缝章**: `#A6322B` 虚线边圆角章，rotate(-8deg)，仅当 `commercial_ok=false` 渲染。
- **字**: Noto Serif SC（display，卡标题/H1，700）、Noto Sans SC（body 400/500）、
  JetBrains Mono（一切机器数据：JSON、编号、as_of、端点）。@fontsource 本地子集，无外部字体依赖。

## Signature: 双译本承重墙

首屏中央左右同源：左=人读编目卡，右=**真·MCP 响应**逐行 JSON（mono，k/s/b/n 四色）。
点卡上任一字段 → 右栏对应 `data-key` 行点亮（琥珀底+左缘条），是全站唯一签名运动。
右栏永不摆拍：SSR 只有「正在连接…」，响应到达才渲染；失败报因红字（不回退硬编数）。
左卡 SSR 静态样例（2026-11-04 实查 Gutenberg Dewey 条目）挂「未实时确认」说明后保留。

## Data discipline（本站的「不伪装」红线）

- 概况带数字全部来自实时 `edu_overview`（as_of 同显），**禁止硬编 2730/2204**。
- 目录侧部分行 `license_layer` 存原始许可串（"cc0"/"cc by"…）——前端 `normLayer()`
  与 classify_license 同口径归一；治本在后端（挂账）。
- Facts 禁编造清单见 PRODUCT.md（无用户数、播客无文字稿、749 万论文不公开卖）。

## Structure

`index.astro`：hero（一句定位，无 kicker）→ 双译本 → 实时概况带 → 两扇门（门 A 真检索
演示 / 门 B 端点配置+契约链接）→ footer。`docs/mcp.astro`：端点/工具面/许可词表/故障语义/curl。
部署：边缘主机 `/opt/fd/qicai-web`（Caddy file_server + `/api/mcp*` → 匿名只读端点（mesh 内网地址，不入仓）
`rewrite /public/mcp` + `flush_interval -1`；SafeLine 443 → Caddy :8080）。

## Verified (2026-11-04 真机)

双译本水合 ✓ 同步高亮 ✓ 概况带实时数 ✓ 门 A calculus→4×OCW 卡（琥珀条+红章）✓
docs 页 ✓ 公网 https 全链 ✓ `impeccable detect` 0 findings ✓
