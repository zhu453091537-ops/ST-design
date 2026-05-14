# 项目日志

本文件记录项目阶段性工作日志，用于跨设备、跨聊天上下文恢复。只记录已经发生并完成的事项，不混入长期规则或下一步待办。

### 任务名称

数据录入平台规则补充与现状审计

### 完成内容

1. 在 `AGENTS.md` 明确补充“数据录入必须走平台表单组件体系”的长期规则，禁止业务页继续新写原生 `Form / FormItem` 录入结构。
2. 在 `docs/decision-records.md` 新增长期决策：数据录入只保留两种平台化布局，分别是 `PlatformEditForm layout="vertical"` 和 `PlatformEditForm layout="horizontal" + label-preset="inline-compact"`。
3. 审计当前交付范围内的数据录入页面，确认上下布局页面已统一复用 `PlatformEditForm + PlatformFormItem + 平台字段组件`。
4. 审计当前交付范围内的左右布局页面，确认 `文档列表` 维护信息已切回平台预设，`施工管理` 查询区继续复用 `PlatformQueryPanel` 平台体系。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台表单组件：`PlatformForm` / `PlatformEditForm` / `PlatformFormItem`
2. 平台查询组件：`PlatformQueryPanel`
3. 审计页面：`/project/information`、`/project/overview`、`/project/evaluation`、`/personnel/overview`、`/battery/archive/document-list`、`/battery/construction`、`/platform/typical-page`

### 验证结果

1. 已用代码检索确认当前交付范围内未发现原生 `Form / FormItem` 直接承担业务录入表单的实现。
2. 已确认上下布局页面均使用 `PlatformEditForm layout="vertical"`。
3. 已确认左右布局页面中，`文档列表` 已使用 `PlatformEditForm layout="horizontal" + label-preset="inline-compact"`，`施工管理` 查询区使用 `PlatformQueryPanel`。
4. 已确认当前交付范围内未再出现页面级 `.ant-form-item-label` / `label::after` 手写覆盖。

### 遗留问题

1. 当前“统一”主要覆盖录入控件和 label 规则；部分页面仍保留页面级 grid/分段布局壳，例如 `项目信息管理` 三段式弹窗和动态行配置。
2. 仓库里非当前交付范围的 `workflow/*`、`system/notice/*` 等历史页面仍存在原生 `Form`，本轮未纳入整改。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：录入表单最容易分叉的不是控件本身，而是横向 label 容器、伪元素占位和页面级间距规则。
2. 已通过平台层解决的问题：数据录入两种布局已被明确收口到平台表单预设，不再允许页面各写一套。
3. 哪些仍是页面临时实现：`项目信息管理`、`项目总览`、`人员总览` 等页面仍有页面级 grid/分段壳，用来承载列布局与业务分区。
4. 哪些页面子组件未来必须回收为平台组件：若后续出现更多多段式录入页，可继续评估把“分段+双列 grid+动态子行”抽成平台录入壳。
5. 后续新页面禁止继续复制哪些实现：禁止新写原生 `Form / FormItem` 做业务录入；禁止页面单独覆盖 `.ant-form-item-label`、`label::after`、固定标签列宽与录入前间距。
6. 哪些样式应进入主题变量或统一样式入口：横向录入 label 宽度、右侧间距和 `::after` 关闭规则应继续由平台表单统一维护。
7. 当前仍存在的页面级样式债务：页面级 grid/分段壳还未完全平台化，但录入控件与 label 规则已统一。

### 任务名称

项目信息管理新建项目弹窗与文档列表维护信息表单微调

### 完成内容

1. 调整 `/project/information` 新建项目弹窗内 `进场信息` 的动态输入行布局，让“人员配置 / 设备清单”更贴近前两个 tab 的双列表单节奏。
2. 为 `/project/information` 弹窗表单列内的日期、下拉与输入控件补齐 `width: 100%`，修正“开标日期”字段宽度没有吃满当前列的问题。
3. 在 `PlatformForm` 新增可复用的 `labelPreset=\"inline-compact\"` 横向录入标签预设，直接复用 `施工管理` 查询区那套左右排布逻辑：`96px` 标签列、右侧 `12px` 间距、标签内容右对齐，并显式关闭 `label.ant-form-item-no-colon::after` 伪元素占位。
4. 将 `/battery/archive/document-list` 维护信息表单切换为直接使用 `PlatformEditForm` 的 `inline-compact` 预设，删除页面内手写的横向 label 样式，避免再与平台录入表单分叉。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/information/index.vue`
2. `apps/web-antd/src/components/platform/form/platform-form.vue`
3. `apps/web-antd/src/views/battery/archive/document-list/index.vue`

### 涉及哪些页面或组件

1. 页面：`/project/information`
2. 页面：`/battery/archive/document-list`
3. 平台表单组件：`PlatformForm` / `PlatformEditForm` / `PlatformFormItem`
4. 平台组件组合：`PlatformModal`、`PlatformDatePicker`、`PlatformInput`

### 验证结果

1. 已执行 `git diff --check -- apps/web-antd/src/views/project/information/index.vue apps/web-antd/src/views/battery/archive/document-list/index.vue`，通过。
2. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/information/index.vue apps/web-antd/src/views/battery/archive/document-list/index.vue`，未新增报错。
3. 已确认 `http://127.0.0.1:5173/project/information` 与 `http://127.0.0.1:5173/battery/archive/document-list` 服务可访问。
4. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/form/platform-form.vue apps/web-antd/src/views/battery/archive/document-list/index.vue`，未新增报错。
5. 已在 Safari 隔离浏览器确认 `文档列表` 页面仍能正常打开。
6. `项目信息管理` 的 Safari 标签当前停在未进入系统的空壳页，本轮未完成登录后弹窗视觉复核。

### 遗留问题

1. `项目信息管理` 新建项目弹窗仍需在登录态下复核 `进场信息` 的对齐效果，以及 `招采信息` 中“开标日期”字段宽度是否完全符合预期。
2. `文档列表` 维护信息已切回平台横向录入预设，仍建议你刷新后确认标题到输入框的距离是否已恢复为和 `施工管理` 一致。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：真正造成大间距的是 `label.ant-form-item-no-colon::after` 伪元素占位以及页面手写的横向 label 规则，而不是平台表单组件本身失效。
2. 已通过平台层解决的问题：已把 `施工管理` 同款的横向录入标签规则沉到 `PlatformForm` 预设，后续同类左右录入表单可以直接复用。
3. 哪些仍是页面临时实现：`项目信息管理` 的动态行比例仍是页面级布局规则，暂未上升为平台组件能力。
4. 哪些页面子组件未来必须回收为平台组件：后续若还有“维护信息 / 基础信息”这类两列横向录入表单，优先直接使用 `PlatformEditForm label-preset=\"inline-compact\"`。
5. 后续新页面禁止继续复制哪些实现：不要在业务页再单独写固定标签列宽，也不要遗漏 `label::after` 的关闭规则后再手工补间距。
6. 哪些样式应进入主题变量或统一样式入口：横向录入表单的标签列宽、右侧间距和 `::after` 关闭规则已进入平台表单统一样式入口。
7. 当前仍存在的页面级样式债务：`项目信息管理` 动态录入行仍是页面 scoped CSS；`文档列表` 的横向 label 债务本轮已回收到平台层。

### 任务名称

平台表格正文文字色与选择列控件可视性优化

### 完成内容

1. 将 Ant Table 正文单元格文字颜色从次级文本色调整为主文本色，使列表正文回到更清晰的 `#1E2024` 视觉层级。
2. 将 Vxe 表格正文单元格文字颜色同步调整为主文本色，避免两套平台表格实现出现正文色分叉。
3. 在表格选择列样式层统一加固单选框/复选框尺寸为 `20px * 20px`，并将未选中描边统一为 `#E5E7EB`。
4. 为表格选择列单选框补充内部圆点尺寸和选中态描边颜色，后续又修正到外层 `.ant-radio / .ant-checkbox` 生效节点，避免继续误改 `.inner` 层。

### 修改了哪些文件

1. `packages/styles/src/antd/index.css`
2. `packages/effects/plugins/src/vxe-table/style.css`

### 涉及哪些页面或组件

1. 平台表格样式层：Ant Table
2. 平台表格适配层：Vxe Table
3. 选择列控件：表格内 `Radio` / `Checkbox`

### 验证结果

1. 已执行 `git diff --check -- packages/styles/src/antd/index.css packages/effects/plugins/src/vxe-table/style.css`，通过。
2. 已执行 `./node_modules/.bin/eslint packages/styles/src/antd/index.css packages/effects/plugins/src/vxe-table/style.css`。
3. 其中两个 CSS 文件均被当前 ESLint 配置忽略，未出现新的错误。
4. 已在 Safari 隔离浏览器实测 `/project/information`，正文文字颜色肉眼明显加深。
5. 已在 Safari 隔离浏览器实测 `/battery/archive/document-list`，选择列圆框尺寸和描边清晰可见；后续又根据反馈继续把未选中描边回调到 `#E5E7EB`。

### 遗留问题

1. 当前只对表格选择列内的单选/复选框做了尺寸与描边加固，不影响表单区的单选/复选框；后续如果表单区也要统一，再单独评估。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：表格正文默认走次级文本色时，对业务数据可读性偏弱；选择列的单选框/复选框默认描边在浅背景下不够清晰。
2. 已通过平台层解决的问题：正文文字色和选择列控件可视性都已在平台表格样式源头收口；单选框描边最终命中的是外层 `.ant-radio / .ant-checkbox`，不是 `.ant-radio-inner / .ant-checkbox-inner`。
3. 哪些仍是页面临时实现：无。
4. 哪些页面子组件未来必须回收为平台组件：无新增，当前已在平台样式层完成。
5. 后续新页面禁止继续复制哪些实现：不要再在业务页局部放大选择列单选框/复选框，也不要单页覆盖表格正文文字色。
6. 哪些样式应进入主题变量或统一样式入口：表格正文色和选择列控件尺寸/描边继续由平台表格样式入口统一维护。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

平台组件修改流程优化：先源码再改动

### 完成内容

1. 将“修改平台组件时先读源码和生效链路，再决定修改点”的流程写入 `AGENTS.md`。
2. 将同一规则同步沉淀到 `docs/decision-records.md`，作为后续 Table、Modal、Drawer、Menu、Tree、Form、Select 等通用组件的默认排查顺序。
3. 明确后续遇到“看起来没生效”的平台组件问题时，不再优先拿业务页 scoped CSS 试错，而是先查组件源码、主题注入、适配层和全局 token。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`

### 涉及哪些页面或组件

1. 平台级通用组件：`Table`、`Modal`、`Drawer`、`Menu`、`Tree`、`Form`、`Select`
2. 平台样式链路：`ConfigProvider`、theme、token、适配层

### 验证结果

1. 已完成文档更新。
2. 未涉及代码运行验证。

### 遗留问题

1. 无。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：很多组件“改了没生效”并不是页面样式没写，而是底层主题注入或组件内部 token 在起作用。
2. 已通过平台层解决的问题：把排查顺序前置到源码和生效链路，减少后续反复试错。
3. 哪些仍是页面临时实现：无。
4. 哪些页面子组件未来必须回收为平台组件：无新增。
5. 后续新页面禁止继续复制哪些实现：不要直接在业务页 scoped CSS 里盲改通用组件效果。
6. 哪些样式应进入主题变量或统一样式入口：涉及通用组件的视觉结果优先进入 token、theme 或平台适配层。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

平台表格选中行背景色调整为 `#E5F5EC`

### 完成内容

1. 将平台表格选中行背景从复用通用 `--st-color-fill-selected` 改为独立的 `--st-color-table-row-selected-bg`。
2. 将亮色主题下的表格选中背景统一收口为 `#E5F5EC` 对应的 HSL 值，避免影响树、按钮、菜单等其他复用 `selected` 语义的组件。
3. 在 `apps/web-antd/src/app.vue` 的 `ConfigProvider` 底层主题里补齐 `Table.rowSelectedBg` / `Table.rowSelectedHoverBg`，让 Ant Design Vue 原组件直接产出正确选中态。
4. 同步覆盖 `PlatformTable` 固定列选中态，以及 `#/adapter/vxe-table` 的单选、多选、当前行选中背景变量，保证两套表格实现一致。

### 修改了哪些文件

1. `packages/@core/base/design/src/design-tokens/default.css`
2. `packages/@core/base/design/src/design-tokens/dark.css`
3. `apps/web-antd/src/app.vue`
4. `packages/styles/src/antd/index.css`
5. `packages/effects/plugins/src/vxe-table/style.css`
6. `apps/web-antd/src/components/platform/table/platform-table.vue`

### 涉及哪些页面或组件

1. 平台组件：`PlatformTable`
2. 表格适配层：`#/adapter/vxe-table`
3. Ant Design Vue 主题注入：`ConfigProvider` / `Table` component token
4. 潜在受影响范围：所有接入平台表格或 Vxe 表格适配层的选中行场景

### 验证结果

1. 已执行 `git diff --check -- apps/web-antd/src/components/platform/table/platform-table.vue packages/styles/src/antd/index.css packages/effects/plugins/src/vxe-table/style.css packages/@core/base/design/src/design-tokens/default.css packages/@core/base/design/src/design-tokens/dark.css`，通过。
2. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/app.vue apps/web-antd/src/components/platform/table/platform-table.vue packages/styles/src/antd/index.css packages/effects/plugins/src/vxe-table/style.css packages/@core/base/design/src/design-tokens/default.css packages/@core/base/design/src/design-tokens/dark.css`。
3. 其中仅 `platform-table.vue` 继续存在仓库既有 `vue/one-component-per-file` 规则报错；本轮未新增新的 lint 报错。
4. 已在 Safari 隔离浏览器实测 `/battery/archive/document-list`，点击第一行后选中态已呈现浅绿色背景，维护信息同步解锁。

### 遗留问题

1. 深色主题下表格选中态当前先给了独立深色值，后续如项目实际启用深色主题，建议再做一次视觉复核。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：原有表格选中态与树、按钮、菜单共用同一 `selected` token，无法只定向修改表格选中背景。
2. 已通过平台层解决的问题：已为表格体系拆出独立 `--st-color-table-row-selected-bg`，避免再通过公共 token 误伤其他组件。
3. 哪些仍是页面临时实现：无。
4. 哪些页面子组件未来必须回收为平台组件：无新增，当前已在平台 token 和表格样式层收口。
5. 后续新页面禁止继续复制哪些实现：不要在业务页 scoped CSS 中单独覆盖表格选中背景色。
6. 哪些样式应进入主题变量或统一样式入口：表格选中态已进入设计 token 和平台表格统一样式入口。
7. 当前仍存在的页面级样式债务：暂无本轮新增债务。

### 任务名称

智能考勤管理 - 档案管理 - 文档列表右侧内容页接入

### 完成内容

1. 新增 `文档列表` 右侧真实内容页，接入左侧搜索树、右侧标题区、文档列表表格、维护信息表单和底部固定按钮。
2. 复核并确认该页面使用的都是现有平台组件组合：`PlatformTreePanel`、`PlatformSectionTitle`、`PlatformTable`、`PlatformEditForm`、`PlatformFormItem`、`PlatformInput`、`PlatformButton`。
3. 定位右侧内容区空白根因：不是页面组件本身选错，而是父级菜单 `档案管理` 仍配置成 `platform/blank/index`，导致子路由没有由容器组件承载。
4. 将 `档案管理` 父级组件改为 `ParentView`，恢复子路由承载后，`/battery/archive/document-list` 右侧内容页正常渲染。
5. Safari 实测通过：文档列表页可正常显示；点击上方表格行后，下方维护信息从禁用态切换为可编辑态，底部 `暂存 / 保存` 按钮同步启用。

### 修改了哪些文件

1. `apps/web-antd/src/views/battery/archive/document-list/index.vue`
2. `apps/web-antd/src/views/battery/archive/document-list/document-list-source.ts`
3. `apps/web-antd/src/mock/index.ts`

### 涉及哪些页面或组件

1. 页面：`/battery/archive/document-list`
2. 父级菜单承载：`档案管理`
3. 平台组件：`PlatformTreePanel`
4. 平台组件：`PlatformSectionTitle`
5. 平台组件：`PlatformTable`
6. 平台组件：`PlatformEditForm` / `PlatformFormItem` / `PlatformInput`
7. 平台组件：`PlatformButton`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/battery/archive/document-list/index.vue apps/web-antd/src/views/battery/archive/document-list/document-list-source.ts apps/web-antd/src/mock/index.ts`，通过。
2. 已执行 `git diff --check -- apps/web-antd/src/views/battery/archive/document-list/index.vue apps/web-antd/src/views/battery/archive/document-list/document-list-source.ts apps/web-antd/src/mock/index.ts`，通过。
3. 已重新拉起本地 Vite，并确认 `http://127.0.0.1:5173/battery/archive/document-list` 可访问。
4. 已使用 Safari 隔离验证：页面不再空白，树/表格/维护信息/底部按钮均正常显示。
5. 已在 Safari 实点表格首行，确认上方选中状态、下方维护信息解锁和底部按钮启用联动均正常。

### 遗留问题

1. 当前“上传文件”“暂存”“保存”仍为前端提示态，后续如继续做业务流程，再补真实交互或 Mock 提交逻辑。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无新增原生样式问题。
2. 已通过平台层解决的问题：无新增平台组件改造，本轮问题本质是菜单父级路由承载配置错误。
3. 哪些仍是页面临时实现：`文档列表` 的上传/暂存/保存仍是页面内前端提示态。
4. 哪些页面子组件未来必须回收为平台组件：当前无需新增平台组件，继续优先复用现有平台组件组合。
5. 后续新页面禁止继续复制哪些实现：有子级菜单的分组节点不要再挂 `platform/blank/index` 充当父级承载，避免子路由右侧内容空白。
6. 哪些样式应进入主题变量或统一样式入口：本轮无新增全局样式治理项。
7. 当前仍存在的页面级样式债务：底部固定按钮区目前仍由页面布局承载，若后续多个类似录入页复用，再评估是否抽平台页面壳。

### 任务名称

左侧导航箭头间距与全局 size-4 尺寸调整

### 完成内容

1. 将左侧导航子菜单箭头 `.vben-sub-menu-content__icon-arrow` 的 `margin-right` 从 `0` 调整为 `4px`。
2. 在全局设计样式入口覆盖 `.size-4` utility，使其宽高从 `calc(var(--spacing) * 4)` 调整为 `calc(var(--spacing) * 5)`。
3. 本轮未在单页做局部覆盖，调整直接落在菜单源样式与全局 design 样式层。

### 修改了哪些文件

1. `packages/@core/ui-kit/menu-ui/src/components/menu.vue`
2. `packages/@core/base/design/src/css/global.css`

### 涉及哪些页面或组件

1. 左侧导航原组件：`menu-ui`
2. 全局 utility：`.size-4`
3. 潜在受影响范围：所有使用 `size-4` 的组件

### 验证结果

1. 已执行 `./node_modules/.bin/eslint packages/@core/ui-kit/menu-ui/src/components/menu.vue packages/@core/base/design/src/css/global.css`。
2. 其中 `menu.vue` 无报错；`global.css` 仅提示“File ignored because no matching configuration was supplied”，不是错误。
3. 已执行 `git diff --check -- packages/@core/ui-kit/menu-ui/src/components/menu.vue packages/@core/base/design/src/css/global.css`，通过。
4. 本轮未做浏览器视觉复核；需要后续确认左侧导航箭头位置，以及其他 `size-4` 图标是否符合新的 20px 预期。

### 遗留问题

1. 由于 `.size-4` 是全局 utility，后续若发现个别组件不应同步变大，需要再按组件局部回调。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无新增，问题在于菜单组件样式与全局 utility 尺寸需要统一调整。
2. 已通过平台层解决的问题：左侧导航箭头间距和 `size-4` 尺寸均已在源头收口。
3. 哪些仍是页面临时实现：无。
4. 哪些页面子组件未来必须回收为平台组件：无新增。
5. 后续新页面禁止继续复制哪些实现：不要在业务页单独给子菜单箭头补 `margin-right`，也不要再局部手改 `size-4` 尺寸。
6. 哪些样式应进入主题变量或统一样式入口：本轮 `size-4` 已进入全局 design 样式入口，子菜单箭头间距留在 `menu-ui` 源组件。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

智能考勤管理菜单新增档案管理分组

### 完成内容

1. 在 `智能考勤管理` 模块下新增 `档案管理` 菜单分组。
2. 在 `档案管理` 下补充 3 个子菜单：`安全学习安排`、`文档管理`、`文档列表`。
3. 以上 3 个子菜单右侧内容区暂时统一复用 `platform/blank/index` 空白页，便于后续继续补业务内容。

### 修改了哪些文件

1. `apps/web-antd/src/mock/index.ts`

### 涉及哪些页面或组件

1. 菜单模块：`智能考勤管理`
2. 一级分组：`档案管理`
3. 子菜单：`安全学习安排`
4. 子菜单：`文档管理`
5. 子菜单：`文档列表`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/mock/index.ts`，通过。
2. 已执行 `git diff --check -- apps/web-antd/src/mock/index.ts`，通过。
3. 已执行 `curl -I http://127.0.0.1:5173/battery/construction`，返回 `200 OK`。
4. 本轮未做浏览器点击复核；需要后续在左侧导航中展开 `档案管理`，确认 3 个子菜单已出现且右侧内容区为空白。

### 遗留问题

1. `安全学习安排`、`文档管理`、`文档列表` 当前只有空白壳，后续需分别补业务内容。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无新增。
2. 已通过平台层解决的问题：无新增平台组件改造，本轮仅调整菜单数据源。
3. 哪些仍是页面临时实现：3 个子菜单当前都只是空白占位页。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增。
5. 后续新页面禁止继续复制哪些实现：在未确认内容前，继续复用统一空白壳，不要先散写多个临时页面结构。
6. 哪些样式应进入主题变量或统一样式入口：本轮无新增样式治理项。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

项目冗余文件清理一期

### 完成内容

1. 确认 `apps/platform-showcase 17.36.28` 只是静态 showcase 打包产物，不是当前主业务应用源码。
2. 删除 `apps/platform-showcase 17.36.28`，并确认当前 `apps/` 下只剩 `web-antd` 主应用相关目录。
3. 保留旧 `apps/platform-showcase/dist` 的 Git 删除状态，作为平台 showcase 产物清理结果。
4. 清理仓库工作区中的 `.DS_Store` 系统文件；`.git` 内部两个 `.DS_Store` 因系统权限未强制处理。
5. 新增根 `.gitignore`，忽略 `.DS_Store`、`node_modules/`、构建产物、交付目录和本地环境文件。
6. 本轮未物理删除 `node_modules`、`deliverables/`、`apps/web-antd/dist` 或 `apps/web-antd/dist-handoff`，避免影响本地启动与当前交付快照。

### 修改了哪些文件

1. `.gitignore`
2. `apps/platform-showcase/dist/**`
3. `apps/platform-showcase 17.36.28/**`
4. `.DS_Store` 系统文件

### 涉及哪些页面或组件

1. 无业务页面改造。
2. 无平台组件改造。

### 验证结果

1. 已确认 `apps/platform-showcase 17.36.28` 不存在。
2. 已确认源码范围内无 `platform-showcase` 引用。
3. 已确认 `apps/` 下只剩 `web-antd` 主应用目录。
4. 已执行 `git diff --check -- .gitignore apps/platform-showcase`，通过。

### 遗留问题

1. `apps/web-antd/dist`、`apps/web-antd/dist-handoff`、`deliverables/` 仍是生成/交付产物，后续可在确认交付包备份策略后继续清理 Git 跟踪。
2. `node_modules` 仍不建议物理删除；后续只建议从 Git 跟踪中移除并依赖 `pnpm-lock.yaml` 复原。

### 平台治理影响

1. 本轮没有新增 ant-design-vue 平台组件改造。
2. 本轮主要清理平台 showcase 产物和系统文件，降低后续打包 hash 文件反复污染 Git 状态的风险。
3. 当前主应用仍以 `apps/web-antd` 为准，平台组件源头仍在 `apps/web-antd/src/components/platform`。

### 任务名称

重新整理 Windows 优先的前端客户演示与联调交付包

### 完成内容

1. 按“项目经理 Windows 电脑双击演示、客户确认后前端源码联调上线”的目标，重新生成 `ST-design-frontend-handoff-20260513` 交付目录。
2. 重建 `preview/` 为 handoff 模式构建，使用相对资源路径、hash 路由和 Mock 登录链路。
3. 新增 Windows 主启动器 `Start-Preview-Windows.vbs` / `Start-Preview-Windows.cmd`，通过 PowerShell/.NET 在本机启动静态服务并打开登录页，不依赖 Node、pnpm、Python。
4. 保留 `Start-Preview-Mac.command` 作为 Mac 备用入口。
5. 精简 `README.md` 和 `docs/handoff-frontend.md`，去掉截图展示页思路，只保留客户演示入口、源码启动方式、页面清单、Mock 位置、接口替换和字段映射。
6. 生成最终压缩包 `deliverables/ST-design-frontend-handoff-20260513.zip`。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`
5. `deliverables/ST-design-frontend-handoff-20260513/**`
6. `deliverables/ST-design-frontend-handoff-20260513.zip`

### 涉及哪些页面或组件

1. 客户演示入口：`preview/index.html#/auth/login`
2. 登录后首页：`preview/index.html#/workbench/index`
3. 源码联调入口：`source/apps/web-antd`

### 验证结果

1. 已执行 handoff 构建，生成 `apps/web-antd/dist-handoff` 并同步到交付包 `preview/`。
2. 已通过 HTTP 验证 `http://127.0.0.1:8020/preview/index.html` 返回 `200 OK`。
3. 已用隔离浏览器打开登录页，标题为“登录 - 委外项目综合管理平台”，页面无 400/500 响应错误。
4. 已用隔离浏览器点击 Mock 登录，成功进入 `/workbench/index`，标题为“项目总览 - 委外项目综合管理平台”，页面无 400/500 响应错误。
5. 已检查 zip 内容包含 Windows 启动器、Mac 备用启动器、`preview/`、完整 `source/`、README 和联调文档；zip 中未包含 `node_modules`、旧 `dist-handoff`、`deliverables` 或 `.DS_Store`。

### 遗留问题

1. 当前无法在本机直接执行 Windows `.vbs/.cmd`，但脚本已按 Windows 系统内置 PowerShell/.NET 能力编写，交付给 Windows 电脑后优先验证一次双击链路。

### 平台治理影响

1. 本轮没有新增 ant-design-vue 平台组件改造。
2. 本轮沉淀的是交付方式规则：客户演示包主入口按 Windows 双击启动器处理，不再强行用 `file://` 直开 Vue/Vite SPA。
3. 前端联调仍以 `source/` 完整源码为准，`preview/` 只作为客户演示快照。

### 任务名称

顶部导航与登录页 logo 改为字体图标引用

### 完成内容

1. 将项目 logo 的默认引用从 svg 图片改为字体图标协议 `iconfont:icon-LOGO-green`。
2. 在顶部导航使用的 `VbenLogo` 原组件中补充 `iconfont:` 识别：当 logo 来源是字体图标协议时，内部渲染为字体图标而不是图片。
3. 在登录页认证壳 `Authentication` 中同步补充相同的 `iconfont:` 识别逻辑，并将登录页传入的 logo 引用改为字体图标。
4. 本轮只替换引用来源与渲染方式，不主动调整原有尺寸、颜色、间距样式。

### 修改了哪些文件

1. `apps/web-antd/src/preferences.ts`
2. `apps/web-antd/src/layouts/auth.vue`
3. `packages/@core/ui-kit/shadcn-ui/src/components/logo/logo.vue`
4. `packages/effects/layouts/src/authentication/authentication.vue`

### 涉及哪些页面或组件

1. 顶部导航原组件：`VbenLogo`
2. 登录页：`/auth/login`
3. 认证壳：`Authentication`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/layouts/auth.vue packages/@core/ui-kit/shadcn-ui/src/components/logo/logo.vue packages/effects/layouts/src/authentication/authentication.vue apps/web-antd/src/preferences.ts`，通过。
2. 已执行 `git diff --check -- apps/web-antd/src/layouts/auth.vue packages/@core/ui-kit/shadcn-ui/src/components/logo/logo.vue packages/effects/layouts/src/authentication/authentication.vue apps/web-antd/src/preferences.ts`，通过。
3. 本轮未做浏览器视觉复核；需要后续确认顶部导航与登录页 logo 已由字体图标渲染，且视觉尺寸与原样式保持一致。

### 遗留问题

1. 还需在真实页面确认 logo 不再以 svg 图片加载，而是正常显示字体图标。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无新增，问题在于项目 logo 来源仍走图片引用。
2. 已通过平台层解决的问题：顶部导航原组件和登录页认证壳都支持用统一字体图标协议渲染 logo。
3. 哪些仍是页面临时实现：无，本轮未在业务页面追加局部 logo 样式。
4. 哪些页面子组件未来必须回收为平台组件：无新增。
5. 后续新页面禁止继续复制哪些实现：不要在单页再单独塞一份 logo 图片或手写重复的字体图标结构。
6. 哪些样式应进入主题变量或统一样式入口：当前无需新增 token，logo 的来源统一由平台壳组件识别。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

修复前端联调交付包预览入口卡在启动页

### 完成内容

1. 为 `apps/web-antd` 新增专用 `.env.handoff`，把交付预览构建切换到 `VITE_BASE=./`、`VITE_ROUTER_HISTORY=hash` 和 `VITE_USE_MOCK=true`。
2. 重新构建 `preview/`，修正预览包中动态 chunk 资源的绝对路径问题，解决双击后一直停在 `Plus Admin` 启动页的问题。
3. 补齐交付包根目录缺失的 `LOGO*.svg`，消除登录页进入后剩余的 logo 404。
4. 更新 `打开预览.command`、`README.md` 和 `docs/handoff-frontend.md`，把“直接可打开”的预览方式改成可验证的真实链路。

### 修改了哪些文件

1. `AGENTS.md`
2. `apps/web-antd/.env.handoff`
3. `docs/decision-records.md`
4. `docs/project-log.md`
5. `docs/todo-next.md`
6. `deliverables/ST-design-frontend-handoff-20260512/README.md`
7. `deliverables/ST-design-frontend-handoff-20260512/docs/handoff-frontend.md`
8. `deliverables/ST-design-frontend-handoff-20260512/打开预览.command`
9. `deliverables/ST-design-frontend-handoff-20260512/LOGO-green.svg`
10. `deliverables/ST-design-frontend-handoff-20260512/LOGO-white.svg`
11. `deliverables/ST-design-frontend-handoff-20260512/LOGO.svg`
12. `deliverables/ST-design-frontend-handoff-20260512/preview/**`
13. `deliverables/ST-design-frontend-handoff-20260512/source/apps/web-antd/.env.handoff`

### 涉及哪些页面或组件

1. 交付包根入口：`deliverables/ST-design-frontend-handoff-20260512/index.html`
2. 交付包启动脚本：`deliverables/ST-design-frontend-handoff-20260512/打开预览.command`
3. 交付包预览资源：`deliverables/ST-design-frontend-handoff-20260512/preview/index.html`
4. 源码联调环境：`apps/web-antd/.env.handoff`

### 验证结果

1. 隔离浏览器访问 `http://127.0.0.1:8013/index.html` 后会自动跳到 `http://127.0.0.1:8013/preview/index.html#/auth/login`。
2. 点击登录后可进入 `/workbench/index`，页面标题为“项目总览 - 委外项目综合管理平台”。
3. 当前验证未再出现资源 404 或页面错误，登录页和首页都能正常渲染。

### 遗留问题

1. 需要把新生成的 `deliverables/ST-design-frontend-handoff-20260512.zip` 重新写出一遍，确保压缩包与当前交付目录一致。
2. `apps/web-antd/dist.zip` 是构建过程中顺手生成的旧产物，后续可按需清理。

### 平台治理影响

1. 本轮没有新的 ant-design-vue 平台组件改造。
2. 本轮主要是交付包构建模式修正，不影响业务页面组件边界。
3. 新增的 `apps/web-antd/.env.handoff` 属于交付预览构建配置，不是业务页面临时实现。

### 任务名称

前端联调交付压缩包整理

### 完成内容

1. 基于当前 ST-design 工作区已完成页面，重新整理前端联调交付包结构，目标不再是单独交一个 `dist`，而是交付源码项目、离线预览、联调文档和启动说明。
2. 重建 `apps/web-antd/dist-handoff` 预览产物，并生成根目录可双击打开的静态预览首页方案，用于不启动项目时快速查看页面成果。
3. 升级 `docs/handoff-frontend.md` 为完整联调文档，补充页面路由、源码文件、页面专用 source 文件、字段映射、交互说明、待接接口建议和浏览器自检结果。
4. 生成页面截图，用于交付首页缩略图预览和联调文档中的浏览器自检凭据。

### 修改了哪些文件

1. `docs/handoff-frontend.md`
2. `docs/project-log.md`
3. `docs/todo-next.md`
4. `deliverables/ST-design-frontend-handoff-20260512/**`

### 涉及哪些页面或组件

1. 项目总览：`/workbench/index`
2. 项目信息管理：`/project/information`
3. 进度可视化跟踪：`/project/progress`
4. 合同与付款管理：`/project/contract`
5. 文档与台账管理：`/project/document`
6. 中期评估与验收管理：`/project/evaluation`
7. 人员总览：`/personnel/overview`
8. 资质与准入管控：`/personnel/qualification`
9. 变动与流失率统计：`/personnel/turnover`
10. 工时与兼职管控：`/personnel/worktime`
11. 施工管理：`/battery/construction`
12. 人员档案管理典型页：`/platform/typical-page`

### 验证结果

1. 已执行 `curl -I http://127.0.0.1:5173/`，返回 `200 OK`。
2. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。
3. 已执行 `curl -I http://127.0.0.1:5173/project/information`，返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/personnel/overview`，返回 `200 OK`。
5. 已在隔离 Chrome headless 中逐页打开并截图：`/workbench/index`、`/project/information`、`/project/progress`、`/project/contract`、`/project/document`、`/project/evaluation`、`/personnel/overview`、`/personnel/qualification`、`/personnel/turnover`、`/personnel/worktime`、`/battery/construction`、`/platform/typical-page`。

### 遗留问题

1. `preview/` 内的离线 SPA 产物仍更适合作为归档和补充资源；真正完整的登录链路、菜单流转和接口联调仍建议通过 `source/` 启动本地项目完成。
2. `/personnel/overview/detail` 仍只有壳页面，未纳入“完整已交付页面”范畴。

### 任务名称

中期评估与验收管理区块标题切回纯标题组件

### 完成内容

1. 将 `/project/evaluation` 中“待评估项目”“评估记录”两个区块的标题壳，从 `PlatformTableToolbar` 改为纯标题组件 `PlatformSectionTitle`。
2. 移除这两个区块右侧原本自带的搜索、刷新、设置、全屏等工具入口，使其表现与“文档列表”这类纯标题区块保持一致。
3. 同步清理页面中已不再需要的关键字搜索状态，保留评估记录表头筛选能力不变。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/evaluation/index.vue`

### 涉及哪些页面或组件

1. 页面：`/project/evaluation`
2. 平台组件：`PlatformSectionTitle`
3. 被替换的页面组合壳：`PlatformTableToolbar`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/evaluation/index.vue`，通过。
2. 已执行 `git diff --check -- apps/web-antd/src/views/project/evaluation/index.vue`，通过。
3. 本轮未做登录后浏览器视觉复核；需要后续在真实页面确认两个区块标题与截图 2 的纯标题风格一致。

### 遗留问题

1. 需继续肉眼确认标题下方留白、区块起始位置和卡片/表格顶部间距是否符合预期。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无新增，问题在于页面组合层误用了带右侧工具区的标题壳。
2. 已通过平台层解决的问题：无新增平台源组件改造，本轮改为复用已有 `PlatformSectionTitle`。
3. 哪些仍是页面临时实现：是否使用纯标题还是工具栏式标题，当前仍由页面组合层按场景决定。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增。
5. 后续新页面禁止继续复制哪些实现：不需要右侧工具时，不要继续用 `PlatformTableToolbar` 充当纯标题。
6. 哪些样式应进入主题变量或统一样式入口：当前无需新增 token，继续复用 `PlatformSectionTitle` 现有样式。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

登录后默认落点强制回到项目总览

### 完成内容

1. 调整登录成功后的回跳优先级，不再让登录页 URL 中残留的 `redirect` 参数覆盖平台首页落点。
2. 即使登录页是从 `人员档案管理`、`变动与流失率统计` 等业务页跳转过来，登录成功后也统一优先进入 `项目全景管理 - 项目总览`。
3. 保持未登录访问业务页时仍会先跳登录页的拦截逻辑不变，本轮只改“登录成功后先去哪里”。

### 修改了哪些文件

1. `apps/web-antd/src/router/guard.ts`
2. `docs/project-log.md`
3. `docs/todo-next.md`
4. `docs/decision-records.md`

### 涉及哪些页面或组件

1. 登录后默认首页：`/workbench/index`
2. 登录守卫：`apps/web-antd/src/router/guard.ts`
3. 受影响登录场景：从任意业务页跳到 `/auth/login` 后再次登录

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/router/guard.ts`，通过。
2. 已执行 `git diff --check -- apps/web-antd/src/router/guard.ts`，通过。
3. 已在隔离 Safari 中验证：登录页地址仍带 `redirect=%252Fpersonnel%252Fturnover` 时，点击登录后实际进入 `/workbench/index`，页面标题为“项目总览”。

### 遗留问题

1. 若后续有明确业务要求“从某个受保护详情页登录后必须回原页”，需要再单独设计白名单策略；当前按你的要求统一先回平台首页。

### 任务名称

登录页 logo 标题移到登录卡片上方

### 完成内容

1. 将登录页的 `Logo + 应用标题` 从页面左上角迁移到登录卡片上方。
2. 让该标题块与登录卡片保持 `24px` 间距，并与卡片同宽居中展示。
3. 保持登录页主体表单与背景不变，只调整品牌标题的视觉落点。

### 修改了哪些文件

1. `packages/effects/layouts/src/authentication/authentication.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 登录页：`/auth/login`
2. 认证布局：`AuthPageLayout`

### 验证结果

1. 代码已将标题块改为登录卡片上方的居中布局。
2. 下一步需在隔离浏览器刷新 `/auth/login`，确认间距为 `24px` 且未再回到页面左上角。

### 遗留问题

1. 如果本地浏览器缓存了旧页面状态，可能需要刷新一次才能看到新布局。

### 任务名称

修正登录页默认居中与认证工具栏显示

### 完成内容

1. 将登录页默认认证布局切回 `panel-center`，避免因为本地缓存或历史偏好继续落到右居布局。
2. 在登录页布局容器中关闭认证工具栏，隐藏右上角的颜色和布局切换按钮。
3. 保持登录页左侧品牌插画与右侧登录表单结构不变，只修正默认进入态。

### 修改了哪些文件

1. `apps/web-antd/src/preferences.ts`
2. `apps/web-antd/src/layouts/auth.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`
5. `docs/decision-records.md`

### 涉及哪些页面或组件

1. 登录页：`/auth/login`
2. 认证布局：`AuthPageLayout`

### 验证结果

1. 代码层已将默认认证布局和工具栏显式收口。
2. 下一步在隔离浏览器刷新登录页，确认右上角按钮已消失且内容重新居中。

### 遗留问题

1. 若用户本机还有旧的认证偏好缓存，首次加载前可能需要刷新页面让新配置生效，但代码默认已切到居中。

### 任务名称

平台表格序号列表头禁止换行

### 完成内容

1. 在 `PlatformTable` 源组件中，为平台默认序号列补充专用 header / cell class。
2. 将序号列表头与序号单元格统一设置为 `white-space: nowrap`，避免“序号”在首列内边距挤压下被拆成两行。
3. 继续保持修复落点在平台表格源组件，不在 `施工管理` 等业务页面写局部表头补丁。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table.vue`

### 涉及哪些页面或组件

1. 平台组件：`PlatformTable`
2. 当前反馈页面：`/battery/construction`
3. 潜在受影响页面：所有使用平台默认序号列的 Ant Design Vue 表格页面

### 验证结果

1. 已执行 `git diff --check -- apps/web-antd/src/components/platform/table/platform-table.vue apps/web-antd/src/adapter/vxe-table.ts`，通过。
2. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table.vue`；命中该文件既有的 `vue/one-component-per-file` 规则报错，不是本轮序号列修复新引入的问题。
3. 本轮未完成登录后浏览器复核；Safari 打开业务路由时落回登录页，需后续在已登录状态下确认“序号”表头已保持单行。

### 遗留问题

1. 还需在真实业务页已登录状态下肉眼确认 `施工管理` 等页面的“序号”表头不再换行。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：平台默认序号列在当前首列内边距规则下，表头文本可能被挤成两行。
2. 已通过平台层解决的问题：平台默认序号列已具备专用不换行约束，不再依赖业务页局部 `nowrap`。
3. 哪些仍是页面临时实现：无，本轮未在业务页追加样式。
4. 哪些页面子组件未来必须回收为平台组件：无新增。
5. 后续新页面禁止继续复制哪些实现：不要在单个列表页单独给“序号”表头写局部不换行补丁。
6. 哪些样式应进入主题变量或统一样式入口：序号列稳定展示继续由 `PlatformTable` 源组件统一维护。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

项目总览切回登录后默认首页

### 完成内容

1. 将项目配置中的默认首页从 `/platform/typical-page` 切回 `/workbench/index`。
2. 将旧 `dashboard / analytics / workspace / about / changelog` 等历史入口的隐藏重定向统一改为跳转项目总览，避免登录后或访问旧入口时继续落到典型页。
3. 保持“项目全景管理”菜单结构与“项目总览”页面内容不变，本轮只调整首页进入链路。
4. 同步更新接续文档，明确当前登录后的平台首页应为“项目全景管理 - 项目总览”。

### 修改了哪些文件

1. `apps/web-antd/src/preferences.ts`
2. `apps/web-antd/src/router/routes/modules/dashboard.ts`
3. `docs/project-log.md`
4. `docs/todo-next.md`
5. `docs/decision-records.md`

### 涉及哪些页面或组件

1. 默认首页：`/workbench/index`
2. 历史隐藏入口：`/dashboard`、`/analytics`、`/workspace`、`/vben-admin/about`、`/changelog`
3. 业务模块：`项目全景管理 > 项目总览`

### 验证结果

1. 已执行 `curl -I http://127.0.0.1:5173/`，服务返回 `200 OK`，确认本地预览在线。
2. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/preferences.ts apps/web-antd/src/router/routes/modules/dashboard.ts`，通过。
3. 已执行 `git diff --check -- apps/web-antd/src/preferences.ts apps/web-antd/src/router/routes/modules/dashboard.ts docs/project-log.md docs/todo-next.md docs/decision-records.md`，通过。
4. 已在隔离浏览器验证根路由 `/` 和登录后落点当前都进入 `/workbench/index`；旧入口重定向代码已统一切换，后续可再顺手补一次登录态直访复核。

### 遗留问题

1. 如果浏览器本地缓存了旧的首页配置，首次访问仍可能受旧 `localStorage` 影响；刷新后若仍异常，再清一次站点本地缓存即可。

### 任务名称

施工管理菜单下新增人员档案与考勤管理入口

### 完成内容

1. 在 `智能考勤管理 > 施工管理` 同级菜单下新增 `考勤管理` 入口。
2. 新菜单当前复用空白占位页，右侧内容区暂时保持空白。
3. 保留原有 `施工管理` 菜单与页面不变，避免影响现有施工管理内容。

### 修改了哪些文件

1. `apps/web-antd/src/mock/index.ts`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 菜单：`智能考勤管理`
2. 菜单：`施工管理`
3. 新增菜单：`考勤管理`

### 验证结果

1. 已完成菜单数据接入，尚未做浏览器点击复核。
2. 右侧内容区当前为现成空白占位页，符合“暂时为空”的要求。

### 遗留问题

1. 新菜单目前只有空白壳，后续需要再按具体业务补充页面内容。

### 任务名称

人员总览查看入口接入详情页返回壳

### 完成内容

1. 将 `/personnel/overview` 表格操作列中的“查看”从占位提示改为真实路由跳转，点击后进入详情页。
2. 新增隐藏路由 `/personnel/overview/detail`，并补充 `activePath` 映射，确保进入详情页时左侧菜单仍保持高亮在“人员总览”。
3. 新建人员详情页壳，顶部按当前截图要求落地“返回 icon + 标题”编组：图标 `20px`、标题 `16px / 700`、图文间距 `6px`，整体与页面左上保持 `24px` 间距。
4. 当前详情页正文区先留空，作为后续继续承接页面内容的占位容器。

### 修改了哪些文件

1. `apps/web-antd/src/views/personnel/overview/index.vue`
2. `apps/web-antd/src/views/personnel/detail/index.vue`
3. `apps/web-antd/src/mock/index.ts`
4. `apps/web-antd/src/router/access.ts`
5. `docs/project-log.md`
6. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/personnel/overview`
2. 页面：`/personnel/overview/detail`
3. 复用平台组件：`PlatformButton`、`PlatformIcon`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/personnel/overview/index.vue apps/web-antd/src/views/personnel/detail/index.vue apps/web-antd/src/mock/index.ts apps/web-antd/src/router/access.ts`，通过。
2. 已执行 `git diff --check -- apps/web-antd/src/views/personnel/overview/index.vue apps/web-antd/src/views/personnel/detail/index.vue apps/web-antd/src/mock/index.ts apps/web-antd/src/router/access.ts`，通过。
3. 已执行 `curl -I http://127.0.0.1:5173/personnel/overview` 与 `curl -I http://127.0.0.1:5173/personnel/overview/detail`，均返回 `200 OK`。
4. 本轮未做隔离浏览器点击复核；需要后续实际点击“查看”并验证返回按钮是否稳定回到人员总览。

### 遗留问题

1. 当前详情页只有顶部返回导航和空白内容区，具体详情模块仍待下一轮按你提供的内容继续补齐。
2. 标题文案当前先按“人员详情”落地；如果后续要改成姓名或更细的业务标题，再一并调整。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无新增，这次不需要扩展 Ant Design Vue 原生头部组件。
2. 已通过平台层解决的问题：无，本轮未新增或改造平台源组件，只复用既有 `PlatformIcon` 与路由体系。
3. 哪些仍是页面临时实现：详情页顶部返回头目前是页面级轻量结构，尚未抽成通用平台组件。
4. 哪些页面子组件未来必须回收为平台组件：如果后续多个详情页都采用相同“返回 + 标题”头部，再评估沉淀统一的详情页返回头。
5. 后续新页面禁止继续复制哪些实现：在复用度未明确前，不要在多个页面各自散写不同版本的返回头。
6. 哪些样式应进入主题变量或统一样式入口：当前无需新增 token，继续沿用现有 `24px` 页面节奏变量。
7. 当前仍存在的页面级样式债务：详情页正文内容尚未接入，返回头样式暂存页面本地。

### 任务名称

收口项目详情抽屉页面残留间距

### 完成内容

1. 根据项目详情抽屉视觉复核反馈，继续收口 `/project/overview` 页面中残留的详情头部间距样式。
2. 删除 `project-detail-title` 自带的底部分隔线和 `padding-bottom`，避免继续叠加出与 `PlatformDrawer` 标题区不一致的额外视觉边界。
3. 仅保留更纯粹的 `margin-bottom: 24px` 作为头像摘要与详情描述列表之间的内容间距，让抽屉整体 spacing 主要由 `PlatformDrawer` 原组件控制。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/overview/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/overview`
2. 平台组件：`PlatformDrawer`
3. 平台组件：`PlatformDescriptions`

### 验证结果

1. 本轮将执行目标文件 `git diff --check` 作为最小自检。
2. 已完成代码级收口，未再修改 `PlatformDrawer` 原组件 API。
3. 未执行隔离浏览器截图复核；建议下次优先确认项目详情抽屉标题区与内容区之间是否不再出现多余的分隔和堆叠间距。

### 遗留问题

1. 如果后续仍觉得项目头像摘要区与描述列表之间节奏偏大或偏小，再继续在该页面局部微调 `margin-bottom`，不再回退到额外分隔线方案。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无新增，问题来自页面层旧的详情头部样式残留。
2. 已通过平台层解决的问题：抽屉标题区 spacing 已由 `PlatformDrawer` 接管，页面残留分隔线已移除。
3. 哪些仍是页面临时实现：头像摘要区本身仍是 `project/overview` 页面特有结构。
4. 哪些页面子组件未来必须回收为平台组件：如更多详情抽屉都出现“头像摘要头部”场景，再评估平台详情摘要头组件。
5. 后续新页面禁止继续复制哪些实现：不要在详情抽屉内容区重复加一条与抽屉标题区平行的分隔线。
6. 哪些样式应进入主题变量或统一样式入口：当前不新增全局变量，仍以 `PlatformDrawer` spacing 为主、页面局部内容间距为辅。
7. 当前仍存在的页面级样式债务：项目详情头像摘要区仍在页面层维护。

### 任务名称

统一 `PlatformDrawer` 标题区与内容区内边距

### 完成内容

1. 在 `PlatformDrawer` 原组件中，将抽屉 header 内边距统一改为 `padding: var(--ant-padding) var(--ant-padding-lg)`。
2. 将抽屉 body 内容区内边距统一改为 `padding: 24px 40px 24px 40px`，保证左右 `40px`、上下 `24px`。
3. 本轮不在任何业务抽屉页面写局部 spacing 覆盖，只调整平台抽屉源组件。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/drawer/platform-drawer.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformDrawer`
2. 当前反馈页面：`/project/overview`
3. 已同步受影响页面：所有接入 `PlatformDrawer` 的抽屉页面，如项目详情、人员档案详情等

### 验证结果

1. 已完成目标文件 `git diff --check`：通过。
2. 已完成平台源组件代码级 spacing 调整。
3. 未执行隔离浏览器截图复核；建议下次集中视觉验收时优先确认抽屉标题区高度、下划线位置和 body 内容区的 `24 / 40 / 24 / 40` 留白是否符合预期。

### 遗留问题

1. 当前只统一了 `PlatformDrawer` header/body 的 spacing；如后续还要把 footer、右侧关闭按钮热区或抽屉宽度策略也统一，再继续在平台层收口。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：Drawer 默认 header/body 内边距与当前平台弹窗节奏不一致，需要平台层统一。
2. 已通过平台层解决的问题：`PlatformDrawer` 的标题区与内容区 spacing 已统一到平台规范。
3. 哪些仍是页面临时实现：无，本轮未在业务页写抽屉内边距覆盖。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增。
5. 后续新页面禁止继续复制哪些实现：不要在单个抽屉页再局部写 header/body padding。
6. 哪些样式应进入主题变量或统一样式入口：抽屉标题区与内容区 spacing 继续由 `PlatformDrawer` 源组件统一维护。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

平台详情展示组件首版与下拉框描边统一

### 完成内容

1. 新增 `PlatformDescriptions` 平台描述组件，底层基于 Ant Design Vue `Descriptions`，统一详情项边框、label 列宽、文字层级与圆角。
2. 将 `/project/overview` 的“项目详情”抽屉从页面手写网格改为 `PlatformSectionTitle + PlatformDescriptions` 结构，并保留项目头像、状态条和当前进度条等业务展示内容。
3. 在全局 Ant Design Vue 样式入口中，为 `Select` 的 selector 再补一层显式 `1px solid` 描边覆盖，确保数据录入下拉框与输入框描边保持一致。
4. 本轮改动继续落在平台组件和全局样式源头，不在业务页面写局部描边或详情布局覆盖。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/view/platform-descriptions.vue`
2. `apps/web-antd/src/components/platform/view/index.ts`
3. `apps/web-antd/src/views/project/overview/index.vue`
4. `packages/styles/src/antd/index.css`
5. `docs/project-log.md`
6. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 新增平台组件：`PlatformDescriptions`
2. 平台标题组件：`PlatformSectionTitle`
3. 平台抽屉：`PlatformDrawer`
4. 平台字段控件：`PlatformSelect`
5. 当前反馈页面：`/project/overview`、`/project/information`

### 验证结果

1. 已完成目标文件 `git diff --check`：通过。
2. 已完成代码级接线与样式源头调整。
3. 未执行隔离浏览器截图复核；建议下次集中视觉验收时优先确认 `/project/overview` 的详情抽屉结构是否接近期望，以及 `/project/information` 新建项目弹窗里的下拉框描边是否与输入框一致。

### 遗留问题

1. `PlatformDescriptions` 当前先落地在项目详情抽屉首个场景；如后续还要承接日志详情、审批详情等场景，再继续补充尺寸、slot 和状态型内容能力。
2. 如果后续还要把弹窗标题区统一强制使用 `PlatformSectionTitle`，建议与 `PlatformModal` 标题栏结构一起整体评估，不要在单页零散接入。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：`Descriptions` 与 `Select` 默认样式在当前平台视觉下都需要统一封装与覆写。
2. 已通过平台层解决的问题：详情展示已具备可复用的平台描述组件；下拉框 selector 描边已与输入类控件统一。
3. 哪些仍是页面临时实现：项目头像、状态条和进度条仍保留在 `project/overview` 页面层组织。
4. 哪些页面子组件未来必须回收为平台组件：如更多详情抽屉继续出现一致的“摘要头部 + 描述列表”结构，可继续补平台详情头部组件。
5. 后续新页面禁止继续复制哪些实现：不要在业务页继续手写两列详情 grid，也不要为单个下拉框单独补描边样式。
6. 哪些样式应进入主题变量或统一样式入口：详情描述边框、label 列宽、录入控件描边统一由平台组件和 `packages/styles/src/antd/index.css` 维护。
7. 当前仍存在的页面级样式债务：项目详情中的状态条与头像摘要仍在页面层，后续视复用度再回收。

### 任务名称

平台下拉箭头切换为本地 SVG 并统一继承颜色

### 完成内容

1. 将 `apps/web-antd/src/assets/svg/pull down.svg` 改成 `currentColor` 继承模式。
2. 在 `PlatformSelect`、`PlatformDatePicker`、`PlatformRangePicker`、`PlatformQueryPanel`、`PlatformTree` 中改用本地 SVG 作为箭头来源。
3. `PlatformTree` 的展开态保留旋转处理，`PlatformQueryPanel` 的收起/展开图标也改为同一本地图标复用。
4. 本轮未改分页箭头，避免一次性把全量列表页影响面拉太大。

### 修改了哪些文件

1. `apps/web-antd/src/assets/svg/pull down.svg`
2. `apps/web-antd/src/assets/svg/箭头下.svg`
3. `apps/web-antd/src/assets/svg/Collapse fullscreen.svg`
4. `apps/web-antd/src/assets/svg/弹窗全屏.svg`
5. `apps/web-antd/src/components/platform/field/platform-select.vue`
6. `apps/web-antd/src/components/platform/field/platform-date-picker.vue`
7. `apps/web-antd/src/components/platform/field/platform-range-picker.vue`
8. `apps/web-antd/src/components/platform/form/platform-query-panel.vue`
9. `apps/web-antd/src/components/platform/tree/platform-tree.vue`
10. `docs/project-log.md`
11. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformSelect`、`PlatformDatePicker`、`PlatformRangePicker`、`PlatformQueryPanel`、`PlatformTree`
2. 受影响页面：所有使用上述平台组件的业务页

### 验证结果

1. 已完成源码替换。
2. 本轮将执行目标文件 ESLint 与 `git diff --check` 作为最小自检。
3. 未做浏览器验证；建议后续优先看 `personnel/overview`、`project/information`、`battery/construction`。

### 遗留问题

1. 分页左右箭头暂未替换，如后续要统一，可再单独处理。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：原生下拉箭头与平台图标体系不统一。
2. 已通过平台层解决的问题：平台字段、树和查询面板已切换为本地 SVG 入口。
3. 哪些仍是页面临时实现：分页箭头仍是原生样式。
4. 哪些页面子组件未来必须回收为平台组件：同类下拉/展开箭头后续应继续优先走平台字段和树组件。
5. 后续新页面禁止继续复制哪些实现：不要在业务页单独写下拉箭头 SVG。
6. 哪些样式应进入主题变量或统一样式入口：箭头颜色继续由组件当前 `color` 决定。
7. 当前仍存在的页面级样式债务：分页箭头未统一。

### 任务名称

平台弹窗内容区与 footer 间距统一回收至 PlatformModal

### 完成内容

1. 将 `PlatformModal` 的内容区左右 40px、footer 分隔线与按钮区内边距统一收口到平台组件。
2. 将 `PlatformModal` 的 body/footer 间距改为语义化 `styles.body` / `styles.footer`，避免被 `antdv-next` 默认 modal 变量压回去。
3. 删除 `project/overview` 页面里原先单独给 `.project-form-grid` 追加的 40px 内容区 padding，避免只在单页生效。
4. 当前平台弹窗的内容区和 footer 间距已改为组件级统一控制，后续接入 `PlatformModal` 的页面都会一起生效。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/modal/platform-modal.vue`
2. `apps/web-antd/src/views/project/overview/index.vue`
3. `AGENTS.md`
4. `docs/decision-records.md`
5. `docs/project-log.md`
6. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformModal`
2. 受影响页面：`/project/overview`
3. 未来所有接入 `PlatformModal` 的业务页面

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/modal/platform-modal.vue apps/web-antd/src/views/project/overview/index.vue`，通过。
2. 已执行 `git diff --check -- apps/web-antd/src/components/platform/modal/platform-modal.vue apps/web-antd/src/views/project/overview/index.vue`，通过。
3. 浏览器视觉复核仍待下一步确认。

### 遗留问题

1. 仍需继续在真实页面里确认 footer 顶线与按钮间距是否和设计稿一致。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：`ant-modal` 的内容区边距如果放在业务页里，会导致同一平台弹窗在不同页面出现不同节奏。
2. 已通过平台层解决的问题：`PlatformModal` 现在统一负责内容区与 footer 间距，避免单页补丁。
3. 哪些仍是页面临时实现：`project/overview` 的局部内容区 padding 已删除，不再保留为页面临时实现。
4. 哪些页面子组件未来必须回收为平台组件：所有使用 `PlatformModal` 的新增/编辑弹窗都应直接继承平台层规则。
5. 后续新页面禁止继续复制哪些实现：不要再在业务页里单独给 `.ant-modal-body` 或表单网格补平台弹窗内容边距。
6. 哪些样式应进入主题变量或统一样式入口：弹窗标题、内容区边距、footer 顶线与按钮区内边距继续由平台组件统一维护。
7. 当前仍存在的页面级样式债务：需要继续确认是否还有其他业务页残留局部 modal body padding。

### 任务名称

平台统计卡主数字字号统一为 32px

### 完成内容

1. 按浏览器标注反馈，将 `PlatformStatCard` 主数字字号统一调整为 `32px`。
2. 保持 `DIN Alternate Bold.ttf` 字体接入不变，仅放大主数值，不影响标题、趋势文案、说明文字和其他页面数字。
3. 本轮修改只作用于平台统计卡原组件，所有已接入 `PlatformStatCard` 的统计卡页面都会同步生效。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/stat/platform-stat-card.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformStatCard`
2. 已接入页面：`/project/overview`、`/project/evaluation`、`/project/document`、`/project/contract`、`/personnel/overview`、`/personnel/qualification`、`/personnel/worktime`、`/personnel/turnover`

### 验证结果

1. 已完成目标文件修改。
2. 本轮将执行目标文件 ESLint 与 `git diff --check` 作为最小自检。
3. 未做浏览器复核；建议下一步在 `personnel/overview` 等统计卡页面确认 32px 字号与单位排列是否舒展。

### 遗留问题

1. 若后续某些卡片想保留更小字号，需要再按页面或组件层级单独拆分，而不是继续在业务页覆盖。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于平台统计卡数字字号统一。
2. 已通过平台层解决的问题：统计卡主数字字号已统一到 `32px`。
3. 哪些仍是页面临时实现：无，本轮未在业务页写局部字号样式。
4. 哪些页面子组件未来必须回收为平台组件：后续同类 KPI 卡仍应优先复用 `PlatformStatCard`。
5. 后续新页面禁止继续复制哪些实现：不要在单页里单独把统计卡主数字改回其他字号。
6. 哪些样式应进入主题变量或统一样式入口：统计卡主数字字号和字体族继续由平台组件维护。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

平台统计卡主数字接入 DIN Alternate Bold 数字字体

### 完成内容

1. 将用户已放入仓库的 `apps/web-antd/src/assets/fonts/DIN Alternate Bold.ttf` 接入全局数字字体入口。
2. 在 `apps/web-antd/src/assets/fonts/index.css` 中启用 `@font-face`，统一定义 `ST Number` 数字字体族变量。
3. 仅在 `PlatformStatCard` 的主数值 `strong` 上启用该数字字体，不影响标题、趋势文案、说明文字和其他页面数字。
4. 本轮按用户要求只处理数据卡片重点数字场景，未扩散到表格金额、看板数字和正文数字。

### 修改了哪些文件

1. `apps/web-antd/src/assets/fonts/index.css`
2. `apps/web-antd/src/components/platform/stat/platform-stat-card.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformStatCard`
2. 当前已接入该组件的页面：`/project/overview`、`/project/evaluation`、`/project/document`、`/project/contract`、`/personnel/overview`、`/personnel/qualification`、`/personnel/worktime`、`/personnel/turnover`
3. 影响范围：仅统计卡主数字

### 验证结果

1. 已执行目标文件 ESLint 与 `git diff --check`，需以本轮最终结果为准。
2. 本轮未做隔离浏览器视觉复核；建议下一步优先打开含统计卡页面确认数字字体观感与字重。

### 遗留问题

1. 当前只给 `PlatformStatCard` 主数字启用该字体；如后续合同金额、图表大数字、看板 KPI 也要统一使用，需要再按组件边界分别接入。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于平台统计卡数字表现统一。
2. 已通过平台层解决的问题：统计卡主数字字体已收口到 `PlatformStatCard`，不需要各业务页重复声明。
3. 哪些仍是页面临时实现：无，本轮未在业务页面写局部数字字体样式。
4. 哪些页面子组件未来必须回收为平台组件：后续如出现新的高频 KPI 数字展示壳，仍应优先复用 `PlatformStatCard` 或在平台展示组件层统一接入。
5. 后续新页面禁止继续复制哪些实现：不要在单个业务页给统计卡数字手写 `font-family`。
6. 哪些样式应进入主题变量或统一样式入口：数字字体声明和字体族变量继续统一维护在 `src/assets/fonts/index.css`。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

数字专用字体资源位与全局接入口初始化

### 完成内容

1. 在 `apps/web-antd/src/assets/fonts/` 新建数字字体公共目录，作为 `ant-web` 后续接收特殊数字字体文件的固定落点。
2. 新增 `apps/web-antd/src/assets/fonts/index.css`，补上数字字体入口说明、`--st-font-family-number` 变量和 `.st-number-font` / `[data-number-font='true']` 复用选择器。
3. 在 `apps/web-antd/src/bootstrap.ts` 全局引入数字字体样式入口，确保后续字体文件接入后不需要逐页补 import。
4. 本轮只完成资源位和样式接入口初始化，未放入真实字体文件，也未把数字字体强制覆盖到现有全部数字场景。

### 修改了哪些文件

1. `apps/web-antd/src/assets/fonts/.gitkeep`
2. `apps/web-antd/src/assets/fonts/index.css`
3. `apps/web-antd/src/bootstrap.ts`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 应用全局样式入口：`apps/web-antd/src/bootstrap.ts`
2. 全局字体资源目录：`apps/web-antd/src/assets/fonts/`
3. 后续可接入页面：所有需要数字专用字体的统计卡、表格金额、进度数值和看板数字场景

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/bootstrap.ts`，需以本轮最终结果为准。
2. 已执行 `git diff --check -- apps/web-antd/src/bootstrap.ts apps/web-antd/src/assets/fonts/index.css apps/web-antd/src/assets/fonts/.gitkeep`，通过。
3. 本轮未做浏览器验证；当前还没有真实字体文件，因此只验证代码接入链路，不验证视觉效果。

### 遗留问题

1. 仓库里仍没有真实的数字字体文件；收到 `.woff2` / `.woff` / `.ttf` 后，还需补全 `@font-face` 的实际文件名。
2. 当前只提供全局变量和复用类，后续若要让某些统计卡、金额列或看板数字默认启用该字体，还需再指定具体接入范围。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于应用级静态资源接入。
2. 已通过平台层解决的问题：已统一数字字体资源目录和全局样式入口，避免后续在业务页分散维护字体声明。
3. 哪些仍是页面临时实现：暂无，本轮未在业务页面写局部字体样式。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增；如后续高频数字展示需要默认启用，可再评估沉淀为平台展示规则。
5. 后续新页面禁止继续复制哪些实现：不要在单个页面手写 `@font-face` 或把字体文件散落到业务目录。
6. 哪些样式应进入主题变量或统一样式入口：数字字体族变量已进入全局字体入口，后续继续沿用 `--st-font-family-number`。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

项目总览查看进度看板按钮接入进度可视化跟踪路由

### 完成内容

1. 将 `/workbench/index` 项目总览页右侧头部动作“查看进度看板”从提示占位改为真实路由跳转。
2. 当前点击该按钮后，直接进入 `/project/progress` 对应的“进度可视化跟踪”页面。
3. 本轮只处理项目总览页按钮事件，不改页面结构、平台组件或目标页内容。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/overview/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`
2. 目标页面：`/project/progress`
3. 页面头部动作：`查看进度看板`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/overview/index.vue`，结果通过。
2. 已执行 `git diff --check -- apps/web-antd/src/views/project/overview/index.vue docs/project-log.md docs/todo-next.md`，结果通过。
3. 本轮未做隔离浏览器点击验证；需在 `/workbench/index` 页面点击“查看进度看板”确认已跳转到 `/project/progress`。

### 遗留问题

1. 当前只接了项目总览头部的“查看进度看板”入口；如果后续还有表格行内、统计卡或其他模块也要跳到进度页，再统一梳理入口策略。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于页面动作事件接线。
2. 已通过平台层解决的问题：无，本轮未修改平台组件。
3. 哪些仍是页面临时实现：项目总览页头部动作仍由页面自身定义和接线。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增，本轮不涉及平台抽象升级。
5. 后续新页面禁止继续复制哪些实现：不要把“查看进度看板”继续保留成只弹提示的占位按钮。
6. 哪些样式应进入主题变量或统一样式入口：无新增。
7. 当前仍存在的页面级样式债务：无新增页面级样式债务。

## 2026-05-12

### 任务

补充“打开浏览器”默认直开 5173 规则

### 完成内容

1. 收紧 `AGENTS.md` 中的本地预览快速打开规则，明确本项目固定预览端口就是 `5173`。
2. 明确用户在本仓库内说“打开浏览器”“打开页面”“打开本地预览”等口令时，Codex 应默认先检查 `http://127.0.0.1:5173/`，未启动就立即拉起 Vite，再直接执行打开。
3. 明确同一动作不再重复向用户确认，也不要求用户反复重复“打开 5173”之类的口令。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 本地预览打开流程
2. `apps/web-antd` 开发服务启动流程

### 验证结果

1. 本轮未改业务代码，仅补充协作规则。
2. 规则文本已写入 `AGENTS.md` 与接续文档。

### 遗留问题

1. 无新增遗留问题。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无。
2. 已通过平台层解决的问题：无，本轮仅补充协作与预览打开规则。
3. 仍是页面临时实现的问题：无。
4. 哪些页面子组件未来必须回收为平台组件：无新增项。
5. 后续新页面禁止继续复制哪些实现：无新增项。
6. 哪些样式应进入主题变量或统一样式入口：无。
7. 当前仍存在的页面级样式债务：无新增债务。

### 任务名称

平台弹窗标题回归原生 header 层重构

### 完成内容

1. 先梳理 `PlatformModal -> antdv-next Modal` 的底层结构，确认标题、body、footer、wrap 和 fullscreen 状态各自的落点。
2. 将 `PlatformModal` 回退为原生 `title` 层插槽重构，不再把 header 假装塞进 body。
3. 在原生 title 层里补齐左侧 `18px / 600` 标题、底部 `3px` 深色下划线、右侧 `28px` 操作按钮。
4. 全屏状态改为作用在 modal/wrap 根层，避免只改 body 高度和页面继续上下滚动。
5. 右侧全屏按钮 hover 仅切换 `#E7EBF4` 圆角底与图标显隐，不再做位置抖动。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/modal/platform-modal.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformModal`
2. 当前会受影响的已接入页面：`/project/information`、`/personnel/overview`、`/project/overview`、`/project/evaluation`、`/battery/construction`、`/platform/typical-page`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/modal/platform-modal.vue`，通过。
2. 已执行 `git diff --check -- apps/web-antd/src/components/platform/modal/platform-modal.vue`，通过。
3. 已启动本地 Vite，`http://127.0.0.1:5173/project/information` 返回 `200 OK`。
4. 未完成隔离浏览器截图复核：当前先完成底层结构回退，仍需重新打开页面看标题层是否恢复正常。
5. 已在这轮重构后重新执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/modal/platform-modal.vue` 与 `git diff --check -- apps/web-antd/src/components/platform/modal/platform-modal.vue`，均通过。

### 遗留问题

1. 本轮已完成标题区结构和全屏交互下沉，但还未做真实页面的肉眼对稿，需要下一轮隔离浏览器确认标题垂直节奏、图标轮廓和全屏后内容滚动体验。
2. `PlatformDrawer` 仍保持旧壳，后续如果抽屉标题也要统一成同一套动作区，再单独评估是否同步平台化。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：默认 `Modal` 标题区不满足当前平台对“左标题 + 右功能按钮 + 全屏切换”的统一规范。
2. 已通过平台层解决的问题：标题字号、下划线、右侧按钮布局、全屏图标切换和关闭按钮图标已收口到 `PlatformModal`。
3. 哪些仍是页面临时实现：暂无新增，本轮未在业务页写局部 modal header 样式。
4. 哪些页面子组件未来必须回收为平台组件：后续如业务页仍手写弹窗标题操作区，应回收并统一复用 `PlatformModal` 的标题壳。
5. 后续新页面禁止继续复制哪些实现：不要在业务页面自写 modal header 的全屏按钮、关闭按钮和下划线标题。
6. 哪些样式应进入主题变量或统一样式入口：弹窗标题区内边距、标题字号、图标 hover 背景和全屏态尺寸继续由平台组件维护。
7. 当前仍存在的页面级样式债务：尚未验证是否有个别业务页通过局部 CSS 覆盖了 modal header，需后续视觉复核时一并检查。

### 任务名称

撤回平台表格金额列自动右对齐

### 完成内容

1. 根据视觉复核反馈，撤回 `PlatformTable` 中“金额语义列自动右对齐”的平台规则。
2. 原因是当前表格列宽、内边距和相邻列节奏下，金额列右对齐会带来明显的左侧留白过大、右侧贴近相邻列的问题，整体观感不佳。
3. 本轮先恢复为原来的左对齐，不继续追加金额列专属宽度或 padding 规则，避免把简单需求升级成更重的平台改造。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformTable`
2. 当前反馈页面：`/battery/construction`
3. 已恢复页面：所有原本会受到“金额自动右对齐”规则影响的 `PlatformTable` 表格页

### 验证结果

1. 已完成平台源组件代码级回退。
2. 本轮将执行目标文件 `git diff --check` 作为最小自检。
3. 未执行隔离浏览器截图复核；建议下次集中视觉验收时确认金额列已恢复左对齐，且表格列间距观感回到改动前状态。

### 遗留问题

1. 如果后续仍想优化金额列观感，建议改成“页面显式指定 + 列宽 / padding 一起调”的方案，而不是平台层默认自动右对齐。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无新增，主要是平台层自动右对齐在当前视觉体系下不适配。
2. 已通过平台层解决的问题：已撤回不合适的金额自动右对齐规则，恢复当前页面体系更稳定的左对齐表现。
3. 哪些仍是页面临时实现：无，本轮未在业务页面写金额列局部样式。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增。
5. 后续新页面禁止继续复制哪些实现：不要默认把所有金额列做平台自动右对齐，除非后续先把列宽、padding 和数字栅格方案一起定义清楚。
6. 哪些样式应进入主题变量或统一样式入口：当前暂不新增金额列全局对齐规则。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

施工管理查看弹窗改为 1200px 宽的左右分栏审批弹窗

### 完成内容

1. 将 `施工管理` 页面“查看”入口接入真实弹窗，弹窗宽度调整为 `1200px`。
2. 将右侧审批进度改为平台组件 `PlatformApprovalProgress`，默认/最小宽度调整为 `360px`，最大宽度保持 `720px`。
3. 为审批进度组件增加外部可配置 icon 能力，支持由数据源传入节点图标与头像图标。
4. 将右侧审批节点之间的垂直节奏收紧，第一、第二条审批之间的间距收成约 `20px`。
5. 给弹窗内容区补上整体大描边，左侧留白与右侧审批区统一包在同一个外框里。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/approval/platform-approval-progress.vue`
2. `apps/web-antd/src/components/platform/approval/types.ts`
3. `apps/web-antd/src/views/battery/construction/construction-source.ts`
4. `apps/web-antd/src/views/battery/construction/index.vue`
5. `docs/project-log.md`
6. `docs/todo-next.md`
7. `docs/decision-records.md`

### 涉及哪些页面或组件

1. 页面：`/battery/construction`
2. 平台组件：`PlatformApprovalProgress`
3. 平台弹窗：`PlatformModal`

### 验证结果

1. 已完成目标文件 ESLint 检查，通过。
2. 已完成目标文件 `git diff --check`，通过。
3. 已完成路由 HTTP 检查，`http://127.0.0.1:5173/battery/construction` 返回 `200 OK`。
4. 未执行隔离浏览器截图复核；当前先完成代码与文档同步。

### 遗留问题

1. 左侧空白区仍是结构占位，后续若要放流程图再按新截图补。
2. 右侧审批进度节点文案、图标和空态样式后续仍可能继续细调。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：审批进度的节点图标、头像和时间线间距需要统一收口。
2. 已通过平台层解决的问题：审批进度已沉淀为 `PlatformApprovalProgress`，业务页只负责传数据。
3. 哪些仍是页面临时实现：左右分栏、拖拽分隔线和左侧空白区仍在页面层。
4. 哪些页面子组件未来必须回收为平台组件：后续所有审批进度、审批详情类右侧时间线都应优先复用该平台组件。
5. 后续新页面禁止继续复制哪些实现：不要在业务页重新手写审批时间线、节点图标和头像布局。
6. 哪些样式应进入主题变量或统一样式入口：节点图标大小、头像背景、时间线间距继续由平台组件维护。
7. 当前仍存在的页面级样式债务：内容区大描边与左侧占位布局仍是页面层控制。

### 任务名称

`PlatformSegmented` 改造成 Ant segmented 风格平台组件

### 完成内容

1. 根据 `项目信息管理 - 新增项目` 弹窗反馈，复用现有 `PlatformSegmented`，将原来的“下划线式”切换改造成更接近 Ant Design Vue segmented 的“选中块”样式。
2. 统一调整平台分段控件交互：保留 Ant Design Vue segmented 的原生结构，只做轻量品牌化，选中态改为品牌绿底、白字；未选中项鼠标移入时文字变为品牌绿。
3. 为避免 Ant segmented 内部样式覆盖平台品牌色，本轮补充选中项和 hover 态的强制颜色覆盖，确保选中背景稳定为品牌绿、文本稳定为白色。
4. 本轮只修改平台源组件，不在 `/project/information` 页面写局部 segmented 样式覆盖。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/segmented/platform-segmented.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformSegmented`
2. 当前反馈页面：`/project/information`
3. 当前已定位接入场景：新增项目弹窗中的“基础信息 / 招采信息 / 进场信息”分段切换

### 验证结果

1. 已完成平台源组件代码级调整。
2. 本轮将执行目标文件 `git diff --check` 作为最小自检。
3. 未执行隔离浏览器截图复核；建议下次集中视觉验收时优先确认新增项目弹窗中的分段控件选中块高度、圆角和 hover 文本色。

### 遗留问题

1. 当前只统一了 `PlatformSegmented` 的品牌色、hover/selected 交互和 `14px` 字号；如果后续你还希望补充尺寸档位、全宽模式或 icon+text 组合态，再继续在平台组件层扩展。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：默认 segmented 表现与当前平台弹窗中的分段切换视觉不一致，需要平台层统一改造。
2. 已通过平台层解决的问题：`PlatformSegmented` 已从下划线式切换为品牌块状选中样式。
3. 哪些仍是页面临时实现：无，本轮未在业务页面写局部 segmented 样式。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增，本轮继续复用既有 `PlatformSegmented`。
5. 后续新页面禁止继续复制哪些实现：不要在单个弹窗或页面里重新手写 segmented 选中底色和 hover 文本色。
6. 哪些样式应进入主题变量或统一样式入口：分段控件的选中背景、文字色、边框和圆角继续由平台组件统一维护。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

施工管理查看弹窗改为 1024px 宽的左右分栏审批弹窗

### 完成内容

1. 将 `施工管理` 页面“查看”入口从占位消息改为真实弹窗，弹窗宽度统一为 `1024px`。
2. 左侧主内容区按要求预留空白，不再渲染红框区域内的流程内容。
3. 将右侧审批进度抽成平台组件 `PlatformApprovalProgress`，并通过 `ant-design-vue Timeline` 封装节点、状态、时间和审批人信息，便于后续统一修改。
4. 在弹窗中加入可拖拽分隔线，右侧审批进度宽度支持在 `440px` 到 `720px` 之间调整，默认值为 `440px`。
5. 为施工管理页面补充审批进度 mock 数据，完成查看详情的本地联调闭环。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/approval/platform-approval-progress.vue`
2. `apps/web-antd/src/components/platform/approval/index.ts`
3. `apps/web-antd/src/components/platform/approval/types.ts`
4. `apps/web-antd/src/components/platform/index.ts`
5. `apps/web-antd/src/views/battery/construction/construction-source.ts`
6. `apps/web-antd/src/views/battery/construction/index.vue`
7. `docs/project-log.md`
8. `docs/todo-next.md`
9. `docs/decision-records.md`

### 涉及哪些页面或组件

1. 页面：`/battery/construction`
2. 平台组件：`PlatformApprovalProgress`
3. 平台弹窗：`PlatformModal`
4. 平台表格与查询区：`PlatformTable`、`PlatformQueryPanel`

### 验证结果

1. 已完成目标文件 ESLint 检查，通过。
2. 已执行目标文件 `git diff --check`，通过。
3. 已完成路由 HTTP 检查：`http://127.0.0.1:5173/battery/construction` 返回 `200 OK`。
4. 未执行隔离浏览器截图复核；本轮已先保证代码级联通与本地路由可达。

### 遗留问题

1. 左侧空白区当前只保留结构占位，后续若要放流程图或业务摘要，再按新的截图继续补。
2. 右侧审批进度当前为平台化通用壳，后续如果要支持更多节点样式或交互，再继续扩展组件 API。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：审批进度需要统一时间线、节点状态和头像/标识展示，单页手写会重复造轮子。
2. 已通过平台层解决的问题：审批进度已下沉为平台组件，施工管理页仅负责传入数据和宽度控制。
3. 哪些仍是页面临时实现：左右分栏、拖拽分隔线和左侧空白占位仍保留在页面层。
4. 哪些页面子组件未来必须回收为平台组件：后续所有审批进度、审批详情类右侧时间线，应优先复用 `PlatformApprovalProgress`。
5. 后续新页面禁止继续复制哪些实现：不要在业务页重新手写右侧审批时间线、节点圆点和状态文本布局。
6. 哪些样式应进入主题变量或统一样式入口：审批节点颜色、时间线间距、标题字号和头像背景后续继续从平台组件与 token 收口。
7. 当前仍存在的页面级样式债务：页面层仍有拖拽分栏样式和空白区域布局，需要按后续截图继续细化。

### 任务名称

项目信息管理与人员总览移除顶部筛选区

### 完成内容

1. 删除 `/project/information` 与 `/personnel/overview` 顶部 `PlatformQueryPanel` 筛选区，当前先只保留工具栏搜索与表格表头筛选。
2. 保持两页表格列筛选、关键字搜索、刷新和新增/编辑弹窗逻辑不变，不额外调整数据源或页面布局策略。
3. 同步清理两个页面中仅用于顶部筛选区的 `PlatformQueryPanel` 引用与 `queryCollapsed` 无用状态，避免残留死代码。
4. 本轮只处理页面接入层，不修改 `PlatformQueryPanel` 平台源组件，也不把当前方案直接上升为长期规范。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/information/index.vue`
2. `apps/web-antd/src/views/personnel/overview/index.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/information`
2. 页面：`/personnel/overview`
3. 保留的平台能力：`PlatformTable` 表头筛选、`PlatformTableToolbar` 搜索与通用工具

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/information/index.vue apps/web-antd/src/views/personnel/overview/index.vue`，结果通过。
2. 已执行 `git diff --check -- apps/web-antd/src/views/project/information/index.vue apps/web-antd/src/views/personnel/overview/index.vue docs/project-log.md docs/todo-next.md`，结果通过。
3. 本轮未做隔离浏览器截图复核；需要后续在 `/project/information` 与 `/personnel/overview` 肉眼确认顶部筛选区已移除，且表头筛选与关键字搜索仍符合预期。

### 遗留问题

1. 当前这两个页面只是临时收口为“工具栏搜索 + 表头筛选 + 表格”结构，是否作为常规列表页最终规范仍待确认。
2. 后续如果客户方向明确，仍需回到典型页面整理“常规表格列表页规范”。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，本轮是页面层筛选方案取舍，不是原生组件缺陷修复。
2. 已通过平台层解决的问题：无，本轮未修改平台组件源头。
3. 哪些仍是页面临时实现：`/project/information` 与 `/personnel/overview` 当前只保留表头筛选，属于页面级临时方案收口，尚未上升为平台标准。
4. 哪些页面子组件未来必须回收为平台组件：无新增；待常规列表页规范确认后，再决定是否继续推广 `PlatformQueryPanel`。
5. 后续新页面禁止继续复制哪些实现：在筛选规范未定前，不要默认同时叠加顶部查询区和表头筛选两套方案。
6. 哪些样式应进入主题变量或统一样式入口：无新增，本轮未产生新的样式 token 诉求。
7. 当前仍存在的页面级样式债务：常规表格列表页筛选结构仍未统一，后续需在典型页面层补一版明确规范。

### 任务名称

合同与付款管理付款节点金额上移到进度条上方

### 完成内容

1. 根据最新原型反馈，调整 `/project/contract` 付款节点 mini bar 的金额行结构，将每段金额移动到彩色进度条正上方。
2. 让金额行与下方三段节点说明继续共用同一套三列布局，保证金额自动对应绿色、橙色、灰色区块并左右居中。
3. 将金额字号统一改为 `18px`，保留现有加粗风格；本轮不改 ECharts 进度条本体，也不扩散到平台组件层。
4. 根据浏览器批注继续收口：删除下方重复金额，仅保留顶部金额；同时把顶部金额到底部彩色进度条的间距精确收成 `6px`。
5. 根据最新浏览器 DevTools 标注继续微调：删除金额行的 `margin-bottom: 6px`，将下方节点列间距从 `8px` 收成 `4px`，并把付款节点区底部内边距从 `22px` 调整为 `16px`。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/contract/components/contract-payment-mini-bar.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/contract`
2. 页面业务组件：`ContractPaymentMiniBar`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/contract/components/contract-payment-mini-bar.vue`，结果通过。
2. 已执行 `git diff --check -- apps/web-antd/src/views/project/contract/components/contract-payment-mini-bar.vue docs/project-log.md docs/todo-next.md`，结果通过。
3. 本轮未做隔离浏览器截图复核；需要在 `/project/contract` 页面肉眼确认金额与色块的居中关系、节点标题与状态的 `4px` 垂直间距，以及付款节点区底部 `16px` 留白观感。

### 遗留问题

1. 当前金额与节点说明已经对齐到统一三列，但仍需你在页面里确认中间 `40%` 段在真实卡片宽度下是否足够舒展。
2. 当前下方只保留状态文案，如果后续你希望状态与标题之间再压缩或拉开，再继续按页面组件微调。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于合同付款业务组件内部排版调整。
2. 已通过平台层解决的问题：无，本轮未修改平台组件和全局样式入口。
3. 哪些仍是页面临时实现：`ContractPaymentMiniBar` 仍是 `/project/contract` 页面专用组件，金额、节点标题和状态文案继续由页面业务组件维护。
4. 哪些页面子组件未来必须回收为平台组件：如果后续出现第二个“分段进度条 + 分段金额 + 节点状态”场景，再评估沉淀统一节点进度组件。
5. 后续新页面禁止继续复制哪些实现：不要在其他页面直接复制当前付款节点金额行 DOM；先判断是否需要平台化。
6. 哪些样式应进入主题变量或统一样式入口：当前 `18px` 金额字号和对应排版还属于合同付款业务语义，暂不进入平台 token。
7. 当前仍存在的页面级样式债务：付款节点三列节奏、金额与标题间距、状态文案层级仍在页面业务组件内维护。

### 任务名称

平台表格底部分页上间距统一为 `24px`

### 完成内容

1. 根据表格分页截图反馈，在全局 Ant Design Vue 样式入口中为“表格底部分页”单独补充边距规则。
2. 将 `.ant-table-wrapper .ant-table-pagination.ant-pagination` 的 `margin` 统一改为 `24px 0 0`，即距离表格内容上方 `24px`、距离下方 `0px`。
3. 本轮不修改业务页面和单页 scoped CSS，只调整平台通用样式源头。

### 修改了哪些文件

1. `packages/styles/src/antd/index.css`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 全局 Ant Design Vue 表格样式入口：`packages/styles/src/antd/index.css`
2. 当前反馈页面：`/personnel/overview`
3. 已同步受影响页面：所有使用 Ant Design Vue 表格底部分页的页面

### 验证结果

1. 已完成全局样式代码级调整。
2. 本轮将执行目标文件 `git diff --check` 作为最小自检。
3. 未执行隔离浏览器截图复核；建议下次集中视觉验收时顺手确认分页与表格底部的间距是否为 `24px`。

### 遗留问题

1. 当前只统一了 Ant Design Vue 表格分页的上下边距；如果后续你希望普通独立分页组件也使用同样节奏，再单独评估是否扩展到非表格场景。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：表格底部分页默认边距不符合当前平台节奏，需要平台层统一覆写。
2. 已通过平台层解决的问题：所有 Ant 表格底部分页统一改为上 `24px`、下 `0px`。
3. 哪些仍是页面临时实现：无，本轮未在业务页面写局部分页边距覆盖。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增，本轮继续复用全局样式入口。
5. 后续新页面禁止继续复制哪些实现：不要在单个表格页面重新写分页 `margin-top`。
6. 哪些样式应进入主题变量或统一样式入口：表格分页与表格内容区的垂直间距继续由全局 Ant 样式入口统一维护。
7. 当前仍存在的页面级样式债务：无新增。

### 任务名称

平台表格 hover 背景统一为 `#F3F4FA`

### 完成内容

1. 根据 `人员总览` 表格操作列截图反馈，将平台表格行 hover 背景统一调整为 `#F3F4FA`。
2. 同步修正 `PlatformTable` 右侧固定操作列 hover 背景，避免普通列与固定列在移入时出现两种不同底色。
3. 保持表格选中态仍沿用原有品牌浅绿色，避免本轮 hover 调整误伤已存在的选中反馈。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table.vue`
2. `packages/styles/src/antd/index.css`
3. `packages/@core/base/design/src/design-tokens/default.css`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformTable`
2. 全局 Ant Design Vue 表格样式入口：`packages/styles/src/antd/index.css`
3. 当前反馈页面：`/personnel/overview`
4. 已同步受影响页面：所有接入 `PlatformTable` 且包含固定列/操作列的业务表格页

### 验证结果

1. 已完成平台源组件和全局表格样式代码级调整。
2. 已执行目标文件 `git diff --check`：通过。
3. 未执行隔离浏览器截图复核；建议下次集中视觉验收时优先复核 `/personnel/overview` 的普通行与右侧固定操作列 hover 是否完全同色。

### 遗留问题

1. 当前只统一了 Ant Design Vue 平台表格 hover 色；Vxe 表格仍沿用既有 hover 变量，若你后续希望两套表格完全一致，再单独评估是否同步收口。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：原生表格普通列与固定列 hover 背景需要平台层额外统一。
2. 已通过平台层解决的问题：`PlatformTable` 普通行与右侧固定操作列 hover 背景已统一为 `#F3F4FA`。
3. 哪些仍是页面临时实现：无，本轮未在业务页面写局部覆盖。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增，本轮继续复用既有 `PlatformTable`。
5. 后续新页面禁止继续复制哪些实现：不要在单个页面给操作列或固定列单独补 hover 背景色。
6. 哪些样式应进入主题变量或统一样式入口：表格 hover 背景色继续由设计 token 与平台表格样式入口统一维护。
7. 当前仍存在的页面级样式债务：无新增，本轮改动已回收到平台源头与全局样式入口。

### 任务名称

人员档案管理卡片去除静态描边

### 完成内容

1. 根据截图反馈，删除 `/platform/typical-page` 人员档案管理卡片默认态的灰色边框，不再使用 `border: 1px solid hsl(var(--border));`。
2. 本轮继续保持改动只落在页面私有卡片组件，不扩散到平台组件源头。

### 修改了哪些文件

1. `apps/web-antd/src/views/platform/typical-page/components/personnel-archive-card.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 页面业务组件：`personnel-archive-card.vue`
3. 平台组件引用：`PlatformStatusTag`（未改源组件）

### 验证结果

1. 已完成代码级定位与样式调整。
2. 本轮将执行目标文件 `git diff --check` 作为最小自检。
3. 未执行隔离浏览器截图复核；建议与你后续下一条视觉反馈一起复核卡片无边框观感。

### 遗留问题

1. 人员档案卡片当前已去掉 hover 描边和默认静态描边；若后续还要继续收口阴影强度、圆角或内边距，可继续在该私有组件中调整。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无。
2. 已通过平台层解决的问题：无，本轮未修改平台组件源头。
3. 哪些仍是页面临时实现：人员档案卡片仍是典型页私有卡片结构，边框、阴影和布局节奏都在页面组件内维护。
4. 哪些页面子组件未来必须回收为平台组件：如后续多个页面复用同类“人员实体卡片”，再评估沉淀统一实体卡片壳。
5. 后续新页面禁止继续复制哪些实现：不要在该卡片上重新补回默认描边，除非后续确认属于统一平台视觉。
6. 哪些样式应进入主题变量或统一样式入口：当前未达到进入 token 或平台组件入口的复用强度。
7. 当前仍存在的页面级样式债务：人员档案卡片的头像块、标签节奏、阴影和布局仍在页面私有组件中。

### 任务名称

PlatformStatCard 去除灰色描边

### 完成内容

1. 根据 `人员总览` 截图反馈，删除 `PlatformStatCard` 源组件中的灰色边框定义，不再使用 `border: 1px solid hsl(var(--st-color-stat-card-border));`。
2. 本轮按平台层收口统计卡视觉，避免只在 `人员总览` 页面写局部覆盖，保持所有已接入统计卡页面风格一致。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/stat/platform-stat-card.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformStatCard`
2. 页面：`/personnel/overview`
3. 已同步受影响页面：`/personnel/qualification`、`/personnel/worktime`、`/personnel/turnover`、`/project/overview`、`/project/evaluation`、`/project/contract`、`/project/document`

### 验证结果

1. 已完成平台源组件代码级调整。
2. 本轮将执行目标文件 `git diff --check` 作为最小自检。
3. 未执行隔离浏览器截图复核；建议下次集中视觉验收时一并检查各统计卡页面。

### 遗留问题

1. 统计卡当前仍保留阴影和顶部色条；如果你后续还想继续收口为更纯净的卡片风格，可以继续在 `PlatformStatCard` 源组件统一调整。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于平台统计卡视觉样式收口。
2. 已通过平台层解决的问题：统计卡灰色描边已从平台源组件统一移除。
3. 哪些仍是页面临时实现：各页面统计卡的数量、文案、图标和色彩类型仍由页面配置传入。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增，本轮继续复用既有 `PlatformStatCard`。
5. 后续新页面禁止继续复制哪些实现：不要在单个页面重新补回统计卡边框，若需恢复应重新评估是否属于平台统一视觉。
6. 哪些样式应进入主题变量或统一样式入口：统计卡背景、阴影、顶部色条和圆角继续保留在平台组件与设计 token 体系内。
7. 当前仍存在的页面级样式债务：个别业务页统计区布局间距仍在页面层维护，但卡片本体已继续收口到平台组件。

### 任务名称

人员档案管理卡片 hover 去除描边变色

### 完成内容

1. 根据截图反馈，调整 `/platform/typical-page` 人员档案管理卡片的 hover 交互，只保留上移和阴影，不再出现边框变色。
2. 将鼠标 hover 与键盘 `focus-visible` 状态拆开处理，避免为了满足视觉要求误删键盘可访问性提示。

### 修改了哪些文件

1. `apps/web-antd/src/views/platform/typical-page/components/personnel-archive-card.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 页面业务组件：`personnel-archive-card.vue`
3. 平台组件引用：`PlatformStatusTag`（未改源组件）

### 验证结果

1. 已完成代码级定位与样式调整。
2. 已执行目标文件 `git diff --check`：通过。
3. 未执行隔离浏览器截图复核；本轮为低风险 hover 样式修正，建议与你后续下一条视觉反馈一起复核。

### 遗留问题

1. 当前只去掉了 hover 描边变色；键盘焦点态仍保留 outline，若后续有统一的无障碍视觉规范，再统一处理。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无。
2. 已通过平台层解决的问题：无，本轮未修改平台组件源头。
3. 哪些仍是页面临时实现：人员档案管理卡片仍是典型页私有卡片结构，hover 节奏由页面组件维护。
4. 哪些页面子组件未来必须回收为平台组件：如后续多个页面复用同类“人员实体卡片”，再评估沉淀统一实体卡片壳。
5. 后续新页面禁止继续复制哪些实现：不要在 hover 上追加品牌描边，卡片类默认只保留上移反馈。
6. 哪些样式应进入主题变量或统一样式入口：当前未达到进入 token 或平台组件入口的复用强度。
7. 当前仍存在的页面级样式债务：人员档案卡片的布局、头像块和标签节奏仍在页面私有组件中。

### 任务名称

中期评估与验收页待评估项目按钮纵向对齐微调

### 完成内容

1. 根据截图反馈，仅在 `/project/evaluation` 待评估项目卡片场景中，将“发起评估”按钮整体下移 `6px`。
2. 本轮未修改 `PlatformTaskCard` 平台源组件，只处理评估页业务卡片头部的局部对齐，避免影响其他页面共用卡片。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/evaluation/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/evaluation`
2. 页面场景：待评估项目卡片头部操作按钮
3. 平台组件引用：`PlatformTaskCard`（仅页面侧微调，未改源组件）

### 验证结果

1. 本轮完成代码级定位与页面 scoped CSS 微调。
2. 未执行浏览器截图复核与类型检查；当前改动仅为 `margin-top` 级别的低风险样式调整，建议与下一条视觉反馈一并做隔离浏览器复核。

### 遗留问题

1. 当前按钮下移量按截图先调整为 `6px`；如你后续看页面仍觉得偏上或偏下，可以继续在当前页面局部微调，不需要升级为平台组件改造。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无。
2. 已通过平台层解决的问题：无，本轮不涉及平台层。
3. 哪些仍是页面临时实现：待评估项目卡片按钮纵向对齐仍属于评估页私有视觉校准。
4. 哪些页面子组件未来必须回收为平台组件：暂无新增。
5. 后续新页面禁止继续复制哪些实现：不要把单页对齐问题直接改进 `PlatformTaskCard` 源组件，除非多个页面都出现同类偏差。
6. 哪些样式应进入主题变量或统一样式入口：当前不需要。
7. 当前仍存在的页面级样式债务：评估页卡片头部按钮对齐仍由页面 scoped CSS 管理。

### 任务名称

平台治理收尾：查询面板迁移、任务卡沉淀与演示目录清理

### 本次目标

1. 完成系统复查后剩余的 `PlatformQueryPanel` 存量迁移、卡片能力沉淀和废弃演示目录清理。
2. 明确表格工具栏职责：业务按钮放左侧，搜索、刷新、设置、全屏作为右侧标准工具保留。
3. 同步项目日志、待办、页面组件映射和长期决策，避免下轮接续时继续按旧状态判断。

### 完成内容

1. 将 `/project/information`、`/personnel/overview` 的结构化筛选区迁移到 `PlatformQueryPanel`，保留关键词搜索在 `PlatformTableToolbar`。
2. 新增 `PlatformTaskCard` 平台任务卡能力，并在 `/project/evaluation` 待评估项目卡片中接入，统一标题、描述、标签、截止信息、进度条和操作按钮。
3. 修正 `/project/evaluation` 两个表格工具栏的工具配置，恢复 `search / refresh / setting / fullscreen` 四个右侧标准工具。
4. 删除废弃目录 `apps/web-antd/src/views/演示使用自行删除/`，不处理仍可能被路由使用的 `/views/demo`。
5. 更新 `docs/page-component-mapping.md`，把 `PlatformQueryPanel`、`PlatformTaskCard` 和演示目录清理状态同步为当前事实。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/index.ts`
2. `apps/web-antd/src/components/platform/task-card/index.ts`
3. `apps/web-antd/src/components/platform/task-card/platform-task-card.vue`
4. `apps/web-antd/src/components/platform/task-card/types.ts`
5. `apps/web-antd/src/views/project/evaluation/index.vue`
6. `apps/web-antd/src/views/project/information/index.vue`
7. `apps/web-antd/src/views/personnel/overview/index.vue`
8. `apps/web-antd/src/views/演示使用自行删除/`
9. `docs/page-component-mapping.md`
10. `docs/project-log.md`
11. `docs/todo-next.md`
12. `docs/decision-records.md`

### 新增组件

1. `PlatformTaskCard`：平台任务卡，适用于“标题 + 描述 + 状态标签 + 元信息 + 进度 + 主操作”的任务 / 待办卡片场景。

### 关键决策

1. `PlatformQueryPanel` 只承载结构化筛选字段、查询、重置和折叠能力；关键词搜索继续放在 `PlatformTableToolbar`。
2. `PlatformTableToolbar` 的右侧标准工具应包含 `search / refresh / setting / fullscreen`，不能把搜索误删为筛选区能力。
3. `PlatformTaskCard` 只沉淀任务卡公共壳和节奏，不承接所有业务卡片；页面仍负责左右分栏、固定宽度等布局。
4. 废弃中文演示目录已删除；仍可能被路由引用的 `/views/demo` 不在本轮清理范围内。

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I` 路由检查：`/project/evaluation`、`/project/information`、`/personnel/overview` 均返回 `200 OK`。
4. 未执行全量 `vue-tsc`：项目仍有既有存量类型错误，本轮以目标文件 ESLint 和路由检查作为收尾验收。

### 遗留问题

1. `/personnel/worktime` 超工时预警卡、`/platform/typical-page` 人员档案卡仍为页面私有结构，后续继续观察是否需要沉淀为平台卡片能力。
2. 更多查询列表页是否适合迁移到 `PlatformQueryPanel` 仍需逐页判断，不能批量替换。
3. 当前工作区仍存在与本轮无关的既有修改和未跟踪资源文件，收尾时不得混入无关回滚或提交。

### 下一步建议

1. 本轮目标文件 ESLint、`git diff --check` 和三条关键路由检查已完成；后续按用户下一条视觉反馈继续处理。
2. 后续继续治理卡片能力时，从 `/personnel/worktime` 与 `/platform/typical-page` 观察稳定共性，不要为了单页视觉继续新增平台组件。
3. 后续清理无效内容时，先查路由引用，再决定是否处理 `/views/demo` 或其他示例资源。

### 阶段验收结论

本阶段代码侧剩余任务已基本收口：`PlatformQueryPanel` 存量迁移、任务卡平台能力沉淀、废弃演示目录清理均已完成；当前只剩验证与文档同步闭环，不建议继续追加新开发范围。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无新增原生组件缺陷，主要是平台组件职责边界需要收紧。
2. 已通过平台层解决的问题：查询面板结构、任务卡公共壳、表格工具栏标准工具配置已回到平台组件体系。
3. 仍是页面临时实现的问题：左右分栏宽度、人员卡和工时预警卡仍由页面 scoped CSS 维护。
4. 哪些页面子组件未来必须回收为平台组件：如人员档案卡、超工时预警卡继续出现稳定共性，再评估 `PlatformEntityCard` 或 `PlatformAlertCard`。
5. 后续新页面禁止继续复制哪些实现：不要把关键词搜索塞进查询面板，也不要删除表格工具栏搜索按钮。
6. 哪些样式应进入主题变量或统一样式入口：任务卡内边距、标题字号、状态标签和进度节奏已由 `PlatformTaskCard` 组件变量承接。
7. 当前仍存在的页面级样式债务：部分业务卡片、业务单元格和动态明细行仍在页面层。

### 任务名称

中期评估与验收页左右区块宽度与卡片间距治理

### 完成内容

1. 将 `/project/evaluation` 的左右工作区调整为“左侧待评估项目固定宽度，右侧评估记录自适应剩余空间”的布局。
2. 为待评估项目卡片补充页面级局部变量，统一收口固定宽度、标题字号、常规区块间距和截止时间到进度条的间距。
3. 将待评估项目标题调整为 `16px`，并把标题区、标签区、截止时间区的垂直节奏收紧到 `8px`，截止时间到底部进度条调整为 `4px`。
4. 保持本轮修改只落在页面布局和页面私有卡片样式层，不新增平台组件，也不扩散到全局 token。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/evaluation/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/evaluation`
2. 页面业务卡片：待评估项目卡片
3. 页面业务布局：左右工作区

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/project/evaluation`：返回 `200 OK`。
4. 已使用系统 Chrome headless 临时会话完成隔离截图验证，未接管用户当前 Chrome；确认左侧待评估区固定宽度生效，右侧评估记录表格随剩余空间自适应展开。

### 遗留问题

1. 右侧评估记录表格虽然已获得更多横向空间，但当前列配置仍偏紧，后续若继续压缩浏览器宽度，仍可能需要进一步微调列宽或响应式策略。
2. 待评估项目卡片仍是页面业务结构，后续如果更多页面出现同类“标题 + 状态标签 + 截止时间 + 进度条”卡片，再评估是否沉淀为平台卡片能力。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，主要是业务页左右区块比例和业务卡片内部节奏不合理。
2. 已通过平台层解决的问题：无，本轮不新增平台能力，仍保持在页面布局层治理。
3. 仍是页面临时实现的问题：待评估项目卡片的字号、节奏和固定宽度仍是该页面私有结构。
4. 哪些页面子组件未来必须回收为平台组件：若后续多页复用相同评估任务卡片，可评估沉淀统一任务卡片壳。
5. 后续新页面禁止继续复制哪些实现：不要再为窄右栏强塞表格，先判断左右分栏比例是否合理。
6. 哪些样式应进入主题变量或统一样式入口：当前只抽到页面局部变量，尚未达到进入全局 token 的复用强度。
7. 当前仍存在的页面级样式债务：评估页左右区块与卡片节奏仍由页面 scoped CSS 维护，后续如同类场景增多需再统一。

### 任务名称

已开发页面与平台组件复查后的第一批治理

### 完成内容

1. 根据系统复查结果，先做低风险治理，不新增平台组件、不迁移查询面板、不删除演示目录。
2. 将 `/platform/typical-page`、`/personnel/qualification`、`/personnel/worktime` 的手写页面头部统一替换为 `PlatformViewToolbar`。
3. 补齐 `/workbench/index` 项目总览弹窗与 `/project/evaluation` 发起评估弹窗中缺失的业务化 placeholder。
4. 修复 `PlatformViewToolbar` 内部工具按钮 `emit(tool.key)` 的 TypeScript 收窄问题，改为显式事件分发，不改变视觉和交互。
5. 重写 `docs/page-component-mapping.md`，补齐当前已开发页面的组件映射、已沉淀平台能力、暂留页面层内容和后续整理项。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/view/platform-view-toolbar.vue`
2. `apps/web-antd/src/views/platform/typical-page/index.vue`
3. `apps/web-antd/src/views/personnel/qualification/index.vue`
4. `apps/web-antd/src/views/personnel/worktime/index.vue`
5. `apps/web-antd/src/views/project/overview/index.vue`
6. `apps/web-antd/src/views/project/evaluation/index.vue`
7. `docs/page-component-mapping.md`
8. `docs/project-log.md`
9. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformViewToolbar`
2. 页面：`/platform/typical-page`
3. 页面：`/personnel/qualification`
4. 页面：`/personnel/worktime`
5. 页面：`/workbench/index`
6. 页面：`/project/evaluation`
7. 文档：页面组件映射表

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `vue-tsc --noEmit --skipLibCheck --project apps/web-antd/tsconfig.json`：仍失败，但本轮已修复 `PlatformViewToolbar` 类型错误；剩余错误集中在 `tenant-toggle`、`tinymce`、`tree-select-panel`、`utils/http`、`personnel/turnover`、`workflow`、`演示使用自行删除` 和 `code-mirror` 等既有范围。
4. 已执行 `curl -I` 路由检查：`/platform/typical-page`、`/personnel/qualification`、`/personnel/worktime`、`/workbench/index`、`/project/evaluation` 均返回 `200 OK`。
5. 已使用系统 Chrome headless 临时会话完成隔离视觉验证，未接管用户当前 Chrome：三处统一头部页面可正常进入，`/workbench/index` 新建项目弹窗与 `/project/evaluation` 发起评估弹窗的业务化 placeholder 均已抓取确认。

### 遗留问题

1. `PlatformQueryPanel` 仍只在 `/battery/construction` 接入，存量查询列表页尚未迁移。
2. 工时预警卡、待评估项目卡、人员档案卡仍是页面级结构，尚未抽成平台卡片能力。
3. `apps/web-antd/src/views/演示使用自行删除/` 仍未删除，需用户确认清理范围后再处理。
4. 全量 `vue-tsc` 仍存在存量错误，其中 `/personnel/turnover` 的 `x/y` 可能为 `undefined` 可作为下一轮小修项之一。
5. 隔离截图发现 `/project/evaluation` 右侧“评估记录”窄卡片内表格信息仍有横向挤压风险，建议后续结合 `PlatformTable` 列宽、横向滚动或左右栏比例专项处理。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无新增原生组件视觉问题，主要是平台头部组件 TypeScript 事件分发问题和业务页未统一复用平台头部。
2. 已通过平台层解决的问题：`PlatformViewToolbar` 工具按钮事件分发已改为显式分支，消除平台组件自身类型错误。
3. 仍是页面临时实现的问题：卡片壳、指标块、实体单元格、动态明细行、图表 option 工厂仍暂留页面层。
4. 哪些页面子组件未来必须回收为平台组件：`/personnel/worktime` 超工时预警卡、`/project/evaluation` 待评估项目卡、`/platform/typical-page` 人员档案卡可优先评估统一卡片壳。
5. 后续新页面禁止继续复制哪些实现：不要继续复制手写页面 header；二级页面标题区默认使用 `PlatformViewToolbar`。
6. 哪些样式应进入主题变量或统一样式入口：本轮未新增 token；后续卡片壳、指标块、实体单元格如复用稳定，应进入平台组件或公共 class。
7. 当前仍存在的页面级样式债务：工时页、评估页、人员档案页仍有较多业务卡片 CSS，后续需要专项治理。

## 2026-05-08

### 任务名称

变动与流失率统计 hover 高亮与右侧数据列二次校准

### 完成内容

1. 继续修正 `/personnel/turnover` “各承包商流失率” 图表：将 tooltip 的 `axisPointer` 阴影改为极淡灰色，避免鼠标移入整行背景过重。
2. 为 tooltip 增加 `confine` 和自定义 `position`，让提示层尽量停在柱图区左侧，不再遮住右侧 `流失率（离职/总数）` 数据列。
3. 将图表 `grid.right` 扩大到 `168`，并把右侧 `yAxis` 标签改为左对齐、增加 `width` 与 `margin`，补足右侧数据显示空间。
4. 抽出右侧标签格式化函数，保持 `33.3%（1/3）` 一类文案在图表配置内统一生成，避免后续重复手写。

### 修改了哪些文件

1. `apps/web-antd/src/views/personnel/turnover/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/personnel/turnover`
2. 平台组件容器：`PlatformEchartsPanel`
3. 页面业务图表：各承包商流失率 ECharts 配置

### 验证结果

1. 已执行 `curl -I http://127.0.0.1:5173/personnel/turnover`：返回 `200 OK`。
2. 未完成隔离浏览器视觉验证：需继续肉眼确认 hover 灰底已明显变淡，且右侧 `33.3%（1/3）` 数据列完整可读、不再被 tooltip 遮挡。

### 遗留问题

1. 如后续承包商名称或右侧文案继续变长，仍可能需要再平衡左右标签区与柱图区比例。
2. 当前图表 tooltip 位置按现有布局做了避让，若后续卡片宽度大改，仍需再复核提示层落点。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于页面业务图表交互高亮和标签留白校准。
2. 已通过平台层解决的问题：无，本轮仍只收敛在 `/personnel/turnover` 页面图表配置。
3. 仍是页面临时实现的问题：hover 阴影强度、tooltip 避让和右侧标签宽度仍写在页面内，尚未抽象为平台级排行图表方案。
4. 哪些页面子组件未来必须回收为平台组件：若后续多个页面都使用“左侧排名 + 中间横条 + 右侧统计值”图表，再评估沉淀统一 option 工厂或平台图表组件。
5. 后续新页面禁止继续复制哪些实现：不要直接复制旧版 `grid.right: 16` 或默认 shadow axisPointer 的排行条形图配置。
6. 哪些样式应进入主题变量或统一样式入口：当前 hover 阴影和 tooltip 避让仍偏页面业务配置，暂不进入全局 token。
7. 当前仍存在的页面级样式债务：右侧数据列宽度仍与当前卡片宽度耦合，后续窄屏场景需要继续抽查。

### 任务名称

项目信息管理新建项目弹窗与分段控件纠偏

### 完成内容

1. 将 `PlatformSegmented` 源组件调整为默认居中布局，字号统一为 `16px`，非选中项 hover 不再出现灰底或颜色漂移。
2. 将 `/project/information` 新建项目弹窗宽度从 `1120px` 调整为 `720px`，并为三段表单区补充统一最小高度，减少基础信息、招采信息、进场信息切换时的弹窗跳动。
3. 将进场信息中的“人员配置 / 设备清单”从静态输入行改为可动态增删的表单列表，点击 `+` 后会新增一行输入。
4. 保留现有 mock 数据存储结构，在页面保存时将动态行序列化回 `staffing` 和 `equipmentList` 字符串，避免扩大数据模型改造范围。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/segmented/platform-segmented.vue`
2. `apps/web-antd/src/views/project/information/index.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformSegmented`
2. 页面：`/project/information`
3. 页面业务弹窗：新建项目 / 编辑项目弹窗

### 验证结果

1. 已执行 `git diff --check`：通过。
2. 已执行 `curl -I http://127.0.0.1:5173/project/information`：返回 `200 OK`。
3. 未完成隔离浏览器视觉验证：需继续确认分段控件居中、16px 字号、hover 态以及弹窗 720px 宽度是否符合设计预期。
4. 未完成真实交互回归：需在浏览器里手动点击“进场信息”的 `+` 按钮，确认新增行与保存流程观感正常。

### 遗留问题

1. 需要确认 `PlatformSegmented` 居中后的全局影响是否符合其他已接入页面预期。
2. 当前动态行仍以字符串形式写回 mock 数据，后续若要接真实接口，可再升级为结构化字段。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于平台分段控件默认样式策略和页面弹窗业务逻辑缺失。
2. 已通过平台层解决的问题：分段控件默认居中、字号和 hover 交互已回到 `PlatformSegmented` 源组件统一维护。
3. 仍是页面临时实现的问题：进场信息动态行和表单内容稳高仍由 `/project/information` 页面自行维护。
4. 哪些页面子组件未来必须回收为平台组件：若后续更多页面出现“分段表单 + 动态增删明细行”模式，可再评估沉淀页面级表单壳。
5. 后续新页面禁止继续复制哪些实现：不要再在业务页里手写分段控件居中补丁或静态假 `+` 按钮。
6. 哪些样式应进入主题变量或统一样式入口：分段控件字号和 hover 规则已进入平台源组件，本轮无新增 token。
7. 当前仍存在的页面级样式债务：弹窗段落稳高与动态行栅格宽度仍是该页面定制。

### 任务名称

项目总览表格操作列移除详情按钮

### 完成内容

1. 将 `/project/overview` 表格操作列中的“详情”按钮移除。
2. 保留项目名称点击打开详情抽屉的交互入口，避免与右侧操作列重复。
3. 本轮只调整页面业务操作列，不改平台表格、操作列组件或详情抽屉逻辑。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/overview/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/overview`
2. 页面业务表格：项目总览列表

### 验证结果

1. 已执行 `git diff --check`：通过。
2. 未完成隔离浏览器视觉验证：需在 `/project/overview` 页面确认操作列已只保留“编辑 / 归档 / 删除”，并确认标题点击详情仍正常。

### 遗留问题

1. 需要确认移除“详情”后，操作列宽度和间距是否更符合预期。
2. 如后续详情入口统一收敛到标题点击，其他同类页面也可按相同规则继续整理。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于业务页操作入口去重。
2. 已通过平台层解决的问题：无，本轮不涉及平台层。
3. 仍是页面临时实现的问题：详情入口仍由标题链接和页面详情抽屉自行维护。
4. 哪些页面子组件未来必须回收为平台组件：若后续需要统一“标题可点击时操作列不再放详情”的规则，可再评估沉淀到页面规范。
5. 后续新页面禁止继续复制哪些实现：已有标题点击详情入口的表格，不要再额外重复放“详情”按钮。
6. 哪些样式应进入主题变量或统一样式入口：本轮无新增 token 或全局样式诉求。
7. 当前仍存在的页面级样式债务：项目总览操作列的业务判断仍写在页面内。

### 任务名称

变动与流失率统计右侧标签裁切修正

### 完成内容

1. 定位 `/personnel/turnover` “各承包商流失率”右侧数据未显示完整的原因：ECharts 右侧 `yAxis` 标签留白不足。
2. 将该图表的 `grid.right` 从 `16` 调整为 `132`，并为右轴标签补充固定宽度，确保 `流失率%（离职/总数）` 能完整显示。
3. 本轮只调整页面业务图表配置，不改 `PlatformEchartsPanel` 或全局图表主题。

### 修改了哪些文件

1. `apps/web-antd/src/views/personnel/turnover/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/personnel/turnover`
2. 平台组件容器：`PlatformEchartsPanel`
3. 页面业务图表：各承包商流失率 ECharts 配置

### 验证结果

1. 已执行 `git diff --check`：通过。
2. 未完成隔离浏览器视觉验证：需在 `/personnel/turnover` 页面确认右侧 `12.3%（3/24）` 一类标签已完整显示。

### 遗留问题

1. 需要确认当前右侧留白是否与页面整体宽度比例协调。
2. 如后续 contractor 名称再变长，可能还要继续平衡左右标签与柱图区宽度。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于页面业务图表坐标轴标签布局。
2. 已通过平台层解决的问题：无，本轮不涉及平台层。
3. 仍是页面临时实现的问题：右侧标签宽度仍在页面图表配置中维护。
4. 哪些页面子组件未来必须回收为平台组件：若多个页面都出现相同“排名条形图 + 双侧标签”模式，再评估沉淀为平台图表方案。
5. 后续新页面禁止继续复制哪些实现：不要直接复用当前图表配置而不检查双侧标签空间。
6. 哪些样式应进入主题变量或统一样式入口：本轮暂无新增 token 或全局图表规则需求。
7. 当前仍存在的页面级样式债务：右侧标签文案长度依然与页面宽度耦合，后续若收窄布局需要继续校准。

### 任务名称

合同与付款管理付款节点圆点与标题同行对齐

### 完成内容

1. 将 `/project/contract` 付款节点区域的节点标题结构改为“圆点 + 节点名称 + 百分比”同一行显示。
2. 保持节点状态文案、金额文案以及上方 ECharts 迷你进度条逻辑不变，只调整下方节点信息布局。
3. 本轮属于业务页局部展示修正，不新增平台组件，也不改全局样式或设计 token。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/contract/components/contract-payment-mini-bar.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/contract`
2. 页面业务组件：`ContractPaymentMiniBar`

### 验证结果

1. 已执行 `git diff --check`：通过。
2. 未完成隔离浏览器视觉验证：本轮先完成结构调整，需用户在 `/project/contract` 页面肉眼确认圆点已移动到“预付款 30% / 中期款 40% / 尾款 30%”左侧。

### 遗留问题

1. 需要确认标题行圆点与文字之间的 8px 间距是否符合预期。
2. 如后续还要继续压缩节点区垂直间距，再评估是否只改当前页面业务组件。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于业务页自定义付款节点说明区布局。
2. 已通过平台层解决的问题：无，本轮不涉及平台层。
3. 仍是页面临时实现的问题：`ContractPaymentMiniBar` 仍是 `/project/contract` 页面专用组件。
4. 哪些页面子组件未来必须回收为平台组件：如果后续更多页面出现“分段进度条 + 节点状态说明”模式，再评估抽为平台组件。
5. 后续新页面禁止继续复制哪些实现：不要在别的页面直接复制当前付款节点 DOM；先判断是否值得平台化。
6. 哪些样式应进入主题变量或统一样式入口：本轮暂无新增 token 诉求。
7. 当前仍存在的页面级样式债务：付款节点标题、状态、金额排版仍由页面业务组件自行维护。

### 任务名称

平台页面头部组件二期：第二批页面接入

### 完成内容

1. 将 `/project/information`、`/project/evaluation`、`/personnel/turnover`、`/project/contract` 四个第二批页面的手写头部统一替换为 `PlatformViewToolbar`。
2. 保持这四个页面原有业务主体、统计卡、表格、图表和卡片结构不变，只收口页头标题与描述区域。
3. 清理上述页面内重复手写的 header 结构与对应 scoped CSS，避免同类页头继续散落在业务页面。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/information/index.vue`
2. `apps/web-antd/src/views/project/evaluation/index.vue`
3. `apps/web-antd/src/views/personnel/turnover/index.vue`
4. `apps/web-antd/src/views/project/contract/index.vue`
5. `docs/project-log.md`
6. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformViewToolbar`
2. 页面：`/project/information`、`/project/evaluation`、`/personnel/turnover`、`/project/contract`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/project/information`：返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/project/evaluation`：返回 `200 OK`。
5. 已执行 `curl -I http://127.0.0.1:5173/personnel/turnover`：返回 `200 OK`。
6. 已执行 `curl -I http://127.0.0.1:5173/project/contract`：返回 `200 OK`。
7. 未完成隔离浏览器视觉回归：本轮未额外启用隔离浏览器自动化，因此尚未肉眼确认第二批页面头部的间距与对齐。

### 遗留问题

1. 需要用户在第二批四个页面视觉确认 `PlatformViewToolbar` 的标题间距、与统计卡区块的上下距离是否符合预期。
2. 其他尚未迁移的页面如 `/personnel/qualification`、`/personnel/worktime` 后续可继续按同一路线收口。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无直接原生组件缺陷，核心问题仍是业务页头部重复手写。
2. 已通过平台层解决的问题：第二批项目页和人员页头部已统一回 `PlatformViewToolbar`，平台页头规则覆盖范围进一步扩大。
3. 仍是页面临时实现的问题：暂无新增页面级临时实现，本轮只保留业务主体结构在页面内。
4. 未来必须回收为平台组件的页面子组件：若后续更多页面出现复杂页头筛选或批量操作，可再评估把页头 filters 区做成标准能力。
5. 后续新页面禁止继续复制哪些实现：不要在第二批已覆盖类型的页面里继续手写 `header + h1 + p`。
6. 哪些样式应进入主题变量或统一样式入口：本轮无新增 token，页头样式继续由 `PlatformViewToolbar` 统一承载。
7. 当前仍存在的页面级样式债务：剩余未迁移页面仍保留各自 header 实现，需要后续继续收口。

### 任务名称

平台表格窄屏横向滚动条默认可见

### 完成内容

1. 定位 `PlatformTable` 横向滚动条默认不可见的原因：源组件把滚动条高度和颜色都放在 `:hover` 状态下才启用。
2. 将 `PlatformTable` 改为默认显示横向滚动条样式：滚动条高度固定为 `10px`，thumb 使用 `--st-color-border-control`，不再依赖 hover 才出现。
3. 本轮只修改表格源组件滚动条展示策略，不改业务页列配置、`scroll.x` 计算逻辑和分页行为。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 源组件：`PlatformTable`
2. 受影响场景：所有接入 `PlatformTable` 且存在横向溢出的表格页面
3. 验证页面：`/platform/typical-page`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/platform/typical-page`：返回 `200 OK`。
4. 未完成隔离浏览器视觉验证：需要在窄屏或缩窄容器宽度后，肉眼确认表格底部横向滚动条默认可见。

### 遗留问题

1. 需要确认在 macOS 当前浏览器环境下，窄屏表格底部滚动条是否符合“默认可见”的预期。
2. 如后续希望进一步区分桌面端与触控端滚动条尺寸，再评估是否补充响应式滚动条变量。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于平台表格滚动条可见性策略。
2. 已通过平台层解决的问题：横向溢出表格不再需要用户 hover 才知道可以横向滚动。
3. 仍是页面临时实现的问题：无页面级滚动条补丁。
4. 未来必须回收为平台组件的页面子组件：暂无新增。
5. 后续新页面禁止继续复制哪些实现：不要在业务页单独写横向滚动条显隐样式。
6. 哪些样式应进入主题变量或统一样式入口：当前继续使用 `--st-color-border-control` 作为滚动条 thumb 颜色。
7. 当前仍存在的页面级样式债务：无新增页面级样式债务。

### 任务名称

工时预警前缀样式对齐与人员总览表格前缀移除

### 完成内容

1. 将 `/personnel/worktime` 超工时预警卡片中的姓名前缀块改为与人员档案卡片一致的方形样式：56px、14px 圆角、品牌绿实底、白字，并补齐移动端 48px 缩放。
2. `/personnel/overview` 人员总览表格的“人员信息”列移除姓名前缀块，仅保留姓名与编号两行信息。
3. 本轮只调整页面业务展示结构，不改平台表格能力、数据接口或菜单逻辑。

### 修改了哪些文件

1. `apps/web-antd/src/views/personnel/worktime/index.vue`
2. `apps/web-antd/src/views/personnel/overview/index.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/personnel/worktime`
2. 页面：`/personnel/overview`
3. 参考样式来源：`/platform/typical-page` 人员档案卡片

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/personnel/worktime`：返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/personnel/overview`：返回 `200 OK`。
5. 未完成隔离浏览器截图验证：需要用户在当前浏览器中肉眼确认两个页面的最终观感。

### 遗留问题

1. 需要确认 `/personnel/worktime` 的前缀块尺寸和颜色是否与人员档案卡片达到预期一致。
2. 需要确认 `/personnel/overview` 移除前缀块后，表格“人员信息”列的留白和视觉密度是否合适。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于两个业务页的人员信息展示差异收敛。
2. 已通过平台层解决的问题：暂无新增平台层改动，本轮是页面业务展示对齐。
3. 仍是页面临时实现的问题：工时预警卡片前缀样式仍在页面内维护，后续若多处复用再评估回收。
4. 未来必须回收为平台组件的页面子组件：如更多页面使用“姓名前缀块 + 姓名信息”组合，可评估抽出 `PlatformPersonBadge`。
5. 后续新页面禁止继续复制哪些实现：不要在表格里默认加姓氏前缀块；只有明确需要卡片式识别时再使用。
6. 哪些样式应进入主题变量或统一样式入口：本轮暂无新增 token，继续复用现有品牌色变量。
7. 当前仍存在的页面级样式债务：人员信息前缀块仍分散在典型页卡片和工时预警卡片两个页面文件中。

### 任务名称

左侧导航菜单项白色间隙取消

### 完成内容

1. 定位左侧导航菜单项之间的白色间隙来自 `@vben-core/menu-ui` 垂直菜单项默认纵向 margin。
2. 将 `packages/@core/ui-kit/menu-ui/src/components/menu.vue` 中 `--menu-item-margin-y` 从 `2px` 调整为 `0px`。
3. 本轮只修改菜单源组件变量，不改业务路由、菜单数据、页面 scoped CSS，也不影响顶部横向菜单和折叠菜单原有 0 间距配置。

### 修改了哪些文件

1. `packages/@core/ui-kit/menu-ui/src/components/menu.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 源组件：`@vben-core/menu-ui` 的 `Menu` 垂直菜单。
2. 受影响区域：左侧导航栏展开态菜单项。
3. 验证页面：`/platform/typical-page`。

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/platform/typical-page`：返回 `200 OK`。
4. 未完成隔离浏览器截图验证：本轮未能稳定使用隔离浏览器链路，需用户在当前页面刷新后肉眼确认左侧菜单选中块之间已无白色分隔。

### 遗留问题

1. 需要用户在 `/platform/typical-page` 视觉确认“进度可视化跟踪”和“合同与付款管理”等相邻菜单块之间是否已贴合。
2. 如后续希望相邻选中父子菜单完全连成一个整体圆角块，再评估是否进一步调整 active 父子项的圆角策略；本轮只取消白色间距。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于 Vben 菜单源组件变量问题。
2. 已通过平台层解决的问题：左侧菜单项默认纵向间隙已回到 `menu-ui` 源组件变量，避免业务页单独覆盖。
3. 仍是页面临时实现的问题：无页面 scoped CSS。
4. 未来必须回收为平台组件的页面子组件：暂无新增。
5. 后续新页面禁止继续复制哪些实现：不要在业务页用局部样式调整左侧菜单项间距。
6. 哪些样式应进入主题变量或统一样式入口：本次直接修改 `menu-ui` 菜单变量 `--menu-item-margin-y`。
7. 当前仍存在的页面级样式债务：无新增页面级样式债务。

### 任务名称

平台表格操作列文字按钮间距与字重修正

### 完成内容

1. 首轮排查发现用户截图中的真实生效类名是 `platform-button--action`，不是旧的全局 `ActionButton`；因此将修正落点切回 `PlatformButton scene="action"` 源组件。
2. 在 `apps/web-antd/src/components/platform/button/platform-button.vue` 中为操作态按钮补充 `font-weight: 600`，并给相邻按钮恢复 `16px` 横向间距。
3. 保留先前补充的 `ActionButton` / 全局样式兜底，兼容仍在使用旧全局操作按钮的页面。
4. 使用独立 Chrome 临时 profile 打开 `http://127.0.0.1:5173/workbench/index` 进行隔离视觉确认，已看到操作列“编辑 / 详情 / 归档 / 删除”重新分开显示。
5. 本轮只修平台源头，不在任何业务页面 scoped CSS 中追加局部补丁。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/button/platform-button.vue`
2. `apps/web-antd/src/components/global/button.ts`
3. `packages/styles/src/antd/index.css`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformButton`（`scene="action"`）
2. 全局组件：`ActionButton`
3. 样式入口：`packages/styles/src/antd/index.css`
4. 受影响场景：各页面表格操作列文字按钮

### 验证结果

1. 已执行目标 Vue / TS 文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已在独立 Chrome 临时 profile 中打开 `/workbench/index` 做隔离视觉确认，操作列按钮已恢复分隔显示。
4. 未逐页复核所有业务表格：本轮先确认平台表格典型页之一恢复正常。

### 遗留问题

1. 仍建议继续抽查 `/project/information`、`/personnel/overview` 等其他带操作列页面，确认它们也都走 `PlatformButton` 或 `ActionButton`，没有遗漏原生 `a-button link` 场景。
2. 若后续还需要补 hover、禁用态或分隔线规则，再继续在 `PlatformButton` / `ActionButton` 源头扩展，不回业务页散改。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：`link` 按钮连续使用时不会自动保证业务约定的操作项间距和字重；同时项目中存在 `PlatformButton` 与 `ActionButton` 两条操作按钮路径。
2. 已通过平台层解决的问题：表格操作列文字按钮的间距和字重已回到 `PlatformButton` 源组件，并对旧 `ActionButton` 路径保留兜底。
3. 仍是页面临时实现的问题：暂无新增页面级临时实现。
4. 未来必须回收为平台组件的页面子组件：无新增，继续收敛到 `PlatformButton` / `ActionButton`。
5. 后续新页面禁止继续复制哪些实现：不要在单页给操作列按钮手写 `margin-right` 或局部字体加粗；不要绕开平台按钮直接在表格里堆原生 `link` 按钮。
6. 哪些样式应进入主题变量或统一样式入口：操作列按钮间距和字重已进入统一按钮源头；若后续还要抽成 token，再评估变量化。
7. 当前仍存在的页面级样式债务：部分旧页面如果没走 `PlatformButton` / `ActionButton` 而是直接写原生 `a-button link`，仍可能绕过本轮修正。

### 任务名称

人员全生命周期 - 各承包商流失率图表改为排名横向柱状图

### 完成内容

1. 保留 `PlatformEchartsPanel` 和项目现有 ECharts 封装，只重写 `/personnel/turnover` 页内 option，未引入新的图表组件实现。
2. 将“各承包商流失率”改为按流失率从高到低排序的横向排名柱状图：左侧显示“排名 + 承包商名称”，中间为圆角横向柱状条，右侧显示“流失率（离职人数/总人数）”。
3. 流失率大于 0 的柱条改为红橙渐变，并附加轻阴影；`0%` 数据改为浅灰色弱化，避免继续显示成普通红色进度条。
4. 调整 tooltip，展示承包商名称、流失率、离职人数和总人数，便于后续直接映射后端统计字段。
5. 扩充 `personnel-turnover-source.ts` mock 字段，新增并回填 `lostCount`、`totalCount`、`lossRate`，同时继续保留原有 `resigned`、`total`、`rate` 兼容结构。
6. 根据数据条数动态计算图表高度，增强看板式统计图的纵向留白和可读性。

### 修改了哪些文件

1. `apps/web-antd/src/views/personnel/turnover/index.vue`
2. `apps/web-antd/src/views/personnel/turnover/personnel-turnover-source.ts`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/personnel/turnover`
2. 图表区块：`各承包商流失率`
3. 复用平台组件：`PlatformEchartsPanel`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 未做隔离浏览器视觉验证：本轮按用户明确图表结构要求完成源码改造，但尚未额外启动独立浏览器链路确认实际观感。

### 遗留问题

1. 需要用户在 `/personnel/turnover` 视觉确认左侧排名宽度、右侧标签间距和红橙渐变强度是否符合看板预期。
2. 如后续后端接口直接返回 `lossRate`、`lostCount`、`totalCount`，可直接替换 mock；若仍返回旧字段名，再决定是否保留兼容映射层。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于页面内 ECharts 数据看板表达优化。
2. 已通过平台层解决的问题：继续复用项目既有 `PlatformEchartsPanel` 和 ECharts 封装，没有复制独立图表壳。
3. 仍是页面临时实现的问题：流失率排名图的排序规则、颜色梯度和标签格式仍写在 `/personnel/turnover` 页面内，暂未抽象成平台通用排行图。
4. 未来必须回收为平台组件的页面子组件：若后续多个业务页都出现“左排名 + 中间柱条 + 右指标”的排行榜图，再评估 `PlatformRankingBarChart`。
5. 后续新页面禁止继续复制哪些实现：不要把这种统计图退化成页面内普通进度条列表；不要绕过 `PlatformEchartsPanel` 直接散写新的图表容器。
6. 哪些样式应进入主题变量或统一样式入口：若后续多个页面复用相同红橙风险渐变或 0 值灰化策略，再评估沉淀为图表色板 token。
7. 当前仍存在的页面级样式债务：当前排行图的左右标签宽度、渐变颜色和 tooltip 文案仍为页面级配置。

### 任务名称

顶部导航用户下拉菜单精简与头像状态点描边修正

### 完成内容

1. 删除用户下拉菜单中框选的 3 个外部/帮助入口：`Gitee项目地址`、`Vben官方地址`、`问题 & 帮助`。
2. 保留 `文档`、`个人中心` 和 `退出登录`，不改登录、锁屏、用户信息和通知逻辑。
3. 将顶部头像和下拉用户信息头像的绿色在线状态点外描边改为白色变量 `--header-foreground`，避免继续依赖默认背景色描边。

### 修改了哪些文件

1. `apps/web-antd/src/layouts/basic.vue`
2. `packages/effects/layouts/src/widgets/user-dropdown/user-dropdown.vue`
3. `packages/styles/src/antd/index.css`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 顶部导航：`BasicLayout` 的 `user-dropdown` 插槽。
2. 源组件：`UserDropdown`、`VbenAvatar` 在线状态点显示。
3. 验证页面：`/platform/typical-page`。

### 验证结果

1. 已执行目标 Vue 文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/platform/typical-page`：返回 `200 OK`。
4. 已执行源码搜索，确认目标文件中已无 `Gitee项目地址`、`Vben官方地址`、`问题 & 帮助`。
5. 未完成隔离浏览器截图验证：Codex 内置浏览器连接超时，独立 Playwright 缺少本机 Chromium；按浏览器隔离规则未操作用户当前 Chrome。
6. `packages/styles/src/antd/index.css` 整文件 stylelint 仍被既有属性顺序/格式问题阻断，本轮新增 `.platform-user-avatar-dot` 未出现在报错列表。

### 遗留问题

1. 需要用户在当前浏览器中刷新 `/platform/typical-page` 后点开右上角头像，肉眼确认菜单项已精简且绿色状态点外描边为白色。
2. 如后续还需要统一所有头像在线点描边，再评估是否把该规则下沉到 `VbenAvatar` 默认实现；本轮只对顶部用户下拉显式加类。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于 Vben 顶部用户下拉菜单配置与头像状态点样式问题。
2. 已通过平台层解决的问题：顶部用户下拉菜单源头已精简，头像状态点描边已回到全局样式变量。
3. 仍是页面临时实现的问题：无页面 scoped CSS。
4. 未来必须回收为平台组件的页面子组件：如多处都需要在线状态点统一描边，应回收为 `VbenAvatar` 或统一头像状态点 token。
5. 后续新页面禁止继续复制哪些实现：不要在业务页单独手写顶部用户菜单外链入口；不要用当前页面 CSS 覆盖头像状态点描边。
6. 哪些样式应进入主题变量或统一样式入口：状态点外描边已使用 `--header-foreground`，规则落在 `packages/styles/src/antd/index.css`。
7. 当前仍存在的页面级样式债务：无新增页面级样式债务。

### 任务名称

平台页面头部组件一期：PlatformViewToolbar 扩展与首批接入

### 完成内容

1. 扩展 `PlatformViewToolbar`，新增配置化 `actions` 能力和统一 `action` 事件，支持业务按钮按 key 分发。
2. 将 `tools` 默认值收敛为空数组，避免普通页面头部误展示标准工具按钮。
3. 保留并复用现有 `viewOptions` 视图切换能力，同时补充右侧动作区自动换行，适配按钮数量增减场景。
4. 首批接入 `/workbench/index`、`/project/document`、`/project/progress`、`/personnel/overview` 四个页面，分别验证单按钮、多按钮、视图切换和纯标题头部场景。
5. 清理上述页面内重复手写的 header 结构与样式，把页面标题、描述和右侧动作区统一回平台组件。
6. 将“二级页头部默认优先使用 `PlatformViewToolbar`”同步沉淀到 `AGENTS.md` 和 `docs/decision-records.md`。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/view/platform-view-toolbar.vue`
2. `apps/web-antd/src/components/platform/view/types.ts`
3. `apps/web-antd/src/components/platform/view/index.ts`
4. `apps/web-antd/src/views/project/overview/index.vue`
5. `apps/web-antd/src/views/project/document/index.vue`
6. `apps/web-antd/src/views/project/progress/index.vue`
7. `apps/web-antd/src/views/personnel/overview/index.vue`
8. `AGENTS.md`
9. `docs/decision-records.md`
10. `docs/project-log.md`
11. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformViewToolbar`、`PlatformViewSwitch`
2. 页面：`/workbench/index`、`/project/document`、`/project/progress`、`/personnel/overview`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`：返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/project/document`：返回 `200 OK`。
5. 已执行 `curl -I http://127.0.0.1:5173/project/progress`：返回 `200 OK`。
6. 已执行 `curl -I http://127.0.0.1:5173/personnel/overview`：返回 `200 OK`。
7. 未完成隔离浏览器视觉回归：本轮未额外启用隔离浏览器自动化，因此尚未肉眼确认四个页面头部的按钮换行、间距和对齐。

### 遗留问题

1. 需要用户在四个首批页面视觉确认 `PlatformViewToolbar` 的标题间距、按钮顺序、按钮换行和视图切换样式是否符合预期。
2. `project/document` 当前批量上传通过 `actions` 配置触发隐藏 input，后续若出现下拉菜单或确认框类动作，再评估是否保留 slot 混合模式。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无直接原生组件缺陷，核心问题是页面头部结构在业务页重复散写。
2. 已通过平台层解决的问题：页面标题、描述、右侧业务按钮和视图切换已统一回 `PlatformViewToolbar`，减少后续新页面重复造轮子。
3. 仍是页面临时实现的问题：`project/document` 的上传 input 仍保留在页面内，只由平台头部按钮触发。
4. 未来必须回收为平台组件的页面子组件：如后续更多页面出现“复杂动作区”，可再评估把 dropdown / confirm action 包装成平台动作能力。
5. 后续新页面禁止继续复制哪些实现：不要在业务页重复手写 `header + h1 + p + actions`；不要为单页单独定义一套顶部按钮排序和换行规则。
6. 哪些样式应进入主题变量或统一样式入口：本轮按钮混排和动作区换行已进入 `PlatformViewToolbar`；后续如需统一页头高度或 sticky 行为，再评估补 token。
7. 当前仍存在的页面级样式债务：其他尚未迁移的项目页、人员页 header 仍保留页面级实现，后续需要继续批量迁移。

### 任务名称

平台表格列设置浮层交互调整

### 完成内容

1. 将 `PlatformTable` 的“表头显示设置”从居中 `Modal` 改为无蒙版浮层，点击设置 icon 后浮层直接出现在按钮下方。
2. 保留原有列显隐勾选、必选列禁用和 localStorage 记忆逻辑，不改业务页列配置结构。
3. 为 `PlatformTableToolbar` 的设置按钮补充点击事件透传，让表格组件能够基于真实触发按钮定位浮层。
4. 将 `/workbench/index`、`/project/information`、`/personnel/overview` 三个已接入页面的设置入口切换为传入点击事件。
5. 按用户二次反馈移除浮层头部标题和关闭按钮，继续保留“点击其他区域关闭”，并把宽度、圆角、内边距和阴影收敛到平台卡片规范。
6. 按浏览器批注把列设置浮层宽度由固定值改为随内容自适应，同时保留视口宽度上限，避免小屏溢出。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table.vue`
2. `apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`
3. `apps/web-antd/src/views/project/overview/index.vue`
4. `apps/web-antd/src/views/project/information/index.vue`
5. `apps/web-antd/src/views/personnel/overview/index.vue`
6. `docs/project-log.md`
7. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformTable`、`PlatformTableToolbar`
2. 页面：`/workbench/index`、`/project/information`、`/personnel/overview`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`：返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/project/information`：返回 `200 OK`。
5. 未完成隔离浏览器截图验证：本轮未启用独立浏览器自动化链路，因此尚未做 icon 下方浮层的肉眼位置确认。

### 遗留问题

1. 需要用户在 `/workbench/index`、`/project/information`、`/personnel/overview` 视觉确认浮层是否与设置按钮上下间距、右侧对齐方式一致，以及按内容自适应后的宽度是否合适。
2. 当前浮层在小视口下会做窗口内收敛；如后续设计要求固定左对齐或带箭头，再评估是否沉淀为平台通用浮层样式。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：`Modal` 交互会强制引入蒙版和居中展示，不适合表格局部“列设置”这类轻量工具浮层。
2. 已通过平台层解决的问题：`PlatformTable` 已把列设置交互改为就近浮层，避免业务页各自隐藏蒙版或重写弹窗定位。
3. 仍是页面临时实现的问题：暂无新增页面级临时实现，三个业务页只透传点击事件。
4. 未来必须回收为平台组件的页面子组件：如后续还有更多“工具 icon 打开局部配置面板”的场景，可评估抽出 `PlatformFloatingPanel`。
5. 后续新页面禁止继续复制哪些实现：不要在业务页通过局部 CSS 隐藏 `Modal` 蒙版来伪装浮层；不要为单页单独写设置面板定位逻辑。
6. 哪些样式应进入主题变量或统一样式入口：列设置浮层的边框、阴影、圆角和内边距已进入 `PlatformTable` 源组件，后续复用场景再评估是否提炼 token。
7. 当前仍存在的页面级样式债务：暂无新增；列设置面板样式已回到平台表格源组件。

### 任务名称

前端联调源码交付包与交付说明

### 完成内容

1. 新增前端联调交付说明，明确本项目应以 monorepo 源码整体交付，不能只压缩 `apps/web-antd`。
2. 说明 `dist/index.html` 不能双击打开的原因：构建资源使用站点根路径，且应用为 Vue Router history 模式 SPA，必须通过 HTTP 服务或 Nginx 访问。
3. 梳理本地启动、构建、预览、Mock 模式、真实后端切换、Nginx fallback、页面清单、Mock 数据位置和平台组件边界。
4. 生成干净源码交付包，排除 `.git`、`node_modules`、`apps/web-antd/dist`、压缩包和本机临时文件。

### 修改了哪些文件

1. `docs/handoff-frontend.md`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 主应用：`apps/web-antd`
2. 交付页面：`/workbench/index`、`/project/information`、`/project/contract`、`/project/progress`、`/project/document`、`/project/evaluation`、`/platform/typical-page`、`/personnel/overview`、`/personnel/qualification`、`/personnel/turnover`、`/personnel/worktime`
3. 平台组件目录：`apps/web-antd/src/components/platform`

### 验证结果

1. 已确认仓库当前为 Vben Admin monorepo，根目录包含 `pnpm-workspace.yaml` 和 `pnpm-lock.yaml`，`apps/web-antd` 不能脱离根目录独立交付。
2. 已检查 `apps/web-antd/dist/index.html`，确认资源路径使用 `/_app.config.js`、`/js/...`、`/jse/...`，不适合 `file://` 双击打开。
3. 已检查构建产物配置，生产接口前缀为 `/prod-api`，开发 Mock 开关在 `apps/web-antd/.env.development`。
4. 已生成交付包并检查压缩包内容，确认未包含 `node_modules`、`.git` 和 `apps/web-antd/dist`。

### 遗留问题

1. 前端接收后仍需按实际后端地址调整 `VITE_GLOB_API_URL`、Vite proxy 或 Nginx `/prod-api` 代理。
2. 当前页面数据仍以 Mock 和页面专用 `*-source.ts` 为主，真实接口字段需要前后端联调时逐页替换。
3. 应用级 `vue-tsc` 仍有存量类型问题，后续建议单独治理。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于交付打包和文档说明。
2. 已通过平台层解决的问题：无新增平台组件改动。
3. 仍是页面临时实现的问题：各业务页仍以页面专用 Mock 数据源模拟后端返回。
4. 未来必须回收为平台组件的页面子组件：继续参考 `docs/handoff-frontend.md` 中的平台组件边界，避免联调时复制页面样式。
5. 后续新页面禁止继续复制哪些实现：不要把 `dist` 当作二次开发主产物；不要脱离 monorepo 单独交付 `apps/web-antd`。
6. 哪些样式应进入主题变量或统一样式入口：本轮无新增样式。
7. 当前仍存在的页面级样式债务：交付范围内已知业务卡片、图表 option 和页面数据适配仍分布在各页面。

### 任务名称

人员全生命周期 - 工时与兼职管控间距微调

### 完成内容

1. 按用户截图批注调整 `超工时人员预警` 面板标题区内边距：仅保留下方 24px，上、左、右为 0。
2. 调整预警卡片网格内边距：仅保留上方 24px，右、下、左为 0。
3. 本轮只处理 `/personnel/worktime` 页面业务布局类，不改平台组件、设计 token 或全局样式入口。

### 修改了哪些文件

1. `apps/web-antd/src/views/personnel/worktime/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/personnel/worktime`
2. 页面布局类：`.worktime-alert-panel__header`、`.worktime-alert-grid`
3. 复用平台组件：`PlatformSectionTitle`

### 验证结果

1. 已完成源码级检查，确认只改两个 padding 声明。
2. 已执行目标文件 ESLint：通过。
3. 已执行 `git diff --check`：通过。
4. 未做浏览器截图验证：本轮为截图批注下的两处 CSS 明确值修正，且当前仓库存在较多既有未提交改动，未额外启动浏览器链路。

### 遗留问题

1. 需要用户在 `/personnel/worktime` 视觉确认标题与卡片网格上下间距是否符合预期。
2. 若后续多个业务页都需要“平台区块标题只留底部 padding、内容网格只留顶部 padding”，再评估是否沉淀为平台区块布局能力。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，属于业务页面区块布局间距微调。
2. 已通过平台层解决的问题：无新增平台层改动，继续复用 `PlatformSectionTitle`。
3. 仍是页面临时实现的问题：`超工时人员预警` 卡片网格和人员预警卡仍是页面级业务结构。
4. 未来必须回收为平台组件的页面子组件：若多页面复用人员预警卡，再评估 `PlatformWarningCard`。
5. 后续新页面禁止继续复制哪些实现：不要把本次页面特例直接当作全局模块 padding 规则。
6. 哪些样式应进入主题变量或统一样式入口：本轮无新增，继续使用 `--st-module-content-padding`。
7. 当前仍存在的页面级样式债务：预警卡片结构、网格列数和局部 padding 仍留在页面 scoped CSS。

### 任务名称

平台源组件统一：顶部 Logo、表格序号列、标题组件与卡片 hover

### 完成内容

1. 将顶部系统名称左侧 Logo 配置为本地仓库资源 `/LOGO.svg`，并在应用启动期同步覆盖历史偏好缓存，避免仍显示空 Logo 或旧 Logo。
2. 将 `PlatformTable` 默认序号列改为开启；后续如不需要序号列，需要显式关闭。
3. 在 `#/adapter/vxe-table` 中为通过 `useVbenVxeGrid` 创建的 Vxe 表格默认补充 `type: 'seq'` 序号列；若首列是复选框，则序号列自动插到复选框之后。
4. 新增 `PlatformSectionTitle` 平台标题组件，并让 `PlatformSection` 复用它，`PlatformEchartsPanel` 的标题也随之继承统一标题样式。
5. 将 `项目甘特图`、`进度预警`、`文档列表`、`超工时人员预警` 等页面手写标题接入平台标题组件；`资质到期预警`、`准入规则配置`、`各承包商流失率` 通过既有平台区块间接复用。
6. 删除 `超工时人员预警` 中“重点关注本月工时和超出时长，及时通知承包商整改。”文案。
7. 调整 `PlatformStatCard`、超工时人员卡片和待评估项目卡片 hover：移入只上移，不再出现品牌描边。
8. 顺手修正 `project-progress-board.vue` 中看板列数量显示的既有类型问题，从不存在的 `column.count` 改为 `column.records.length`。

### 修改了哪些文件

1. `apps/web-antd/src/preferences.ts`
2. `apps/web-antd/src/main.ts`
3. `apps/web-antd/src/adapter/vxe-table.ts`
4. `apps/web-antd/src/components/platform/table/platform-table.vue`
5. `apps/web-antd/src/components/platform/stat/platform-stat-card.vue`
6. `apps/web-antd/src/components/platform/view/index.ts`
7. `apps/web-antd/src/components/platform/view/platform-section.vue`
8. `apps/web-antd/src/components/platform/view/platform-section-title.vue`
9. `apps/web-antd/src/views/project/progress/index.vue`
10. `apps/web-antd/src/views/project/progress/components/project-progress-gantt-chart.vue`
11. `apps/web-antd/src/views/project/progress/components/project-progress-board.vue`
12. `apps/web-antd/src/views/project/document/index.vue`
13. `apps/web-antd/src/views/personnel/worktime/index.vue`
14. `apps/web-antd/src/views/project/evaluation/index.vue`
15. `AGENTS.md`
16. `docs/decision-records.md`
17. `docs/project-log.md`
18. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 顶部导航：`VbenLogo` 偏好配置链路。
2. 平台组件：`PlatformTable`、`PlatformSectionTitle`、`PlatformSection`、`PlatformEchartsPanel`、`PlatformStatCard`。
3. 适配层：`#/adapter/vxe-table`。
4. 页面：`/project/progress`、`/project/document`、`/project/evaluation`、`/personnel/qualification`、`/personnel/turnover`、`/personnel/worktime`、`/personnel/overview`、`/project/information`。

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/LOGO.svg`：返回 `200 OK`，`Content-Type: image/svg+xml`。
4. 已执行 `curl -I` 检查 `/project/progress`、`/project/document`、`/project/evaluation`、`/project/information`、`/personnel/qualification`、`/personnel/worktime`、`/personnel/turnover`、`/personnel/overview`：均返回 `200 OK`。
5. 已执行应用级 `vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`：仍因既有 `platform-view-toolbar`、`tenant-toggle`、`tinymce`、`tree-select-panel`、`utils/http`、workflow 和演示页错误失败；本轮新增的 Vxe 序号列类型错误已修复，`project-progress-board` 的 `count` 错误已清除。
6. 未完成隔离浏览器截图验证：当前 Browser Node 执行通道不可用，按浏览器隔离规则未操作用户系统 Chrome。

### 遗留问题

1. 需要用户在浏览器中视觉确认顶部 Logo 32px、平台标题组件行高、各复用标题位置和卡片 hover 手感。
2. `PlatformTable` 默认序号列会影响所有已接入平台表格的页面；如某些特殊表格不需要序号列，需要后续显式关闭。
3. Vxe 适配层默认序号列只在调用方提供 columns 时自动补充；动态列或无 columns 的特殊表格仍需单独确认。
4. 应用级 `vue-tsc` 仍有存量错误，需要后续单独治理。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：直接在页面手写表格序号、模块标题和卡片 hover 会造成不同页面体验不一致。
2. 已通过平台层解决的问题：`PlatformTable`、Vxe 适配层、`PlatformSectionTitle`、`PlatformSection`、`PlatformStatCard` 已统一默认行为。
3. 仍是页面临时实现的问题：超工时人员卡片、待评估项目卡片仍是页面级业务卡片，仅同步 hover 规则，未抽成通用卡片组件。
4. 未来必须回收为平台组件的页面子组件：若多页面继续出现“人员预警卡 / 项目待办卡”，再评估 `PlatformWarningCard` 或 `PlatformTaskCard`。
5. 后续新页面禁止继续复制的实现：禁止默认省略序号列；禁止重复手写模块标题字号和右侧年份/阈值布局；禁止卡片 hover 时额外改品牌描边。
6. 应进入主题变量或统一样式入口的样式：标题字号、字重、描述色和右侧补充信息已进入 `PlatformSectionTitle`；卡片 hover 规则已进入平台统计卡，其他卡片后续按同规则迁移。
7. 当前仍存在的页面级样式债务：项目甘特图月份表头、超工时人员卡片内容结构、待评估项目卡片结构仍留在页面 scoped CSS。

### 任务名称

人员全生命周期 - 变动与流失率统计页面第一版

### 完成内容

1. 按用户纠偏，将 `变动与流失率统计` 做成独立页面，不覆盖已完成的 `人员总览`、`人员档案管理`、`资质与准入管控`、`工时与兼职管控`。
2. 新增页面路径 `/personnel/turnover`，并在 Mock 菜单中插入到 `资质与准入管控` 下方、`工时与兼职管控` 上方。
3. 顶部 4 张数据卡片复用 `PlatformStatCard`，展示 `本月入职`、`本月离职`、`整体流失率`、`变动人次`。
4. `各承包商流失率` 复用 `PlatformEchartsPanel` 和现有 `@vben/plugins/echarts`，用横向 bar chart 展示承包商流失率、离职人数和总人数。
5. 新增页面专用 Mock 数据源，当前统计数据为前端静态模拟，后续可替换为真实统计接口。

### 修改了哪些文件

1. `apps/web-antd/src/mock/index.ts`
2. `apps/web-antd/src/views/personnel/turnover/index.vue`
3. `apps/web-antd/src/views/personnel/turnover/personnel-turnover-source.ts`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/personnel/turnover`
2. 菜单：`人员全生命周期 - 变动与流失率统计`
3. 复用平台组件：`PlatformStatCard`、`PlatformEchartsPanel`
4. 复用图表能力：`@vben/plugins/echarts`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `curl -I http://127.0.0.1:5173/personnel/turnover`：返回 `200 OK`。
3. 已执行 `curl -I http://127.0.0.1:5173/personnel/qualification`：返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/personnel/worktime`：返回 `200 OK`。
5. 已执行应用级 `vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`：仍因既有平台 view、workflow、演示页等错误失败；失败列表不包含本轮新增的 `/personnel/turnover` 文件。
6. 本轮尚未完成隔离浏览器截图验证：当前自动化浏览器链路仍需进一步确认。

### 遗留问题

1. 流失率统计当前为页面专用 Mock 数据，未接真实后端统计接口。
2. 当前图表为静态横向柱状图和 tooltip，暂未做点击承包商钻取、时间范围筛选或人员明细联动。
3. 需要用户视觉确认图表高度、条形颜色、右侧标签密度和菜单排序是否符合截图预期。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：该页面属于统计看板，不适合用 Table 列表强行承载承包商流失率。
2. 已通过平台层解决的问题：统计卡继续复用 `PlatformStatCard`；图表外壳与 ECharts 渲染复用 `PlatformEchartsPanel`。
3. 仍是页面临时实现的问题：承包商流失率 ECharts option、静态统计数据和图表标签格式暂留页面与页面专用数据源。
4. 未来必须回收为平台组件的页面子组件：若后续多页面复用“横向指标排行图”，再评估沉淀为 `PlatformRankingBarChart` 或扩展 `PlatformEchartsPanel` preset。
5. 后续新页面禁止继续复制的实现：不要用普通 DOM 进度条伪装 ECharts 图表；不要把统计卡片写成页面局部卡片。
6. 应进入主题变量或统一样式入口的样式：图表红色风险条、灰色背景条如成为通用风险排行图规范，再补充 chart token。
7. 当前仍存在的页面级样式债务：统计页标题、4 列卡片栅格和图表高度仍在页面 scoped CSS 中，待复用后再下沉。

### 任务名称

人员全生命周期 - 资质与准入管控页面第一版

### 完成内容

1. 按用户确认新增 `PlatformNoticeList` / `PlatformNoticeItem` 平台提醒列表组件，用于资质到期预警、待办提醒、风险提醒等非表格列表场景。
2. 新增 `人员全生命周期 - 资质与准入管控` 独立页面，路径 `/personnel/qualification`。
3. 在 `人员全生命周期` 左侧菜单中将 `资质与准入管控` 插入到 `人员档案管理` 下方、`工时与兼职管控` 上方，避免覆盖已完成的 `人员总览`、`人员档案管理`、`工时与兼职管控`。
4. 页面顶部保留三张统计卡：资质即将到期、无资质在岗、准入不合规。
5. `资质到期预警` 与 `准入规则配置` 两个模块按一行两列展示，窄屏自动折叠为单列。
6. `资质到期预警` 不使用表格，改用 `PlatformNoticeList` 展示消息/通知风格行列表。
7. `发送提醒` 按钮默认品牌绿描边和品牌绿文本，鼠标移入后品牌绿填充、文字变白。
8. 按用户要求，批量提醒功能暂不开发、不渲染入口。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/index.ts`
2. `apps/web-antd/src/components/platform/notice/index.ts`
3. `apps/web-antd/src/components/platform/notice/platform-notice-item.vue`
4. `apps/web-antd/src/components/platform/notice/platform-notice-list.vue`
5. `apps/web-antd/src/components/platform/notice/types.ts`
6. `apps/web-antd/src/mock/index.ts`
7. `apps/web-antd/src/views/personnel/qualification/index.vue`
8. `apps/web-antd/src/views/personnel/qualification/personnel-qualification-source.ts`
9. `docs/project-log.md`
10. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 新增页面：`/personnel/qualification`
2. 保留不改页面：`/personnel/overview`、`/platform/typical-page`、`/personnel/worktime`
3. 新增平台组件：`PlatformNoticeList`、`PlatformNoticeItem`
4. 复用平台组件：`PlatformStatCard`、`PlatformSection`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/personnel/qualification`：返回 `200 OK`。
4. 已执行应用级 `vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`：仍因既有平台 view、tenant-toggle、tinymce、tree、http、`/project/progress`、workflow、演示页和 common-ui 存量错误失败；失败列表不包含本轮 `/personnel/qualification` 或 `components/platform/notice` 文件。
5. 本轮未做隔离浏览器截图验证；当前已完成源码级、类型失败范围确认与 HTTP 路由检查。

### 遗留问题

1. `发送提醒` 当前为前端 Mock 状态更新，未接真实消息接口。
2. 准入规则配置当前为静态规则展示，未开发规则编辑、启停、审批或版本管理。
3. 批量提醒按用户要求暂不开发。
4. 后续如待办、预警、通知等多页面复用提醒行列表，应继续在 `PlatformNoticeList` 扩展权限、已读、批量和分组能力。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：`a-table` 不适合消息通知式提醒列表；直接用页面卡片重复实现会导致提醒行、操作按钮、空态和 loading 分散。
2. 已通过平台层解决的问题：提醒行列表已沉淀为 `PlatformNoticeList` / `PlatformNoticeItem`，发送提醒按钮视觉也收口在平台提醒项内。
3. 仍是页面临时实现的问题：准入规则卡片、规则 Mock 数据和发送提醒 Mock 状态仍在业务页面与页面专用数据源中。
4. 未来必须回收为平台组件的页面子组件：若多页面复用规则卡片，可评估 `PlatformRuleCard` 或 `PlatformPolicyCard`。
5. 后续新页面禁止继续复制的实现：禁止把提醒/通知/预警行继续写成页面专用散落 CSS；优先使用 `PlatformNoticeList`。
6. 应进入主题变量或统一样式入口的样式：提醒行边框、状态标签色和品牌提醒按钮后续若出现多变体，可继续抽 token。
7. 当前仍存在的页面级样式债务：两列布局、准入规则卡片布局和规则状态标签暂留页面 scoped CSS。

### 任务名称

人员全生命周期 - 人员总览独立入口恢复

### 完成内容

1. 按用户纠偏确认：当前 `人员档案管理` 是正确页面，不允许用人员总览覆盖人员档案。
2. 保留 `人员档案管理` 现有 `/platform/typical-page` 卡片与详情抽屉页面不动。
3. 新增独立 `人员总览` 页面，路径 `/personnel/overview`。
4. 在 `人员全生命周期` 菜单下补回 `人员总览` 子入口，并保留 `人员档案管理`、`工时与兼职管控` 现有入口。
5. `人员总览` 页面恢复统计卡、表格工具栏、人员表格、表头状态/资质状态筛选和文字操作列。
6. `新增人员` 继续放在表格工具栏左侧；右侧默认搜索、刷新、设置、全屏 4 个工具入口。
7. 新增/编辑人员弹窗继续复用平台弹窗、表单、输入框、下拉框、日期选择器，并保持业务化暗文本。

### 修改了哪些文件

1. `apps/web-antd/src/mock/index.ts`
2. `apps/web-antd/src/views/personnel/overview/index.vue`
3. `apps/web-antd/src/views/personnel/overview/personnel-overview-source.ts`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 新增页面：`/personnel/overview`
2. 保留页面：`/platform/typical-page` 人员档案管理
3. 平台组件：`PlatformStatCard`、`PlatformTableToolbar`、`PlatformTable`、`PlatformStatusTag`、`PlatformModal`、`PlatformEditForm`、`PlatformInput`、`PlatformSelect`、`PlatformDatePicker`、`PlatformButton`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/personnel/overview`：返回 `200 OK`。
4. 已执行应用级 `vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`：仍因既有平台 view、tenant-toggle、tinymce、tree、workflow、演示页和 `/project/progress` 存量错误失败；失败列表不包含本轮 `/personnel/overview` 文件。

### 遗留问题

1. `人员总览` 新增/编辑/删除当前为前端 Mock 状态，未接真实接口。
2. `查看` 入口当前保留提示，未展开详情弹窗。
3. 隔离浏览器截图链路仍未恢复，本轮仅完成 HTTP 与源码级检查。

### 平台治理影响

1. 本轮发现的问题：人员总览与人员档案是两个业务页面，不能继续共用 `/platform/typical-page` 互相覆盖。
2. 已通过平台层解决的问题：人员总览继续复用平台表格、工具栏、状态标签、弹窗、表单和录入控件。
3. 仍是页面临时实现的问题：人员总览 Mock 数据、人员头像单元格、新增/编辑保存逻辑仍在页面专用文件内。
4. 未来必须回收为平台组件的页面子组件：若多页面复用人员头像 + 姓名编号展示，可继续评估 `PlatformEntityCell`。
5. 后续新页面禁止继续复制的实现：禁止把两个不同人员页面挂到同一路由互相覆盖；禁止把平台表格操作列改为 icon-only，除非用户明确要求。
6. 应进入主题变量或统一样式入口的样式：本轮未新增主题变量，继续使用既有平台 token。
7. 当前仍存在的页面级样式债务：统计卡栅格、人员头像单元格和弹窗两列表单布局暂留页面 scoped CSS。

### 任务名称

项目全景管理 - 中期评估与验收管理页面评论整改

### 完成内容

1. 按评论删除 `/project/evaluation` 页面标题右侧的全局 `发起评估` 按钮。
2. 删除 `待评估项目` 与 `评估记录` 两个功能区的辅助文案。
3. 删除 `待评估项目` 工具栏里的 `全部状态`、`全部阶段` 下拉筛选，仅保留搜索与刷新。
4. 将 `评估记录` 的 `全部结果` 工具栏下拉迁移为 `PlatformTable` 表头筛选，保持平台表格原生筛选交互。
5. 将待评估项目卡片内 `发起评估` 改为醒目的主按钮，并保留点击打开评估弹窗。
6. 按用户补充要求删除 `.project-evaluation-panel__body` 的 `padding: var(--st-module-content-padding);` 页面级内边距。
7. 按用户补充要求左右调换模块位置：`评估记录` 放左侧宽列，`待评估项目` 放右侧窄列。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/evaluation/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/evaluation`
2. 平台组件：`PlatformTableToolbar`、`PlatformTable`、`PlatformButton`、`PlatformStatusTag`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check -- apps/web-antd/src/views/project/evaluation/index.vue`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/project/evaluation`：返回 `200 OK`。
4. 已执行应用级 `vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`：仍因既有模块、演示页、流程页和 `/project/progress` 存量问题失败；失败列表不包含本轮 `/project/evaluation` 改动文件。

### 遗留问题

1. 本轮只处理评论范围内的页面组合与样式调整，未扩展评估详情、模板配置、验收附件或导出能力。
2. `发起评估` 仍为前端 Mock 流程，未接真实接口。
3. 全量 `vue-tsc` 存量错误仍需单独治理。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：结果筛选如果放在工具栏 `Select` 中，会与平台表格的表头筛选能力重复。
2. 已通过平台层解决的问题：`评估记录` 结果筛选已回到 `PlatformTable` 表头筛选，继续复用平台筛选面板。
3. 仍是页面临时实现的问题：待评估项目卡片布局、进度条和发起评估 Mock 流程仍在页面内。
4. 未来必须回收为平台组件的页面子组件：若多页面出现“项目卡片 + 状态标签 + 进度 + 主操作按钮”，可评估业务卡片组件。
5. 后续新页面禁止继续复制的实现：禁止在表格工具栏重复放置本应属于表头的字段筛选。
6. 应进入主题变量或统一样式入口的样式：本轮未新增主题变量；主按钮继续使用 `PlatformButton type="primary"`。
7. 当前仍存在的页面级样式债务：项目卡片的间距、进度条、两栏工作区布局和左右列宽仍为页面 scoped CSS。

### 任务名称

人员全生命周期 - 工时与兼职管控页面第一版

### 完成内容

1. 新增 `人员全生命周期 - 工时与兼职管控` 页面，路径 `/personnel/worktime`。
2. 按用户要求，本轮暂不开发页面底部“兼职核查”小模块，不渲染该模块占位。
3. 将“超工时人员预警”从表格样式改为页面业务卡片样式，模块标题右侧展示 `阈值：180小时/月`。
4. 每张预警卡重点展示 `本月工时` 与 `超出时长` 两个核心数据，并保留人员、岗位、承包商、项目和预警级别。
5. 预警卡已加入鼠标移入上移与阴影增强交互。
6. `通知整改` 按钮默认品牌绿描边与品牌绿文本，鼠标移入后品牌绿填充、文字变白。
7. 新增页面专用 Mock 数据源，当前通知整改为前端模拟状态更新。

### 修改了哪些文件

1. `apps/web-antd/src/mock/index.ts`
2. `apps/web-antd/src/views/personnel/worktime/index.vue`
3. `apps/web-antd/src/views/personnel/worktime/personnel-worktime-source.ts`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/personnel/worktime`
2. 菜单：`人员全生命周期 - 工时与兼职管控`
3. 复用平台组件：`PlatformStatCard`、`PlatformStatusTag`、`PlatformButton`
4. 页面业务模块：`超工时人员预警` 卡片列表

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/personnel/worktime`：返回 `200 OK`。
4. 已执行应用级 `vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`：仍因既有平台 view、workflow、演示页和当前其他未完成页面错误失败；失败列表不包含本轮新增的 `/personnel/worktime` 文件。
5. 本轮尚未完成隔离浏览器截图验证：当前自动化浏览器链路需进一步确认。

### 遗留问题

1. `通知整改` 当前为前端 Mock 状态更新，未接真实整改通知接口。
2. 兼职核查模块按用户要求暂不开发；后续如恢复，需要重新输出组件映射和规则自检。
3. 本页卡片列表为页面业务组件，若后续多处出现“风险人员卡片 / 整改通知卡片”，再评估是否下沉为平台组件。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：超工时预警更适合风险卡片，不适合复用表格原组件样式强行展示。
2. 已通过平台层解决的问题：统计卡、状态标签、按钮基础能力继续复用平台组件。
3. 仍是页面临时实现的问题：超工时预警卡片布局、工时指标块、整改通知状态属于当前页面业务实现。
4. 未来必须回收为平台组件的页面子组件：若多个页面复用风险卡片，可评估 `PlatformRiskCard` 或 `PlatformAlertCard`。
5. 后续新页面禁止继续复制的实现：不要把类似风险卡片伪装成表格，也不要绕过平台按钮重新写基础按钮。
6. 应进入主题变量或统一样式入口的样式：品牌绿按钮 hover 规则如后续成为通用“整改/处理”按钮场景，再进入平台按钮 scene 或 token。
7. 当前仍存在的页面级样式债务：卡片布局和按钮业务态暂留页面 scoped CSS，待复用后再下沉。

### 任务名称

项目全景管理 - 项目信息管理表格与新建项目弹窗整改

### 完成内容

1. 明确本轮目标为 `项目全景管理 - 项目信息管理`，页面路径 `/project/information`，不是人员全生命周期模块。
2. 复核并保持 `新建项目` 位于下方表格功能区左侧，右侧工具入口继续由 `PlatformTableToolbar` 承载。
3. 复核并保持 `项目类型`、`状态` 使用 `PlatformTable` 表头筛选，不在工具栏放 `全部类型 / 全部状态` 下拉。
4. 复核并保持操作列为 `编辑 / 详情 / 归档 / 删除` 文字按钮，不使用 icon-only 操作。
5. 新增平台组件 `PlatformSegmented`，基于 `antdv-next` `Segmented` 薄封装。
6. 将 `新建项目` 弹窗改为 `基础信息 / 招采信息 / 进场信息` 三段式表单。
7. 弹窗内录入控件继续遵守业务化暗文本规则，输入框使用“请输入…”，选择与日期控件使用“请选择…”。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`
5. `apps/web-antd/src/components/platform/index.ts`
6. `apps/web-antd/src/components/platform/segmented/index.ts`
7. `apps/web-antd/src/components/platform/segmented/platform-segmented.vue`
8. `apps/web-antd/src/views/project/information/index.vue`
9. `apps/web-antd/src/views/project/information/project-information-source.ts`

### 涉及哪些页面或组件

1. 页面：`/project/information`
2. 菜单：`项目全景管理 - 项目信息管理`
3. 平台组件：`PlatformSegmented`、`PlatformTableToolbar`、`PlatformTable`、`PlatformModal`、`PlatformEditForm`、`PlatformInput`、`PlatformSelect`、`PlatformDatePicker`、`PlatformButton`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/project/information`：返回 `200 OK`。
4. 已执行应用级 `vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`：仍因既有模块和演示页错误失败；失败列表不包含本轮 `/project/information` 与 `PlatformSegmented` 改动文件。
5. 本轮未做隔离浏览器截图验证：当前 Playwright 浏览器二进制缺失，自动化截图链路不可用。

### 遗留问题

1. `进场信息` 里的人员配置和设备清单当前为首行录入样式与加号入口，尚未实现多行增删数组化保存。
2. 新建项目弹窗当前仍是前端 Mock 保存，未接真实接口。
3. 分段切换暂不做跨段校验提示，后续如需提交前按段定位错误，再扩展表单校验策略。
4. 全量 `vue-tsc` 存量错误仍需单独治理。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：`Segmented` 可满足分段切换，但直接在页面使用会让选中态、字号、下划线和 hover 样式分散。
2. 已通过平台层解决的问题：新增 `PlatformSegmented` 统一分段切换视觉和出口；项目信息页面弹窗已接入该组件。
3. 仍是页面临时实现的问题：新建项目弹窗的三段业务字段、人员配置行、设备清单行仍属于页面业务实现。
4. 未来必须回收为平台组件的页面子组件：若多个页面出现“表单分段 + 分段内容 + 底部保存”结构，可评估 `PlatformSegmentedForm` 或表单步骤容器。
5. 后续新页面禁止继续复制的实现：禁止在弹窗里手写分段按钮、手写选中下划线；默认使用 `PlatformSegmented`。
6. 应进入主题变量或统一样式入口的样式：分段控件选中态、字体、间距当前已收敛到 `PlatformSegmented`，后续多主题差异再补 token。
7. 当前仍存在的页面级样式债务：项目信息弹窗内容区两列栅格、人员/设备行布局仍在页面 scoped CSS 中，等待多页面复用后再下沉。

### 任务名称

人员全生命周期 - 人员总览页面第一版

### 完成内容

1. 将 `人员全生命周期 - 用户管理` 菜单文案改为 `人员总览`。
2. 将 `/platform/typical-page` 从空承载页开发为人员总览页面：顶部标题、统计卡、表格功能区、人员表格和操作列。
3. 按用户反馈将 `新增人员` 从页面标题旁移动到表格功能区左侧，保留右侧默认 4 个工具图标。
4. 移除 `人员列表` 标题，不再在表格功能区展示列表标题。
5. `状态`、`资质状态` 表头接入 `PlatformTable` 平台筛选面板，点击筛选 icon 下拉筛选。
6. 将操作列从 icon-only 改回 `编辑 / 查看 / 删除` 文字按钮，保持平台表格操作列 hover 下划线风格。
7. 按新增人员截图补充新增弹窗，复用平台弹窗、表单、输入框、下拉框和日期选择器；保存后写入页面专用 Mock 数据。
8. 按用户新增规则，为所有录入控件补充业务化暗文本，并将该规则同步到 `AGENTS.md` 与 `docs/decision-records.md`。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`
5. `apps/web-antd/src/mock/index.ts`
6. `apps/web-antd/src/locales/langs/zh-CN/menu.json`
7. `apps/web-antd/src/views/platform/typical-page/index.vue`
8. `apps/web-antd/src/views/platform/typical-page/user-demo-source.ts`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 菜单：`人员全生命周期 - 人员总览`
3. 平台组件：`PlatformStatCard`、`PlatformTableToolbar`、`PlatformTable`、`PlatformStatusTag`、`PlatformModal`、`PlatformEditForm`、`PlatformInput`、`PlatformSelect`、`PlatformDatePicker`、`PlatformButton`

### 验证结果

1. 已执行目标文件 ESLint：通过。
2. 已执行 `git diff --check`：通过。
3. 已执行 `curl -I http://127.0.0.1:5173/platform/typical-page`：返回 `200 OK`。
4. 已执行应用级 `vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`：仍因既有模块和演示页错误失败；修正后失败列表不再包含 `/platform/typical-page` 本轮改动文件。
5. 本轮未完成隔离浏览器截图验证：Playwright 浏览器二进制缺失；当前已通过用户实时截图反馈完成操作列与新增弹窗样式纠偏。

### 遗留问题

1. 新增人员弹窗当前为静态 Mock 保存，未接真实后端接口。
2. 编辑、查看入口当前保留提示，未展开详情弹窗或编辑回显。
3. 人员数据刷新后不持久化，符合当前静态 Mock 阶段边界。
4. 全量 `vue-tsc` 存量错误仍需单独治理。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：表格操作列如果在页面 slot 中直接写 icon-only，会绕过当前平台文字操作风格；表单录入控件如果不传 placeholder，会出现空白输入区。
2. 已通过平台层解决的问题：表格工具栏、右侧四工具图标、表头筛选、状态标签、弹窗、表单和录入控件均复用已有平台组件。
3. 仍是页面临时实现的问题：人员总览 Mock 数据、新增保存逻辑、编辑/查看提示和人员头像业务单元格仍在页面及专用数据源内。
4. 未来必须回收为平台组件的页面子组件：若多页面复用人员头像 + 姓名编号展示，可评估 `PlatformEntityCell`；若多页面复用人员新增表单，可评估人员表单业务组件。
5. 后续新页面禁止继续复制的实现：禁止在平台表格操作列中随意改成 icon-only，除非用户明确要求图标操作列；禁止录入控件缺失业务化 placeholder。
6. 应进入主题变量或统一样式入口的样式：本轮未新增主题变量；统计卡、表格、工具栏和弹窗继续读取现有平台 token。
7. 当前仍存在的页面级样式债务：人员统计卡栅格、人员头像单元格、新增弹窗两列表单布局仍属于页面布局样式，后续复用后再下沉。

## 2026-05-07

### 任务名称

今天结束收尾 - 规则复盘与项目全景管理阶段接续

### 完成内容

1. 按用户“今天结束”要求进入收尾，只更新接续文档，不继续扩展业务代码。
2. 复核本轮项目全景管理页面开发记录：`/project/contract` 已完成付款节点 ECharts mini bar + 下方文字；`/project/document`、`/project/evaluation` 已完成页面开发与治理记录；`/project/progress` 纠偏阶段仍处于暂停状态。
3. 按用户确认的复盘结论补充长期规则：新增平台组件、扩展平台组件能力、修改适配层、token 或全局样式入口前，必须单独说明原因、影响范围、替代方案和查询列表页模式判断，并等待用户确认。
4. 更新 `AGENTS.md` 和 `docs/decision-records.md`，明确“确认开发”不等于跳过组件映射、规则自检或平台组件新增确认。
5. 更新下一轮待办，把优先级收敛为先审计 `/project/progress` 未完成 diff，再做新页面视觉确认、平台组件新增确认规则执行和全量 `vue-tsc` 存量错误治理。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/contract`、`/project/progress`、`/project/document`、`/project/evaluation`
2. 页面内组件：`ContractPaymentMiniBar`
3. 平台组件/能力：`PlatformStatCard`、`PlatformStatusTag`、`PlatformTable`、`PlatformTableToolbar`、`PlatformFileList`、`PlatformFileItem`、`@vben/plugins/echarts`

### 验证结果

1. 本次收尾为文档更新，未重新启动浏览器做新的页面验证。
2. 收尾前 `/project/contract` 已用隔离 headless Chrome 验证：统计卡 `3` 张，合同卡片 `8` 张，ECharts canvas `8` 个，节点文字 `24` 个，旧纯列表 DOM 不存在，宽屏 grid 为 `3` 列，控制台无 error。
3. 收尾前 `/project/evaluation`、`/project/document` 等页面已有对应 HTTP、ESLint 与隔离浏览器验证记录，详见下方阶段日志。
4. 全量 `vue-tsc` 仍因既有模块错误失败；当前记录中失败范围不指向 `/project/contract` 的 mini bar 改动。

### 遗留问题

1. `/project/progress` 纠偏未完成，下一轮必须先审计当前 diff，再决定继续、回退或迁移。
2. `/project/contract` 的 ECharts mini bar 当前为页面内业务组件，若后续付款节点、验收节点、进度节点多页面复用，再评估是否下沉为平台节点图组件。
3. 需要用户视觉确认 `/project/contract` 付款节点 mini bar 的高度、颜色、文字密度和三列卡片布局。
4. 后续继续开发前必须先输出组件映射、规则自检、是否新增或扩展平台组件、是否符合查询列表页模式。
5. 全量 `vue-tsc` 存量错误仍需单独治理。

### 平台治理影响

1. 本次收尾未发现新的 ant-design-vue 原生组件问题。
2. `/project/contract` 继续复用 `PlatformStatCard` 和 `PlatformStatusTag`，付款节点图使用项目已有 `@vben/plugins/echarts`，未新增第三方 UI 库。
3. `ContractPaymentMiniBar` 当前保留为页面内业务组件，不作为平台组件完成项。
4. `/project/document` 暴露出的主要治理问题是新增 `PlatformFileList` / `PlatformFileItem` 前缺少单独确认，且“两列展示”这类小反馈落到平台组件能力扩展时没有先补简版组件映射。
5. 后续禁止在其他页面继续复制大段付款节点图样式；如果出现复用场景，应先输出组件映射并评估 `PlatformTimeline` / `PlatformStepList` / `PlatformProgress` 类平台能力。
6. 台账、记录、管理列表页面后续必须先判断是否应采用“查询区 + 工具栏 + 表格/列表 + 分页 + 批量操作”模式；不采用时必须说明原因并等待确认。

### 任务名称

今天结束收尾 - 进度页纠偏阶段暂停

### 完成内容

1. 按用户要求停止继续开发，进入收尾模式。
2. 停止本轮用于验证的本地 Vite 服务，避免收尾后继续占用端口。
3. 复盘 `/project/progress` 进度可视化跟踪页面实现方向，确认其应从“截图复刻页”纠偏为“查询列表页变体 + 平台组件治理验证页”。
4. 纠偏开发已开始但被中断：已新增一批平台组件雏形，并开始调整 `PlatformSearchForm` 与进度页数据源，但尚未完成页面重构、删除页面专用组件或重新验证。
5. 本次收尾只更新接续文档，不继续写业务代码。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/progress`
2. 已开始但未完成的组件方向：`PlatformProgress`、`PlatformViewToolbar`、`PlatformViewSwitch`、`PlatformStatusBoard`、`PlatformSection`、`PlatformEchartsPanel`
3. 已开始但未完成的源组件调整：`PlatformSearchForm` 支持 columns 配置，`project-progress-source.ts` 支持查询参数和筛选选项

### 验证结果

1. 本次收尾未做新的浏览器验证，因为用户明确要求今天结束并停止继续开发。
2. 本次收尾未做新的 ESLint、类型检查或构建验证；纠偏阶段代码处于未完成状态，不应视为可交付。
3. 之前 `/project/progress` 第一版曾完成过 HTTP 与隔离浏览器验证，但该验证不覆盖本次已开始的纠偏改动。

### 遗留问题

1. `/project/progress` 纠偏未完成：页面仍未改成“查询区 + 操作区 + 可视化结果区 + 状态区”的最终结构。
2. 页面专用组件 `project-progress-gantt-chart.vue`、`project-progress-board.vue` 尚未删除或迁移。
3. 已新增的平台组件雏形尚未完成接入、验证和文档化，下一轮必须先审计这些改动再决定保留、回退或继续。
4. 当前工作区还有多个既有/并行页面与平台组件改动，下一轮不要把所有 diff 都当成本轮进度页纠偏成果。

### 平台治理影响

1. 本轮确认 `/project/progress` 应作为平台组件治理样本，而不是继续局部还原截图。
2. 进度条、视图切换、状态看板、ECharts 面板等能力具备平台化价值，但本轮只进入雏形阶段，不能标记为完成。
3. 下一轮必须先输出最终组件映射和迁移/回退清单，再继续代码修改。

### 任务名称

合同与付款管理付款节点改为 ECharts mini bar

### 完成内容

1. 按用户确认，将 `/project/contract` 合同卡片内的付款节点区域从纯文字列表改为 ECharts mini bar + 下方节点文字。
2. 新增页面内业务组件 `ContractPaymentMiniBar`，封装 ECharts 渲染、tooltip、节点文字和金额展示。
3. 页面主体继续复用 `PlatformStatCard`、`PlatformStatusTag`，不新增平台组件，不修改平台源组件。
4. 保留下方合同卡片宽屏三列布局，只替换框选的付款节点表达方式。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/contract/index.vue`
2. `apps/web-antd/src/views/project/contract/components/contract-payment-mini-bar.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/contract`
2. 页面内业务组件：`ContractPaymentMiniBar`
3. 复用能力：`@vben/plugins/echarts`、`PlatformStatCard`、`PlatformStatusTag`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/contract/index.vue apps/web-antd/src/views/project/contract/project-contract-source.ts apps/web-antd/src/views/project/contract/components/contract-payment-mini-bar.vue`，结果通过。
2. 已执行 `./node_modules/.bin/vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`，仍因既有模块错误失败；失败列表不再包含 `/project/contract` 文件。
3. 已启动本地 Vite：`http://127.0.0.1:5673/`，并执行 `curl -I http://127.0.0.1:5673/project/contract`，返回 `200 OK`。
4. 已用隔离 headless Chrome 打开 `/project/contract` 并注入 Mock 登录态验证：统计卡 `3` 张，合同卡片 `8` 张，ECharts canvas `8` 个，节点文字 `24` 个，旧纯列表 DOM 不存在，宽屏卡片 grid 仍为 `3` 列，控制台无 error。

### 遗留问题

1. ECharts mini bar 当前为静态展示和 tooltip，不包含点击节点筛选、审批流跳转或详情联动。
2. 如果其他页面后续复用付款节点图，再评估是否下沉为平台组件。

### 任务名称

2026-05-07 今天结束收尾

### 完成内容

1. 复核本轮项目全景管理页面开发与治理记录，确认 `/project/progress`、`/project/document`、`/project/evaluation` 的完成记录已写入 `docs/project-log.md` 和 `docs/todo-next.md`。
2. 复核长期规则沉淀，确认“截图开发前规则自检”和“确认开发不等于跳过组件映射和规则自检”已同步写入 `AGENTS.md` 与 `docs/decision-records.md`。
3. 更新 `docs/todo-next.md`，将下一轮优先事项收敛到新页面视觉确认、`/project/evaluation` 治理后复核、以及全量 `vue-tsc` 存量错误治理。
4. 本次收尾不新增业务功能，不继续页面开发。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/progress`、`/project/document`、`/project/evaluation`
2. 平台组件：`PlatformTable`、`PlatformTableToolbar`、`PlatformSelect`、`PlatformFileList`、`PlatformFileItem`
3. 长期规则：截图开发前规则自检、组件映射与规则自检确认流程

### 验证结果

1. 收尾前已执行目标文件 ESLint，结果通过。
2. 收尾前已执行 `git diff --check`，结果通过。
3. 收尾前已执行 `/project/evaluation` HTTP 路由验证，返回 `200 OK`。
4. 收尾前已用独立 headless Chrome 验证 `/project/evaluation`：左右面板 2 个、工具栏 2 个、平台表格 1 个，工作区约 `1377px × 576px`。
5. 收尾前已执行全量 `vue-tsc`，仍因既有组件和演示页类型问题失败；失败列表不包含 `/project/evaluation` 和 `PlatformSelect` 改动。

### 遗留问题

1. 需要用户视觉确认 `/project/progress` 甘特图/看板、`/project/document` 两列文件列表、`/project/evaluation` 治理后的左右布局与右侧表格。
2. 全量 `vue-tsc` 仍存在既有类型错误，需要单独安排治理。
3. 浏览器控制台仍有 Vben `LayoutHeader` 既有 `clearPreferencesAndLogout` emits 警告，不属于本轮页面改动。
4. 本地 Vite 服务当前用于验证的地址为 `http://127.0.0.1:5672/`，下次接续必须重新确认端口状态。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：
   - `Select` 的 `popupClassName` 已废弃，应迁移到 `classes.popup.root`。
   - 原生 Table / Vxe Grid / 卡片列表并存时，若不通过 `PlatformTable` 或 Vxe 适配层统一，会造成查询、筛选、表格高度、工具栏和分页体验不一致。
   - 原型中的文件列表、记录列表、进度展示、看板卡片很容易被页面 scoped CSS 直接复刻，后续复用成本高。
2. 已通过平台层解决的问题：
   - `PlatformSelect` 已改用 `classes.popup.root`，避免继续触发 Antdv `popupClassName` 废弃警告。
   - `/project/evaluation` 的 `评估记录` 已从页面手写卡片改为 `PlatformTable`，并通过 `PlatformTableToolbar` 接入查询和筛选。
   - `/project/document` 的文件条目已通过 `PlatformFileList` / `PlatformFileItem` 下沉到平台层，文件图标、条目边框、hover 背景和下载按钮布局不再散落在页面。
   - `PlatformTableToolbar`、`PlatformStatCard`、`PlatformStatusTag`、`PlatformButton` 已作为项目全景管理页面的默认平台组件来源。
3. 仍是页面临时实现的问题：
   - `/project/evaluation` 左侧待评估项目仍是页面业务列表卡片，只治理了查询筛选入口，未抽平台列表组件。
   - `/project/progress` 甘特图组件和看板卡片仍属于页面专用实现，暂未形成平台视图切换、进度条或看板组件。
   - `/project/contract` 合同付款卡片和付款节点列表仍是页面局部实现，尚未回收为平台卡片/时间线/节点列表能力。
4. 未来必须回收为平台组件的页面子组件：
   - `PlatformProgress` 或统一进度展示组件，用于项目进度、付款节点进度和评估进度。
   - `PlatformEntityList` / `PlatformEntityCard`，用于待评估项目、项目付款卡片、看板卡片等实体列表。
   - `PlatformViewTabs` 或统一视图切换组件，用于甘特图 / 看板、列表 / 卡片等切换。
   - `PlatformTimeline` / `PlatformStepList`，用于付款节点、验收节点、评估流程节点。
5. 后续新页面禁止继续复制的实现：
   - 禁止继续复制页面内手写文件列表、下载条目和附件条目，应使用 `PlatformFileList` / `PlatformFileItem`。
   - 禁止把评估记录、历史记录、审批记录等查询列表继续写成纯页面卡片，默认先评估 `PlatformTable`。
   - 禁止为通用 Select 下拉样式继续使用 Antdv 废弃属性或页面级下拉 class。
   - 禁止在新页面重复写大段卡片 hover、边框、阴影、图标和按钮布局样式。
6. 应进入主题变量或统一样式入口的样式：
   - 实体卡片边框、hover 背景、卡片间距、卡片标题/副文本字号应进入平台组件或 token。
   - 进度条高度、轨道色、完成色、预警色应进入 `PlatformProgress` 或设计 token。
   - 记录列表分数颜色、成功/合格/预警等状态色应继续读取状态组件或 token，不在页面硬编码。
   - 看板列背景、列间距、卡片密度和空态样式应进入后续平台看板/实体列表组件。
7. 当前仍存在的页面级样式债务：
   - `/project/evaluation` 的待评估项目卡片、进度条轨道和左侧列表密度仍在页面 scoped CSS 中。
   - `/project/progress` 的甘特图容器、看板列、项目卡片和进度条仍是页面 scoped CSS。
   - `/project/contract` 的合同卡片、付款节点列表和金额布局仍是页面 scoped CSS。
   - `/project/document` 页面主体布局仍有页面级布局 CSS，但文件条目视觉已下沉平台层。

### 任务名称

中期评估与验收管理页面治理整改

### 完成内容

1. 按用户复盘意见暂停继续扩展业务功能，转入 `/project/evaluation` 页面治理整改。
2. 将右侧 `评估记录` 从页面手写卡片改为 `PlatformTable` 列表，并接入 `PlatformTableToolbar` 查询与结果筛选。
3. 左侧 `待评估项目` 接入 `PlatformTableToolbar`，补充关键词、阶段、状态筛选，保留用户明确要求的左右自适应布局和模块内部滚动。
4. 收敛页面 scoped CSS：删除右侧记录卡片样式、hover 阴影/位移等截图式视觉补丁，分数颜色改回平台 token。
5. 在平台源组件 `PlatformSelect` 中将 Antdv 已废弃的 `popup-class-name` 改为 `classes.popup.root`，并顺手修复该文件既有 ESLint 问题。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/evaluation/index.vue`
2. `apps/web-antd/src/components/platform/field/platform-select.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/evaluation`
2. 平台组件：`PlatformTable`、`PlatformTableToolbar`、`PlatformSelect`、`PlatformStatCard`、`PlatformStatusTag`、`PlatformButton`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/evaluation/index.vue apps/web-antd/src/views/project/evaluation/project-evaluation-source.ts apps/web-antd/src/components/platform/field/platform-select.vue apps/web-antd/src/mock/index.ts`，结果通过。
2. 已执行 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5672/project/evaluation`，返回 `200 OK`。
4. 已使用独立 headless Chrome 完成浏览器验证：页面标题可见，左右面板数量为 2，工具栏数量为 2，平台表格数量为 1，工作区宽度 `1377px`，高度 `576px`，左右列宽约 `500px / 853px`。
5. 已执行 `./node_modules/.bin/vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`，仍因既有模块错误失败，失败列表不包含本次 `/project/evaluation` 和 `PlatformSelect` 改动。

### 遗留问题

1. 浏览器控制台仍有 Vben `LayoutHeader` 既有 `clearPreferencesAndLogout` emits 警告，不指向本次页面和平台字段组件。
2. 左侧待评估项目仍保留业务列表卡片形态；后续如多页面复用，应再评估是否抽 `PlatformEntityList` 或 `PlatformProgress`。
3. 当前发起评估仍为前端模拟流程；评估详情、模板、附件、导出和真实接口待后续确认。

### 任务名称

截图开发前规则自检补充

### 完成内容

1. 复盘 `合同与付款管理` 页面开发中暴露的问题：确认开发后仍应先锁定截图还原范围、平台组件优先级、页面 CSS 范围和查询列表页模式。
2. 在 `AGENTS.md` 新增“截图开发前规则自检”，要求即使用户确认开发，也必须先输出规则自检并等待确认。
3. 在 `docs/decision-records.md` 新增长期决策，明确“确认开发不等于跳过组件映射和规则自检”。
4. 本轮只做治理文档补充，不继续业务页面开发。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 规则来源页面：`/project/contract`
2. 影响范围：后续所有截图、原型、Figma 页面开发任务

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 本轮为文档治理补充，未做浏览器验证。

### 遗留问题

1. 后续截图页面开发必须按新规则先输出组件映射表、文件归属表和规则自检表。
2. 如现有 `合同与付款管理` 页面需要按新规则回看，应另行做一次页面实现审计，不在本轮继续开发。

### 任务名称

项目全景管理 - 进度可视化跟踪页面右侧内容开发

### 完成内容

1. 按原型新增 `/project/progress` 进度可视化跟踪页面右侧内容。
2. 页面内支持“甘特图 / 看板”两个视图切换，默认展示甘特图。
3. 新增页面专用 Mock 数据源，承载项目进度、状态分组、月份范围、里程碑节点和预警空态。
4. 甘特图使用项目已有 `@vben/plugins/echarts` 的 `EchartsUI` / `useEcharts` 实现，不新增图表依赖。
5. 看板页按“待启动 / 进行中 / 已完成 / 已归档”四列展示项目卡片和进度条。
6. 将 Mock 菜单中 `进度可视化跟踪` 从空白占位页切换到真实页面组件。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/progress/index.vue`
2. `apps/web-antd/src/views/project/progress/project-progress-source.ts`
3. `apps/web-antd/src/views/project/progress/components/project-progress-gantt-chart.vue`
4. `apps/web-antd/src/views/project/progress/components/project-progress-board.vue`
5. `apps/web-antd/src/mock/index.ts`

### 涉及哪些页面或组件

1. 页面：`/project/progress`
2. 平台组件：`PlatformButton`
3. ECharts 插件：`@vben/plugins/echarts`
4. Mock 菜单：`项目全景管理 - 进度可视化跟踪`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/progress/index.vue apps/web-antd/src/views/project/progress/project-progress-source.ts apps/web-antd/src/views/project/progress/components/project-progress-gantt-chart.vue apps/web-antd/src/views/project/progress/components/project-progress-board.vue apps/web-antd/src/mock/index.ts`，结果通过。
2. 已执行 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5672/project/progress`，返回 `200 OK`。
4. 已使用独立 headless Chrome 完成浏览器验证：Mock 登录后进入 `/project/progress`，甘特图页存在 1 个 ECharts canvas，未检测到 Vite error overlay 或 console error。
5. 已点击“看板”视图验证，四列状态和 15 张项目卡片正常渲染，未检测到 Vite error overlay 或 console error。
6. 已执行 `./node_modules/.bin/vue-tsc --noEmit --skipLibCheck -p apps/web-antd/tsconfig.json`，仍因既有模块错误失败，失败列表不再包含本次新增的 `/project/progress` 文件。

### 遗留问题

1. 甘特图当前基于 ECharts bar + line symbol 组合实现；如后续要求拖拽、缩放或更复杂的里程碑交互，可再评估是否扩展 ECharts 注册能力。
2. 当前数据为页面专用 Mock 数据源；后续真实接口可用后，需要按接口结构切换数据来源。
3. 当前看板只做展示，不包含拖拽流转、点击详情、筛选或权限控制。
4. 本轮未抽 `PlatformViewTabs` 或 `PlatformProgress`，后续多页面复用后再评估平台化。

### 任务名称

文档与台账管理文档列表改为一行两列

### 完成内容

1. 给 `PlatformFileList` 新增 `columns` 列数配置，默认仍为单列，避免影响其他未来文件列表场景。
2. `/project/document` 页面将文件列表配置为两列展示，提高宽屏空间利用率。
3. 移动端和窄屏下仍自动回落为单列，避免文件名和下载按钮拥挤。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/file/platform-file-list.vue`
2. `apps/web-antd/src/views/project/document/index.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/document`
2. 平台组件：`PlatformFileList`

### 验证结果

1. 已执行目标文件 ESLint，结果通过。
2. 已用独立 Playwright headless Chrome 访问 `/project/document`，确认文件列表为两列，`gridTemplateColumns` 为 `547px 547px`，文件项数量为 `12`，控制台无错误。

### 遗留问题

1. 当前只调整列表密度；分类筛选、预览和真实接口仍待后续确认。

### 任务名称

项目全景管理 - 中期评估与验收管理页面右侧内容开发

### 完成内容

1. 按原型新增 `/project/evaluation` 中期评估与验收管理页面右侧内容。
2. 新增页面专用 Mock 数据源，承载待评估项目、评估记录、评估状态、评分和顶部统计卡数据。
3. 顶部统计卡复用 `PlatformStatCard`，展示已评估项目、待评估项目和平均评估得分。
4. 下方主体改为左右自适应布局：左侧为待评估项目，右侧为评估记录。
5. 左右模块根据浏览器高度占满剩余内容区，内容超出时在模块内部滚动。
6. 新增“发起评估”弹窗，支持从顶部按钮或待评估项目卡片带入项目后生成评估记录。
7. 将 Mock 菜单中 `中期评估与验收` 从空白占位页切换到真实页面组件。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/evaluation/index.vue`
2. `apps/web-antd/src/views/project/evaluation/project-evaluation-source.ts`
3. `apps/web-antd/src/mock/index.ts`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/evaluation`
2. 平台组件：`PlatformStatCard`、`PlatformStatusTag`、`PlatformButton`、`PlatformModal`、`PlatformEditForm`、`PlatformFormItem`、`PlatformInput`、`PlatformSelect`
3. Mock 菜单：`项目全景管理 - 中期评估与验收`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/evaluation/index.vue apps/web-antd/src/views/project/evaluation/project-evaluation-source.ts apps/web-antd/src/mock/index.ts`，结果通过。
2. 已执行 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5672/project/evaluation`，返回 `200 OK`。
4. 已使用独立 headless Chrome 完成浏览器验证：Mock 登录后进入 `/project/evaluation`，页面标题可见，左右面板数量为 2，工作区宽度 `1377px`，高度 `576px`，左右列宽约 `500px / 853px`，控制台错误为 0。
5. 已执行 `./node_modules/.bin/vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`，仍因既有模块和并行页面类型问题失败，失败列表不再包含本次新增的 `/project/evaluation` 文件。

### 遗留问题

1. 当前页面使用专用 Mock 数据源；后续真实接口可用后，需要按接口结构切换数据来源。
2. 发起评估流程当前为前端模拟生成记录，正式业务中的评估模板、审批流、验收附件和详情页仍需后续设计确认。
3. 未开发“评估详情 / 导出 / 模板配置”等扩展入口。

### 任务名称

项目全景管理 - 文档与台账管理页面右侧内容开发

### 完成内容

1. 按用户提供原型新增 `/project/document` 文档与台账管理页面右侧内容。
2. 新增 `PlatformFileList`、`PlatformFileItem` 平台文件列表薄封装，统一文件图标、文件名、元信息和下载按钮样式。
3. 新增页面专用 Mock 数据源，承载文档统计、文件列表、导出台账、批量上传和下载模拟逻辑。
4. 顶部统计卡复用 `PlatformStatCard`，文档总数、合同文件、技术文档、数据报表数值对齐原型。
5. 将 Mock 菜单中 `文档与台账管理` 从空白占位页切换到真实页面组件。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/file/index.ts`
2. `apps/web-antd/src/components/platform/file/platform-file-item.vue`
3. `apps/web-antd/src/components/platform/file/platform-file-list.vue`
4. `apps/web-antd/src/components/platform/file/types.ts`
5. `apps/web-antd/src/components/platform/index.ts`
6. `apps/web-antd/src/views/project/document/index.vue`
7. `apps/web-antd/src/views/project/document/project-document-source.ts`
8. `apps/web-antd/src/mock/index.ts`
9. `AGENTS.md`
10. `docs/decision-records.md`
11. `docs/project-log.md`
12. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/document`
2. 平台组件：`PlatformFileList`、`PlatformFileItem`、`PlatformStatCard`、`PlatformButton`
3. Mock 菜单：`项目全景管理 - 文档与台账管理`

### 验证结果

1. 已执行目标文件 ESLint，结果通过。
2. 已执行 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5174/project/document`，返回 `200 OK`。
4. 已用独立 Playwright headless Chrome 完成 Mock 登录后访问 `/project/document`，页面显示 4 张统计卡和 12 条文件项，控制台无错误。
5. 已执行 `./node_modules/.bin/vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`，失败项均为既有模块类型问题，未指向本次新增文件。

### 遗留问题

1. 当前批量上传、导出台账和下载为前端模拟逻辑；后续真实接口可用后，需要切换到接口调用。
2. 当前仅按原型实现右侧内容，未新增详情、分类筛选、权限控制和真实文件预览流程。
3. 全量 `vue-tsc` 仍存在既有类型错误，后续需要另行治理。

### 任务名称

项目全景管理 - 合同与付款管理页面右侧内容开发

### 完成内容

1. 按原型新增 `/project/contract` 合同与付款管理页面右侧内容。
2. 新增页面专用 Mock 数据源，承载合同金额、付款节点、付款状态和顶部统计卡数据。
3. 顶部统计卡复用 `PlatformStatCard`，统计值对齐原型：合同总额 `20.4亿`、已付金额 `12.4亿`、待审批付款 `4笔`。
4. 下方项目付款卡片列表改为宽屏三列布局，中屏两列，小屏一列。
5. 将 Mock 菜单中 `合同与付款管理` 从空白占位页切换到真实页面组件。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/contract/index.vue`
2. `apps/web-antd/src/views/project/contract/project-contract-source.ts`
3. `apps/web-antd/src/mock/index.ts`

### 涉及哪些页面或组件

1. 页面：`/project/contract`
2. 平台组件：`PlatformStatCard`、`PlatformStatusTag`
3. Mock 菜单：`项目全景管理 - 合同与付款管理`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/contract/index.vue apps/web-antd/src/views/project/contract/project-contract-source.ts apps/web-antd/src/mock/index.ts`，结果通过。
2. 已执行 `git diff --check`，结果通过。
3. 已启动本地 Vite：`http://127.0.0.1:5670/`。
4. 已执行 `curl -I http://127.0.0.1:5670/project/contract`，返回 `200 OK`。
5. 已用隔离 headless Chrome 打开 `/project/contract` 并注入 Mock 登录态验证：页面标题为“合同与付款管理”，统计卡数量 `3`，项目付款卡片数量 `8`，宽屏下卡片 grid 为 `3` 列，控制台无 error。
6. 已执行应用级 `vue-tsc`，结果未通过；当前输出不再包含 `apps/web-antd/src/views/project/contract`，剩余错误来自既有组件、演示页和并行的 `project/evaluation` 页面改动。

### 遗留问题

1. 当前页面使用专用 Mock 数据源；后续真实接口可用后，需要按接口结构切换数据来源。
2. 页面暂不包含新增、编辑、审批、详情跳转等操作，后续需根据业务流程继续确认。
3. 应用级 `vue-tsc` 仍有存量/并行改动错误，后续如需要完整类型验收，应另开任务集中处理。

### 任务名称

2026-05-07 今天结束收尾

### 完成内容

1. 复核本轮平台组件改造记录，确认表格边缘留白、外描边、模块间距和工具栏内边距均已写入接续文档。
2. 复核长期决策，确认平台表格外描边、表格边缘列内边距、固定列 `scroll.x` 同步策略和平台模块 24px 间距已写入 `docs/decision-records.md`。
3. 更新 `docs/todo-next.md`，将下一轮优先事项收敛到浏览器视觉复核和平台表格真实页面继续抽查。
4. 本次收尾不新增代码变更，只做接续文档整理。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`、`/project/information`
2. 平台组件：`PlatformTable`、`PlatformTableToolbar`、`PlatformStatCard`
3. 平台 token：表格、模块间距和统计卡相关 token

### 验证结果

1. 收尾前已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table.vue`，结果通过。
2. 收尾前已执行 `git diff --check`，结果通过。
3. 收尾前已执行 `curl -I http://127.0.0.1:5173/project/information`，返回 `200 OK`。
4. 收尾前已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。

### 遗留问题

1. 需要用户在内置浏览器刷新 `/workbench/index` 与 `/project/information` 后，人工确认横向滚动时表头与表体是否完全同步。
2. 当前仍未做截图级自动化视觉回归；后续如果浏览器自动化链路可用，应补一次横向滚动、fixed 操作列 hover、边缘留白和工具栏内距的视觉回归。
3. 未接入 `PlatformTable` 的 Vxe Grid 或原生 Antdv Table 页面，不继承本轮平台表格边缘内距与外描边规则。

### 任务名称

平台表格边缘列内边距统一为 24px

### 完成内容

1. 新增 `--st-table-edge-cell-padding: 24px` 表格边缘单元格内边距 token。
2. 新增 `--st-table-action-column-width: 184px` 操作列默认宽度 token。
3. 在 `PlatformTable` 源组件中统一第一列和最后一列 `th/td` 的左右内边距。
4. 在 `PlatformTable` 源组件中识别 `key === 'action'` 或标题为“操作”的列，默认使用平台操作列宽度。
5. 同步处理表头和表体，避免只调表头导致列内容错位。
6. 修复横向滚动时表头错位晃动：不再用 `th:last-child` 命中 Antdv 表头 scrollbar 占位格，改为给平台操作列加专用 class。
7. 固定列存在时，`PlatformTable` 自动按叶子列宽合成 `scroll.x`，让表头和表体共用稳定横向滚动模型。
8. 操作列默认宽度在组件内使用数值 `184`，避免表格库列宽同步时读取 CSS var 字符串导致抖动。
9. 本轮不在 `/project/information` 或 `/workbench/index` 写页面级样式。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table.vue`
2. `packages/@core/base/design/src/design-tokens/default.css`
3. `docs/decision-records.md`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformTable`
2. 当前验证页：`/project/information`
3. 同类受益页：使用 `PlatformTable` 的页面，包括 `/workbench/index`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table.vue`，结果通过。
2. 已执行 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/project/information`，返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。
5. 已复查 `PlatformTable` 源码，不再使用 `last-child` 命中末列表头，避免误作用到 Antdv 横向/纵向滚动时的表头 scrollbar 占位格。

### 遗留问题

1. 未接入 `PlatformTable` 的 Vxe Grid 或原生 Antdv Table 页面不继承本次边缘内边距，后续如需要统一需另走 Vxe 适配层或原生组件治理。

### 任务名称

平台表格外描边 token 与源组件样式补充

### 完成内容

1. 新增 `--st-color-table-outline` 表格外描边颜色 token。
2. 明亮主题默认使用 `--st-color-border-control`，暗色主题覆盖为 `--border`。
3. 在 `PlatformTable` 源组件中给 `.ant-table-container` 增加 1px 外描边和统一圆角。
4. 本轮不在 `/project/information` 或 `/workbench/index` 写页面级边框补丁。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table.vue`
2. `packages/@core/base/design/src/design-tokens/default.css`
3. `packages/@core/base/design/src/design-tokens/dark.css`
4. `docs/decision-records.md`
5. `docs/project-log.md`
6. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformTable`
2. 当前验证页：`/project/information`
3. 同类受益页：使用 `PlatformTable` 的页面，包括 `/workbench/index`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table.vue`，结果通过。
2. 已执行 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/project/information`，返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。

### 遗留问题

1. 未接入 `PlatformTable`、仍直接使用原生 Antdv Table 或 Vxe Grid 的页面不会继承本次外描边，需要后续按平台接入情况分别处理。

### 任务名称

平台模块默认间距与内容内边距统一为 24px

### 完成内容

1. 新增平台间距 token：`--st-layout-section-gap: 24px`、`--st-module-content-padding: 24px`。
2. 将 `Page` 默认内容容器从 Tailwind `p-4` 改为读取平台模块内容内边距变量。
3. 将 `.platform-surface` 默认内容 padding 接入 `--st-module-content-padding`。
4. 将 `PlatformTableToolbar` 默认 bleed 偏移、左右内边距、下方间距接入平台间距变量；工具栏上下内边距按原组件视觉节奏保持 `12px`。
5. 将 `PlatformStatCard` 内容 padding 接入平台模块内容内边距变量。
6. 将 `/workbench/index` 和 `/project/information` 的页面区块 gap、统计卡区块 gap 接入 `--st-layout-section-gap`，不在页面继续硬编码模块级 `16px`。

### 修改了哪些文件

1. `packages/@core/base/design/src/design-tokens/default.css`
2. `packages/effects/common-ui/src/components/page/page.vue`
3. `packages/effects/common-ui/src/components/page/__tests__/page.test.ts`
4. `packages/styles/src/antd/index.css`
5. `apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`
6. `apps/web-antd/src/components/platform/stat/platform-stat-card.vue`
7. `apps/web-antd/src/views/project/overview/index.vue`
8. `apps/web-antd/src/views/project/information/index.vue`
9. `AGENTS.md`
10. `docs/decision-records.md`
11. `docs/project-log.md`
12. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台 token：设计 token 默认值。
2. 通用 Page 内容容器：所有使用 `Page` 且未覆盖 `contentClass` padding 的页面。
3. 平台模块容器：`.platform-surface`。
4. 平台组件：`PlatformTableToolbar`、`PlatformStatCard`。
5. 当前验证页：`/workbench/index`、`/project/information`。

### 验证结果

1. 已执行目标文件 ESLint，结果通过。
2. 已执行 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/project/information`，返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。

### 遗留问题

1. 仍有旧示例页、登录/个人中心、表单字段内部间距等非平台模块级 `p-4` / `gap-4`，本轮不作为平台模块间距清理范围。
2. 本轮未做截图级浏览器自动化验证；已保持不操作用户当前 Chrome。

### 任务名称

左侧导航菜单项高度与左侧距离源组件修正

### 完成内容

1. 按用户批注修正左侧导航栏源组件样式，不在 `/project/information` 页面写局部样式。
2. 在 `menu-ui` 源组件中将垂直展开态菜单项高度统一为 `52px`。
3. 将垂直展开态一级菜单项和一级子菜单标题左侧距离统一为 `24px`。
4. 修正范围限定在垂直展开态菜单，不影响顶部横向菜单和左侧收起态菜单。

### 修改了哪些文件

1. `packages/@core/ui-kit/menu-ui/src/components/menu.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 源组件：`@vben-core/menu-ui` 的 `Menu`
2. 当前验证页：`/project/information`
3. 同类受益页面：所有使用左侧展开菜单的页面

### 验证结果

1. 已执行 `./node_modules/.bin/eslint packages/@core/ui-kit/menu-ui/src/components/menu.vue`，结果通过。
2. 已执行 `./node_modules/.bin/vue-tsc -p packages/@core/ui-kit/menu-ui/tsconfig.json --noEmit --skipLibCheck --pretty false`，结果通过。
3. 已执行目标文件 `git diff --check`，结果通过。
4. 已执行 `curl -I http://127.0.0.1:5173/project/information`，返回 `200 OK`。

### 遗留问题

1. 需要在当前内置浏览器刷新后确认批注位置：菜单项高度为 52px，内容左侧距离为 24px。

### 任务名称

平台表格固定操作列 hover 透明问题修复

### 完成内容

1. 排查 `/project/information` 鼠标移入表格行时，固定右侧操作列背景透明导致下方内容透出的视觉问题。
2. 确认问题属于 `PlatformTable` 固定列通用样式，不在业务页面写局部覆盖。
3. 新增 `--st-color-table-cell-bg`、`--st-color-table-header-bg`、`--st-color-table-row-hover-bg-solid`，为 fixed 列提供实心背景 token。
4. 在 `PlatformTable` 源组件中覆盖 `.ant-table-cell-fix-left`、`.ant-table-cell-fix-right`、`.ant-table-cell-fix-left-last`、`.ant-table-cell-fix-right-first` 的默认、表头、hover、selected 和 `ant-table-cell-row-hover` 组合状态。
5. 按用户补充判断，将 fixed 单元格拆成纯白/卡片实心底色层和 hover 实心浅绿层：`::before` 保持实心底色，`::after` 承载 hover/selected 背景。
6. fixed 单元格默认背景、hover 背景和伪元素遮罩层均使用不透明背景色，不再使用透明色或 `color-mix`。
7. 提升 fixed cell 层级，并让单元格内部操作按钮处于背景遮罩层之上。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table.vue`
2. `packages/@core/base/design/src/design-tokens/default.css`
3. `packages/@core/base/design/src/design-tokens/dark.css`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformTable`
2. 当前验证页：`/project/information`
3. 同类受益页：使用 `PlatformTable` fixed 列的页面，包括 `/workbench/index`

### 验证结果

1. 已执行目标文件 ESLint，结果通过。
2. 已执行目标文件 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/project/information`，返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。
5. 已执行应用级 `vue-tsc`，仍失败于项目既有 `tenant-toggle`、`tinymce`、`workflow`、演示页等类型错误；输出未指向本轮修改的 `PlatformTable`。

### 遗留问题

1. 本地 Playwright CLI 存在，但隔离 Chromium 未安装；申请下载 Chromium 被自动审批服务拒绝。本轮未使用用户系统 Chrome，截图级 hover 验证需用户刷新当前内置浏览器后确认。

### 任务名称

项目信息管理页面筛选入口平台化修正

### 完成内容

1. 按用户反馈移除 `/project/information` 工具栏中的 `全部状态`、`全部类型` 下拉筛选。
2. 将 `项目类型`、`状态` 两列表头接入 `PlatformTable` 的表头筛选能力。
3. 继续复用平台表头筛选的“全部”选项、点击即生效、无 Antdv 默认“重置 / 确定”按钮规则。
4. 工具栏保留新建、搜索、刷新、设置和全屏，不照搬原型筛选布局。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/information/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/information`
2. 平台组件：`PlatformTableToolbar`、`PlatformTable`

### 验证结果

1. 已执行目标文件 ESLint，结果通过。
2. 已执行目标文件 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/project/information`，返回 `200 OK`。

### 遗留问题

1. 仍需在隔离浏览器可用后补一次点击级验证，确认表头筛选浮层视觉与项目总览一致。

### 任务名称

项目信息管理页面第一版开发

### 完成内容

1. 在 `项目全景管理` 左侧菜单中保留 `项目总览` 为第一项，并新增 `项目信息管理`。
2. 新增 `/project/information` 页面，作为委外项目主数据管理入口。
3. 新增页面专用 Mock 数据源，包含项目基础信息、招采信息和进场信息字段。
4. 页面支持按项目名称、项目编号、负责人关键字搜索，并支持项目类型、项目状态筛选。
5. 表格展示项目编号、项目名称、项目类型、承包商、合同金额、招采方式、状态和操作。
6. 新建、编辑使用居中 `PlatformModal`；归档、删除均带二次确认；详情入口保留为轻提示，未过度开发复杂详情 UI。
7. 其他项目菜单暂时复用 `platform/blank/index`，未新增业务页面。

### 修改了哪些文件

1. `apps/web-antd/src/mock/index.ts`
2. `apps/web-antd/src/views/project/information/index.vue`
3. `apps/web-antd/src/views/project/information/project-information-source.ts`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/project/information`
2. 保留页面：`/workbench/index`
3. 平台组件：`PlatformTableToolbar`、`PlatformTable`、`PlatformModal`、`PlatformEditForm`、`PlatformFormItem`、`PlatformInput`、`PlatformSelect`、`PlatformStatusTag`、`PlatformButton`

### 验证结果

1. 已执行目标文件 ESLint，结果通过。
2. 已执行 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。
4. 已执行 `curl -I http://127.0.0.1:5173/project/information`，返回 `200 OK`。
5. 已执行 `vue-tsc`，仍失败于项目既有 `tenant-toggle`、`tinymce`、`workflow`、演示页等类型错误；输出未指向本轮新增项目信息管理页面。

### 遗留问题

1. 本轮未做隔离浏览器点击级验证；待 Browser Use IAB 或隔离 Chromium 可用后，补查新建、编辑、删除确认和菜单切换。
2. 详情入口当前只保留轻提示，后续需要结合详情页设计决定右侧抽屉或下钻详情页。
3. 项目类型和状态当前为页面专用 Mock 数据，后续有正式字典接口后再切换。

### 任务名称

项目总览页组件映射文档补充与验证复核

### 完成内容

1. 将 `docs/decision-records.md` 中项目总览页决策压缩为一条简短长期决策。
2. 新增 `docs/page-component-mapping.md`，记录 `/workbench/index` 的组件映射表、CSS 边界、已沉淀平台能力、暂留页面内容和后续可整理事项。
3. 将 `PlatformTable` 筛选 helper、全屏下沉、`PlatformEntityCell`、`PlatformProgress`、`PlatformDescriptions` 等事项记录为后续待办，本轮未拆组件、未新增组件、未继续调 UI。

### 修改了哪些文件

1. `docs/decision-records.md`
2. `docs/page-component-mapping.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`
2. 平台组件：`PlatformStatCard`、`PlatformTableToolbar`、`PlatformTable`
3. 暂不抽组件：`PlatformEntityCell`、`PlatformProgress`、`PlatformDescriptions`、`PlatformActionGroup`

### 验证结果

1. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。
2. 已尝试 Browser Use IAB 隔离浏览器验证，但当前未发现可用 Codex IAB backend。
3. 已检查本地 Playwright 命令存在，但隔离 Chromium 可执行文件未安装；安装授权未通过自动审批，本轮未绕路使用系统 Chrome。
4. 已做源码级复核：搜索、类型/状态表头筛选、分页 change、新建/编辑弹窗、详情抽屉、归档/删除确认、自适应高度和全屏入口均有对应组件和事件接线。
5. 已执行 `git diff --check`，结果通过。

### 遗留问题

1. 本轮未完成真实浏览器点击级验证；待 Browser Use IAB 恢复或用户明确允许安装隔离 Chromium 后，再补一次 `/workbench/index` 交互回归。

### 任务名称

项目总览页统计卡标题与趋势文字统一

### 完成内容

1. 将 `PlatformStatCard` 标题颜色改为黑色文本变量 `--foreground`。
2. 将 `PlatformStatCard` 趋势文字统一加粗。
3. 本轮修改在统计卡源组件生效，项目总览页 5 个统计卡同步变化。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/stat/platform-stat-card.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`
2. 平台组件：`PlatformStatCard`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/stat/platform-stat-card.vue`，结果通过。
2. 已执行 `git diff --check -- apps/web-antd/src/components/platform/stat/platform-stat-card.vue`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。

### 遗留问题

1. 仍需在浏览器中视觉确认 5 个统计卡标题和趋势文字均已同步变化。

### 任务名称

项目总览页统计卡头部下间距移除

### 完成内容

1. 删除 `PlatformStatCard` 源组件中 `.platform-stat-card__header` 的 `margin-bottom: 10px;`。
2. 本轮只修改统计卡平台组件源头，不在项目总览页 scoped CSS 中做覆盖。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/stat/platform-stat-card.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`
2. 平台组件：`PlatformStatCard`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/stat/platform-stat-card.vue`，结果通过。
2. 已执行 `git diff --check -- apps/web-antd/src/components/platform/stat/platform-stat-card.vue`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。

### 遗留问题

1. 仍需在隔离浏览器链路恢复后截图复核统计卡标题、数值和图标之间的视觉间距。

### 任务名称

项目总览页表格高度浏览器自适应

### 完成内容

1. 在 `PlatformTable` 源组件中增加默认自适应高度计算。
2. 表格 body 最大高度跟随浏览器视口和当前表格位置自动计算，内容超出时表格内部上下滚动。
3. 如果调用方显式传入 `scroll.y`，优先使用调用方设置；默认列表页不需要在业务页面硬编码高度。

### 修改了哪些文件

1. `AGENTS.md`
2. `apps/web-antd/src/components/platform/table/platform-table.vue`
3. `docs/decision-records.md`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`
2. 平台组件：`PlatformTable`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table.vue apps/web-antd/src/views/project/overview/index.vue apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`，结果通过。
2. 已执行 `git diff --check -- apps/web-antd/src/components/platform/table/platform-table.vue apps/web-antd/src/views/project/overview/index.vue docs/project-log.md docs/todo-next.md`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。

### 遗留问题

1. 仍需在隔离浏览器链路恢复后，确认长列表在不同浏览器高度下的内部滚动表现。

### 任务名称

项目总览页补回右侧全屏工具按钮

### 完成内容

1. 恢复 `PlatformTableToolbar` 默认的 `fullscreen` 工具按钮在项目总览页可见。
2. 将项目总览页表格容器接入浏览器 Fullscreen API，点击全屏按钮后进入或退出全屏展示。
3. 保持平台工具栏源组件默认四按钮存在，当前页面未显式隐藏全屏。

### 修改了哪些文件

1. `apps/web-antd/src/views/project/overview/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`
2. 平台组件：`PlatformTableToolbar`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/project/overview/index.vue apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`，结果通过。
2. 已执行 `git diff --check -- apps/web-antd/src/views/project/overview/index.vue apps/web-antd/src/components/platform/table/platform-table-toolbar.vue docs/project-log.md docs/todo-next.md`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。

### 遗留问题

1. 仍需在隔离浏览器链路恢复后，截图确认全屏按钮是否回到四按钮默认态，并能正确进入/退出全屏。

### 任务名称

项目总览页搜索框展开高度调整

### 完成内容

1. 将 `PlatformTableToolbar` 展开后的搜索输入框高度约束为 `--st-control-height`。
2. 该高度与设计 token 一致，当前默认值为 `36px`，不在页面 scoped CSS 中额外覆盖。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`
2. 平台组件：`PlatformTableToolbar`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`，结果通过。
2. 已执行 `git diff --check -- apps/web-antd/src/components/platform/table/platform-table-toolbar.vue docs/project-log.md docs/todo-next.md`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。

### 遗留问题

1. 仍需在隔离浏览器链路恢复后，确认搜索框展开后的实际高度与图标/占位文本对齐。

### 任务名称

项目总览页表格工具栏内距与工具间距微调

### 完成内容

1. 复核 `PlatformTableToolbar` 源组件，确认工具栏主体 `padding` 已为 `10px 12px`。
2. 将 `PlatformTableToolbar` 的 actions / tools 按钮组间距从 `8px` 调整为 `12px`。
3. 本轮只修改平台表格工具栏源组件，不在项目总览页 scoped CSS 中写局部覆盖。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`
2. 平台组件：`PlatformTableToolbar`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`，结果通过。
2. 已执行 `git diff --check -- apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。

### 遗留问题

1. 仍需在隔离浏览器链路恢复后，对工具栏内距和按钮组间距做截图级复核。

### 任务名称

项目总览页统计卡图标尺寸组件化优化

### 完成内容

1. 将 `PlatformStatCard` 右上角图标外框尺寸从组件内硬编码调整为平台组件变量，默认读取设计 token。
2. 新增统计卡图标尺寸 token：外框默认 `48px`，内部图标默认 `2rem`。
3. 为 `PlatformStatCard` 增加可选 `iconBoxSize` / `iconSize` props，后续特殊场景可覆盖尺寸，但当前项目总览页不需要页面级样式。
4. 保留统计卡原有 `type` / `color` 色彩逻辑、背景、边框、阴影和 hover 效果。
5. 将统计卡图标尺寸平台化规则同步到 `AGENTS.md` 和 `docs/decision-records.md`。

### 修改了哪些文件

1. `AGENTS.md`
2. `apps/web-antd/src/components/platform/stat/platform-stat-card.vue`
3. `packages/@core/base/design/src/design-tokens/default.css`
4. `docs/decision-records.md`
5. `docs/project-log.md`
6. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`
2. 平台组件：`PlatformStatCard`
3. 平台 token：`--st-stat-card-icon-box-size`、`--st-stat-card-icon-size`

### 验证结果

1. 已执行目标文件 ESLint，结果通过。
2. 已执行 `git diff --check`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。
4. Browser Use in-app backend 近期不可用，本轮未操作用户系统 Chrome，因此未做截图级视觉验证。

### 遗留问题

1. 仍需在隔离浏览器链路恢复后，对 `/workbench/index` 统计卡右上角图标外框 48px、内部图标 2rem 做截图级复核。

### 任务名称

项目总览页表头筛选全部项与无按钮交互统一

### 完成内容

1. 在 `PlatformTable` 源组件内接管 `column.filters` 的筛选面板渲染，统一加入“全部”选项。
2. 让空筛选状态默认视为“全部”选中，避免筛选面板初次打开没有默认项。
3. 去掉筛选面板里的 Antdv 默认“重置 / 确定”按钮，改为点击筛选项立即应用并关闭或保持面板。
4. 将筛选项的 hover / 选中背景统一为品牌绿 10% 透明度，避免 hover 和选中两套背景不一致。
5. 该交互已写入 `AGENTS.md` 和 `docs/decision-records.md`，作为后续列表页复用规则。

### 修改了哪些文件

1. `AGENTS.md`
2. `apps/web-antd/src/components/platform/table/platform-table.vue`
3. `docs/decision-records.md`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`
2. 平台组件：`PlatformTable`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table.vue apps/web-antd/src/views/project/overview/index.vue`，结果通过。
2. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。
3. 已执行 `git diff --check`，结果通过。
4. `vue-tsc` 仍存在项目既有错误，但本轮新增 `PlatformTable` 相关错误已清理完毕。

### 遗留问题

1. 仍需等隔离浏览器链路恢复后复核实际 dropdown 视觉，尤其是“全部”默认选中和 hover/选中背景一致性。

### 任务名称

项目总览页表格工具栏排序与搜索折叠平台化

### 完成内容

1. 按用户批注移除项目总览页表格工具栏标题，不再显示“项目列表”。
2. 将 `PlatformTableToolbar` 的业务 actions 区移到工具栏最左侧，并通过源组件样式兜底 `type="primary"` 主按钮优先排序。
3. 将项目总览页“新建项目”“导出”改为 `scene="toolbar"` 平台按钮场景，保持主按钮在左、次要按钮在后。
4. 将工具栏搜索改为右侧圆形工具图标；点击搜索图标展开输入框，再次点击收起，搜索提交仍由输入框 change / enter 触发。
5. 调整 `PlatformTableToolbar` 的默认 bleed 行为，让工具栏背景贴满承载容器的上、左、右边缘，下方表格仍保留原有间距。
6. 调整 `PlatformButton` 的 toolbar circle 场景：刷新、设置等圆形工具按钮默认无描边，hover / focus 时出现品牌绿描边、品牌绿图标和 10% 绿底。
7. 将表格工具栏主按钮排序和搜索折叠规则同步到 `AGENTS.md` 与 `docs/decision-records.md`。

### 修改了哪些文件

1. `AGENTS.md`
2. `apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`
3. `apps/web-antd/src/components/platform/button/platform-button.vue`
4. `apps/web-antd/src/views/project/overview/index.vue`
5. `packages/@core/base/design/src/design-tokens/default.css`
6. `packages/@core/base/design/src/design-tokens/dark.css`
7. `docs/decision-records.md`
8. `docs/project-log.md`
9. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`，菜单名 `项目全景管理 - 项目总览`
2. 平台组件：`PlatformTableToolbar`、`PlatformButton`
3. 平台 token：`--st-color-table-tool-hover-*`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table-toolbar.vue apps/web-antd/src/components/platform/button/platform-button.vue apps/web-antd/src/views/project/overview/index.vue`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。
4. 已执行 `./node_modules/.bin/vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`，仍失败于项目既有类型错误；本轮修改文件未出现在错误列表中。
5. 已尝试使用 Codex 内置 Browser Use 验证当前页，但 IAB backend 初始化超时；本地 Playwright 依赖存在但浏览器二进制未安装，未使用系统 Chrome，避免打断用户当前浏览器。

### 遗留问题

1. 仍需在隔离浏览器链路恢复后补一次截图级复核：工具栏背景贴边、业务按钮左对齐、搜索展开/收起、刷新/设置 hover 态。

### 任务名称

本地预览打开规则沉淀：5173 / 5174 优先，避开 5000

### 完成内容

1. 确认 `http://localhost:5000/` 当前返回 macOS AirTunes `403 Forbidden`，不是本项目 Vite 预览服务。
2. 确认 `5173/5174` 均不可达时，应从 `apps/web-antd` 启动 Vite。
3. 已使用 `../../node_modules/.bin/vite --mode development` 启动本项目开发服务，Vite 输出本地地址 `http://localhost:5173/`。
4. 已将本地预览快速打开规则写入 `AGENTS.md`，并把长期决策同步到 `docs/decision-records.md`。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`、`/platform/typical-page`
2. 运行入口：`apps/web-antd`

### 验证结果

1. 已执行 `curl -I http://127.0.0.1:5000/`，返回 `403 Forbidden`，服务标识为 AirTunes。
2. 已执行 `curl -I http://127.0.0.1:5173/`，返回 `200 OK`。
3. 用户已在 Codex 内置浏览器打开 `http://127.0.0.1:5173/workbench/index`，确认现在可以访问。
4. 已执行 `git diff --check -- AGENTS.md`，结果通过。

### 遗留问题

1. Codex 内置浏览器自动化通道仍可能不可用；如果只是打开页面，后续先给出正确端口和服务状态，不围绕 IAB backend 长时间诊断。

### 任务名称

项目总览页表头筛选平台化：类型 / 状态列接入 Antdv Table 原生 filter

### 完成内容

1. 按用户要求将项目总览页“类型”“状态”筛选从表格工具栏移到表格表头筛选。
2. 改造 `PlatformTable`，显式转发 ant-design-vue Table 原生 `change` 事件，页面可从 table change 回调中拿到 filters。
3. `PlatformTable` 继续原样透传 columns，因此 `column.filters`、`filteredValue`、`defaultFilteredValue`、`filterMultiple`、`onFilter` 等 Antdv 原生列筛选能力可直接使用。
4. 在 `PlatformTable` 作用域内补充表头 filter icon 的基础样式，包括间距、颜色、hover 和 active 态；未在项目总览页 scoped CSS 中覆盖表头筛选样式。
5. 项目总览页 `类型` 列配置类型筛选项，`状态` 列配置状态筛选项，并通过 `handleTableChange` 更新本地 `query.type`、`query.status` 后刷新当前表格数据。
6. 项目总览页工具栏保留搜索框、新建、导出、刷新、设置；移除工具栏里的类型 / 状态下拉筛选，避免和表头筛选重复。
7. 未新增复杂筛选组件，未引入其他 UI 库，未修改 ant-design-vue 源码、`node_modules`、菜单、路由、Vben 核心布局或 `use-mixed-menu.ts`。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table.vue`
2. `apps/web-antd/src/views/project/overview/index.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`，菜单名 `项目全景管理 - 项目总览`
2. 平台组件：`PlatformTable`
3. 仍保留工具栏搜索：`PlatformTableToolbar` + `PlatformInput`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table.vue apps/web-antd/src/views/project/overview/index.vue apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。
4. 应用级 `vue-tsc` 仍失败于项目既有类型错误；本轮未把这些既有问题纳入整改范围。

### 遗留问题

1. 仍需在隔离浏览器中点击验证表头筛选下拉、筛选后表格刷新和筛选 icon active 态。
2. 本轮只做 `类型`、`状态` 两列表头筛选；搜索框仍保留在工具栏，不把全文搜索迁入表头。

### 任务名称

项目总览页平台组件最小整改：工具栏收敛与统计卡 token 化

### 完成内容

1. 按“典型页面驱动平台组件改造”规则，只整改 `项目全景管理 - 项目总览` 已暴露的通用组件问题，未重构整个页面。
2. 在 `docs/decision-records.md` 补充“项目总览页作为总览列表页平台组件验证样板”决策，并写入项目总览页组件映射表。
3. 增强 `PlatformTableToolbar`，第一版支持标题、描述、搜索框、状态筛选、类型筛选、业务操作 slot、工具按钮和自定义 slot。
4. 将项目总览页原页面内手写 `project-list-toolbar` 替换为 `PlatformTableToolbar`，页面只保留查询值、筛选值、事件处理和业务按钮 slot。
5. 将 `PlatformStatCard` 的背景、边框、文本、info 色、默认阴影和 hover 阴影沉淀到平台 token。
6. 本轮未抽 `PlatformProgress`、`PlatformDescriptions`、`PlatformEntityCell`、`PlatformActionGroup`，对应业务内容继续留在项目总览页。
7. 本轮未修改菜单、路由、Vben 核心布局、`use-mixed-menu.ts`、ant-design-vue 源码或 `node_modules`。

### 修改了哪些文件

1. `docs/decision-records.md`
2. `apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`
3. `apps/web-antd/src/views/project/overview/index.vue`
4. `apps/web-antd/src/components/platform/stat/platform-stat-card.vue`
5. `packages/@core/base/design/src/design-tokens/default.css`

### 涉及哪些页面或组件

1. 页面：`/workbench/index`，菜单名 `项目全景管理 - 项目总览`
2. 平台组件：`PlatformTableToolbar`、`PlatformStatCard`
3. 平台 token：`--st-color-stat-card-*`、`--st-shadow-stat-card*`
4. 保留页面层内容：项目头像业务单元格、进度列、详情抽屉内部详情 grid、操作列现有写法、页面数据过滤逻辑

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/table/platform-table-toolbar.vue apps/web-antd/src/views/project/overview/index.vue apps/web-antd/src/components/platform/stat/platform-stat-card.vue`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。
4. 已执行 `./node_modules/.bin/vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`，命令仍失败于项目既有类型错误；本轮新增 `PlatformTableToolbar` 和项目总览页接入未在输出中新增命名错误。

### 遗留问题

1. 尚未做截图级浏览器视觉复核；后续 Browser Use 或隔离浏览器链路恢复后，应复核工具栏左右布局、响应式换行、搜索/筛选交互和统计卡 hover 效果。
2. `PlatformTableToolbar` 已支持列表页通用搜索/筛选/操作入口，但列设置、导出真实接口和全屏表格真实交互仍是后续能力。
3. `PlatformStatCard` 已 token 化高频视觉值，但项目头像色仍作为业务数据色保留，不沉淀为平台 token。

## 2026-05-06

### 任务名称

用户管理入口去重：解绑旧 `/system/user` 页面

### 完成内容

1. 按用户最新确认，将当前唯一真实用户管理页面收口为 `系统管理 - 用户管理 -> /platform/typical-page`。
2. 删除原 `/system/user` 旧页面路由入口 `apps/web-antd/src/router/routes/modules/system.ts`，避免旧页面继续作为菜单或访问入口参与当前阶段目标。
3. 删除原 `/system/user` 旧页面壳文件：
   - `apps/web-antd/src/views/system/user/index.vue`
   - `apps/web-antd/src/views/system/user/authRole.vue`
   - `apps/web-antd/src/views/system/user/user-drawer.vue`
   - `apps/web-antd/src/views/system/user/user-import-modal.vue`
   - `apps/web-antd/src/views/system/user/user-info-modal.vue`
   - `apps/web-antd/src/views/system/user/user-reset-pwd-modal.vue`
4. 保留并继续复用仍被典型页和其他模块使用的共享文件，不删除：
   - `apps/web-antd/src/api/system/user/index.ts`
   - `apps/web-antd/src/api/system/user/model.ts`
   - `apps/web-antd/src/views/system/user/data.tsx`
   - `apps/web-antd/src/views/system/user/dept-tree.vue`
5. 收敛菜单源，确保 `系统管理 - 用户管理` 只指向 `/platform/typical-page`，不再把 `/system/user` 作为菜单入口。
6. 旧 `/system/user` 不再作为本阶段目标，后续不继续排查其旧页面显示问题。

### 修改了哪些文件

1. `apps/web-antd/src/router/routes/modules/system.ts`
2. `apps/web-antd/src/views/system/user/index.vue`
3. `apps/web-antd/src/views/system/user/authRole.vue`
4. `apps/web-antd/src/views/system/user/user-drawer.vue`
5. `apps/web-antd/src/views/system/user/user-import-modal.vue`
6. `apps/web-antd/src/views/system/user/user-info-modal.vue`
7. `apps/web-antd/src/views/system/user/user-reset-pwd-modal.vue`
8. `apps/web-antd/src/mock/index.ts`
9. `docs/project-log.md`
10. `docs/todo-next.md`
11. `docs/decision-records.md`

### 涉及哪些页面或组件

1. 菜单入口：`系统管理 - 用户管理`
2. 真实页面：`/platform/typical-page`
3. 旧页面：`/system/user`
4. 共享资源：`#api/system/user/*`、`#views/system/user/data.tsx`、`#views/system/user/dept-tree.vue`

### 验证结果

1. 已通过浏览器确认 `http://127.0.0.1:5173/platform/typical-page` 仍可正常访问。
2. 已确认顶部 `系统管理`、左侧 `用户管理` 仍指向典型页用户管理页面。
3. 已确认 `workbench/index`、`labor-supplies/index` 等未开发菜单仍对应空白占位页。
4. 已执行 `git diff --check`，结果通过。

### 遗留问题

1. 旧 `/system/user` 页面已解绑并删除壳文件，但共享 api/model/data/tree 仍保留，后续如果继续做其他系统页面，仍可复用这些共享资源。
2. 当前项目里不应再出现两个“用户管理”入口，后续如再新增 URL 别名，需要先确认不会让菜单和路由同时出现双入口。

### 任务名称

今天结束：设计稿菜单骨架收敛阶段收尾

### 完成内容

1. 按“今天结束”流程复核当前工作区、`docs/project-log.md`、`docs/todo-next.md` 和 `docs/decision-records.md`。
2. 当前导航目标已从“只保留平台组件模块”收敛为“按设计稿先搭顶部一级菜单骨架，未开发菜单使用空白占位页承接”。
3. Mock 菜单源已调整为显示顶部一级菜单：工作台、系统管理、蓄电池、基本信息、劳保用品管理、统计查询、租户管理、系统监控、系统工具、更多菜单。
4. 未开发菜单不再使用 `disabled` 作为控制流，改为每个菜单保留自己的 route path，并复用同一个 `platform/blank/index` 组件作为空白落点。
5. 当前阶段只开发一个真实能力页：`系统管理 - 用户管理` 指向 `/platform/typical-page`，继续作为基于 `/system/user` 的典型页面验证场。
6. 已新增通用空白占位页 `apps/web-antd/src/views/platform/blank/index.vue`，页面内容为空，不展示假业务数据。
7. 当前没有继续修改 `use-mixed-menu.ts`、`packages/effects/layouts/**`、`packages/@core/ui-kit/menu-ui/**` 的核心菜单逻辑；导航仍通过 Vben 路由和 Mock 菜单源生成。
8. 收尾时确认当前主要卡点是 `/system/user` 直访问没有正确进入原真实页面，需下次先做最小归因和修复方案，不能直接乱补路由逻辑。

### 修改了哪些文件

1. `apps/web-antd/src/mock/index.ts`
2. `apps/web-antd/src/views/platform/blank/index.vue`
3. `apps/web-antd/src/router/routes/modules/platform.ts`
4. `apps/web-antd/src/layouts/basic.vue`
5. `packages/styles/src/antd/index.css`
6. `docs/project-log.md`
7. `docs/todo-next.md`
8. `docs/decision-records.md`

### 涉及哪些页面或组件

1. 顶部一级菜单：工作台、系统管理、蓄电池、基本信息、劳保用品管理、统计查询、租户管理、系统监控、系统工具、更多菜单。
2. 左侧菜单：
   - 工作台：空白占位；
   - 系统管理：用户管理、角色管理、菜单管理、部门管理、岗位管理；
   - 其他一级菜单：当前先显示空白占位子菜单。
3. 页面：`/platform/typical-page`、`/workbench/index`、`/labor-supplies/index`、`/system/user`。
4. 组件：`platform/blank/index`、`platform/typical-page/index`。

### 验证结果

1. 当前开发服务已在 `127.0.0.1:5173` 端口运行。
2. 已通过浏览器验证 `/platform/typical-page` 可渲染典型用户管理页面。
3. 已通过浏览器验证顶部一级菜单可见：工作台、系统管理、蓄电池、基本信息、劳保用品管理、统计查询、租户管理、系统监控、系统工具、更多菜单。
4. 已通过浏览器验证系统管理左侧菜单包含：用户管理、角色管理、菜单管理、部门管理、岗位管理。
5. 已通过浏览器验证 `/workbench/index`、`/labor-supplies/index` 等未开发路径可进入空白占位页，不再 404。
6. 已发现 `/system/user` 直访问当前未正确进入原真实页面，表现为进入 fallback/空白类页面；此项未在收尾前继续修复。
7. 收尾文档更新后已执行 `git diff --check`，结果通过。

### 遗留问题

1. `/system/user` 原路由文件仍存在，但直访问没有正确进入原真实页面；下次必须先排查 access mode、动态路由注入、mock 菜单与隐藏路由关系，再输出最小修复方案。
2. 当前 `系统管理 - 用户管理` 暂时指向 `/platform/typical-page`，后续真实接口恢复或典型页成熟后，需要决定是否切回 `/system/user`。
3. 当前 Blank 只作为未开发菜单落点，不承载业务内容；后续用户逐个提供截图后，应保留对应 path，仅替换 route component。
4. 工作区仍包含较多前序平台样式、导航和文档改动，提交前需要再次做范围确认，避免把无关 `.DS_Store` 或临时目录纳入提交。

### 任务名称

导航组件统一样式微调：顶部/左侧菜单与头部右侧按钮 hover 对齐

### 完成内容

1. 按用户要求以最小改动处理导航组件统一样式问题，没有在 `/platform/typical-page` 写页面 scoped CSS。
2. 将菜单字号和图标尺寸收敛到 `packages/@core/ui-kit/menu-ui/src/components/menu.vue` 的菜单 CSS 变量：
   - 顶部一级菜单字号统一为 `14px`
   - 左侧菜单字号统一为 `14px`
   - 左侧菜单图标统一为 `20px * 20px`
3. 将横向顶部菜单项高度从原本 40px 调整为跟随 `--st-header-height`，并把圆角置为 0，使选中态背景贴满顶部导航栏高度，不再上下留缝。
4. 在 `packages/styles/src/antd/index.css` 新增 `platform-header-icon-action` 统一头部右侧图标按钮 hover/focus 样式。
5. 将右上角设置、通知、用户头像触发器接入 `platform-header-icon-action`，让三者鼠标移入背景样式与左侧统一，而不改菜单逻辑和业务页面代码。
6. 没有修改 ant-design-vue 源码、`node_modules`、`use-mixed-menu.ts`、route-to-menu、breadcrumb、tabs 等逻辑文件。

### 修改了哪些文件

1. `packages/@core/ui-kit/menu-ui/src/components/menu.vue`
2. `packages/styles/src/antd/index.css`
3. `packages/effects/layouts/src/widgets/notification/notification.vue`
4. `packages/effects/layouts/src/widgets/user-dropdown/user-dropdown.vue`
5. `packages/effects/layouts/src/widgets/preferences/preferences-button.vue`

### 涉及哪些页面或组件

1. 顶部一级导航菜单
2. 左侧导航菜单
3. 头部右侧设置按钮
4. 头部右侧通知按钮
5. 头部右侧用户头像触发器
6. 验证页：`/platform/typical-page`

### 验证结果

1. 已在 Chrome 打开 `http://127.0.0.1:5173/platform/typical-page` 进行浏览器复核。
2. 复核结果：
   - 顶部一级菜单字号已变为 14px 视觉层级；
   - 顶部选中态背景已贴满导航栏高度；
   - 左侧菜单字号已变为 14px；
   - 左侧菜单图标已放大为 20px；
   - 右上角设置、通知、头像触发区已接入统一 hover 背景样式源头。
3. 已执行 `git diff --check`，结果通过。

### 遗留问题

1. 本轮只做菜单样式层微调，未扩展到 breadcrumb、tabs 或更多头部组件。
2. 右上角 hover 统一目前覆盖设置、通知、头像触发器；如后续还要把时区、主题切换等头部图标也统一到同一套 hover 规范，可继续沿用 `platform-header-icon-action`。

### 任务名称

`AGENTS.md` 长期规则去重与轻量化整理

### 完成内容

1. 按用户要求审阅当前 `AGENTS.md` 是否重复过多，并确认主要重复集中在“先确认再开发”“平台组件优先”“不写页面局部 CSS”“截图分析强制表格”“阶段报告与文档更新”等规则。
2. 将 `AGENTS.md` 从 586 行压缩为 188 行，合并为默认协作流程、接续文档规则、技术参考资源、平台组件治理、页面/截图/Figma 需求、典型页面 Demo、Vben 布局保护、Figma MCP Go 连接规则 8 个核心章节。
3. 保留关键硬性规则：不改 `node_modules`、不改 ant-design-vue 源码、不引入其他 UI 组件库、不为通用组件只写页面 scoped CSS、不在业务页手写导航和 breadcrumb。
4. 将页面/截图分析从“每次都强制完整输出四类表格”调整为按任务复杂度输出：简单组件反馈输出简版映射，复杂页面或截图开发再输出完整结构、组件映射、文件归属、交互状态和验证方案。
5. 本阶段只整理项目长期协作规则和接续文档，未进入业务代码、平台组件代码或浏览器验证。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/project-log.md`
3. `docs/decision-records.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 未涉及具体业务页面或组件代码。
2. 涉及长期执行规则：平台组件治理、截图/Figma 分析、典型页面 Demo、Vben 布局保护、Figma MCP Go 连接。

### 验证结果

1. 已执行 `wc -l AGENTS.md`，从 586 行减少到 188 行。
2. 已人工复核 `AGENTS.md` 新结构，确认关键禁止项、接续流程、平台组件落点、典型页规则、Vben/Figma 专项规则仍保留。
3. 已执行 `git diff --check`，结果通过。
4. 未运行构建、类型检查或浏览器验证，原因是本轮只修改 Markdown 文档，不涉及应用运行时代码。

### 遗留问题

1. `docs/decision-records.md` 仍保留较完整的历史决策，后续如继续关注读取性能，可再考虑把历史决策归档或按主题拆分。
2. `docs/todo-next.md` 历史收尾状态较长，后续可单独做待办文档瘦身，但本轮先不混合处理。

### 任务名称

受控数据源版 `/platform/typical-page` 第一版典型页面 Demo

### 完成内容

1. 按用户确认的“典型页专用数据源适配文件”方案，新增 `user-demo-source.ts`，只服务 `/platform/typical-page`。
2. 将典型页业务字段、查询字段、表格 columns、状态切换、操作列、抽屉/弹窗入口切换为对齐 `/system/user` 的用户管理内容。
3. 删除旧的 `mock.ts` / `typicalUsers` 假数据入口，避免典型页继续使用虚构字段和旧演示数据。
4. 顶部导航、左侧导航、面包屑继续走 Vben 布局、路由和 Mock 菜单源，典型页页面内部没有手写导航。
5. 典型页继续复用 `PlatformSearchForm`、`PlatformInput`、`PlatformSelect`、`PlatformTreePanel`、`PlatformTable`、`PlatformTableToolbar`、`PlatformDrawer`、`PlatformModal` 等平台薄封装。
6. 补充 `PlatformRangePicker` 极薄封装，用于承载 `/system/user` 查询 schema 中的 `RangePicker`，避免典型页直接绕过平台字段组件。
7. 导入、导出、重置密码保留 UI 和交互入口；当前后端不可用，因此不调用 `/system/user/importData`、`userExport`、`userResetPassword` 等真实接口。
8. 页面文件未新增 scoped CSS；页面级只使用布局类处理左右分栏、间距、高度和滚动区域。
9. 更新长期规则与决策记录，明确后端不可用时典型页只能通过专用受控数据源适配文件承接，不改全局 mock server。
10. 按用户确认清理本轮构建生成/改写产物，`apps/web-antd/dist/` 与 `apps/web-antd/dist.zip` 已从工作区改动中移除，不纳入本次源码提交范围。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`
5. `apps/web-antd/src/views/platform/typical-page/index.vue`
6. `apps/web-antd/src/views/platform/typical-page/user-demo-source.ts`
7. `apps/web-antd/src/views/platform/typical-page/mock.ts`
8. `apps/web-antd/src/components/platform/field/platform-range-picker.vue`
9. `apps/web-antd/src/components/platform/field/index.ts`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 真实业务来源：`/system/user`
3. 平台组件：`PlatformRangePicker`
4. 平台组件复用：`PlatformSearchForm`、`PlatformFormItem`、`PlatformInput`、`PlatformSelect`、`PlatformTreePanel`、`PlatformTable`、`PlatformTableToolbar`、`PlatformDrawer`、`PlatformModal`、`PlatformEditForm`
5. 复用现有全局组件：`ApiSwitch`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `../../node_modules/.bin/vue-tsc --noEmit --skipLibCheck`，本次典型页相关类型错误已清除；命令仍因项目既有类型问题失败，剩余错误集中在 `tenant-toggle`、`tinymce`、`tree-select-panel`、`workflow` 和 `演示使用自行删除` 等既有范围。
3. 已执行 `../../node_modules/.bin/vite build`，构建成功；构建过程中仍有既有 `lightningcss minify` 对 `@reference` / `@apply` 的警告。
4. 已启动本地开发服务 `../../node_modules/.bin/vite --mode development`，当前地址为 `http://localhost:5173/`。
5. 已执行 `curl -I http://127.0.0.1:5173/platform/typical-page`，返回 `200 OK`。
6. `npm run build:antd` 和 `pnpm -F @vben/web-antd run typecheck` 当前不可用，原因是本机 shell 中 `pnpm` 不在 PATH；已改用项目内本地二进制完成替代验证。
7. 已通过 Chrome 打开 `http://127.0.0.1:5173/platform/typical-page`，本地 Mock 登录成功后进入典型页面验证场。
8. 已完成浏览器交互抽查：页面渲染 4 条用户数据；点击左侧树节点“通号中心”后表格过滤为 1 条；点击“新增”后右侧用户表单抽屉可正常打开。
9. 清理构建产物后重新执行 `curl -I http://127.0.0.1:5173/platform/typical-page`，返回 `200 OK`。

### 遗留问题

1. 后端 `8080` 恢复后，需要把 `user-demo-source.ts` 内方法切回真实 `/system/user` 接口。
2. 真实业务页 `/system/user` 未在本轮被改造或污染；它仍走原有 Vben Vxe 页面与真实接口逻辑。
3. 本轮构建生成并改写过 `apps/web-antd/dist` 和 `apps/web-antd/dist.zip`，现已按用户确认清理，不再作为遗留待处理项。
4. `PlatformTable` 仍是 ant-design-vue Table 薄封装，操作列、状态列、分页场景还未抽出更强的 action/status renderer。

### 任务名称

典型页面 Demo 开发前真实数据源阻断检查

### 完成内容

1. 根据用户确认，准备开始 `/platform/typical-page` 第一版典型页面 Demo 开发。
2. 开发前按用户要求优先检查 `/system/user` 真实接口和部门树数据源是否可用。
3. 确认当前 `127.0.0.1:8080` 后端端口没有服务监听，`http://127.0.0.1:8080/system/user/list` 连接失败。
4. 确认经 Vite 代理访问 `http://127.0.0.1:5174/api/system/user/list` 返回 `502 Bad Gateway`。
5. 因用户明确要求“接口或数据源不可用时先停下来说明，不要自行造 mock”，本阶段未改造 `/platform/typical-page`，也未新造 `typicalUsers` 一类假数据。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 待开发页面：`/platform/typical-page`
2. 真实业务来源：`/system/user`
3. 接口：`/system/user/list`
4. 接口：`/system/user/deptTree`

### 验证结果

1. 已执行 `lsof -nP -iTCP:8080 -sTCP:LISTEN`，无服务监听。
2. 已执行 `curl -I http://127.0.0.1:8080/system/user/list`，连接失败。
3. 已执行 `curl -I http://127.0.0.1:5174/api/system/user/list`，返回 `502 Bad Gateway`。
4. 已执行 `git diff --check`，结果通过。

### 遗留问题

1. 需要先启动或恢复后端 `8080` 服务，确保 `/system/user/list` 和 `/system/user/deptTree` 可访问。
2. 如果当前阶段允许基于现有 `/system/user` 模型和页面配置补 Mock 数据，需要用户明确确认；未确认前不新增 Mock。
3. 后端可用后，再继续把 `/system/user` 的真实字段、columns、树结构、表格数据和操作入口接入 `/platform/typical-page`。

### 任务名称

Figma MCP Go 连接规则沉淀与典型页面 Demo 一期审计方案

### 完成内容

1. 确认本地非官方 `@vkhanhqui/figma-mcp-go` 已通过 `127.0.0.1:1994` 连接成功，并将成功连接方案沉淀到长期规则和决策记录。
2. 明确后续 Figma 任务不得默认切换官方 MCP，应优先使用本机 `figma-mcp-go` 直连二进制方案。
3. 明确典型页面 Demo 的建设边界：业务内容必须来自当前真实业务页、路由、接口模型或 Mock；组件实现必须基于 ant-design-vue 原生组件及其平台薄封装。
4. 明确用户后续提供原型截图时，应先映射到 ant-design-vue 原生组件和平台薄封装；用户指定组件样式不对时，应回到全局样式层、主题 token 或平台组件源头改造，避免逐页局部补丁。
5. 审计当前真实业务页，确认 `/system/user` 最适合作为第一版典型页面 Demo 的业务来源，因为它同时包含左侧部门树、查询筛选、表格、选择、分页、工具栏、状态切换、操作列、抽屉和弹窗入口。
6. 根据用户补充要求，进一步明确“即使用户后续没有特别强调全局修改，通用组件样式反馈也默认按全局源头处理”，避免只改当前页面导致其他页面不同步。
7. 根据用户开发前补充意见，进一步收紧样式沉淀边界：分页、工具栏、操作列、表格状态切换优先进入 `PlatformTable`、`PlatformTableToolbar` 等平台组件场景，不轻易直接写入 Antdv 全局样式。
8. 明确 `/platform/typical-page` 不是假数据页面，下一阶段必须继续复用 `/system/user` 的真实业务字段、接口、树结构、columns、表格数据和操作入口。
9. 本阶段只完成规则沉淀和方案审计，未进入典型页面代码开发。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 参考页面：`/system/user`
2. 目标验证页：`/platform/typical-page`
3. 组件范围：ant-design-vue 原生 `Form`、`Input`、`Select`、`DatePicker`、`Tree`、`Table`、`Pagination`、`Button`、`Dropdown`、`Popconfirm`、`Modal`、`Drawer`
4. 平台薄封装范围：`PlatformSearchForm`、`PlatformInput`、`PlatformSelect`、`PlatformTreePanel`、`PlatformTable`、`PlatformTableToolbar`、`PlatformModal`、`PlatformDrawer`

### 验证结果

1. 已通过 Figma MCP Go 读取当前 Figma 文件、页面和选中节点，确认连接可用。
2. 已静态审计 `apps/web-antd/src/views/system/user/index.vue`、`data.tsx`、`dept-tree.vue`、用户接口模型、路由和 Mock 菜单。
3. 本阶段未运行浏览器验证，原因是用户要求先输出第一阶段方案并等待确认，不进入页面开发。

### 遗留问题

1. 等用户确认典型页面 Demo 开发方案后，再开始改造 `/platform/typical-page`。
2. 下一阶段需要把 `/system/user` 的真实字段和操作抽取为 ant-design-vue 原生组件验证场，而不是直接照搬 Vxe 表格形态。
3. 页面开发完成后，需要启动本地服务并验证 `/platform/typical-page` 的真实展示效果。
4. 后续任何通用组件样式改造，都需要报告样式是否已沉淀到全局源头，以及哪些真实业务页会同步受影响。
5. 后续具体开发时，需要避免新造 `typicalUsers` 一类虚构数据；如果真实接口不可用，必须先确认是否允许基于现有模型补 Mock。

### 任务名称

今天结束：接续复核阶段收尾

### 完成内容

1. 按“今天结束”流程复核 `docs/project-log.md`、`docs/todo-next.md`、`docs/decision-records.md` 和当前工作区状态。
2. 确认本轮主要完成“典型页与角色删除后状态复核”，未进入新的平台组件代码改造。
3. 确认 `角色管理` 页面入口删除改动仍在工作区中，`api/system/role` 与 `views/system/role/data.tsx` 仍按既定边界保留。
4. 确认 `/platform/typical-page` 服务侧可达，`5174` 端口当前仍有 Vite 服务监听，但浏览器稳定视觉回归未完成。
5. 确认本轮没有产生新的长期规则、关键决策或平台约束，因此未更新 `AGENTS.md` 和 `docs/decision-records.md`。
6. 将本轮收尾状态、未完成事项和下次建议同步写入 `docs/todo-next.md`。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 页面：`/system/user`
3. 页面：`/system/post`
4. 页面：`/system/dept`
5. 已删除页面入口：`/system/role`

### 验证结果

1. 已执行 `lsof -i :5174`，确认当前 `5174` 端口仍有 Vite 服务监听。
2. 本轮收尾前已完成 `curl -I http://127.0.0.1:5174/platform/typical-page`，返回 `200 OK`。
3. 本轮收尾前已完成 `git diff --check`，结果通过。
4. 本轮未新增代码修改，未重新运行构建或类型检查。
5. 浏览器稳定视觉回归仍未完成，原因是 `agent-browser` 不可用、Playwright 浏览器二进制未下载、系统 Chrome headless 被本机权限或进程策略中断，手动 Chrome 又被活跃标签页和认证页打断。

### 遗留问题

1. `.DS_Store`、`apps/web-antd/dist/`、`apps/web-antd/dist.zip` 仍在工作区中，后续清理前需要用户确认。
2. `api/system/role` 与 `views/system/role/data.tsx` 暂不清理，避免影响 `system/user` 用户新增/编辑抽屉中的角色配置。
3. 自动化浏览器验证链路仍不稳定，下一轮如需视觉回归，应先修复或隔离浏览器验证环境。
4. 当前 Vite 服务未在本轮收尾中停止；下次接续必须重新以 `lsof` 或新启动结果为准。

### 任务名称

继续接续：典型页与角色删除后状态复核

### 完成内容

1. 按接续规则读取 `AGENTS.md`、`docs/project-log.md`、`docs/decision-records.md`、`docs/todo-next.md`，确认当前任务应回到 `/platform/typical-page` 做平台组件源头与真实业务页验证接续。
2. 检查当前工作区状态，确认 `角色管理` 页面删除改动、文档收尾改动、既有 `.DS_Store`、`apps/web-antd/dist/`、`apps/web-antd/dist.zip` 仍在工作区中。
3. 确认本地 Vite 服务当前仍监听 `5174`，`/platform/typical-page` HTTP 返回 `200`，不是静态服务不可达或路由 404。
4. 复核 `apps/web-antd/src/router/routes/modules/system.ts`，确认隐藏真实业务页当前只保留 `/system/user`、`/system/post`、`/system/dept`，已删除 `/system/role` 与 `role-auth` 页面级入口。
5. 复核 `apps/web-antd/src/router/access.ts`，确认已移除 `/system/role-auth/user/:roleId` 的激活映射，避免指向已删除的 `system/role` 页面。
6. 复核典型页源码，确认 `/platform/typical-page` 仍从 `#/components/platform` 引用平台组件，未在典型页新增直接绕过平台组件的 ant-design-vue 页面级实现。
7. 复核 Mock 配置，确认 `apps/web-antd/.env.development` 仍为 `VITE_USE_MOCK=true`，菜单源当前只返回“平台组件 / 典型页面验证场”。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 页面：`/system/user`
3. 页面：`/system/post`
4. 页面：`/system/dept`
5. 已删除页面入口：`/system/role`
6. 组件：`PlatformTableToolbar`、`PlatformTreePanel`、平台表单与表格薄封装

### 验证结果

1. 已执行 `lsof -i :5174`，确认本地 Vite 服务正在监听。
2. 已执行 `curl -I http://127.0.0.1:5174/platform/typical-page`，返回 `200 OK`。
3. 已执行 `git diff --check`，结果通过。
4. 已尝试 `agent-browser`，当前 shell 未提供该命令。
5. 已尝试 Playwright，项目依赖存在但浏览器二进制未下载；改用系统 Chrome headless 也被本机进程/权限策略中断。
6. 已通过 Chrome 打开 `http://127.0.0.1:5174/platform/typical-page`，页面能进入应用加载壳，但本机活跃标签页和认证页多次打断，未形成稳定的最终视觉回归结论。

### 遗留问题

1. 下一轮如需继续视觉验收，建议先使用隔离浏览器上下文或手动固定到当前典型页标签，避免再次被 Chrome 其他活跃标签页打断。
2. 当前没有进入平台组件代码修改；如果用户继续指出具体视觉偏差，再回到 `components/platform`、全局 token 或 Vxe 适配层处理。
3. `api/system/role` 与 `views/system/role/data.tsx` 仍暂不清理，避免影响 `system/user` 用户抽屉的角色相关配置。
4. `.DS_Store`、`apps/web-antd/dist/`、`apps/web-antd/dist.zip` 仍待用户确认后清理。

### 任务名称

今天结束：删除 `角色管理` 并完成本轮收尾

### 完成内容

1. 按“今天结束”流程回看 `AGENTS.md`、`docs/project-log.md`、`docs/decision-records.md`、`docs/todo-next.md` 的当前状态。
2. 根据用户要求，删除不需要的真实业务页 `角色管理`，并移除其隐藏路由和页面文件。
3. 保留 `system/post`、`system/dept` 等已验证的真实业务页，继续维持“平台组件模块 + 真实业务页抽查”的当前交付方向。
4. 将本轮删除操作、浏览器抽查结果和剩余待办同步写入项目日志与下一步待办，作为本轮最终收口记录。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/system/role`
2. 页面：`/system/post`
3. 页面：`/system/dept`

### 验证结果

1. 已确认本轮没有新增长期规则或关键决策，因此未改动 `AGENTS.md` 和 `docs/decision-records.md`。
2. 本轮代码删除与路由收口已完成，文档也已同步。
3. 由于浏览器被其他活跃标签页打断，本轮未再做额外稳定回归。

### 遗留问题

1. 后续如需继续检查真实业务页，可从 `system/post`、`system/dept` 之外的页面继续抽查。
2. 如后续希望连同 `api/system/role` 共用接口层一起清理，需要另起一轮确认范围后再处理。

### 任务名称

删除真实业务页 `角色管理`

### 完成内容

1. 根据用户要求，删除当前交付范围内不需要的 `角色管理` 页面入口。
2. 从 `apps/web-antd/src/router/routes/modules/system.ts` 中移除隐藏路由 `/system/role`，避免它继续作为可访问验证页出现。
3. 从 `apps/web-antd/src/router/access.ts` 中移除与 `role-auth` 相关的路由激活映射，避免留下失效的激活路径。
4. 删除 `views/system/role` 下仅服务于页面本身的入口与弹窗文件，以及 `views/system/role-assign` 下配套页面文件。
5. 保留 `apps/web-antd/src/views/system/role/data.tsx`，因为 `system/user/user-drawer.vue` 仍在复用其中的角色数据范围展示配置。

### 修改了哪些文件

1. `apps/web-antd/src/router/routes/modules/system.ts`
2. `apps/web-antd/src/router/access.ts`
3. `apps/web-antd/src/views/system/role/index.vue`
4. `apps/web-antd/src/views/system/role/authUser.vue`
5. `apps/web-antd/src/views/system/role/role-auth-modal.vue`
6. `apps/web-antd/src/views/system/role/role-drawer.vue`
7. `apps/web-antd/src/views/system/role-assign/index.vue`
8. `apps/web-antd/src/views/system/role-assign/role-assign-drawer.vue`
9. `docs/project-log.md`
10. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/system/role`
2. 页面：`/system/role-auth/user/:roleId`
3. 保留的共用数据：`views/system/role/data.tsx`

### 验证结果

1. 已执行引用扫描，确认 `/system/role` 页面级路由和页面级 import 已从前端入口移除。
2. 已执行 `git diff --check` 针对本次路由改动，结果通过。
3. 浏览器侧完整回归被本机其他活跃标签页打断，本轮未形成稳定的最终读屏结论。

### 遗留问题

1. 如需进一步确认 `/system/role` 访问结果，可在页面稳定时重新打开本地预览做一次只读回归。
2. `api/system/role` 仍保留，当前未继续清理后端接口层与共用数据层。

### 任务名称

真实业务页隐藏路由补齐与浏览器抽查

### 完成内容

1. 为真实业务页补齐隐藏前端路由：`/system/post`、`/system/role`、`/system/dept`，保持它们不进入可见菜单，只用于验证和回归。
2. 通过浏览器逐个打开 `system/post`、`system/role`、`system/dept`，确认三页都能正常渲染而不是 404。
3. 抽查结果显示三页都已继续沿用 Vxe 表格体系，右上角设置、刷新、搜索、全屏入口保持统一，左侧树筛选和部门联动也仍然由平台壳承载。
4. 当前确认“角色管理”页签只是验证隐藏路由时打开的真实业务页，不是新增的可见模块；已将主视图切回 `/platform/typical-page`。

### 修改了哪些文件

1. `apps/web-antd/src/router/routes/modules/system.ts`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/system/post`、`/system/role`、`/system/dept`
2. 组件：Vxe 表格工具栏、`DeptTree`、`PlatformTreePanel`

### 验证结果

1. 已通过浏览器确认 `system/post` 可正常渲染。
2. 已通过浏览器确认 `system/role` 可正常渲染。
3. 已通过浏览器确认 `system/dept` 可正常渲染。
4. 本轮未跑额外构建或单测。

### 遗留问题

1. 仍可继续抽查更多真实业务页，确认是否存在同类页面级散点。
2. 如后续需要恢复这些隐藏页到菜单，需重新评估是否符合当前“只保留平台组件模块”的预览范围。

### 任务名称

真实业务页 `system/user` 浏览器验证收尾

### 完成内容

1. 通过浏览器打开隐藏路由 `/system/user`，确认页面已从路由层正常命中，不再停留在 404 或空白页。
2. 现场检查页面主体，确认部门树、查询表单、Vxe 表格工具栏、表格主体、操作列以及弹窗/抽屉入口均已渲染。
3. 确认左侧树筛选已继续复用 `PlatformTreePanel`，表格右上角的设置、刷新、搜索、全屏入口仍由 Vxe 工具层承载，页面没有额外写死的局部样式补丁。
4. 本轮未发现需要立刻回到代码层的小修，当前剩余工作转为继续抽查其他真实业务页是否也已接入平台规范。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/system/user`
2. 组件：`PlatformTreePanel`、`useVbenVxeGrid`、Vxe 工具栏、用户列表页弹窗与抽屉入口

### 验证结果

1. 已通过浏览器成功访问 `/system/user`。
2. 页面可正常渲染，无 404 或报错页。
3. 本轮未运行额外构建或单测。

### 遗留问题

1. 仍需继续抽查其他真实业务页，确认是否也已统一接入平台组件和 Vxe 适配层。
2. 如后续发现 `system/user` 的表格密度或工具栏间距有细微偏差，再回到平台适配层做统一修正。

### 任务名称

当前典型页去掉顶部 tabbar 区块

### 完成内容

1. 根据用户标注，移除典型页顶部“分析页 / 典型页面验证场”这一整块 tabbar 区域。
2. 在 `apps/web-antd/src/preferences.ts` 中关闭 `tabbar.enable`，让该区域不再作为全局可见布局内容渲染。
3. 保持平台组件页正文、左侧树、查询区、表格、抽屉和弹窗不变，仅收掉页面上方那块不需要的导航 tab 区。

### 修改了哪些文件

1. `apps/web-antd/src/preferences.ts`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 布局能力：顶部 tabbar

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已确认代码修改已热更新到开发服务配置中；本轮未再做完整浏览器回归。

### 遗留问题

1. 需要用户在本地页面刷新后确认顶部 tabbar 是否完全符合预期。
2. 如果后续还想保留“平台组件”模块本身的可见页头，需要再单独设计一个轻量页面标题区，而不是恢复整条 tabbar。

### 任务名称

当前预览只保留平台组件模块

### 完成内容

1. 将项目默认首页从 `/analytics` 调整为 `/platform/typical-page`。
2. 从 Mock 后端菜单源中移除“概览”和“关于”等 Vben 示例模块，只保留“平台组件 / 典型页面验证场”。
3. 新增前端平台组件路由模块，保证 `mixed` 权限模式下平台组件路由可稳定生成。
4. 将原 `dashboard.ts` 中的“概览、分析页、工作台、文档、更新记录、关于”改为隐藏旧入口重定向，避免当前浏览器停留在 `/analytics` 时刷新后进入 404。
5. 同步沉淀“当前预览只保留平台组件模块”的长期规则和决策。

### 修改了哪些文件

1. `AGENTS.md`
2. `apps/web-antd/src/preferences.ts`
3. `apps/web-antd/src/mock/index.ts`
4. `apps/web-antd/src/router/routes/modules/dashboard.ts`
5. `apps/web-antd/src/router/routes/modules/platform.ts`
6. `docs/project-log.md`
7. `docs/decision-records.md`
8. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 导航模块：平台组件
3. 旧入口：`/analytics`、`/workspace`、`/changelog`、`/vben-admin/about`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `../../node_modules/.bin/vite build --mode development`，构建通过；构建过程存在项目既有 CSS 压缩 warning。
3. 已执行 `./node_modules/.bin/vue-tsc --noEmit --skipLibCheck -p apps/web-antd/tsconfig.json`，命令仍失败于项目既有类型错误，本次修改文件未出现在错误列表。
4. 本次尝试通过 Codex 内置浏览器自动验证，但当前 in-app browser 后端未暴露可连接实例；未完成自动浏览器读屏验证。

### 遗留问题

1. 用户当前浏览器如果仍停留在 `/analytics`，刷新后应通过隐藏重定向回到 `/platform/typical-page`；如缓存了旧偏好，可手动访问 `/platform/typical-page` 或清理本地缓存。
2. 真实业务页 `system/user` 的登录后浏览器验证仍待执行。
3. 后续恢复真实业务模块时，应基于业务范围重新接入，不直接恢复 Vben 示例模块。

### 任务名称

本轮收尾与典型页面阶段接续更新

### 完成内容

1. 按“今天结束”流程核对 `AGENTS.md`、`docs/project-log.md`、`docs/decision-records.md`、`docs/todo-next.md` 当前状态。
2. 确认本轮已完成典型页面驱动平台组件改造一期：平台组件源头目录已建立，典型页面验证场已接入 Mock 菜单。
3. 确认长期规则和关键决策已同步沉淀：平台组件源头与验证页规则已写入 `AGENTS.md`，平台组件源头决策已写入 `docs/decision-records.md`。
4. 停止本地 Vite 开发服务，避免后续接续时误认为 `5667` 端口仍是稳定运行状态。
5. 更新下一步待办，明确下轮应先做真实业务页组件引用审计，而不是直接批量迁移业务页面。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 组件：PlatformButton、PlatformTable、PlatformTree、PlatformSearchForm、PlatformEditForm、PlatformFormItem、PlatformInput、PlatformSelect、PlatformDatePicker、PlatformModal、PlatformDrawer、PlatformStatusTag
3. 本次收尾未新增或修改运行时代码。

### 验证结果

1. 本次收尾前已完成浏览器验证：`/platform/typical-page` 可打开，典型页面可渲染 5 条 Mock 数据，新增抽屉可打开，树筛选可收敛表格数据，控制台无错误。
2. 本次收尾只更新接续文档，未重新运行浏览器验证。
3. 收尾后执行 `git diff --check`，结果通过。
4. 收尾后执行 `lsof -i :5666` 与 `lsof -i :5667`，均无输出，确认本地预览端口未继续占用。

### 遗留问题

1. 真实业务页面尚未接入 `#/components/platform`，下一阶段需要输出引用关系审计和迁移优先级。
2. `PlatformTable` 与现有 `useVbenVxeGrid` 的长期边界仍需确认，不能直接批量替换真实业务页表格。
3. 当前项目定位仍需确认：平台组件治理、具体业务项目，还是二者结合推进。

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

1. 尚未完成当前项目目标、业务范围、平台组件治理与具体业务项目边界确认。
2. 尚未完成 ant-design-vue 原生组件与平台组件引用关系审计。
3. 尚未确认平台组件展示页的实际路径和覆盖范围。
4. 尚未执行浏览器验证，因为本轮变更均为文档规则与接续治理。

### 任务名称

典型页面驱动平台组件改造一期

### 完成内容

1. 新增 `apps/web-antd/src/components/platform` 作为当前平台组件源头目录。
2. 新增 `PlatformButton`、`PlatformTable`、`PlatformTree`、`PlatformSearchForm`、`PlatformEditForm`、`PlatformFormItem`、`PlatformInput`、`PlatformSelect`、`PlatformDatePicker`、`PlatformModal`、`PlatformDrawer`、`PlatformStatusTag` 等薄封装组件。
3. 新增典型页面验证场 `apps/web-antd/src/views/platform/typical-page/index.vue`，覆盖左侧树、查询表单、表格、工具栏按钮、状态标签、抽屉表单和详情弹窗。
4. 新增典型页面 Mock 数据 `apps/web-antd/src/views/platform/typical-page/mock.ts`，用于前端静态交互验证。
5. 将典型页面接入 Mock 菜单，路径为 `/platform/typical-page`。
6. 将平台组件源头目录和典型验证页路径沉淀到 `AGENTS.md` 与 `docs/decision-records.md`。

### 修改了哪些文件

1. `AGENTS.md`
2. `apps/web-antd/src/components/platform/index.ts`
3. `apps/web-antd/src/components/platform/button/platform-button.vue`
4. `apps/web-antd/src/components/platform/table/platform-table.vue`
5. `apps/web-antd/src/components/platform/tree/platform-tree.vue`
6. `apps/web-antd/src/components/platform/form/platform-form.vue`
7. `apps/web-antd/src/components/platform/form/platform-search-form.vue`
8. `apps/web-antd/src/components/platform/form/platform-edit-form.vue`
9. `apps/web-antd/src/components/platform/field/platform-form-item.vue`
10. `apps/web-antd/src/components/platform/field/platform-input.vue`
11. `apps/web-antd/src/components/platform/field/platform-select.vue`
12. `apps/web-antd/src/components/platform/field/platform-date-picker.vue`
13. `apps/web-antd/src/components/platform/modal/platform-modal.vue`
14. `apps/web-antd/src/components/platform/drawer/platform-drawer.vue`
15. `apps/web-antd/src/components/platform/status/platform-status-tag.vue`
16. `apps/web-antd/src/views/platform/typical-page/index.vue`
17. `apps/web-antd/src/views/platform/typical-page/mock.ts`
18. `apps/web-antd/src/mock/index.ts`
19. `docs/project-log.md`
20. `docs/decision-records.md`
21. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 组件：PlatformButton、PlatformTable、PlatformTree、PlatformSearchForm、PlatformEditForm、PlatformFormItem、PlatformInput、PlatformSelect、PlatformDatePicker、PlatformModal、PlatformDrawer、PlatformStatusTag
3. 菜单：Mock 模式下新增“平台组件 / 典型页面验证场”

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/vue-tsc --noEmit --skipLibCheck -p apps/web-antd/tsconfig.json`，本次新增典型页面与平台组件相关类型错误已处理；命令仍失败于项目既有类型错误。
3. 已启动本地 Vite 服务，端口 `5666` 被占用后自动使用 `http://127.0.0.1:5667/`。
4. 已执行浏览器验证：登录后可打开 `/platform/typical-page`，页面渲染 5 条 Mock 数据，无 Vite 错误遮罩。
5. 已执行交互验证：点击“新增”可显示用户表单抽屉；点击“产品中心”树节点后表格收敛为 2 条数据，包含 `linna`，不包含 `chenyu`；浏览器控制台无错误。
6. 验证截图保存在 `/private/tmp/st-typical-page.png`、`/private/tmp/st-typical-page-drawer.png`、`/private/tmp/st-typical-page-tree-filter.png`。

### 遗留问题

1. 当前 `PlatformTable` 是基于 ant-design-vue `Table` 的薄封装，现有业务页面大量使用 `useVbenVxeGrid`，两条表格路线的长期边界仍需继续确认。
2. 当前真实业务页面尚未接入 `#/components/platform`，还需要做引用关系审计和迁移优先级清单。
3. 当前典型页面是验证场，后续用户指出视觉问题时，样式必须回到平台组件、主题变量或统一样式入口处理。

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

### 任务名称

Figma 典型页面全局样式与导航表格源组件改造

### 完成内容

1. 基于已读取的 Figma MCP Go 样式结果，将深圳地铁品牌色、文本、边框、背景、圆角、字号、行高、阴影等沉淀为全局设计变量。
2. 将 `apps/web-antd` 全局品牌色改为 `#009943`，并将应用名称改为“深圳地铁智慧仓储管控平台”。
3. 统一 ant-design-vue 原生 Button、Input、Select、DatePicker、Form、Tree、Table、Pagination、Modal、Drawer、Tag 的全局样式和交互状态。
4. 调整 Vben 顶部导航和左侧导航：顶部显示一级功能菜单，左侧显示当前一级菜单下的二级、三级菜单。
5. 新增 `PlatformTableToolbar`，将表格常规功能入口设置、刷新、搜索、全屏沉淀到平台源组件。
6. 根据用户反馈调整筛选区“收起”按钮为无描边样式，调整表格四个圆形功能按钮默认白底弱边框、hover 进入品牌态。
7. 同步 Vxe Grid 表格、工具栏和分页的全局样式变量，避免真实业务页与 Antdv Table 视觉割裂。

### 修改了哪些文件

1. `AGENTS.md`
2. `apps/web-antd/src/preferences.ts`
3. `apps/web-antd/src/layouts/basic.vue`
4. `apps/web-antd/src/components/platform/button/platform-button.vue`
5. `apps/web-antd/src/components/platform/table/index.ts`
6. `apps/web-antd/src/components/platform/table/platform-table.vue`
7. `apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`
8. `apps/web-antd/src/components/platform/tree/platform-tree.vue`
9. `apps/web-antd/src/components/platform/form/platform-form.vue`
10. `apps/web-antd/src/components/platform/field/platform-input.vue`
11. `apps/web-antd/src/components/platform/field/platform-select.vue`
12. `apps/web-antd/src/components/platform/field/platform-date-picker.vue`
13. `apps/web-antd/src/components/platform/modal/platform-modal.vue`
14. `apps/web-antd/src/components/platform/drawer/platform-drawer.vue`
15. `apps/web-antd/src/components/platform/status/platform-status-tag.vue`
16. `apps/web-antd/src/views/platform/typical-page/index.vue`
17. `packages/@core/base/design/src/design-tokens/default.css`
18. `packages/@core/base/design/src/design-tokens/dark.css`
19. `packages/@core/ui-kit/layout-ui/src/components/layout-header.vue`
20. `packages/@core/ui-kit/layout-ui/src/components/widgets/sidebar-collapse-button.vue`
21. `packages/@core/ui-kit/menu-ui/src/components/menu.vue`
22. `packages/effects/layouts/src/basic/layout.vue`
23. `packages/effects/layouts/src/basic/menu/use-mixed-menu.ts`
24. `packages/effects/plugins/src/vxe-table/style.css`
25. `packages/styles/src/antd/index.css`
26. `docs/project-log.md`
27. `docs/decision-records.md`
28. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 布局：顶部导航栏、左侧导航栏、Vben `header-sidebar-nav` 菜单拆分逻辑
3. 组件：PlatformButton、PlatformTable、PlatformTableToolbar、PlatformTree、PlatformSearchForm、PlatformInput、PlatformSelect、PlatformDatePicker、PlatformModal、PlatformDrawer、PlatformStatusTag
4. 全局样式：ant-design-vue 原生组件、Vxe Grid 表格与分页

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `../../node_modules/.bin/vue-tsc --noEmit --skipLibCheck`，本次新增/修改文件相关类型错误已处理；命令仍失败于项目既有类型错误。
3. 已启动本地 Vite 服务，端口 `5670` 被占用后自动使用 `http://127.0.0.1:5671/`。
4. 已通过浏览器验证 `/platform/typical-page`：顶部背景为 `rgb(0, 153, 66)`，Logo 文案为“深圳地铁智慧仓储管控平台”，顶部菜单显示一级“概览 / 平台组件 / 关于”，左侧只显示当前一级菜单下的“典型页面验证场”。
5. 已通过浏览器验证表格工具栏来自 `.platform-table-toolbar`，四个圆形工具按钮默认白底弱边框，筛选区“收起”按钮描边为透明。
6. 浏览器控制台未发现错误，验证截图保存在 `/private/tmp/st-design-menu-toolbar-source.png`。

### 遗留问题

1. 真实业务页仍需审计是否绕过 `#/components/platform` 或继续直接使用 `antdv-next`。
2. Vxe Grid 仍是大量真实业务表格的主路径，后续需要确认是否新增更完整的 Vxe 平台表格封装。
3. 当前仅验证了 `/platform/typical-page`，尚未逐个验证真实业务页面。

### 任务名称

真实业务页组件引用关系审计

### 完成内容

1. 按接续规则重新读取 `AGENTS.md`、`docs/project-log.md`、`docs/decision-records.md`、`docs/todo-next.md`，确认本阶段应先做引用关系审计。
2. 扫描 `apps/web-antd/src/views` 和 `apps/web-antd/src/components` 中的 `useVbenVxeGrid`、`antdv-next`、`<a-*>`、`#/components/platform`、`useVbenForm`、`useVbenModal`、`useVbenDrawer` 和页面级 `.ant-*` / `.vxe-*` 覆盖。
3. 确认真正业务列表页主要基于 `#/adapter/vxe-table` 的 `useVbenVxeGrid`，不能直接用当前基于 Antdv Table 的 `PlatformTable` 批量替换。
4. 确认当前 `#/components/platform` 只在 `/platform/typical-page` 验证场接入，真实业务页尚未形成平台组件引用面。
5. 抽查 `system/user`、`system/dept`、`system/user/dept-tree`、`workflow/task/taskWaiting` 等典型真实页面，确认存在 Vxe 表格、Antdv Tree、Antdv 原生 Button、Vben Modal/Drawer/Form、卡片列表等多种路径。
6. 确认下一阶段应优先治理 Vxe 表格适配层、全局 Antdv 样式和表格工具栏入口，而不是大范围改业务页面逻辑。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`system/user`、`system/dept`、`workflow/task/taskWaiting`、`/platform/typical-page`
2. 组件/能力：`useVbenVxeGrid`、`useVbenForm`、`useVbenModal`、`useVbenDrawer`、`ActionButton`、Antdv `Button`、`Tree`、`Input`、`Form`、`Modal`、`Drawer`
3. 平台组件：`#/components/platform` 当前仅覆盖典型页面验证场。

### 验证结果

1. 已用 `rg` 完成引用关系扫描。
2. 审计结果：`useVbenVxeGrid` 命中 35 个文件，`antdv-next` 命中 115 个文件，`<a-*>` / 全局 Antdv 标签命中 57 个文件，`#/components/platform` 命中 1 个文件。
3. Vben 能力路径：`useVbenForm` 命中 35 个文件，`useVbenModal` 命中 51 个文件，`useVbenDrawer` 命中 28 个文件。
4. 页面或组件级 `.ant-*` / `.vxe-*` 覆盖命中 25 个文件，其中平台组件自身 6 个，其余多为业务特殊样式或历史局部覆盖。
5. 已打开 `http://127.0.0.1:5671/platform/typical-page` 到浏览器；当前会话跳转到登录页，账号密码为默认预填状态，因登录会提交密码字段，未代替用户点击登录。

### 遗留问题

1. 需要新增或明确 Vxe 平台适配层策略，让真实业务表格继承表格工具栏、分页、行高、表头、按钮和交互规范。
2. `system/user/dept-tree.vue` 仍直接使用 Antdv `Tree`、`Input`、`Skeleton` 等组件，适合作为树结构源组件迁移的第一批真实页面。
3. 多个业务页在 `#toolbar-tools` 内直接手写 `<a-button>`，表格左侧业务按钮与右侧常规工具按钮的统一接入还未完成。
4. 工作流任务页是卡片列表和浮层筛选模式，不应直接套用表格页迁移方案，需要单独建立列表/筛选类规范。

### 任务名称

Vxe 表格平台适配层一期

### 完成内容

1. 根据用户要求，将“每完成一个步骤后主动同步当前方案进度、已完成内容、剩余内容、风险和下一步”写入 `AGENTS.md`。
2. 将阶段进度报告规则同步为长期决策，写入 `docs/decision-records.md`。
3. 在 `apps/web-antd/src/adapter/vxe-table.ts` 中为所有通过 `#/adapter/vxe-table` 创建的 Vxe 表格补充平台默认配置：
   - 默认启用设置、自定义列、刷新、搜索面板开关、全屏；
   - 默认刷新行为保持为当前页查询；
   - 默认表头高度和行高从适配层统一下发；
   - 保留页面级 `toolbarConfig`、`headerCellConfig`、`cellConfig` 的覆盖能力。
4. 在 `packages/effects/plugins/src/vxe-table/style.css` 中统一 Vxe 表格右上角圆形工具按钮默认态和 hover/focus 态。
5. 新增表格工具按钮相关设计变量，沉淀到 `packages/@core/base/design/src/design-tokens/default.css` 和 `dark.css`。
6. 将 `PlatformTableToolbar` 内的四个表格常规功能按钮明确标记为 `scene="toolbar"`，并在 `PlatformButton` 中统一它们的默认态和 hover/focus 态。
7. 以 `system/user` 作为首批真实业务页验证点，移除页面内 Vxe 表头高度和行高局部配置，让其继承 Vxe 平台适配层。

### 修改了哪些文件

1. `AGENTS.md`
2. `apps/web-antd/src/adapter/vxe-table.ts`
3. `apps/web-antd/src/components/platform/button/platform-button.vue`
4. `apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`
5. `apps/web-antd/src/views/system/user/index.vue`
6. `docs/project-log.md`
7. `docs/decision-records.md`
8. `docs/todo-next.md`
9. `packages/@core/base/design/src/design-tokens/default.css`
10. `packages/@core/base/design/src/design-tokens/dark.css`
11. `packages/effects/plugins/src/vxe-table/style.css`

### 涉及哪些页面或组件

1. 平台适配层：`#/adapter/vxe-table`
2. Vxe 表格插件样式：`packages/effects/plugins/src/vxe-table/style.css`
3. 平台组件：`PlatformButton`、`PlatformTableToolbar`
4. 首批真实页面：`apps/web-antd/src/views/system/user/index.vue`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `../../node_modules/.bin/vue-tsc --noEmit --skipLibCheck`，本次新增/修改文件相关类型错误已处理；命令仍失败于项目既有类型错误。
3. 浏览器已打开 `http://127.0.0.1:5671/system/user`，页面跳转到 `auth/login?redirect=%252Fsystem%252Fuser`，控制台无错误。
4. 因登录会提交当前预填的密码字段，未代替用户点击登录，因此 `system/user` 登录后的真实视觉效果尚未完成浏览器验证。

### 遗留问题

1. 需要用户登录后继续验证 `system/user` 的 Vxe 工具栏按钮数量、默认态、hover 态、搜索面板开关、刷新、设置和全屏表现。
2. `system/user/dept-tree.vue` 仍未平台化，下一步应处理左侧部门树的搜索框、树节点 hover/选中态、默认选中和刷新入口。
3. 多个真实业务页仍直接在 `#toolbar-tools` 内写 `<a-button>`，业务按钮可保留，但常规工具入口后续应统一由 Vxe 平台适配层承载。

### 任务名称

顶部一级菜单默认子路由跳转修复

### 完成内容

1. 定位 `header-sidebar-nav` 布局下顶部一级菜单点击无效的原因：有子级的一级菜单点击后会停留在父级路径，父级路径通常只是布局容器，不一定有真实页面。
2. 在 `packages/effects/layouts/src/basic/menu/use-mixed-menu.ts` 中新增首个可导航子菜单解析逻辑。
3. 调整顶部一级菜单点击行为：点击有子级的一级菜单时，默认进入该一级菜单下第一个可导航子菜单，并同步驱动左侧导航选中。
4. 保留无子级一级菜单原有行为，例如“关于”仍直接跳转自身路径。
5. 将该导航交互规则沉淀到 `AGENTS.md` 和 `docs/decision-records.md`。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`
5. `packages/effects/layouts/src/basic/menu/use-mixed-menu.ts`

### 涉及哪些页面或组件

1. 布局：Vben `header-sidebar-nav`
2. 源逻辑：`useMixedMenu`
3. 顶部一级菜单：概览、平台组件、关于
4. 左侧导航：当前一级菜单下的二级、三级菜单选中与展示

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `node_modules/.bin/vue-tsc -p packages/effects/layouts/tsconfig.json --noEmit --pretty false`，结果通过。
3. 已在浏览器验证 `http://127.0.0.1:5671/vben-admin/about`：
   - 点击“概览”后跳转到 `http://127.0.0.1:5671/analytics`；
   - 点击“平台组件”后跳转到 `http://127.0.0.1:5671/platform/typical-page`；
   - 点击“关于”后跳转到 `http://127.0.0.1:5671/vben-admin/about`；
   - 浏览器控制台错误为空。
4. 验证截图保存在 `/private/tmp/st-nav-verify.png`。

### 遗留问题

1. 当前修复覆盖顶部一级菜单点击默认子路由跳转；真实业务菜单如果存在禁用、隐藏或外链混合场景，后续需要结合实际菜单数据继续抽查。
2. Vxe 表格真实业务页登录后验证仍是上一阶段遗留事项，本次导航修复未处理该范围。

### 任务名称

今天结束：本轮平台组件与导航改造收尾

### 完成内容

1. 按“今天结束”流程重新读取 `AGENTS.md`、`docs/project-log.md`、`docs/decision-records.md`、`docs/todo-next.md`。
2. 确认本轮已完成 Figma 典型页面全局样式、顶部/左侧导航拆分、表格工具栏源组件、Vxe 表格平台适配层一期、真实业务页引用关系审计和顶部一级菜单默认子路由跳转修复。
3. 确认本轮产生的长期规则已经沉淀：
   - 阶段进度报告规则已写入 `AGENTS.md` 和 `docs/decision-records.md`；
   - 顶部一级菜单点击后默认进入第一个可导航子菜单已写入 `AGENTS.md` 和 `docs/decision-records.md`。
4. 更新下一步待办，明确下次优先继续登录后验证 `system/user` 的 Vxe 表格工具栏和处理 `system/user/dept-tree.vue` 平台化。

### 修改了哪些文件

1. `docs/project-log.md`
2. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`、`/system/user`
2. 布局：顶部导航栏、左侧导航栏、Vben `header-sidebar-nav`
3. 组件/能力：PlatformButton、PlatformTableToolbar、PlatformTree、PlatformSearchForm、Vxe 表格适配层、`useMixedMenu`

### 验证结果

1. 本轮此前已完成浏览器验证：
   - `/platform/typical-page` 可渲染并完成新增抽屉、树筛选、表格工具栏视觉验证；
   - 点击“概览”跳转 `/analytics`，点击“平台组件”跳转 `/platform/typical-page`，点击“关于”跳转 `/vben-admin/about`，控制台无错误。
2. 本次“今天结束”收尾只更新接续文档，未重新做浏览器验证。
3. 收尾后执行 `git diff --check`，结果通过。

### 遗留问题

1. `system/user` 登录后的 Vxe 表格工具栏真实视觉验证仍未完成。
2. `system/user/dept-tree.vue` 尚未平台化，仍是下一步树结构源组件改造的第一候选。
3. 真实业务页仍大量直接使用 `antdv-next` 和 Vben Vxe 能力，后续需要分批治理，不能一次性替换。
4. 当前项目是平台组件治理、具体业务项目还是二者结合推进，仍需用户确认。

### 任务名称

平台树筛选容器下沉与 `system/user` 最小接入

### 完成内容

1. 结合用户已确认的“平台组件治理 + 真实业务页验证”定位，先对 `/platform/typical-page` 和 `system/user` 做了结构分析、组件映射和平台/业务边界确认。
2. 在 `apps/web-antd/src/components/platform/tree` 新增 `PlatformTreePanel`，将树筛选头部、搜索框、刷新按钮、骨架屏、空态和树主体组合沉淀到平台源头。
3. 将 `apps/web-antd/src/views/system/user/dept-tree.vue` 切换为使用 `PlatformTreePanel`，保留部门树接口请求、筛选联动、节点高亮和 `reload/select` 业务事件不变。
4. 将 `apps/web-antd/src/views/platform/typical-page/index.vue` 左侧组织树验证区切换为使用 `PlatformTreePanel`，让典型页和真实页共享同一套树筛选平台壳。
5. 同步更新接续文档，记录“树筛选壳平台化、业务页保留查询与事件逻辑”的边界，方便后续继续扩展 `dept-tree`、真实页验证和 Figma 对齐。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/tree/index.ts`
2. `apps/web-antd/src/components/platform/tree/platform-tree-panel.vue`
3. `apps/web-antd/src/views/platform/typical-page/index.vue`
4. `apps/web-antd/src/views/system/user/dept-tree.vue`
5. `docs/project-log.md`
6. `docs/decision-records.md`
7. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`、`/system/user`
2. 平台组件：`PlatformTree`、`PlatformTreePanel`
3. 真实业务组件：`system/user/dept-tree.vue`
4. 平台能力边界：树筛选头部、搜索、刷新、骨架屏、空态沉淀到平台层；树数据加载、查询联动、业务事件留在业务页

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/components/platform/tree/platform-tree-panel.vue apps/web-antd/src/views/system/user/dept-tree.vue apps/web-antd/src/views/platform/typical-page/index.vue`，结果通过。
3. 已执行 `./node_modules/.bin/vue-tsc --noEmit --skipLibCheck -p apps/web-antd/tsconfig.json`，命令仍失败于项目既有类型错误；当前输出未命中本次新增或修改文件。
4. 本阶段未启动浏览器验证，也未对照 Figma 复核视觉细节；原因是本次先收敛结构和组件边界，下一步再结合登录态真实页与 Figma 典型页做视觉验证。

### 遗留问题

1. `PlatformTreePanel` 已完成结构平台化，但真实页和典型页的视觉细节还未重新走浏览器验证。
2. `system/user` 登录后的 Vxe 表格工具栏、树筛选区与典型页的视觉一致性仍需下一步联调验证。
3. `PlatformTree` 本体仍是样式薄封装，后续如果还有组织树、菜单树、权限树等场景，需要继续判断哪些能力应沉淀到 `PlatformTree`，哪些保留在 `PlatformTreePanel`。

### 任务名称

Figma 截图驱动顶部导航栏源组件样式改造

### 完成内容

1. 按项目接续规则读取 `AGENTS.md`、`docs/project-log.md`、`docs/decision-records.md`、`docs/todo-next.md`，确认顶部导航属于平台布局源组件改造范围。
2. 尝试读取 Figma MCP Go，当前 `127.0.0.1:1994` 无监听，MCP 资源列表为空；本阶段改为基于用户提供的 Figma 截图做源组件视觉对齐。
3. 将顶部导航相关尺寸、分割线、hover 背景、右侧按钮尺寸沉淀到全局设计 token。
4. 调整 `Vben` 顶部布局源组件，使顶部 Logo 区保持稳定宽度、白色分割线和 56px 品牌导航结构。
5. 调整 `VbenLogo` 源组件，使“深圳地铁智慧仓储管控平台”以白色 18px 标题样式呈现。
6. 调整菜单源组件水平态：顶部一级菜单隐藏图标，使用紧凑宽度、居中对齐、深色选中态和 hover 态。
7. 调整全局 `.platform-header-action`，让 AI、日程等右侧入口尺寸、间距、hover 态和顶部菜单统一。

### 修改了哪些文件

1. `packages/@core/base/design/src/design-tokens/default.css`
2. `packages/@core/ui-kit/layout-ui/src/components/layout-header.vue`
3. `packages/@core/ui-kit/shadcn-ui/src/components/logo/logo.vue`
4. `packages/@core/ui-kit/menu-ui/src/components/menu.vue`
5. `packages/styles/src/antd/index.css`
6. `docs/project-log.md`
7. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 布局：Vben `header-sidebar-nav` 顶部导航栏
3. 源组件：`LayoutHeader`、`VbenLogo`、`Menu`
4. 全局样式入口：设计 token、`.platform-header-action`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/vue-tsc --noEmit --skipLibCheck -p apps/web-antd/tsconfig.json`，命令仍失败于项目既有类型错误，输出未命中本次顶部导航改造文件。
3. 已启动 Vite 开发服务，当前端口为 `http://127.0.0.1:5174/`。
4. 已登录并打开 `http://127.0.0.1:5174/platform/typical-page` 做浏览器可视验证：顶部导航显示品牌绿背景、左侧白色平台标题、一级菜单“平台组件”、右侧 AI/日程/通知/用户入口，页面无 Vite 错误遮罩。
5. 已执行 `../../node_modules/.bin/vite build --mode test`，构建成功；仅出现项目既有 lightningcss 对 `@reference` / `@apply` 的 warning。

### 遗留问题

1. Figma MCP Go 当前未连接，未能通过 MCP 读取节点结构、截图和切图资源；后续需要在 MCP 显示 connected 后补一次精确节点校准。
2. 本次只处理顶部导航栏源组件视觉，不处理左侧菜单、树筛选、表格、查询区的进一步视觉差异。
3. Vite 构建产生的 `apps/web-antd/dist` 与 `apps/web-antd/dist.zip` 是临时产物；本次尝试删除时审批服务 503，暂未删除，后续需要清理。

### 任务名称

接续文档 Git 冲突标记清理

### 完成内容

1. 清理 `AGENTS.md`、`docs/decision-records.md`、`docs/todo-next.md`、`docs/project-log.md` 中已经落入文件内容的 Git 冲突标记。
2. 将页面/截图/Figma 输出规则合并为一套结构化要求，保留 Markdown 表格、等待确认、Vben Admin + ant-design-vue 体系等约束。
3. 将平台组件、典型页、Vben 布局保护、Figma MCP Go、Mock 登录与静态开发边界同时保留到接续规则和决策记录中。
4. 将 `docs/project-log.md` 中交错的“典型页面改造一期”“Mock 登录进入系统”“Mock 登录阶段收尾”“Figma 典型页面全局样式改造”拆成连续、可读的历史记录。
5. 同步修正 Figma MCP Go 排查规则在 `docs/decision-records.md` 和 `docs/todo-next.md` 中引用的 `AGENTS.md` 章节编号。

### 修改了哪些文件

1. `AGENTS.md`
2. `docs/decision-records.md`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

无。此次只恢复接续文档干净状态，不修改页面、组件或运行时代码。

### 验证结果

1. 已执行冲突标记扫描，`AGENTS.md` 与 `docs/` 接续文档中不再存在 Git 冲突标记三件套。
2. 已执行 `git diff --check`，用于确认文档变更无空白错误。
3. 本次未运行构建、类型检查或浏览器验证，因为改动范围仅限 Markdown 文档。

### 遗留问题

1. `node_modules` 等依赖产物仍被 Git 跟踪，清理范围和 `.gitignore` 策略需单独确认。
2. 后续新增静态业务页面时，仍需补充统一 Mock 数据组织方式和前端模拟交互规范。

### 任务名称

顶部导航栏 Logo 应用名更新

### 完成内容

1. 按用户截图批注，将顶部导航栏 Logo 文案目标确认为“委外项目综合管理平台”。
2. 复核 `VbenLogo` 原组件链路，确认顶部 Logo 文案来自 `preferences.app.name`，不是 `/platform/typical-page` 页面内部文本。
3. 保留 `apps/web-antd/src/preferences.ts` 中的项目应用名配置为“委外项目综合管理平台”。
4. 在应用启动完成偏好初始化后，将 `overridesPreferences.app.name` 同步写回当前偏好状态，避免 localStorage 中历史应用名继续覆盖项目配置。
5. 未修改 `VbenLogo` 组件模板、顶部导航样式、菜单逻辑、Vben layout 核心路由或 ant-design-vue 源码。

### 修改了哪些文件

1. `apps/web-antd/src/main.ts`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 顶部导航栏 Logo 区域
2. 原组件链路：`VbenLogo` -> `preferences.app.name`
3. 验证页面：`/platform/typical-page`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已确认源码中旧文案“深圳地铁智慧仓储管控平台”已不再存在于 `apps/web-antd/src` 与 `packages` 源码范围内。
3. 已执行 `./node_modules/.bin/vue-tsc --noEmit --skipLibCheck -p apps/web-antd/tsconfig.json`，命令失败于项目既有类型错误，输出未命中本次修改的 `apps/web-antd/src/main.ts`。
4. 已执行 `./node_modules/.bin/oxlint apps/web-antd/src/main.ts`，命令因本机 Node.js `v22.17.1` 不满足 TypeScript 配置文件加载要求而未完成。
5. 已重新启动 Vite 开发服务，因 `5173` 已被占用，本轮服务使用 `http://127.0.0.1:5174/`；`/platform/typical-page` 返回 `200 OK`。
6. Browser Use in-app backend 当前不可用，Playwright Chromium 浏览器二进制未安装，因此未完成隔离浏览器截图验证；未操作用户系统 Chrome。

### 遗留问题

1. 当前机器仍有 `5173` 端口旧 Vite 进程占用，后续验证时需以实际端口为准。
2. 若需要截图级视觉回归，需先恢复 Browser Use 后端或安装 Playwright Chromium，再用隔离浏览器验证顶部 Logo 实际渲染。

### 任务名称

左侧导航栏源组件样式修正

### 完成内容

1. 按用户截图批注，将左侧导航栏问题归入 Vben Menu / Layout 源组件，不在 `/platform/typical-page` 页面内写局部样式。
2. 调整 `menu.vue` 垂直圆角菜单项变量，让展开态左侧导航选中背景左右充满，不再保留白色横向间距。
3. 调整 `menu.vue` 收起态菜单变量，将收起态菜单项高度与折叠宽度对齐为 48px 正方形，避免收起/展开后图标背景块高度不一致。
4. 调整 `sidebar-collapse-button.vue`：收起/展开按钮扩大到 32px，图标扩大到 18px，移除描边；展开状态下按钮定位到右侧，收起状态下保持在折叠栏内。
5. 为左侧收起态菜单 tooltip 增加专用灰色变量与样式，避免当前浅绿色 tooltip 看不清。
6. 未修改 ant-design-vue 源码、`node_modules`、业务页面导航、菜单路由或 `/platform/typical-page` 页面 scoped CSS。

### 修改了哪些文件

1. `packages/@core/base/design/src/design-tokens/default.css`
2. `packages/@core/ui-kit/layout-ui/src/components/widgets/sidebar-collapse-button.vue`
3. `packages/@core/ui-kit/menu-ui/src/components/menu-item.vue`
4. `packages/@core/ui-kit/menu-ui/src/components/menu.vue`
5. `docs/project-log.md`
6. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 左侧导航菜单展开态：`Menu` 垂直菜单项
2. 左侧导航菜单收起态：`Menu` collapse 菜单项与 tooltip
3. 左侧收起/展开按钮：`SidebarCollapseButton`
4. 验证页面：`/platform/typical-page`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/vue-tsc -p packages/@core/ui-kit/menu-ui/tsconfig.json --noEmit --pretty false`，结果通过。
3. 已执行 `./node_modules/.bin/vue-tsc -p packages/@core/ui-kit/layout-ui/tsconfig.json --noEmit --pretty false`，结果通过。
4. 已确认 `http://localhost:5173/platform/typical-page` 返回 `200 OK`。
5. Browser Use in-app backend 当前仍不可用，Computer Use 不能操作 Codex 应用，且未请求使用系统 Chrome；因此本轮未完成截图级视觉验证。

### 遗留问题

1. 仍需在 Browser Use 后端恢复后，对左侧导航展开态、收起态、hover tooltip 和折叠按钮位置做一次截图级复核。
2. 当前 `5174` 仍有历史 Vite 进程监听，非本轮验证入口；用户当前 in-app browser 使用的是 `5173`。

### 任务名称

顶部右侧图标按钮 hover 源组件修正

### 完成内容

1. 按用户截图批注，将顶部右侧“日程管理”和通知铃铛问题归入头部原组件与公共样式，不在 `/platform/typical-page` 页面内写局部样式。
2. 调整 `platform-header-icon-action` 公共样式：hover / focus 图标颜色保持 header 白色，不再变为主色。
3. 将头部图标按钮 hover 背景从浅绿色选中态改为 `--st-color-nav-hover-bg`，与顶部/左侧菜单 hover 背景变量保持一致。
4. 新增 `platform-header-icon-action--ring` 公共动画修饰类，把通知铃铛原 scoped 摇铃动画沉淀为头部图标公共动画。
5. 为“日程管理”和通知铃铛按钮接入公共摇铃动画类，使两者 hover 时 svg 动画一致。
6. 未修改 ant-design-vue 源码、`node_modules`、Vben 菜单逻辑、路由逻辑或典型页页面 scoped CSS。

### 修改了哪些文件

1. `apps/web-antd/src/layouts/basic.vue`
2. `packages/effects/layouts/src/widgets/notification/notification.vue`
3. `packages/styles/src/antd/index.css`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 顶部导航栏右侧“日程管理”按钮
2. 顶部导航栏右侧通知铃铛按钮
3. 头部公共图标按钮样式：`platform-header-icon-action`
4. 验证页面：`/platform/typical-page`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/vue-tsc -p packages/effects/layouts/tsconfig.json --noEmit --pretty false`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/platform/typical-page`，返回 `200 OK`。
4. 已执行 `./node_modules/.bin/vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false`，命令仍失败于项目既有类型错误，当前输出未命中本次修改的 `apps/web-antd/src/layouts/basic.vue`。
5. 已尝试使用 Browser Use in-app browser 做隔离验证，但 IAB 后端初始化超时；本轮未操作用户系统 Chrome。

### 遗留问题

1. 仍需在 Browser Use 后端恢复后，对顶部“日程管理”和通知铃铛 hover 背景、svg 白色保持、摇铃动画做一次截图级复核。

### 任务名称

左侧收起/展开按钮灰色背景变量修正

### 完成内容

1. 按用户截图批注，将左侧导航收起/展开按钮默认背景从品牌淡绿色变量调整为淡灰色变量。
2. 默认态背景改为 `--st-color-border-subtle`，hover 背景改为 `--st-color-border-control`，避免继续出现绿色底色。
3. 保留按钮 32px 尺寸、18px 图标、无描边和展开态右侧定位等前序源组件调整。
4. 未修改业务页面、路由、菜单逻辑、ant-design-vue 源码或 `/platform/typical-page` 页面 scoped CSS。

### 修改了哪些文件

1. `packages/@core/ui-kit/layout-ui/src/components/widgets/sidebar-collapse-button.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 左侧导航收起/展开按钮：`SidebarCollapseButton`
2. 受影响页面：所有使用 Vben 基础布局左侧导航的页面，包括 `/workbench/index` 与 `/platform/typical-page`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/vue-tsc -p packages/@core/ui-kit/layout-ui/tsconfig.json --noEmit --pretty false`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/workbench/index`，返回 `200 OK`。

### 遗留问题

1. Browser Use in-app browser 仍需恢复后再做截图级视觉复核；本轮未操作用户系统 Chrome。

### 任务名称

人员全生命周期 - 用户管理右侧内容清空

### 完成内容

1. 按用户要求，清空 `人员全生命周期 - 用户管理` 当前右侧既有内容。
2. 将 `/platform/typical-page` 从原用户管理典型页改为只保留 `Page` 空承载容器。
3. 删除页面内部门树、查询表单、用户表格、工具栏、抽屉、弹窗和相关交互逻辑引用。
4. 保留顶部导航、左侧菜单、路由入口和平台组件源码不变，等待用户后续提供原型后再开发。
5. 未删除 `user-demo-source.ts`，避免扩大清理范围；后续如确认不再复用，可单独清理。

### 修改了哪些文件

1. `apps/web-antd/src/views/platform/typical-page/index.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 页面：`/platform/typical-page`
2. 菜单：`人员全生命周期 - 用户管理`

### 验证结果

1. 已执行 `./node_modules/.bin/eslint apps/web-antd/src/views/platform/typical-page/index.vue`，结果通过。
2. 已执行 `git diff --check -- apps/web-antd/src/views/platform/typical-page/index.vue`，结果通过。
3. 已执行 `curl -I http://127.0.0.1:5173/platform/typical-page`，返回 `200 OK`。
4. 本轮未做截图级浏览器验证，未操作用户系统 Chrome。

### 遗留问题

1. 后续需等待用户提供用户管理原型后，再重新做页面结构分析、组件映射和确认开发。
2. 旧 `user-demo-source.ts` 当前已不被页面引用，是否删除需等后续原型范围确认。

### 任务名称

顶部导航栏原组件微调

### 完成内容

1. 按用户截图要求，删除用户下拉菜单中的“文档”入口，仅保留“个人中心”和退出登录能力。
2. 将顶部“待办/日程管理” icon 与消息通知 icon 之间的间距统一调整为 `8px`。
3. 将消息通知 icon 与头像入口之间的间距也统一调整为 `8px`。
4. 本轮仅改布局业务侧注入配置和现有通知/用户下拉组件间距类名，未新增平台组件，也未改动 Vben 布局结构、路由、菜单逻辑或 ant-design-vue 源码。

### 修改了哪些文件

1. `apps/web-antd/src/layouts/basic.vue`
2. `packages/effects/layouts/src/widgets/notification/notification.vue`
3. `packages/effects/layouts/src/widgets/user-dropdown/user-dropdown.vue`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 顶部导航用户下拉菜单：`UserDropdown`
2. 顶部导航通知组件：`Notification`
3. 受影响页面：所有使用基础布局顶部导航的页面

### 验证结果

1. 已执行 `git diff --check -- apps/web-antd/src/layouts/basic.vue packages/effects/layouts/src/widgets/notification/notification.vue packages/effects/layouts/src/widgets/user-dropdown/user-dropdown.vue`，结果通过。
2. 本轮未做浏览器截图级验证，未操作用户系统 Chrome。

### 遗留问题

1. 仍需在隔离浏览器环境恢复后，对顶部导航待办、消息、头像三个入口的实际视觉间距和用户下拉菜单项顺序做一次肉眼复核。

### 任务名称

顶部导航栏窄屏“更多”浮窗源组件修正

### 完成内容

1. 按用户要求，将顶部导航窄屏态“更多”浮窗改为纯白背景层，不再沿用透明/半透明菜单背景。
2. 浮窗内部菜单项已改为纯文字表现，移除图标和箭头，默认文字使用黑色变量。
3. 浮窗菜单项 hover 已统一为品牌绿茶 10% 透明度背景，文字切换为品牌绿。
4. 本轮改的是 `@vben-core/menu-ui` 公共源组件场景，不在业务页面或局部 scoped CSS 中兜底。

### 修改了哪些文件

1. `packages/@core/ui-kit/menu-ui/src/components/sub-menu.vue`
2. `packages/@core/ui-kit/menu-ui/src/components/menu.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 顶部导航窄屏“更多”浮窗：`@vben-core/menu-ui`
2. 受影响页面：所有使用基础布局顶部横向菜单且触发 overflow “更多”的页面

### 验证结果

1. 已执行 `git diff --check -- packages/@core/ui-kit/menu-ui/src/components/sub-menu.vue packages/@core/ui-kit/menu-ui/src/components/menu.vue`，结果通过。
2. 本轮未做浏览器截图级验证，未操作用户系统 Chrome。

### 遗留问题

1. 仍需在隔离浏览器里缩窄窗口，确认“更多”浮窗白底、无图标、hover 态和文字颜色都符合截图预期。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，问题落点在 Vben 菜单源组件的 overflow 浮窗场景。
2. 已通过平台层解决的问题：窄屏顶部导航“更多”浮窗已统一为公共白底纯文字菜单规范，不再让页面各自覆盖。
3. 仍是页面临时实现的问题：无。
4. 哪些页面子组件未来必须回收为平台组件：无新增页面子组件，本轮直接在布局源组件收口。
5. 后续新页面禁止继续复制哪些实现：不要在业务页单独覆盖“更多”浮窗背景、图标显隐或 hover 色。
6. 哪些样式应进入主题变量或统一样式入口：该场景继续由菜单源组件和现有设计 token维护，不额外散落到业务 scoped CSS。
7. 当前仍存在的页面级样式债务：顶部导航窄屏态仍需继续做窗口宽度断点下的肉眼回归。

## 2026-05-09

### 任务名称

智能考勤管理施工管理页面与 PlatformQueryPanel 首版

### 完成内容

1. 新增 `PlatformQueryPanel` 平台查询面板，统一承载查询字段、查询/重置和收起/展开，内部继续复用现有平台按钮、字段组件和设计 token。
2. 在 `智能考勤管理` 一级菜单下新增 `施工管理` 左侧菜单，替换原 `BatteryMenu` 的空白占位，并接入真实页面 `/battery/construction`。
3. 新增施工管理列表页与专用受控数据源，按截图语义落地项目名称、项目年度、状态、提交人四项筛选，以及“首次办理 / 许可证变更”业务按钮、许可证列表和状态展示。
4. 将查询面板与表格工具栏的分工沉淀到项目规则：`PlatformQueryPanel` 负责筛选区与动作区，`PlatformTableToolbar` 继续负责表格上方业务按钮和刷新、设置、全屏等通用工具。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/form/platform-query-panel.vue`
2. `apps/web-antd/src/components/platform/form/index.ts`
3. `apps/web-antd/src/views/battery/construction/index.vue`
4. `apps/web-antd/src/views/battery/construction/construction-source.ts`
5. `apps/web-antd/src/mock/index.ts`
6. `AGENTS.md`
7. `docs/decision-records.md`
8. `docs/project-log.md`
9. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformQueryPanel`
2. 平台组件：`PlatformTableToolbar`
3. 页面：`/battery/construction`
4. 菜单：`智能考勤管理 - 施工管理`

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/vue-tsc --noEmit -p apps/web-antd/tsconfig.json 2>&1 | rg "battery/construction|platform-query-panel"`，结果无输出，说明当前类型错误未命中新增加的页面和组件文件。
3. 已执行 `./node_modules/.bin/vue-tsc --noEmit -p apps/web-antd/tsconfig.json`，命令仍失败于项目既有存量类型错误，本轮未清理无关模块。
4. 已执行 `curl -I http://127.0.0.1:5173/battery/construction`，返回 `200 OK`。
5. 本轮未做隔离浏览器截图级验证，未操作用户系统 Chrome。

### 遗留问题

1. 仍需在隔离浏览器里确认 `PlatformQueryPanel` 三列展开态、单行收起态和查询按钮顺序是否符合预期。
2. `PlatformQueryPanel` 当前先在 `/battery/construction` 首页验证，其他存量查询列表页尚未迁移。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：基础 `Form + Button` 能满足功能，但高频查询列表页缺少统一的“筛选字段 + 查询/重置 + 收起/展开”复合平台壳。
2. 已通过平台层解决的问题：查询面板的结构边界已回收到 `PlatformQueryPanel`，页面不再需要重复拼装字段区、按钮组和折叠状态。
3. 仍是页面临时实现的问题：`/battery/construction` 的业务字段、状态文案、操作列和按钮提示文案仍由页面和专用 source 维护。
4. 哪些页面子组件未来必须回收为平台组件：若后续多页都出现相同“列表页顶部查询面板”模式，优先继续让这些页面接入 `PlatformQueryPanel`，而不是复制旧查询区结构。
5. 后续新页面禁止继续复制哪些实现：不要再在业务页手写 `PlatformSearchForm + 查询按钮 + 重置按钮 + 收起逻辑` 的散装组合。
6. 哪些样式应进入主题变量或统一样式入口：查询面板字段间距、动作区间距、模块内边距继续跟随现有设计 token，不额外散落到业务 scoped CSS。
7. 当前仍存在的页面级样式债务：施工管理页面当前仍保留项目名称单元格和列表区块的轻量业务排版，后续如出现同类列表单元格模式再评估是否继续平台化。

### 任务名称

登录页原组件宽度与品牌区纠偏

### 完成内容

1. 删除登录标题后的挥手 emoji。
2. 关闭登录页“其他登录方式”区域，移除第三方登录图标和底部 `Copyright © 2024 Vben`。
3. 将中心登录模块宽度统一收敛为 `480px`，默认居中显示。
4. 调整登录页左上角品牌区：本地 `LOGO.svg` 改为品牌绿色，并同步放大 logo 与项目名称字号。
5. 本轮改动落在认证布局源组件、登录公共组件和项目登录入口，不在业务页面局部样式里兜底。

### 修改了哪些文件

1. `packages/effects/common-ui/src/ui/authentication/login.vue`
2. `apps/web-antd/src/views/_core/authentication/login.vue`
3. `apps/web-antd/src/layouts/auth.vue`
4. `packages/effects/layouts/src/authentication/authentication.vue`
5. `packages/effects/layouts/src/authentication/form.vue`
6. `apps/web-antd/public/LOGO.svg`
7. `docs/project-log.md`
8. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 认证公共组件：`AuthenticationLogin`
2. 认证布局：`AuthPageLayout` / `AuthenticationFormView`
3. 项目登录页：`/auth/login`

### 验证结果

1. 已执行 `git diff --check -- packages/effects/common-ui/src/ui/authentication/login.vue apps/web-antd/src/views/_core/authentication/login.vue apps/web-antd/src/layouts/auth.vue packages/effects/layouts/src/authentication/authentication.vue packages/effects/layouts/src/authentication/form.vue apps/web-antd/public/LOGO.svg`，结果通过。
2. 已执行目标文件 ESLint，结果通过。
3. 本轮未做浏览器截图级验证，未操作用户系统 Chrome。

### 遗留问题

1. 仍需在隔离浏览器里打开登录页，确认 `480px` 宽度、居中效果、logo 绿色和品牌区字号与截图一致。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，问题主要落在认证公共组件和布局源组件。
2. 已通过平台层解决的问题：登录标题装饰、第三方登录区、版权显隐、登录卡片宽度和品牌区样式已回收到认证源组件层。
3. 仍是页面临时实现的问题：无。
4. 哪些页面子组件未来必须回收为平台组件：无新增页面子组件，本轮直接收口到认证原组件。
5. 后续新页面禁止继续复制哪些实现：不要在业务登录页局部追加第三方登录区隐藏、宽度覆盖或 logo 颜色补丁。
6. 哪些样式应进入主题变量或统一样式入口：认证卡片宽度、品牌区字号和 logo 视觉继续优先由认证布局源组件统一维护。
7. 当前仍存在的页面级样式债务：登录页截图还需继续肉眼回归，确认与设计图的边距和字号没有偏差。

### 任务名称

平台表格刷新联动表头筛选修复

### 完成内容

1. 在 `PlatformTableToolbar` 刷新按钮点击时，新增“向同容器 `PlatformTable` 发起刷新请求”的平台联动。
2. 在 `PlatformTable` 中新增对该刷新请求的接管：当表格当前存在激活的表头筛选时，优先在平台层清空筛选并主动触发一次 `change`，不再继续沿用旧筛选条件刷新。
3. 保持原有兼容：如果当前容器没有表格接管刷新请求，或没有激活的表头筛选，则 `PlatformTableToolbar` 仍继续走页面原有 `refresh` 事件。
4. 本轮未在施工管理页单独补丁，修复点落在表格原组件和工具栏原组件。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table-toolbar.vue`
2. `apps/web-antd/src/components/platform/table/platform-table.vue`
3. `docs/project-log.md`
4. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformTableToolbar`
2. 平台组件：`PlatformTable`
3. 受影响页面：所有使用这两者组合、且启用了表头筛选的列表页

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `./node_modules/.bin/vue-tsc --noEmit -p apps/web-antd/tsconfig.json 2>&1 | rg "platform-table-toolbar|platform-table\\.vue|battery/construction"`，结果无输出，说明本轮新增逻辑未命中相关文件类型错误。
3. 已执行 `curl -I http://127.0.0.1:5173/battery/construction`，返回 `200 OK`。
4. 本轮未做隔离浏览器截图级验证，未操作用户系统 Chrome。

### 遗留问题

1. 仍需在隔离浏览器里确认：表头筛选激活后点击刷新，列表是否先清空筛选再刷新数据。
2. 后续如出现“同一个模块容器内存在多个 `PlatformTable`”的复杂场景，需要再评估是否补充作用域键，避免同容器多表联动歧义。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，问题在平台工具栏和平台表格之间缺少刷新语义联动。
2. 已通过平台层解决的问题：刷新按钮不再只是页面级 `emit('refresh')`；当表头筛选激活时，平台会先统一清空筛选状态再触发刷新。
3. 仍是页面临时实现的问题：无，本轮未在业务页额外加刷新补丁。
4. 哪些页面子组件未来必须回收为平台组件：无新增页面子组件，本轮直接收口到平台表格和工具栏源组件。
5. 后续新页面禁止继续复制哪些实现：不要在单个页面里手写“刷新时先清表头筛选”的额外逻辑。
6. 哪些样式应进入主题变量或统一样式入口：本轮属于交互联动修复，无新增样式 token 诉求。
7. 当前仍存在的页面级样式债务：无新增页面级样式债务。

### 任务名称

平台表格默认高度交互改为按页码完整展示

### 完成内容

1. 将 `PlatformTable` 默认 `adaptiveHeight` 从开启改为关闭，不再默认根据浏览器高度给表格 body 注入内部滚动高度。
2. 保留原组件能力边界：只有调用方显式传入 `scroll.y`，或后续开发时明确要求启用表格内部滚动，才进入内部滚动模式。
3. 将项目规则和决策记录同步更新为新默认交互：页码器一页展示多少条，就在页面完整展示多少条，超出浏览器高度时由页面整体上下滚动。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/table/platform-table.vue`
2. `AGENTS.md`
3. `docs/decision-records.md`
4. `docs/project-log.md`
5. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformTable`
2. 受影响页面：所有默认复用 `PlatformTable` 且未显式传入 `scroll.y` 的列表页

### 验证结果

1. 已执行 `git diff --check`，结果通过。
2. 已执行 `curl -I http://127.0.0.1:5173/battery/construction`，返回 `200 OK`。
3. 本轮未做隔离浏览器截图级验证，未操作用户系统 Chrome。

### 遗留问题

1. 仍需在隔离浏览器里确认：当页码器选择 `10条/页` 时，10 条数据完整展示，页面整体上下滚动，不再出现默认内部滚动。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：无，问题在平台表格默认交互策略选择。
2. 已通过平台层解决的问题：表格高度和滚动方式不再由业务页局部判断，统一改成平台默认“完整展示 + 页面整体滚动”。
3. 仍是页面临时实现的问题：无，本轮未在施工管理页单独加高度补丁。
4. 哪些页面子组件未来必须回收为平台组件：无新增页面子组件，本轮直接调整 `PlatformTable` 默认行为。
5. 后续新页面禁止继续复制哪些实现：不要在业务页为了回到页面整体滚动而局部覆盖 `scroll.y` 或硬写容器高度。
6. 哪些样式应进入主题变量或统一样式入口：本轮属于默认交互策略调整，无新增 token 诉求。
7. 当前仍存在的页面级样式债务：无新增页面级样式债务。

### 任务名称

施工管理筛选区标签去冒号统一

### 完成内容

1. 确认 `/battery/construction` 的筛选字段没有在页面里手写冒号，实际冒号来自 `PlatformQueryPanel` 继承的 ant-design-vue 默认标签样式。
2. 在 `PlatformQueryPanel` 内统一隐藏查询字段标签尾部的默认冒号，避免施工管理页继续出现“项目年度：”“状态：”这类不一致写法。
3. 本轮未在施工管理页单独打补丁，改动直接收口到平台查询面板层。

### 修改了哪些文件

1. `apps/web-antd/src/components/platform/form/platform-query-panel.vue`
2. `docs/project-log.md`
3. `docs/todo-next.md`

### 涉及哪些页面或组件

1. 平台组件：`PlatformQueryPanel`
2. 受影响页面：所有复用 `PlatformQueryPanel` 的标准查询列表页

### 验证结果

1. 已执行 `git diff --check -- apps/web-antd/src/components/platform/form/platform-query-panel.vue`，结果通过。
2. 已在 `apps/web-antd` 拉起本地 Vite，`curl -I http://127.0.0.1:5173/battery/construction` 返回 `200 OK`。
3. 本轮未做隔离浏览器截图级验证，未操作用户系统 Chrome。

### 遗留问题

1. 仍需在隔离浏览器里肉眼确认：施工管理页以及其它复用 `PlatformQueryPanel` 的查询页，标签尾部都已去掉冒号且对齐未受影响。

### 平台治理影响

1. 本轮发现的 ant-design-vue 原生组件问题：查询表单标签默认继承了 Antdv 冒号表现，与当前系统筛选区视觉规范不一致。
2. 已通过平台层解决的问题：标准查询区标签尾部的默认冒号已统一在 `PlatformQueryPanel` 层关闭。
3. 仍是页面临时实现的问题：无，本轮未在施工管理页追加页面级样式覆盖。
4. 哪些页面子组件未来必须回收为平台组件：无新增页面子组件，本轮直接收口到现有查询面板组件。
5. 后续新页面禁止继续复制哪些实现：不要再在业务页用 scoped CSS 单独覆盖筛选标签冒号。
6. 哪些样式应进入主题变量或统一样式入口：查询标签标点规范继续优先放在平台查询面板统一维护，不下放到业务页。
7. 当前仍存在的页面级样式债务：其它未迁移到 `PlatformQueryPanel` 的历史筛选区，如仍存在冒号，需要后续按页面接入进度继续回收。
