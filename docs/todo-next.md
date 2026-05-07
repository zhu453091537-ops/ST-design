# 下一步待办

本文件记录当前待办、优先级、推荐下一步、暂时不处理的问题和风险提醒，用于跨设备、跨聊天上下文恢复。

## 当前待办

| 优先级 | 事项 | 状态 | 说明 |
| --- | --- | --- | --- |
| 高 | 明确当前项目目标和业务范围 | 已确认 | 当前已确认按“平台母版 + 真实业务页验证”二者结合推进。 |
| 高 | 梳理当前技术栈和应用结构 | 部分完成 | 已确认仓库为 `vben-admin-monorepo`，主应用为 `apps/web-antd/src`；已新增平台组件源头，仍需审计真实业务页引用关系。 |
| 高 | 本地预览快速打开规则 | 已完成 | 默认检查 `5173/5174`，不要把 `5000` 当作项目端口；`pnpm` 不可用时直接在 `apps/web-antd` 使用本地 Vite 二进制启动。 |
| 高 | 接续文档冲突清理 | 已完成 | 已清理 `AGENTS.md`、`docs/decision-records.md`、`docs/todo-next.md`、`docs/project-log.md` 中的 Git 冲突标记，并合并两条有效历史线。 |
| 高 | 登录与 Mock 模式进入系统 | 已完成 | 已支持 `VITE_USE_MOCK=true` 下登录、用户信息、权限、菜单、动态路由和刷新保持登录状态。 |
| 高 | 典型页面驱动平台组件改造一期 | 已完成 | 已新增 `components/platform` 平台薄封装与 `/platform/typical-page` 验证场。 |
| 高 | Figma 典型页面全局样式与导航表格源组件改造 | 已完成 | 已完成品牌 token、Antdv 全局样式、Vben 顶部/侧边菜单拆分、`PlatformTableToolbar` 和典型页验证。 |
| 高 | Figma 顶部导航栏源组件样式改造 | 已完成 | 已基于截图完成顶部布局源组件、Logo、水平菜单和右侧功能按钮样式改造；Figma MCP Go 已恢复连接，后续可继续补节点级校准。 |
| 高 | Figma MCP Go 本地连接规则沉淀 | 已完成 | 已确认本项目使用非官方 `@vkhanhqui/figma-mcp-go`，插件固定 `127.0.0.1:1994`，成功方案已写入 `AGENTS.md` 和 `docs/decision-records.md`。 |
| 高 | ant-design-vue 典型页面 Demo 开发 | 已完成第一版 | 已按专用受控数据源适配文件 `user-demo-source.ts` 落地 `/platform/typical-page`，字段、columns、树结构模型和操作入口对齐 `/system/user`；已完成浏览器登录、树筛选和新增抽屉抽查；真实后端恢复后仍需切回接口。 |
| 高 | 通用组件样式默认全局生效规则 | 已完成 | 用户后续即使没有特别强调，全局通用组件样式反馈也默认回到 `packages/styles`、主题 token、平台组件或适配层源头处理。 |
| 高 | 典型页面样式沉淀边界 | 已完成 | 已明确分页、工具栏、操作列、表格状态切换优先沉淀到 `PlatformTable`、`PlatformTableToolbar` 等组件场景，不轻易直接覆盖 Antdv 全局样式。 |
| 高 | 顶部一级菜单默认子路由跳转 | 已完成 | 已修复 `header-sidebar-nav` 下点击有子级一级菜单不跳转的问题；当前菜单目标已调整为设计稿多一级菜单骨架。 |
| 高 | 去掉典型页顶部 tabbar 区块 | 已完成 | 已关闭全局 `tabbar.enable`，让“分析页 / 典型页面验证场”这块区域不再显示。 |
| 高 | 当前预览只保留平台组件模块 | 历史完成/已调整 | 该阶段目标已完成，但当前新目标已调整为按设计稿展示完整顶部一级菜单骨架；未开发模块用独立 path + Blank 承接。 |
| 高 | 审计 ant-design-vue 与平台组件引用关系 | 已完成 | 已扫描真实业务页引用关系：`useVbenVxeGrid` 35 个文件，`antdv-next` 115 个文件，`<a-*>` / 全局 Antdv 标签 57 个文件，`#/components/platform` 仅 1 个文件。 |
| 高 | 确认 `PlatformTable` 与 Vben Vxe 表格边界 | 部分完成 | 已确认真实业务页短期不能用 Antdv Table 版 `PlatformTable` 批量替换，下一步应先做 Vxe 平台适配层或扩展 `#/adapter/vxe-table`。 |
| 高 | 建立 Vxe 表格平台适配层 | 已完成 | 已完成一期：默认启用设置、刷新、搜索、全屏能力，并统一 Vxe 工具按钮样式、表头和行高；已完成真实页浏览器验证。 |
| 高 | 首批真实页面接入平台规范 | 已完成 | `system/user` 已移除页面级 Vxe 表头高度和行高配置，左侧 `dept-tree` 已接入 `PlatformTreePanel`，并已完成浏览器验证。 |
| 高 | 树筛选平台容器建设 | 已完成 | 已新增 `PlatformTreePanel` 并接入典型页与 `system/user/dept-tree`；已完成视觉与路由连通验证。 |
| 高 | 继续抽查真实业务页平台接入情况 | 部分完成 | 已完成 `system/post`、`system/dept` 浏览器抽查，并已按用户要求删除 `system/role` 页面入口；后续如有需要再继续检查其他真实业务页。 |
| 高 | 建立阶段进度报告规则 | 已完成 | 已写入 `AGENTS.md` 和 `docs/decision-records.md`，后续每完成一个步骤、阶段或代码修改后都要主动同步方案进度和剩余内容。 |
| 高 | `AGENTS.md` 长期规则去重轻量化 | 已完成 | 已将 `AGENTS.md` 从 586 行压缩到 188 行，保留核心规则和硬性禁止项，减少后续接续读取成本。 |
| 高 | 对下一张截图或页面需求输出结构化分析 | 待执行 | 按复杂度处理：简单组件反馈输出简版归因和组件映射；复杂页面或截图开发再输出完整结构、文件归属、交互状态和验证方案。 |
| 高 | 导航组件统一样式微调 | 已完成 | 已把顶部/左侧菜单字号、左侧菜单图标尺寸、顶部选中态满高背景和右上角设置/通知/头像 hover 收敛到菜单组件变量与头部公共样式类。 |
| 高 | 顶部导航栏 Logo 应用名更新 | 已完成 | 已在应用启动期将项目配置的 `preferences.app.name` 同步回当前偏好状态，避免历史 localStorage 继续显示旧应用名。 |
| 高 | 左侧导航栏源组件样式修正 | 已完成 | 已调整左侧菜单展开态选中背景横向充满、收起态 48px 正方形背景、折叠按钮尺寸/位置/描边和收起态 tooltip 灰色变量。 |
| 高 | 左侧收起/展开按钮灰色背景变量修正 | 已完成 | 已将折叠按钮默认背景从品牌淡绿色变量改为 `--st-color-border-subtle`，hover 改为 `--st-color-border-control`。 |
| 高 | 顶部右侧图标按钮 hover 源组件修正 | 已完成 | 已让日程与通知按钮 hover 使用菜单 hover 背景变量，svg 保持白色，并共享头部图标摇铃动画修饰类。 |
| 高 | 项目总览页工具栏与统计卡平台化最小整改 | 已完成 | 已补组件映射表；`/workbench/index` 项目总览页已接入 `PlatformTableToolbar`；`PlatformStatCard` 背景、边框、文本、info 色和阴影已 token 化。 |
| 高 | 项目总览页统计卡标题与趋势文字统一 | 已完成 | `PlatformStatCard` 标题已改为黑色变量，趋势文字已统一加粗，项目总览页 5 个统计卡同步生效。 |
| 高 | 项目总览页统计卡头部下间距移除 | 已完成 | 已删除 `PlatformStatCard` 头部区域 `margin-bottom: 10px;`，保持源组件统一。 |
| 高 | 项目总览页表格高度浏览器自适应 | 已完成 | `PlatformTable` 默认根据浏览器高度计算表格 body 最大高度，内容超出时表格内部上下滚动，调用方显式传 `scroll.y` 时优先尊重调用方设置。 |
| 高 | 项目总览页补回右侧全屏工具按钮 | 已完成 | 已恢复 `PlatformTableToolbar` 默认四按钮在项目总览页可见，并接入浏览器 Fullscreen API。 |
| 高 | 项目总览页搜索框展开高度调整 | 已完成 | `PlatformTableToolbar` 展开搜索框高度已使用 `--st-control-height`，当前为 36px，保持平台组件源头一致。 |
| 高 | 项目总览页表格工具栏内距与工具间距微调 | 已完成 | `PlatformTableToolbar` 主体内距已是 `10px 12px`，actions / tools 间距已统一为 `12px`，保持平台组件源头一致。 |
| 高 | 项目总览页统计卡图标尺寸组件化优化 | 已完成 | `PlatformStatCard` 已统一右上角图标外框 48px、内部图标 2rem，并由组件变量和设计 token 驱动，页面不再单独写尺寸。 |
| 高 | 项目总览页类型/状态表头筛选平台化 | 已完成 | `PlatformTable` 已透传 Antdv Table 原生列筛选并转发 change；项目总览页类型、状态列已使用 `filters` / `filteredValue` / `filterMultiple` 接入表头筛选，工具栏重复筛选已移除。 |
| 高 | 项目总览页表头筛选全部项与无按钮交互 | 已完成 | `PlatformTable` 已统一 `column.filters` 的平台筛选面板：默认“全部”选中，点击即应用，无“重置 / 确定”按钮，hover/选中背景同为品牌绿 10%。 |
| 高 | 项目总览页表格工具栏排序与搜索折叠 | 已完成 | `PlatformTableToolbar` 已统一业务主按钮最左、次要按钮随后、搜索/刷新/设置在右侧；搜索改为右侧图标点击展开/收起。 |
| 高 | 平台表格外描边源组件补充 | 已完成 | 已新增 `--st-color-table-outline`，并在 `PlatformTable` 源组件作用于 `.ant-table-container`，不在当前页面写局部边框。 |
| 高 | 平台表格边缘列内边距统一 | 已完成 | 已新增 `--st-table-edge-cell-padding: 24px` 和 `--st-table-action-column-width: 184px`，并在 `PlatformTable` 源组件统一首列与操作列左右内边距和默认操作列宽度；已避开 Antdv 表头 scrollbar 占位格，并为固定列自动合成 `scroll.x`。 |
| 高 | 平台表格横向滚动视觉复核 | 待执行 | 下一轮优先刷新 `/workbench/index` 与 `/project/information`，人工拖动横向滚动条确认表头和表体是否完全同步；如仍抖动，继续排查 Antdv fixed right sticky 重绘。 |
| 高 | 平台模块默认间距与内容内边距统一 | 已完成 | 已新增 `--st-layout-section-gap: 24px`、`--st-module-content-padding: 24px`，并接入 `Page`、`.platform-surface`、`PlatformTableToolbar`、`PlatformStatCard`、`/workbench/index` 和 `/project/information`；工具栏上下内边距按源组件节奏为 `12px`。 |
| 高 | 项目信息管理页面第一版 | 已完成 | 已新增 `/project/information`，补齐 `项目全景管理` 左侧菜单；页面使用专用 Mock 数据源，支持搜索、类型/状态表头筛选、新建、编辑、归档、删除和轻量详情入口；`/workbench/index` 仍保留为项目总览。 |
| 高 | 项目信息管理筛选入口平台化 | 已完成 | 已按用户反馈移除工具栏里的 `全部状态` / `全部类型` 下拉，改为 `项目类型`、`状态` 表头筛选，复用 `PlatformTable` 的“全部”和即时生效规则。 |
| 高 | 平台表格固定操作列 hover 透明问题 | 已完成 | 已在 `PlatformTable` 源组件修复 fixed 左/右列、`fix-right-first`、`fix-left-last` 的默认、hover、selected 和 `ant-table-cell-row-hover` 状态；将 fixed cell 拆成纯白底层和实心浅绿 hover 层，避免操作列透出下方内容。 |
| 高 | 左侧导航菜单项高度与左侧距离源组件修正 | 已完成 | 已在 `menu-ui` 源组件将垂直展开态菜单项高度统一为 `52px`，一级菜单内容左侧距离统一为 `24px`；未改当前页面样式，未影响顶部横向菜单和收起态。 |
| 中 | `PlatformTable` 筛选下拉逻辑整理 | 待处理 | 当前 `PlatformTable` 能力偏多；后续只整理筛选下拉 helper，本轮不拆组件。 |
| 中 | 表格全屏能力下沉评估 | 待处理 | 当前项目总览页已接入全屏；后续评估沉淀到 `PlatformTableToolbar` 或 `PlatformTable`，本轮不做。 |
| 中 | 多页面复用后评估 `PlatformEntityCell` | 待观察 | 项目信息业务单元格暂留页面，等多页面复用后再抽。 |
| 中 | 多页面复用后评估 `PlatformProgress` | 待观察 | 项目进度列暂留页面，等多页面复用后再抽。 |
| 中 | 多页面复用后评估 `PlatformDescriptions` | 待观察 | 详情抽屉内容暂留页面，等多页面复用后再抽。 |
| 高 | 设计稿菜单骨架收敛 | 部分完成 | 顶部一级菜单已按设计稿展示；未开发菜单保留独立 path 并复用 Blank；`系统管理 - 用户管理` 已指向 `/platform/typical-page`；仍需修复 `/system/user` 直访问兼容。 |
| 高 | `/system/user` 直访问兼容 | 待处理 | 当前浏览器直访 `/system/user` 未正确进入原真实页面。下次先排查 access mode、动态路由注入、mock 菜单源与隐藏路由关系，不要直接改 Vben 核心。 |
| 高 | 旧 `/system/user` 页面解绑 | 已完成 | 已删除旧页面路由入口和页面壳文件，菜单入口已收口到 `/platform/typical-page`，不再把旧页作为本阶段目标。 |
| 高 | 清理 Git 跟踪依赖产物问题 | 待确认 | 当前仓库存在 `node_modules` 等依赖产物被 Git 跟踪的问题，后续启动开发服务容易产生无意义变更；需用户确认清理范围和 `.gitignore` 策略。 |
| 高 | 建立业务页面 Mock 数据组织方式 | 部分完成 | `/project/information` 已采用页面专用 Mock 数据源和本地状态模拟；后续新增业务页继续沿用“页面专用数据源，后续可切接口”的方式。 |
| 中 | 将接续文档链接到文档入口 | 待处理 | 可考虑在 `README.md` 或内部文档入口中增加 `AGENTS.md` 和 docs 接续文档说明。 |
| 中 | 建立平台组件和业务页面的治理规则 | 已建立基础规则 | 已沉淀 ant-design-vue 组件改造默认规则和平台组件源头目录；仍需结合真实页面做迁移治理。 |

