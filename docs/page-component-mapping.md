# 页面组件映射

本文件记录典型页面到平台组件的映射关系和 CSS 边界。长期决策写入 `docs/decision-records.md`，阶段完成记录写入 `docs/project-log.md`，后续待办写入 `docs/todo-next.md`。

## 项目总览页 `/workbench/index`

项目总览页作为“查询列表页 / 总览列表页”的典型页面，用来驱动平台组件能力收敛。当前原则是：页面负责业务结构和业务单元格，平台组件负责高频通用交互与视觉样式。

### 组件映射表

| 页面区域 | 当前实现 | 平台组件 / 原生组件 | 边界结论 | 样式落点 |
| --- | --- | --- | --- | --- |
| 顶部标题 / 操作区 | 页面内标题、说明、业务操作入口 | Vben `Page`、`PlatformButton` | 页面布局，暂不抽标题组件 | 页面 scoped CSS 只保留布局间距 |
| 统计卡区域 | 页面 grid + 统计卡数据 | `PlatformStatCard` | 平台组件能力 | `components/platform/stat`、设计 token |
| 查询筛选区 | 页面业务筛选状态 + 工具栏搜索入口 | `PlatformTableToolbar`、`PlatformInput` | 搜索入口与工具栏归平台，业务筛选状态归页面 | 工具栏样式在 `PlatformTableToolbar` |
| 表格工具栏 | 新建、导出、搜索、刷新、设置、全屏 | `PlatformTableToolbar`、`PlatformButton` | 平台组件能力；主按钮最左、次按钮随后、常规工具在右侧 | `components/platform/table/platform-table-toolbar.vue` |
| 表格 | 项目列表数据、分页、表头筛选、自适应高度 | `PlatformTable` + Ant Design Vue `Table` | 平台组件能力；分页与筛选状态由页面传入 | `components/platform/table/platform-table.vue` |
| 类型 / 状态表头筛选 | `column.filters`、`filteredValue`、`change` | `PlatformTable` | 平台组件能力；“全部”、hover、选中态、无确认按钮由平台统一 | `PlatformTable` |
| 项目信息单元格 | 项目头像、名称、编号 | 页面业务单元格 | 暂不新增 `PlatformEntityCell` | 页面 scoped CSS |
| 进度列 | 项目进度和数值展示 | Ant Design Vue `Progress` | 暂不新增 `PlatformProgress` | 页面业务列样式 |
| 状态列 | 项目状态标签 | `PlatformStatusTag` | 已有平台组件 | `components/platform/status` |
| 操作列 | 查看、编辑、归档、删除 | `PlatformButton`、Ant Design Vue `Popconfirm` | 操作组合暂留页面，不新增 `PlatformActionGroup` | 页面业务操作布局 |
| 新建 / 编辑弹窗 | 表单弹窗 | `PlatformModal`、`PlatformEditForm`、`PlatformFormItem` | 已复用平台组件 | `components/platform/modal`、`components/platform/form` |
| 详情抽屉 | 详情信息 grid | `PlatformDrawer` + 页面详情布局 | 暂不新增 `PlatformDescriptions` | 页面业务详情布局 |

### CSS 边界

| 类型 | 可以留在页面 | 应沉淀到平台组件 |
| --- | --- | --- |
| 页面布局 | 页面整体间距、统计卡 grid、列表区域上下结构、业务详情 grid | 无 |
| 业务单元格 | 项目头像、项目名称编号组合、进度列宽度、操作列排列 | 多页面复用后再评估抽象 |
| 统计卡视觉 | 不在页面写图标尺寸、背景、边框、阴影 | `PlatformStatCard` 与 token |
| 工具栏视觉 | 不在页面手写工具栏背景、按钮 hover、搜索展开高度 | `PlatformTableToolbar`、`PlatformButton` |
| 表头筛选 | 不在页面覆盖筛选下拉 hover / selected / 全部项 | `PlatformTable` |
| 表格高度 | 不在页面硬编码表格 body 高度 | `PlatformTable` 默认自适应高度 |

### 已沉淀的平台能力

| 能力 | 当前落点 | 说明 |
| --- | --- | --- |
| 统计卡图标尺寸、背景、边框、文本色、阴影 | `PlatformStatCard`、设计 token | 业务页面只传标题、数值、趋势、图标和类型 |
| 表格工具栏业务按钮与工具按钮排序 | `PlatformTableToolbar` | 主按钮在最左，次要按钮随后；搜索、刷新、设置、全屏在右侧 |
| 搜索图标展开输入框 | `PlatformTableToolbar` | 默认图标入口，点击展开，再次点击收起 |
| 工具按钮默认态与 hover 态 | `PlatformButton` | 默认无描边，hover 使用品牌绿描边、图标和 10% 背景 |
| 表头筛选“全部”和即时生效 | `PlatformTable` | 不显示 Antdv 默认重置和确认按钮 |
| 表格 body 自适应高度 | `PlatformTable` | 默认按浏览器高度计算，调用方显式 `scroll.y` 时尊重调用方 |

### 暂时留在页面的内容

| 内容 | 暂不抽象原因 |
| --- | --- |
| `PlatformEntityCell` | 目前只有项目总览页出现项目信息组合，复用不足 |
| `PlatformProgress` | 当前只是项目进度列场景，复用不足 |
| `PlatformDescriptions` | 当前详情抽屉字段和布局偏业务，复用不足 |
| `PlatformActionGroup` | 操作列权限、确认文案、业务动作差异较大，本轮不抽 |

### 后续可整理但本轮不做

| 事项 | 记录 |
| --- | --- |
| `PlatformTable` 筛选下拉逻辑 | 当前能力偏多，后续可拆 helper 整理，但本轮不拆组件 |
| 全屏能力 | 当前页面已接入；后续评估下沉到 `PlatformTableToolbar` 或 `PlatformTable` |
| 业务单元格抽象 | 等多个查询列表页出现相同实体信息、进度、详情结构后再抽 |
