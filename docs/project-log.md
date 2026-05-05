# 项目日志

本文件记录项目阶段性工作日志，用于跨设备、跨聊天上下文恢复。只记录已经发生并完成的事项，不混入长期规则或下一步待办。

## 2026-05-05

### 任务名称

建立项目长期协作规则与上下文接续机制

### 完成内容

1. 新增仓库级 `AGENTS.md`，明确 Codex 在本项目中的默认角色是平台建设战略顾问。
2. 将需求确认、方案分析、等待确认、分步开发、验证复盘等工作流程写入长期规则。
3. 新增跨设备上下文恢复规则，要求开始新任务、接续旧任务、切换电脑、重开聊天或用户说“开工继续”时，先读取项目关键文档并输出项目接续摘要。
4. 新增阶段完成后的项目日志更新要求，要求完成阶段性任务后更新 `docs/project-log.md` 和 `docs/todo-next.md`。
5. 新增长期规则和关键决策沉淀要求，要求同步更新 `docs/decision-records.md` 和 `AGENTS.md`。
6. 建立 `docs/project-log.md`、`docs/decision-records.md`、`docs/todo-next.md` 三份接续文档。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/project-log.md`
3. `docs/decision-records.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

无。此次为项目规则与文档治理变更，不涉及页面、组件或运行时代码。

### 验证结果

已执行 `git diff --check`，结果通过。

### 遗留问题

1. 当前项目目标、业务范围、页面范围和平台组件建设边界仍需后续结合实际需求继续补充。
2. 尚未将这些接续文档链接到 `README.md` 或其他文档入口。

### 任务名称

沉淀 ant-design-vue 组件改造默认规则

### 完成内容

1. 将 Button、Table、Tree、Form、Input、Select、Modal、Drawer、Tabs、Pagination、SearchForm、列表页、筛选区、弹窗、抽屉等组件样式修改的默认处理方式写入长期规则。
2. 明确组件样式问题默认按平台级封装与样式改造处理，而不是只修改当前业务页面。
3. 明确禁止修改 ant-design-vue 源码、禁止修改 `node_modules`、禁止引入其他 UI 组件库、禁止用页面局部 CSS 解决通用组件问题。
4. 增加组件映射表要求，要求开发或修改前先说明页面模块、原生组件、平台组件、是否已有、是否需要改造和样式落点。
5. 增加当前页面局部修改确认规则、平台组件修改后的验证要求和组件改造交付报告要求。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/project-log.md`
3. `docs/decision-records.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 规则涉及 Button、Table、Tree、Form、Input、Select、Modal、Drawer、Tabs、Pagination、SearchForm、列表页、筛选区、弹窗、抽屉等通用组件和业务结构。
2. 本次未实际修改页面或组件代码。

### 验证结果

已执行 `git diff --check`，结果通过。

### 遗留问题

1. 尚未审计当前项目是否已经存在 `PlatformTable`、`PlatformTree`、`PlatformSearchForm`、`PlatformFormModal`、`PlatformDetailDrawer` 等平台组件。
2. 尚未审计业务页面是否直接大量使用 `a-table`、`a-tree`、`a-modal`、`a-form`、`a-button` 等 ant-design-vue 底层组件。
3. 尚未确认平台组件展示页的实际路径和覆盖范围。

### 任务名称

沉淀截图与页面需求分析输出规则

### 完成内容

1. 将截图案例中的页面结构分析、组件映射表、文件归属表、规则自检表、交互与状态说明整理为长期输出规则。
2. 明确截图、页面描述、列表页、查询页、表单页、弹窗、抽屉、详情页等需求必须先分析，等待确认后再开发。
3. 明确所有表格采用 Markdown 格式，且仅使用 Vben Admin + ant-design-vue 组件体系。
4. 根据当前仓库结构，将文件归属路径模板调整为 `apps/web-antd/src/views`、`apps/web-antd/src/components`、`packages/styles` 等实际路径模式。
5. 记录当前仓库为 `vben-admin-monorepo`，主应用路径为 `apps/web-antd/src`。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/project-log.md`
3. `docs/decision-records.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 规则涉及后台管理页面的顶部区域、查询筛选区、列表展示区、操作按钮区、弹窗和抽屉。
2. 规则涉及 PageHeader、SearchForm、Form、Input、Select、DatePicker、Button、Table、Tag、StatusTag、Drawer、Modal 等组件选择。
3. 本次未实际修改页面或组件代码。

### 验证结果

已执行 `git diff --check`，结果通过。

### 遗留问题

1. 尚未审计真实页面是否已形成统一的 PageHeader、SearchForm、Table、Drawer、Modal 使用模式。
2. 尚未确认截图分析模板是否需要拆分成独立 `docs` 规范文档。