## 本轮收尾状态

| 日期 | 状态 | 说明 |
| --- | --- | --- |
| 2026-05-07 | 已收尾 | 已完成今天结束收尾：`docs/project-log.md`、`docs/todo-next.md` 已更新；本轮长期决策已同步到 `docs/decision-records.md` 和 `AGENTS.md`；下一轮优先做 `/workbench/index` 与 `/project/information` 的横向滚动视觉复核。 |
| 2026-05-07 | 已完成 | 已完成平台表格边缘列内边距统一：新增 `--st-table-edge-cell-padding: 24px` 和 `--st-table-action-column-width: 184px`，并在 `PlatformTable` 源组件统一首列与操作列左右内边距和默认操作列宽度；已修复横向滚动时表头末尾 scrollbar 占位格被误加 padding 导致的错位晃动，并为固定列自动合成 `scroll.x`。 |
| 2026-05-07 | 已完成 | 已完成平台表格外描边源组件补充：新增 `--st-color-table-outline`，明亮主题取 `--st-color-border-control`、暗色主题取 `--border`，并在 `PlatformTable` 源组件给 `.ant-table-container` 增加外描边。 |
| 2026-05-07 | 已完成 | 已完成平台模块默认间距与内容内边距统一：新增 24px 间距 token，并接入 `Page`、`.platform-surface`、`PlatformTableToolbar`、`PlatformStatCard`、`/workbench/index` 和 `/project/information`；`PlatformTableToolbar` 上下内边距已按反馈调整为 `12px`，左右保持 `24px`；旧示例/登录/表单内部紧凑间距不纳入本轮清理。 |
| 2026-05-07 | 已完成 | 已按批注修正左侧导航源组件：垂直展开态菜单项高度 52px，一级菜单左侧距离 24px；`menu-ui` ESLint 和包级 `vue-tsc` 通过，`/project/information` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已修复平台表格固定操作列 hover 透明问题：`PlatformTable` fixed 列补纯白底层与实心 hover 层，并新增 `--st-color-table-cell-bg-solid`、`--st-color-table-row-hover-bg-solid`；目标文件 ESLint、`git diff --check`、`/project/information` 与 `/workbench/index` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已修正项目信息管理筛选入口：类型/状态不再跟随原型放在工具栏，而是进入表头筛选并复用 `PlatformTable` 规则；目标文件 ESLint、`git diff --check` 与 `/project/information` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已完成项目信息管理页面第一版：`/workbench/index` 继续为项目总览，`/project/information` 进入项目信息管理；新建/编辑使用居中 `PlatformModal`，删除/归档有二次确认；目标文件 ESLint、`git diff --check`、两个路由 HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已按用户要求清空 `人员全生命周期 - 用户管理` 右侧既有内容；`/platform/typical-page` 现在只保留空 `Page` 承载容器，等待后续原型；目标文件 ESLint、`git diff --check` 与 `/platform/typical-page` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已完成项目总览页统计卡标题与趋势文字统一：`PlatformStatCard` 标题改为黑色变量，趋势文字统一加粗；目标文件 ESLint、`git diff --check` 与 `/workbench/index` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已完成项目总览页统计卡头部下间距移除：删除 `PlatformStatCard` 中 `.platform-stat-card__header` 的 `margin-bottom: 10px;`；目标文件 ESLint、`git diff --check` 与 `/workbench/index` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已完成项目总览页表格高度浏览器自适应：`PlatformTable` 默认计算表格 body 最大高度并合并到 `scroll.y`，内容超出时表格内部滚动；目标文件 ESLint、`git diff --check` 与 `/workbench/index` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已完成项目总览页补回右侧全屏工具按钮：恢复 `PlatformTableToolbar` 默认四按钮可见，并让表格容器接入浏览器 Fullscreen API；目标文件 ESLint、`git diff --check` 与 `/workbench/index` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已完成项目总览页搜索框展开高度调整：`PlatformTableToolbar` 展开搜索框高度使用 `--st-control-height`，当前为 36px；目标文件 ESLint、`git diff --check` 与 `/workbench/index` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已完成项目总览页表格工具栏内距与工具间距微调：`PlatformTableToolbar` 主体 `padding` 保持 `10px 12px`，actions / tools 间距统一到 `12px`；目标文件 ESLint、`git diff --check` 与 `/workbench/index` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已完成项目总览页统计卡图标尺寸组件化优化：`PlatformStatCard` 图标外框默认 48px，内部图标默认 2rem，尺寸进入组件变量和设计 token；目标文件 ESLint、`git diff --check` 与 `/workbench/index` HTTP 检查通过。 |
| 2026-05-07 | 已完成 | 已完成项目总览页表头筛选全部项与无按钮交互统一：`PlatformTable` 默认加入“全部”，空筛选默认选中全部，筛选项点击即应用，hover/选中背景统一为品牌绿 10%；目标文件 ESLint 通过，`/workbench/index` 返回 200。 |
| 2026-05-07 | 已完成 | 已完成项目总览页表格工具栏排序与搜索折叠平台化：业务主按钮左置，搜索改为右侧可展开图标，刷新/设置默认无描边 hover 品牌态；`git diff --check` 与目标文件 ESLint 通过，`/workbench/index` 返回 200。 |
| 2026-05-07 | 已完成 | 已沉淀本地预览快速打开规则：`5000` 不是项目端口，优先使用 `127.0.0.1:5173/5174`；服务未跑时从 `apps/web-antd` 执行 `../../node_modules/.bin/vite --mode development`。 |
| 2026-05-07 | 已完成 | 已完成项目总览页类型/状态表头筛选平台化：工具栏只保留搜索，`PlatformTable` 转发原生 change 并在组件作用域内统一筛选 icon 样式；`git diff --check` 和目标文件 ESLint 通过。 |
| 2026-05-07 | 已完成 | 已完成左侧收起/展开按钮灰色背景变量修正；`layout-ui` 包级 `vue-tsc` 通过，`localhost:5173/workbench/index` 返回 200。 |
| 2026-05-07 | 已完成 | 已完成项目总览页平台组件最小整改：组件映射表已入 `docs/decision-records.md`，页面接入 `PlatformTableToolbar`，统计卡视觉 token 化；`git diff --check` 与目标文件 ESLint 通过，`/workbench/index` 返回 200。 |
| 2026-05-07 | 已完成 | 已完成顶部右侧日程与通知图标按钮 hover 源组件修正；`layouts` 包级 `vue-tsc` 通过，`localhost:5173/platform/typical-page` 返回 200，截图级验证等待 Browser Use 后端恢复。 |
| 2026-05-07 | 已完成 | 已完成左侧导航栏源组件样式修正；`menu-ui` 与 `layout-ui` 包级 `vue-tsc` 均通过，`localhost:5173/platform/typical-page` 返回 200。 |
| 2026-05-07 | 已完成 | 已完成顶部导航栏 Logo 应用名更新：源码配置为“委外项目综合管理平台”，并在启动期覆盖历史偏好缓存；当前 Vite 服务因 `5173` 被占用运行在 `5174`。 |
| 2026-05-07 | 已完成 | 已完成接续文档 Git 冲突标记清理，四份核心接续文档恢复为可读、可接续状态。 |
| 2026-05-06 | 已收尾 | 已完成本轮收尾与接续更新；本地 Vite 服务已停止，下次需要重新启动后再访问典型页面。 |
| 2026-05-06 | 方案待确认 | 已完成 Figma MCP Go 成功连接规则沉淀，并完成 ant-design-vue 典型页面 Demo 一期审计，推荐以 `/system/user` 为真实业务来源。 |
| 2026-05-06 | 阻塞 | 准备开发典型页面 Demo 时发现 `/system/user/list` 真实数据源不可用：`8080` 无监听，Vite 代理返回 `502`；已按用户要求暂停开发，不新增假数据。 |
| 2026-05-06 | 已完成 | 已补充通用组件样式默认全局生效规则，避免后续只改当前页面导致其他业务页不同步。 |
| 2026-05-06 | 已完成 | 已补充典型页面开发前约束：导航和面包屑纳入映射，样式优先按平台组件边界沉淀，典型页不得使用虚构业务数据。 |
| 2026-05-06 | 已完成 | 已完成 Figma 典型页面全局样式、顶部/左侧导航层级拆分、表格工具栏源组件和 `/platform/typical-page` 浏览器验证。 |
| 2026-05-06 | 已完成 | 已完成顶部一级菜单默认子路由跳转修复；浏览器验证“概览 / 平台组件 / 关于”三类一级菜单跳转均符合预期。 |
| 2026-05-06 | 已收尾 | 已完成今天结束收尾；长期规则已同步到 `AGENTS.md` 和 `docs/decision-records.md`，下一步优先登录后验证 `system/user` 的 Vxe 工具栏和处理 `dept-tree` 平台化。 |
| 2026-05-06 | 已完成 | 已完成真实业务页组件引用关系审计，并打开 `http://127.0.0.1:5671/platform/typical-page` 到登录页供查看。 |
| 2026-05-06 | 部分完成 | 已完成 Vxe 表格平台适配层一期和 `system/user` 首批接入，浏览器真实页验证停在登录页，等待用户登录或确认是否代点登录。 |
| 2026-05-06 | 已完成 | 已完成 `PlatformTreePanel` 平台树筛选容器下沉，并让 `/platform/typical-page` 与 `system/user/dept-tree` 共享搜索、刷新、骨架屏和空态平台壳。 |
| 2026-05-06 | 已完成 | 已完成当前预览导航收敛：只保留“平台组件”模块，默认首页为 `/platform/typical-page`，旧概览/关于等入口隐藏重定向。 |
| 2026-05-06 | 已完成 | 已去掉典型页顶部 tabbar 区块，页面上方不再显示“分析页 / 典型页面验证场”这块内容。 |
| 2026-05-06 | 已完成 | 已完成顶部导航栏源组件样式改造：`LayoutHeader`、`VbenLogo`、水平 `Menu` 和右侧功能按钮统一到截图风格；当前 Vite 端口为 `5174`。 |
| 2026-05-06 | 已收尾 | 已按用户要求删除 `角色管理` 页面入口及页面文件；本轮没有新增长期规则，未改动 `AGENTS.md` 和 `docs/decision-records.md`。 |
| 2026-05-06 | 部分完成 | 已完成本轮接续复核：`5174` 服务可达、典型页 HTTP 200、角色页面路由残留已复核、`git diff --check` 通过；浏览器稳定视觉回归仍受 Chrome 活跃标签页和 headless 权限限制影响。 |
| 2026-05-06 | 已收尾 | 已完成“今天结束”收尾更新；本轮没有新增长期规则，未改动 `AGENTS.md` 和 `docs/decision-records.md`，当前 Vite 服务仍监听 `5174`，下次接续需重新确认端口状态。 |
| 2026-05-06 | 已完成第一版 | 已完成受控数据源版 `/platform/typical-page` 第一版典型页面 Demo；当前本地 Vite 服务监听 `5173`，`/platform/typical-page` HTTP 返回 `200 OK`，浏览器已验证登录、树筛选和新增抽屉。 |
| 2026-05-06 | 已完成 | 已按用户确认清理构建产物 `apps/web-antd/dist/` 与 `apps/web-antd/dist.zip`，当前工作区只保留源码、典型页专用数据源、平台组件必要改动和文档记录；`5173` 典型页仍返回 `200 OK`。 |
| 2026-05-06 | 已完成 | 已完成 `AGENTS.md` 去重轻量化整理，从 586 行压缩到 188 行；本轮只修改文档，未进入业务代码、平台组件代码或浏览器验证。 |
| 2026-05-06 | 已完成 | 已完成导航组件统一样式微调：顶部/左侧菜单字号统一 14px，左侧图标统一 20px，顶部选中态背景贴满 header，右上角设置/通知/头像 hover 背景已统一到公共样式类；浏览器已复核 `/platform/typical-page`。 |
| 2026-05-06 | 已收尾 | 已完成设计稿菜单骨架阶段收尾：顶部一级菜单已按设计稿展示，未开发菜单保留各自 path 并复用 Blank，`系统管理 - 用户管理` 指向 `/platform/typical-page`；当前卡点是 `/system/user` 直访问未正确进入原页面。 |
| 2026-05-05 | 已收尾 | 本轮完成项目长期协作规则、跨设备接续机制、ant-design-vue 组件改造默认规则、截图与页面需求分析输出规则的文档沉淀。 |
| 2026-05-05 | 已完成 | 已完成典型页面驱动平台组件改造一期，新增平台组件源头和 `/platform/typical-page` 验证场。 |
| 2026-05-05 | 已收尾 | 本轮完成 Mock 登录、Mock 用户信息、Mock 权限、Mock 菜单、动态路由和浏览器验证，已可进入系统进行静态页面开发。 |

