# Product

<!-- impeccable:product-schema 1 -->

> 推断项标注（本轮结构化提问未获作答，以下两项按 Owner 在探索中未改的默认记为 delegated，后续可翻）：**Stack**、**语言轨**。其余均源自本会话已确认裁决（甲边界 / 双译本 / 实时 / Facts 账本 / 编目卡）。

## Platform

web

## Stack

delegated: Astro（静态构建，对齐同门 `fd-marketing-web` 先例；Caddy `file_server` 直出 `/opt/fd/qicai-web`）。理由：双译本组件 + 实时概况水合需组件化，纯静态手写 JS 吃力；SSR 代理偏离家族静态发布线。Owner 若改主意走纯静态或 SSR，本条随之更新。

## Users

两类**同级**访客（Owner 明确「智能体一等消费者」是定位核心，非脚注）：

- **门 A · 学生/老师**：正在做某件事（学一门课、备课、写综述），手上要「当下能参考的素材」。job=查一下有什么、订阅盯梢新料。
- **门 B · 智能体/开发者**：要让 agent 取可信素材或接入检索面。job=拿端点/工具面/许可契约，当场复现一次调用。

## Product Purpose

启材线（教育）的对外门面。把占位页做成一条线真正的入口：传达「**不灌输知识，而是让人和智能体找到当下需要的素材、对正在做的事有参考效果**」，并让访客**当场验证**目录可信（许可可查、来源可回访、故障不伪装）。成功=访客理解启材是什么 + 门 A 能试检索 + 门 B 能照页面信息独立接入。

## Positioning

邻品抄不走的机制：**逐条判过许可的可信目录**——每条带许可层、可回访来源、采集时间；**80.7% 的条目被主动标「禁商用」**（宁限不放的可验证证据，普通目录不会自曝短板）。公开层呈现的是**无公开 API、须人工编目**的独有资产（MIT OCW/中文播客/DOAB/Gutenberg/卡片），而非 OpenAlex 的代理。结构装置「**双译本**」（同一条素材人读卡 + 机器记录，右栏为真·MCP 响应）把「人和智能体同级」从口号变成版式。

## Operating Context

- 域名 qicai.finddatatech.cloud（雷池→Caddy→静态；cert61 已就绪）。
- 数据源 = `add-education-public-read-tier` 的匿名只读 MCP 端点 `/public/mcp`（三只读：edu_search/edu_item_detail/edu_overview），**已上产真验**（镜像 sha-b0941db）。
- 本地目录现 2730 行（种子规模，随周批增长）；论文实时层（OpenAlex 教育子域）归**凭证层**，不在公开面。
- 官网经网关/雷池暴露 `/public/mcp` 公网可达是部署段前置（#1 tasks 1.1/1.2）。

## Capabilities and Constraints

- **右栏 MUST 是真·MCP 响应**（浏览器直连匿名端点，非摆拍、非构建期快照）——否则踩本线「不伪装」红线。端点故障时如实降级（报因不空白/不回退硬编旧数）。
- **规模/许可数字来自实时 `edu_overview` + as_of**，MUST NOT 硬编 2730/2204 当永久事实。
- **Facts 禁编造清单**（硬约束）：无用户数/客户案例/「世界最好」；播客不称有文字稿（转录未装）；论文 749 万不当公开卖点；OER Commons（token 待回复）/萬星子栏目（未建）不列在册。
- code-led：无摄影图资产（Owner 默认；编目卡世界靠字体+纸张+骑缝章+许可色标）。
- 许可图例与目录枚举一致（含 public-enclosure 音频轨，#2 已补齐）。
- 语言轨：delegated 中文为主；英文留 harden 阶段（pack 的 5/5 i18n 纪律不照搬到站点）。

## Brand Commitments

- 名 **启材**（启迪×取材）；母品牌 **寻数**；代码层 `edu.*` 中立。内外名分歧（qidi 占位目录）随部署归拢为 qicai。
- 视觉世界方向（Owner 已裁为 binding，工艺交 new-work）：**编目卡抽屉**——Mode=Persuade，与营销线「历书」世界区隔不复用；结构装置=双译本。

## Evidence on Hand

- 目录实况（2026-11-04 实查，作 new-work 首屏素材参考，**上线时改走实时 edu_overview**）：9 来源；2730 行全过发布闸；许可层 cc-by-nc 2182 / cc0_pd 262 / metadata_only 134 / oa_cc_by 122 / public-enclosure 30；2204 条（80.7%）标禁商用。
- 真素材样例（双译本首屏候选）：Dewey《Democracy and Education》(MIT OCW, CC BY-NC, 禁商用) / Gutenberg 公版书 (cc0_pd, 可商用) / DOAB 书 (metadata-only)。
- #2 匿名端点响应 schema = 官网右栏契约（见 add-education-public-read-tier tasks 7.4）。