### 任务名称

本轮收尾与接续状态确认

### 完成内容

1. 按“今天结束”流程读取 `AGENTS.md`、`docs/project-log.md`、`docs/decision-records.md`、`docs/todo-next.md`。
2. 确认本轮新增的长期规则已经同步到 `AGENTS.md` 和 `docs/decision-records.md`。
3. 汇总本轮主要完成事项：建立项目长期协作规则、建立跨设备接续机制、沉淀 ant-design-vue 组件改造默认规则、沉淀截图与页面需求分析输出规则。
4. 明确下次接续重点：优先输出项目接续摘要，再审计技术栈、应用结构、平台组件边界和业务页面组件引用关系。
5. 更新下一步待办，方便下次从 `docs/todo-next.md` 直接恢复工作。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

无。此次为项目收尾与文档接续更新，不涉及页面、组件或运行时代码。

### 验证结果

收尾后执行 `git diff --check`，用于检查文档修改是否存在空白或格式问题。

### 遗留问题

1. 尚未完成当前项目目标、业务范围、平台母版与具体业务项目边界确认。
2. 尚未完成 ant-design-vue 原生组件与平台组件引用关系审计。
3. 尚未确认平台组件展示页的实际路径和覆盖范围。
4. 尚未执行浏览器验证，因为本轮变更均为文档规则与接续治理。

### 任务名称

处理登录与 Mock 模式进入系统问题

### 完成内容

1. 排查登录链路，确认当前阶段进系统的关键风险集中在 Mock 菜单为空、后端菜单不可用时动态路由无法稳定承载静态页面开发。
2. 保留登录页和既有登录流程，沿用 `VITE_USE_MOCK=true` 作为 Mock 模式开关。
3. 在 Mock 模式下补齐假 token、假用户信息、假角色权限、假菜单和动态路由所需数据。
4. 调整 Mock 菜单接口，Mock 模式下不请求真实 `/system/menu/getRouters`。
5. 修复后端菜单转路由时绝对子路由被重复拼接父路径的问题，避免 `/analytics` 被错误拼成 `/dashboard//analytics`。
6. 将 Mock 菜单返回改为深拷贝，避免运行时路由转换污染原始 Mock 菜单数据。
7. 启动本地 Vite 服务，并在浏览器中验证登录、刷新、菜单与路由切换流程。

### 修改了哪些文件

1. `apps/web-antd/src/mock/index.ts`
2. `apps/web-antd/src/api/core/menu.ts`
3. `apps/web-antd/src/router/access.ts`

### 涉及哪些页面或组件

1. 登录页：`/auth/login`
2. 分析页：`/analytics`
3. 工作台：`/workspace`
4. 系统基础布局：顶部导航、左侧菜单、标签页、页面容器

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行浏览器验证：登录页可打开，输入账号密码后可进入系统，刷新后仍保持登录状态。
3. 已验证 `/analytics` 和 `/workspace` 可以正常打开和切换。
4. 已确认 Mock 模式下没有因真实后端接口不可用而阻塞进入系统。
5. `vue-tsc --noEmit --skipLibCheck` 仍存在项目既有类型错误，和本次登录 Mock 改动无关。

### 遗留问题

1. 仓库当前存在 `node_modules`、Vite 缓存等依赖产物被 Git 跟踪的问题，后续建议单独清理。
2. 后续新增业务页面仍需继续补充页面级 Mock 数据和前端模拟交互。
3. 平台组件边界和业务页面组件引用关系仍需继续审计。

### 任务名称

本轮收尾与 Mock 登录阶段接续更新

### 完成内容

1. 按“今天结束”流程更新 `docs/project-log.md` 和 `docs/todo-next.md`。
2. 将“当前阶段默认使用 Mock 登录与前端静态数据，不被真实后端接口阻塞”沉淀为关键决策。
3. 将前端静态页面与 Mock 模式规则同步到 `AGENTS.md`，作为后续开发默认约束。
4. 明确下次接续重点：继续做静态页面开发前，先处理或确认 Git 跟踪依赖产物问题，再审计平台组件和页面 Mock 数据组织方式。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/project-log.md`
3. `docs/decision-records.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

无。此次为本轮收尾与文档接续更新，不新增页面、组件或运行时代码。

### 验证结果

收尾后执行 `git diff --check`，用于检查文档修改是否存在空白或格式问题。

### 遗留问题

1. 依赖产物被 Git 跟踪的问题尚未处理，需用户确认后单独清理。
2. 尚未建立统一的业务页面 Mock 数据目录和交互模拟规范。
3. 尚未完成平台组件引用关系审计。