## 推荐下一步

1. 用户输入“开工继续”或提出下一个开发需求后，先读取 `AGENTS.md`、`docs/project-log.md`、`docs/decision-records.md`、`docs/todo-next.md`。
2. 输出项目接续摘要，明确当前项目目标、技术栈、最近完成内容、未完成事项、关键规则和建议执行顺序。
3. 下一轮第一优先级：刷新 `http://127.0.0.1:5173/workbench/index` 和 `http://127.0.0.1:5173/project/information`，人工拖动横向滚动条，确认 `PlatformTable` 表头与表体同步不再抖动。
4. 同步复核表格视觉：首列边缘留白 24px、操作列左右留白 24px、操作列宽度是否合适、表格外描边是否清晰、fixed 操作列 hover 是否仍为实心背景。
5. 如横向滚动仍有轻微抖动，继续在 `PlatformTable` 源组件排查 Antdv fixed right / sticky / scrollbar 占位格同步问题，不在 `/workbench/index` 或 `/project/information` 写页面补丁。
6. 如需继续查看典型页面，先确认当前 Vite 服务端口是否仍在运行；本轮清理后 `5173` 仍可访问，但跨设备或新会话不要假设端口仍可用，应以实际 `lsof` 或新启动结果为准。
7. 旧 `/system/user` 页面已解绑并删除壳文件，不再作为当前阶段目标；`人员全生命周期 - 用户管理 -> /platform/typical-page` 当前为空承载页，等待用户后续提供原型后再开发。
8. 继续抽查其他真实业务页，确认是否也已统一接入平台组件和 Vxe 适配层；`system/post`、`system/dept` 已验证，`system/role` 已删除。
7. Figma MCP Go 已恢复连接；后续如继续做 Figma 对齐，优先读取顶部导航节点 `2045-1586`，对照 `LayoutHeader`、`VbenLogo`、水平 `Menu` 和右侧按钮做节点级尺寸与切图校准。
8. 对表格工具栏继续遵守统一规则：业务主按钮放最左，次要按钮随后；搜索、刷新、设置、全屏等常规工具统一由平台表格工具栏或 Vxe 适配层承载。
9. 围绕 `/platform/typical-page` 继续做视觉对齐，由用户指出 Button、Table、Tree、Form、Modal、Drawer 等具体样式问题后回到平台组件源头改造。
10. 如果后续继续统一头部交互态，优先复用 `platform-header-icon-action`，把主题切换、时区等剩余头部图标按钮收口到同一套 hover/focus 规则。
11. 当前典型页面 Demo 下一步建议：先让用户在 `http://127.0.0.1:5173/platform/typical-page` 上确认第一版真实业务验证场的结构和组件问题。
12. 后端数据源可用后，在 `apps/web-antd/src/views/platform/typical-page/user-demo-source.ts` 内把受控数据源切回 `/system/user/list`、`/system/user/deptTree` 等真实接口，尽量不改页面主体。
13. 典型页面 Demo 开发时，顶部导航、左侧导航和面包屑必须纳入验证范围；组件视觉样式优先沉淀到平台组件场景，页面 scoped CSS 只写布局。
14. 后续用户提供截图或指出组件样式问题时，即使没有特别强调全局修改，也默认映射到 ant-design-vue 原生组件、平台薄封装和全局样式源头处理。
15. 如果用户提供截图或页面需求，先按 `AGENTS.md` 的截图与页面需求分析输出规则判断输出强度：简单组件反馈用简版映射，复杂页面再输出完整表格。
16. 等用户确认后，再开始下一步具体平台组件改造、方案设计或代码修改。

## 暂时不处理的问题

1. 暂不批量迁移真实业务页面到 `components/platform`，应先完成 Vxe 适配层和首批真实页验证。
2. 暂不直接用当前 `PlatformTable` 替换真实业务页的 `useVbenVxeGrid`，真实业务页短期仍以 Vben Vxe 表格路线为主。
3. 暂不将截图分析模板拆分为独立规范文档，待后续页面需求增多后再判断是否需要。
4. 暂不将 dist 静态包、mock 数据、平台母版和业务项目解耦等规则写成项目强约束，待结合实际需求确认后再沉淀。
5. 暂不继续清理 `api/system/role` 和 `views/system/role/data.tsx`，因为 `system/user` 仍复用角色相关数据配置，接口层清理需要另行确认范围。
6. 暂不清理 `.DS_Store`，除非用户明确确认清理范围；`apps/web-antd/dist/` 与 `apps/web-antd/dist.zip` 已按用户确认从工作区改动中移除。
7. 暂不对接真实后端登录、用户信息、权限或菜单接口，因为当前阶段以静态页面开发和 Mock 交互为主。
8. 暂不清理 Git 跟踪的依赖产物，需先确认清理范围和是否改 `.gitignore`。

## 风险提醒

1. 如果后续不持续更新 `docs/project-log.md` 和 `docs/todo-next.md`，跨设备接续仍会依赖聊天记忆，违背当前项目规则。
2. 如果长期决策只写入任务日志而不写入 `docs/decision-records.md`，后续容易误判规则是否长期有效。
3. 当前项目目标和业务边界尚未正式记录，下一阶段需要优先补齐。
4. 如果业务页面继续直接大量使用 ant-design-vue 原生组件，平台级样式改造可能无法统一生效。
5. 如果只在页面 scoped CSS 中处理通用组件问题，后续会导致样式分散和维护成本上升。
6. 如果截图分析阶段直接跳到代码实现，容易误判组件归属、业务边界和样式落点。
7. 如果后续没有默认回到全局源头，而只改当前页面，会导致典型页看起来正确但真实业务页没有同步变化，这是当前平台化改造必须避免的风险。
8. 如果把分页、操作列、表格状态切换等场景直接写入 Antdv 全局样式，可能误伤全项目其他原生 Antdv 场景；应优先沉淀到平台组件边界。
9. 当前 `/system/user` 真实接口不可用；如果未恢复后端就继续开发，容易被迫引入假数据，违背“典型页面不是假数据页面”的规则。
10. 当前 `PlatformTable` 基于 ant-design-vue `Table`，但真实业务页大量使用 `useVbenVxeGrid`；如果不先治理 Vxe 适配层，后续可能出现两套表格平台能力并行维护的问题。
11. 当前 `#/components/platform` 只在典型验证页接入，真实业务页继续直接引用 `antdv-next` 属于存量事实；后续迁移需要分批推进，避免一次性影响权限、接口、弹窗和表格行为。
12. 顶部一级菜单默认子路由跳转已覆盖当前 Mock 菜单；如果后续真实后端菜单存在隐藏、禁用、外链和多层空父级混合场景，需要继续做一次真实菜单抽查。
13. 今天结束未执行停服操作；本轮收尾时 `5174` 仍有 Vite 服务监听，下次接续时必须以实际 `lsof` 或新启动结果为准，不要直接沿用当前浏览器端口状态。
14. 当前预览已删除可见的 Vben 示例模块入口；如后续需要业务模块，应按真实业务范围重新接入，避免直接恢复示例模块造成平台范围混乱。
15. Figma MCP Go 已恢复连接，但不同电脑上本机二进制缓存路径可能变化；如再次断开，应优先按 `AGENTS.md` 第 8 节重新定位 `figma-mcp-go` 二进制并更新 MCP 配置。
16. 本轮 Vite 构建曾产生 `apps/web-antd/dist` 与 `apps/web-antd/dist.zip` 临时产物，现已清理；后续每次构建后仍需复查，避免把构建产物纳入源码提交。
17. `角色管理` 页面入口已删除，但 `system/user` 仍依赖角色数据范围配置；后续如果继续清理角色相关代码，需要先确认不会影响用户新增/编辑抽屉。
18. 当前 `agent-browser` 命令不可用，Playwright 浏览器二进制未下载，系统 Chrome headless 会被本机权限/进程策略中断；后续自动化视觉验证前需要先修复浏览器验证链路。
19. 当前 Browser Use in-app backend 初始化不可用，Computer Use 不能操作 Codex 应用；左侧导航栏与顶部右侧图标按钮已做源码、包级类型验证和本地 HTTP 验证，但截图级视觉复核仍需等隔离浏览器链路恢复。
20. 当前典型页使用受控数据源只是后端不可用下的验证方案，不能替代真实 `/system/user` 联调；后端恢复后需要优先切回真实接口并复核筛选、分页、状态切换和操作入口。
21. 当前菜单骨架已让未开发菜单使用独立 path + Blank component，但 `/system/user` 直访问未正确进入原页面；如果下次直接改菜单核心或 route-to-menu，可能误伤 breadcrumb、tabs、权限路由和刷新激活态，必须先做最小归因。
22. 如果继续保留被 Git 跟踪的 `node_modules` 和 Vite 缓存，后续安装依赖、启动开发服务或热更新都可能造成大量无意义 diff。
23. 如果后续静态页面 Mock 数据没有统一组织，新增、编辑、删除、详情、筛选等前端模拟交互容易分散在页面内部，后续联调迁移成本会上升。
