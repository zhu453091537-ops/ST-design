# 下一步待办

本文件记录当前待办、优先级、推荐下一步、暂时不处理的问题和风险提醒，用于跨设备、跨聊天上下文恢复。

## 当前待办

| 优先级 | 事项 | 状态 | 说明 |
| --- | --- | --- | --- |
| 高 | 左侧导航箭头间距与全局 size-4 尺寸调整 | 已完成，待浏览器复核 | 已将子菜单箭头 `margin-right` 调整为 `4px`，并把全局 `.size-4` 覆盖到 `calc(var(--spacing) * 5)`；后续需确认左侧导航箭头位置，以及其他使用 `size-4` 的图标是否都符合预期。 |
| 高 | 智能考勤管理菜单新增档案管理分组 | 已完成，待浏览器复核 | 已在 `智能考勤管理` 下新增 `档案管理`，并补出 `安全学习安排`、`文档管理`、`文档列表` 3 个子菜单；右侧当前统一复用空白页，下一步只需展开左侧菜单确认结构正确。 |
| 高 | 项目冗余文件清理一期 | 已完成，待二期确认 | 已删除 `apps/platform-showcase 17.36.28`，保留旧 `apps/platform-showcase/dist` 删除状态，并新增根 `.gitignore` 忽略系统文件、依赖目录、构建产物和交付目录；下一步如继续精简，需要确认 `apps/web-antd/dist`、`apps/web-antd/dist-handoff`、`deliverables/` 是否从 Git 跟踪中移除。 |
| 高 | Windows 优先客户演示与源码联调交付包 | 已完成，待 Windows 实机双击复核 | 已生成 `deliverables/ST-design-frontend-handoff-20260513.zip`；包内含 Windows 主启动器、Mac 备用启动器、`preview/` 和完整 `source/`。本机已完成 HTTP 与隔离浏览器验证，下一步建议在项目经理 Windows 电脑上双击 `Start-Preview-Windows.vbs` 复核一次。 |
| 高 | 顶部导航与登录页 logo 改为字体图标引用 | 已完成，待浏览器复核 | 已将顶部导航原组件与登录页 logo 的默认引用切为 `iconfont:icon-LOGO-green`，并让 `VbenLogo` 与 `Authentication` 支持该协议；后续只需确认两处视觉尺寸未变且不再走 svg 图片。 |
| 高 | 前端联调交付压缩包预览入口卡死修复 | 已完成 | 已修正 `preview/` 的 handoff 构建模式、根入口跳转和 logo 资源，双击 `.command` 后可以直接进登录页并进入系统。 |
| 高 | 前端联调交付压缩包整理 | 已完成 | 交付结构、源码快照、联调文档、预览入口和 README 已整理完毕。 |
| 高 | 中期评估与验收管理区块标题切回纯标题组件 | 已完成，待浏览器复核 | 已将 `/project/evaluation` 的“待评估项目”“评估记录”从 `PlatformTableToolbar` 改为 `PlatformSectionTitle`，并移除右侧工具入口；后续只需登录后确认标题样式与“文档列表”这种纯标题区块一致。 |
| 高 | 登录后默认落点强制回到项目总览 | 已完成 | 已调整登录守卫优先级，登录成功后不再优先吃登录页上的 `redirect` 参数；即使从人员模块跳到登录页，再登录也先进入 `/workbench/index`。 |
| 高 | 登录页 logo 标题移到登录卡片上方 | 已完成，待浏览器复核 | 已把 `Logo + 应用标题` 挪到登录卡片上方，并与卡片保持 `24px` 间距；下一步刷新 `/auth/login` 确认视觉位置和间距是否符合预期。 |
| 高 | 修正登录页默认居中与认证工具栏显示 | 已完成，待浏览器复核 | 已将登录页默认认证布局切回 `panel-center`，并关闭认证工具栏；下一步只需刷新 `/auth/login` 确认右上角颜色/布局按钮已消失、登录表单重新居中。 |

## 当前待办

| 优先级 | 事项 | 状态 | 说明 |
| --- | --- | --- | --- |
| 高 | 前端联调交付压缩包整理 | 已完成 | 已生成完整交付目录方案：根预览首页、源码快照、离线预览、联调文档、页面截图与启动说明；下一步如果继续推进，就是基于该包进入真实接口联调，而不是再回头补“只含 dist 的交付物”。 |
| 高 | 中期评估与验收管理区块标题切回纯标题组件 | 已完成，待浏览器复核 | 已将 `/project/evaluation` 的“待评估项目”“评估记录”从 `PlatformTableToolbar` 改为 `PlatformSectionTitle`，并移除右侧工具入口；后续只需登录后确认标题样式与“文档列表”这种纯标题区块一致。 |
| 高 | 登录后默认落点强制回到项目总览 | 已完成 | 已调整登录守卫优先级，登录成功后不再优先吃登录页上的 `redirect` 参数；即使从人员模块跳到登录页，再登录也先进入 `/workbench/index`。 |
| 高 | 登录页 logo 标题移到登录卡片上方 | 已完成，待浏览器复核 | 已把 `Logo + 应用标题` 挪到登录卡片上方，并与卡片保持 `24px` 间距；下一步刷新 `/auth/login` 确认视觉位置和间距是否符合预期。 |
| 高 | 修正登录页默认居中与认证工具栏显示 | 已完成，待浏览器复核 | 已将登录页默认认证布局切回 `panel-center`，并关闭认证工具栏；下一步只需刷新 `/auth/login` 确认右上角颜色/布局按钮已消失、登录表单重新居中。 |
| 高 | 平台表格序号列表头禁止换行 | 已完成，待登录后视觉复核 | 已在 `PlatformTable` 源组件为默认序号列补专用 class，并统一加上 `white-space: nowrap`；后续只需在已登录状态下确认 `/battery/construction` 等表格页的“序号”表头已保持单行。 |
| 高 | 项目总览切回登录后默认首页 | 已完成 | 已将默认首页与旧隐藏入口重定向统一切到 `/workbench/index`，当前“项目全景管理 - 项目总览”是登录后默认进入页；旧入口直访已按新首页配置收口，后续可再顺手补一次登录态复核。 |
| 高 | 施工管理菜单下新增考勤管理入口 | 已完成，待浏览器复核 | 已在 `智能考勤管理 > 施工管理` 同级补出 `考勤管理` 菜单，当前先复用空白占位页；下一步只需在隔离浏览器确认菜单顺序与点击后右侧内容区是否为空。 |
| 高 | 人员总览查看入口接入详情页返回壳 | 已完成，待内容补充与点击复核 | 已将 `/personnel/overview` 的“查看”接入隐藏路由 `/personnel/overview/detail`，新增空白详情页壳并落地顶部返回 icon + 标题；下一步先补详情正文内容，并在隔离浏览器实际点击验证进入和返回链路。 |
| 高 | 收口项目详情抽屉页面残留间距 | 已完成，待视觉复核 | 已移除 `/project/overview` 项目详情头像摘要区原有的底部分隔线和 `padding-bottom`，只保留 `margin-bottom: 24px` 与描述列表衔接；建议下次优先复核标题区与内容区之间是否已不再出现多余分隔与堆叠间距。 |
| 高 | 统一 `PlatformDrawer` 标题区与内容区内边距 | 已完成，待视觉复核 | 已将 `PlatformDrawer` header 改为 `padding: var(--ant-padding) var(--ant-padding-lg)`，body 改为 `padding: 24px 40px 24px 40px`；建议下次隔离浏览器优先复核项目详情等抽屉的标题区高度、下划线位置和内容区留白。 |
| 高 | 平台详情展示组件首版与下拉框描边统一 | 已完成，待视觉复核 | 已新增 `PlatformDescriptions` 并接入 `/project/overview` 项目详情抽屉，同时在全局样式入口中加固 `Select` selector 的 `1px` 描边覆盖；建议下次隔离浏览器优先复核项目详情抽屉结构，以及 `/project/information` 新建项目弹窗里下拉框与输入框描边是否一致。 |
| 高 | 平台下拉箭头改为本地 SVG 并继续观察分页箭头 | 已完成，待视觉复核 | 已在平台字段、查询面板和树组件中切换为本地 `pull down.svg`，并保持颜色继承与树节点旋转；分页左右箭头暂未替换，后续如要统一再单独评估。 |
| 高 | 平台弹窗内容区与 footer 间距统一收口到 PlatformModal | 已完成，待视觉复核 | 已将 `PlatformModal` 的内容区左右 40px、footer 顶线与按钮区内边距统一回收至平台组件，并改用语义化 `styles.body / styles.footer` 规避 `antdv-next` 默认 modal 变量；后续所有接入 `PlatformModal` 的新增/编辑弹窗都会一起生效。 |
| 高 | 平台统计卡主数字字号统一为 32px | 已完成，待视觉复核 | 已将 `PlatformStatCard` 主数字统一改为 `32px`，并继续使用 `DIN Alternate Bold.ttf` 字体；建议下一步优先在 `personnel/overview` 及其他统计卡页面复核数字和单位的间距、行高与卡片纵向节奏。 |
| 高 | 平台统计卡主数字 DIN 字体视觉复核 | 已完成，待视觉复核 | 已将 `DIN Alternate Bold.ttf` 接入全局数字字体入口，并仅在 `PlatformStatCard` 主数字上启用；建议下一步优先复核 `/project/overview`、`/project/evaluation`、`/project/document`、`/project/contract`、`/personnel/overview` 等含统计卡页面的数字字重、间距和单位组合观感。 |
| 高 | 数字专用字体文件接入与数字场景启用范围确认 | 已完成资源位，待字体文件落位 | 已在 `apps/web-antd/src/assets/fonts/` 建好公共目录，并在 `apps/web-antd/src/bootstrap.ts` 全局引入 `index.css`；后续拿到真实 `.woff2/.woff/.ttf` 字体文件后，只需放进该目录并补全 `@font-face` 文件名，再确认哪些统计卡、金额列、看板数字需要默认启用 `.st-number-font`。 |
| 高 | 项目总览查看进度看板按钮跳转进度可视化跟踪页 | 已完成，待点击复核 | 已将 `/workbench/index` 头部“查看进度看板”按钮从提示占位改为跳转 `/project/progress`；需继续在页面点击确认目标页已正常打开。 |
| 高 | 平台弹窗标题回归原生 header 层重构 | 已完成，待视觉复核 | 已确认问题根因在于之前把标题层塞进 body，现已回退为原生 `title` 层重构：标题、下划线、右侧全屏/关闭按钮都回到 header 语义层，全屏只作用于 wrap / modal 根层，建议下次隔离浏览器优先复核 `/project/information`、`/personnel/overview`、`/battery/construction` 等页面是否恢复正常层级与滚动行为。 |
| 高 | 撤回平台表格金额列自动右对齐 | 已完成，待视觉复核 | 已从 `PlatformTable` 源组件撤回金额语义列自动右对齐规则，恢复为原来的左对齐；原因是当前列宽与内边距下右对齐会造成左侧留白过大、右侧贴近相邻列；建议下次隔离浏览器优先复核 `/battery/construction`、`/project/information`、`/project/overview` 的金额列观感是否已恢复正常。 |
| 高 | 施工管理查看弹窗宽度与审批进度节点节奏再微调 | 已完成，待视觉复核 | 已将施工管理查看弹窗宽度调为 `1200px`，右侧审批进度默认/最小宽度调为 `360px`，并补上审批节点 icon 外部配置、节点间距收紧到约 `20px` 和内容区大描边；建议下次隔离浏览器确认右侧更窄后的阅读节奏与整体外框观感。 |
| 高 | `PlatformSegmented` 改造成 Ant segmented 风格平台组件 | 已完成，待视觉复核 | 已将 `PlatformSegmented` 从下划线式切换为更接近 Ant Design Vue 原生 segmented 的品牌化版本，选中态品牌绿底白字、未选中 hover 文字变品牌绿，字号统一为 `14px`；本轮又补了选中项与 hover 文本的强制颜色覆盖，避免内部样式把品牌色盖回去；建议下次隔离浏览器优先复核 `/project/information` 新增项目弹窗中的分段控件观感。 |
| 高 | 施工管理查看弹窗左右分栏与审批进度平台化 | 已完成，待视觉复核 | 已将右侧审批进度抽成 `PlatformApprovalProgress`，施工管理“查看”弹窗宽度固定为 `1024px`，右侧宽度可在 `440px` 到 `720px` 间拖拽；建议下次隔离浏览器确认左侧空白区、分隔线手感和右侧审批节点节奏。 |
| 高 | 项目信息管理与人员总览移除顶部筛选区 | 已完成，待视觉复核 | 已删除 `/project/information` 与 `/personnel/overview` 顶部 `PlatformQueryPanel`，当前仅保留工具栏搜索和表格表头筛选；建议后续在隔离浏览器确认两个页面顶部留白、表头筛选与关键字搜索交互，并等待客户方向后再沉淀常规列表页规范。 |
| 高 | 合同与付款管理付款节点金额移到进度条上方 | 已完成，待视觉复核 | 已将 `/project/contract` 的 `ContractPaymentMiniBar` 改为“金额在进度条上方、下方只保留节点标题与状态”的结构，删除下方重复金额；最新又按 DevTools 标注删除金额行 `margin-bottom: 6px`、把节点列 `gap` 调整为 `4px`，并把付款节点区底部留白收成 `16px`；需继续肉眼确认金额与绿色/橙色/灰色区块是否完全居中。 |
| 高 | 平台表格底部分页上间距统一为 `24px` | 已完成，待视觉复核 | 已将 `.ant-table-wrapper .ant-table-pagination.ant-pagination` 统一改为 `margin: 24px 0 0;`，即分页距上 `24px`、距下 `0px`；建议下次隔离浏览器顺手确认 `/personnel/overview` 等表格页分页区与表格底部的留白节奏。 |
| 高 | 平台表格 hover 背景统一为 `#F3F4FA` | 已完成，待视觉复核 | 已将 Ant Design Vue 平台表格普通行 hover 与 `PlatformTable` 固定操作列 hover 统一为 `#F3F4FA`，并保留表格选中态原有品牌浅绿色；建议下次隔离浏览器优先复核 `/personnel/overview` 的右侧固定操作列与普通列移入底色是否完全一致。 |
| 高 | `/platform/typical-page` 人员档案管理卡片去除静态描边 | 已完成，待视觉复核 | 已删除人员档案卡片默认态 `border: 1px solid hsl(var(--border));`，当前卡片默认无边框；建议下次隔离浏览器顺手确认无边框状态下的阴影层次是否符合预期。 |
| 高 | `PlatformStatCard` 去除灰色描边 | 已完成，待视觉复核 | 已从平台统计卡源组件移除灰色边框，影响 `人员总览` 及所有已接入 `PlatformStatCard` 的统计卡页面；建议下次隔离浏览器统一复核统计卡阴影、顶部色条和无边框观感。 |
| 高 | `/platform/typical-page` 人员档案管理卡片 hover 去除描边变色 | 已完成，待视觉复核 | 已将人员档案卡片 hover 调整为只上移和投影，不再出现边框变色；键盘 `focus-visible` 轮廓保留，建议下次隔离浏览器顺手确认 hover 与焦点态是否都符合预期。 |
| 高 | `/project/evaluation` 待评估项目“发起评估”按钮纵向对齐微调 | 已完成，待视觉复核 | 已按截图反馈在页面 scoped CSS 中将待评估卡片头部按钮下移 `6px`；未改 `PlatformTaskCard` 源组件，建议下次隔离浏览器顺手确认与左侧内容组是否完全齐平。 |
| 高 | 平台治理收尾：查询面板迁移、任务卡沉淀与演示目录清理 | 已完成 | `/project/information`、`/personnel/overview` 已接入 `PlatformQueryPanel`；`/project/evaluation` 已接入新增 `PlatformTaskCard`，并恢复表格工具栏 `search / refresh / setting / fullscreen` 四个右侧标准工具；`apps/web-antd/src/views/演示使用自行删除/` 已删除；目标 ESLint、`git diff --check` 和三条路由 HTTP 检查通过。 |
| 高 | `/project/evaluation` 右侧评估记录表格挤压治理 | 已完成 | 已将 `/project/evaluation` 左侧待评估区调整为固定 `440px`，右侧评估记录自适应剩余宽度；待评估卡片标题改为 `16px`，常规垂直节奏统一为 `8px`，截止时间到进度条为 `4px`；目标文件 ESLint、`git diff --check`、HTTP 路由和隔离截图验证通过。 |
| 高 | 已开发页面与平台组件第一批治理 | 已完成 | 已将 `/platform/typical-page`、`/personnel/qualification`、`/personnel/worktime` 的手写页面头部统一为 `PlatformViewToolbar`，补齐 `/workbench/index` 和 `/project/evaluation` 弹窗暗文本，重写 `docs/page-component-mapping.md` 全量映射，并修复 `PlatformViewToolbar` 工具按钮事件分发类型错误；已完成目标 ESLint、`git diff --check`、路由检查和隔离 Chrome headless 视觉验证。 |
| 高 | 平台表格刷新联动表头筛选 | 已完成，待视觉复核 | 已在 `PlatformTableToolbar + PlatformTable` 平台层补上刷新请求联动：当存在激活的表头筛选时，点击刷新优先由 `PlatformTable` 清空筛选并触发一次平台 `change`，不再沿用页面里的旧筛选条件刷新。 |
| 高 | 智能考勤管理 - 施工管理与 PlatformQueryPanel 首版 | 已完成，待视觉复核 | 已新增 `PlatformQueryPanel` 平台查询面板，并落地 `/battery/construction` 施工管理列表页；菜单已从 `BatteryMenu` 空白占位切到真实页面，需继续确认查询面板折叠手感、字段换行、按钮顺序和状态列观感。 |
| 高 | 登录页原组件宽度与品牌区纠偏 | 已完成，待视觉复核 | 已删除标题挥手和“其他登录方式”整块，关闭底部版权，登录模块宽度统一为 `480px` 并默认居中，左上角 `LOGO.svg` 改为品牌绿；需继续在隔离浏览器确认字号、边距和居中效果。 |
| 高 | 顶部导航窄屏“更多”浮窗源组件修正 | 已完成，待视觉复核 | 已将顶部横向菜单 overflow “更多”浮窗统一为白底纯文字菜单，移除图标/箭头，hover 改为品牌绿茶 10% 背景 + 品牌绿文字；需继续在隔离浏览器缩窄窗口确认实际观感。 |
| 高 | 项目信息管理新建项目弹窗与分段控件纠偏 | 已完成，待视觉复核 | 已将 `PlatformSegmented` 源组件改为居中、16px、无 hover 灰底；`/project/information` 弹窗已改为 720px，并补齐进场信息动态新增行逻辑；需继续肉眼确认弹窗宽度、切换稳态和新增行交互。 |
| 高 | 顶部导航用户菜单与消息入口微调 | 已完成，待视觉复核 | 已删除用户下拉中的“文档”入口，并将顶部待办/日程、消息通知、头像入口之间的相邻间距统一为 `8px`；需继续在隔离浏览器里确认视觉间距与菜单顺序。 |
| 高 | 项目总览表格操作列移除详情按钮 | 已完成，待视觉复核 | 已将 `/project/overview` 表格操作列中的“详情”移除，保留标题点击打开详情；需继续确认操作列宽度与标题点击交互符合预期。 |
| 高 | 变动与流失率统计 hover 与右侧数据列校准 | 已完成，待视觉复核 | 已在 `/personnel/turnover` 将 hover 阴影改为极淡灰色，tooltip 避让右侧数据列，并继续扩大右侧留白与标签宽度；需继续肉眼确认 `33.3%（1/3）` 一类数据完整可读且柱图区比例合适。 |
| 高 | 合同与付款管理付款节点标题行微调 | 已完成，待视觉复核 | 已将 `/project/contract` 付款节点圆点移动到“预付款 30% / 中期款 40% / 尾款 30%”标题行左侧；本轮只改页面业务组件 `ContractPaymentMiniBar`，需继续肉眼确认节点行间距和对齐。 |
| 高 | 明确当前项目目标和业务范围 | 已确认 | 当前已确认按“平台组件治理 + 真实业务页验证”推进。 |
| 高 | 梳理当前技术栈和应用结构 | 部分完成 | 已确认仓库为 `vben-admin-monorepo`，主应用为 `apps/web-antd/src`；已新增平台组件源头，仍需审计真实业务页引用关系。 |
| 高 | 前端联调源码交付包与交付说明 | 已完成 | 已新增 `docs/handoff-frontend.md` 并生成 `ST-design-source-handoff-20260508.zip`；源码包按 monorepo 整体交付，排除 `.git`、`node_modules`、`apps/web-antd/dist` 和本机临时文件。 |
| 高 | 本地预览快速打开规则 | 已完成 | 默认检查 `5173/5174`，不要把 `5000` 当作项目端口；`pnpm` 不可用时直接在 `apps/web-antd` 使用本地 Vite 二进制启动。 |
| 高 | 接续文档冲突清理 | 已完成 | 已清理 `AGENTS.md`、`docs/decision-records.md`、`docs/todo-next.md`、`docs/project-log.md` 中的 Git 冲突标记，并合并两条有效历史线。 |
| 高 | 登录与 Mock 模式进入系统 | 已完成 | 已支持 `VITE_USE_MOCK=true` 下登录、用户信息、权限、菜单、动态路由和刷新保持登录状态。 |
| 高 | 典型页面驱动平台组件改造一期 | 已完成 | 已新增 `components/platform` 平台薄封装与 `/platform/typical-page` 验证场。 |
| 高 | Figma 典型页面全局样式与导航表格源组件改造 | 已完成 | 已完成品牌 token、Antdv 全局样式、Vben 顶部/侧边菜单拆分、`PlatformTableToolbar` 和典型页验证。 |
| 高 | Figma 顶部导航栏源组件样式改造 | 已完成 | 已基于截图完成顶部布局源组件、Logo、水平菜单和右侧功能按钮样式改造；Figma MCP Go 已恢复连接，后续可继续补节点级校准。 |
| 高 | Figma MCP Go 本地连接规则沉淀 | 已完成 | 已确认本项目使用非官方 `@vkhanhqui/figma-mcp-go`，插件固定 `127.0.0.1:1994`，成功方案已写入 `AGENTS.md` 和 `docs/decision-records.md`。 |
| 高 | ant-design-vue 典型页面 Demo 开发 | 已完成第一版 | 已按专用受控数据源适配文件 `user-demo-source.ts` 落地 `/platform/typical-page`，字段、columns、树结构模型和操作入口对齐 `/system/user`；已完成浏览器登录、树筛选和新增抽屉抽查；真实后端恢复后仍需切回接口。 |
| 高 | 人员全生命周期 - 人员总览独立入口恢复 | 已完成，待视觉复核 | 已按用户纠偏保留 `/platform/typical-page` 人员档案管理不覆盖；新增 `/personnel/overview` 作为人员总览独立页面，包含统计卡、工具栏左侧新增人员、右侧默认 4 工具、状态/资质状态表头筛选和文字操作列。 |
| 高 | 人员全生命周期 - 人员档案管理页面保护 | 已完成，待视觉复核 | 当前人员档案管理是正确页面，继续保留在 `/platform/typical-page`；后续不得用人员总览覆盖档案页。 |
| 高 | 人员全生命周期 - 资质与准入管控页面第一版 | 已完成，待视觉复核 | 已新增 `/personnel/qualification` 独立页面并插入到人员档案管理下方；新增 `PlatformNoticeList` / `PlatformNoticeItem`，资质到期预警不使用表格；资质预警与准入规则配置一行两列；发送提醒按钮默认品牌绿描边、hover 绿底白字；批量提醒暂不做。 |
| 高 | 人员全生命周期 - 变动与流失率统计页面第一版 | 已完成，待视觉复核 | 已新增 `/personnel/turnover` 独立页面并插入到资质与准入管控下方、工时与兼职管控上方；统计卡复用 `PlatformStatCard`，各承包商流失率已改为按流失率排序的 ECharts 排名横向柱状图，保留 `PlatformEchartsPanel` 并补齐 `lostCount`、`totalCount`、`lossRate` mock 字段；未覆盖其他已完成模块。 |
| 高 | 人员全生命周期 - 工时与兼职管控页面第一版 | 已完成，待视觉复核 | 已新增 `/personnel/worktime`：超工时人员预警改为页面业务卡片，展示阈值 `180小时/月`、本月工时和超出时长；已按截图批注微调标题区与卡片网格 padding；底部兼职核查模块按用户要求暂不开发。 |
| 高 | 平台表格操作列文字按钮间距与字重修正 | 已完成，待继续抽查 | 已确认真实生效源头是 `PlatformButton scene=\"action\"`，并在按钮源组件恢复 `16px` 间距与 `600` 字重；已用独立 Chrome 临时 profile 复核 `/workbench/index` 的操作列显示恢复正常，下一步继续抽查 `/project/information`、`/personnel/overview` 等表格页。 |
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
| 高 | 截图开发前规则自检 | 已完成 | 已写入 `AGENTS.md` 和 `docs/decision-records.md`：即使用户确认开发，也必须先判断截图还原范围、平台组件优先级、页面 CSS 范围、是否新增平台组件和是否符合查询列表页模式。 |
| 高 | 新增或扩展平台组件前单独确认 | 已完成 | 已写入 `AGENTS.md` 和 `docs/decision-records.md`：新增平台组件、扩展平台组件能力、修改适配层、token 或全局样式入口前，必须先说明原因、影响范围、替代方案和查询列表页模式判断，并等待用户确认。 |
| 高 | 典型页面收尾平台治理影响章节 | 已完成 | 已写入 `AGENTS.md` 和 `docs/decision-records.md`：以后所有典型页面、截图页面、Figma 页面或业务右侧内容页收尾，都必须补充“平台治理影响”章节，并覆盖原生组件问题、平台层解决项、临时实现、未来回收组件、禁止复制实现、主题变量落点和页面级样式债务。 |
| 高 | 导航组件统一样式微调 | 已完成 | 已把顶部/左侧菜单字号、左侧菜单图标尺寸、顶部选中态满高背景和右上角设置/通知/头像 hover 收敛到菜单组件变量与头部公共样式类。 |
| 高 | 顶部导航栏 Logo 应用名更新 | 已完成 | 已在应用启动期将项目配置的 `preferences.app.name` 同步回当前偏好状态，避免历史 localStorage 继续显示旧应用名。 |
| 高 | 顶部导航本地 Logo、表格默认序号列、平台标题组件与卡片 hover | 已完成，待视觉复核 | 已使用 `/LOGO.svg` 作为系统名称左侧 32px 本地 Logo；`PlatformTable` 与 Vxe 适配层默认补“序号”列；新增 `PlatformSectionTitle` 并接入进度、文档、资质、流失率和工时相关标题；卡片 hover 只上移不出现品牌描边。 |
| 高 | 平台页面头部组件一期 | 已完成，待视觉复核 | 已扩展 `PlatformViewToolbar` 的 `actions` 配置能力，并首批接入 `/workbench/index`、`/project/document`、`/project/progress`、`/personnel/overview`；下一步需要确认按钮顺序、换行和视图切换样式。 |
| 高 | 平台页面头部组件二期 | 已完成，待视觉复核 | 已将 `/project/information`、`/project/evaluation`、`/personnel/turnover`、`/project/contract` 的手写头部统一替换为 `PlatformViewToolbar`；下一步需要确认第二批页面标题区与统计卡区的上下间距。 |
| 高 | 平台表格列设置浮层无蒙版交互 | 已完成，待视觉复核 | 已将 `PlatformTable` 的列设置从居中 `Modal` 改为设置 icon 下方的无蒙版浮层，移除头部标题和关闭按钮，宽度按内容自适应，并让 `/workbench/index`、`/project/information`、`/personnel/overview` 透传点击锚点；下一步需要肉眼确认浮层位置、宽度和关闭手感。 |
| 高 | 顶部用户下拉菜单精简与头像状态点描边 | 已完成，待视觉复核 | 已删除 `Gitee项目地址`、`Vben官方地址`、`问题 & 帮助` 3 个入口；头像绿色状态点外描边改为 `--header-foreground` 白色变量；因隔离浏览器链路不可用，下一步需用户刷新 `/platform/typical-page` 后点开头像复核。 |
| 高 | 左侧导航菜单项白色间隙取消 | 已完成，待视觉复核 | 已在 `@vben-core/menu-ui` 源组件将垂直菜单项 `--menu-item-margin-y` 从 `2px` 改为 `0px`，取消相邻菜单块之间的白色分隔；下一步需刷新 `/platform/typical-page` 后肉眼确认。 |
| 高 | 工时预警前缀样式对齐与人员总览表格前缀移除 | 已完成，待视觉复核 | 已将 `/personnel/worktime` 的姓名前缀块改为与人员档案一致的方形品牌绿样式，并移除 `/personnel/overview` 表格“人员信息”列中的姓氏前缀块；下一步需分别刷新两个页面确认观感。 |
| 高 | 平台表格窄屏横向滚动条默认可见 | 已完成，待视觉复核 | 已在 `PlatformTable` 源组件取消“仅 hover 才显示滚动条”的策略，窄屏横向溢出时底部滚动条默认显示；下一步需缩窄页面后确认观感。 |
| 高 | 左侧导航栏源组件样式修正 | 已完成 | 已调整左侧菜单展开态选中背景横向充满、收起态 48px 正方形背景、折叠按钮尺寸/位置/描边和收起态 tooltip 灰色变量。 |
| 高 | 左侧收起/展开按钮灰色背景变量修正 | 已完成 | 已将折叠按钮默认背景从品牌淡绿色变量改为 `--st-color-border-subtle`，hover 改为 `--st-color-border-control`。 |
| 高 | 顶部右侧图标按钮 hover 源组件修正 | 已完成 | 已让日程与通知按钮 hover 使用菜单 hover 背景变量，svg 保持白色，并共享头部图标摇铃动画修饰类。 |
| 高 | 项目总览页工具栏与统计卡平台化最小整改 | 已完成 | 已补组件映射表；`/workbench/index` 项目总览页已接入 `PlatformTableToolbar`；`PlatformStatCard` 背景、边框、文本、info 色和阴影已 token 化。 |
| 高 | 项目总览页统计卡标题与趋势文字统一 | 已完成 | `PlatformStatCard` 标题已改为黑色变量，趋势文字已统一加粗，项目总览页 5 个统计卡同步生效。 |
| 高 | 项目总览页统计卡头部下间距移除 | 已完成 | 已删除 `PlatformStatCard` 头部区域 `margin-bottom: 10px;`，保持源组件统一。 |
| 高 | 平台表格按页码完整展示并由页面整体滚动 | 已完成 | `PlatformTable` 默认关闭基于浏览器高度的内部滚动自适应；页码器一页展示多少条，就在当前页面完整展示多少条，超出浏览器高度时由页面整体上下滚动。 |
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
| 高 | 项目信息管理新建项目弹窗整改 | 已完成，待视觉复核 | `/project/information` 已新增 `PlatformSegmented` 并接入新建项目弹窗，形成 `基础信息 / 招采信息 / 进场信息` 三段式表单；表格继续保持工具栏左侧新建、表头类型/状态筛选、文字操作列。 |
| 高 | 进度可视化跟踪页面右侧内容开发 | 已完成，待用户视觉确认 | 已新增 `/project/progress` 页面和页面专用 Mock 数据源，支持甘特图 / 看板双视图；甘特图使用现有 ECharts 插件，看板四列卡片已完成隔离浏览器验证。 |
| 高 | 进度可视化跟踪页面纠偏 | 进行中/已暂停 | 用户要求今天结束时，纠偏阶段尚未完成：已开始新增平台组件雏形和查询数据结构，但尚未完成页面重构、删除页面专用组件、验证或最终平台治理映射。下一轮必须先审计当前 diff。 |
| 高 | 项目信息管理筛选入口平台化 | 已完成 | 已按用户反馈移除工具栏里的 `全部状态` / `全部类型` 下拉，改为 `项目类型`、`状态` 表头筛选，复用 `PlatformTable` 的“全部”和即时生效规则。 |
| 高 | 平台表格固定操作列 hover 透明问题 | 已完成 | 已在 `PlatformTable` 源组件修复 fixed 左/右列、`fix-right-first`、`fix-left-last` 的默认、hover、selected 和 `ant-table-cell-row-hover` 状态；将 fixed cell 拆成纯白底层和实心浅绿 hover 层，避免操作列透出下方内容。 |
| 高 | 左侧导航菜单项高度与左侧距离源组件修正 | 已完成 | 已在 `menu-ui` 源组件将垂直展开态菜单项高度统一为 `52px`，一级菜单内容左侧距离统一为 `24px`；未改当前页面样式，未影响顶部横向菜单和收起态。 |
| 高 | 合同与付款管理页面右侧内容开发 | 已完成 | 已新增 `/project/contract` 页面和页面专用 Mock 数据源，顶部统计卡复用 `PlatformStatCard`；付款节点已改为 ECharts mini bar + 下方文字，合同卡片宽屏三列、中屏两列、小屏一列；已完成 headless Chrome 验证。 |
| 高 | 文档与台账管理页面右侧内容开发 | 已完成 | 已新增 `/project/document` 页面、页面专用 Mock 数据源和 `PlatformFileList` / `PlatformFileItem` 平台文件列表薄封装；文档列表已调整为宽屏两列、窄屏单列；已完成 ESLint、HTTP 和隔离浏览器验证。 |
| 高 | 中期评估与验收管理页面右侧内容开发 | 已完成，待视觉复核 | 已新增 `/project/evaluation` 页面和页面专用 Mock 数据源，并完成评论整改：顶部发起评估按钮已删除，工具栏辅助文案和重复下拉筛选已删除，评估结果筛选迁到表头，评估记录在左侧宽列，待评估项目在右侧窄列；已完成 ESLint、HTTP 检查。 |
| 高 | 本轮新页面视觉确认 | 待执行 | 下一轮优先由用户确认 `/project/contract` ECharts mini bar、`/project/progress` 甘特图/看板、`/project/document` 两列文件列表、`/project/evaluation` 治理后左右布局和右侧表格是否符合原型预期。 |
| 高 | 新页面查询列表页模式复核 | 待执行 | 下一轮如继续做项目全景管理页面，开发前先判断页面是否应采用“查询区 + 工具栏 + 表格/列表 + 分页 + 批量操作”模式；不采用时必须写明原因并等待确认。 |
| 中 | 应用级 `vue-tsc` 存量错误整理 | 待处理 | 本次运行 `vue-tsc -p apps/web-antd/tsconfig.json --noEmit --skipLibCheck --pretty false` 仍有既有组件和演示页错误；当前失败列表不包含 `/project/contract` mini bar、`/project/evaluation` 和 `PlatformSelect` 改动。 |
| 中 | `PlatformTable` 筛选下拉逻辑整理 | 待处理 | 当前 `PlatformTable` 能力偏多；后续只整理筛选下拉 helper，本轮不拆组件。 |
| 中 | 表格全屏能力下沉评估 | 待处理 | 当前项目总览页已接入全屏；后续评估沉淀到 `PlatformTableToolbar` 或 `PlatformTable`，本轮不做。 |
| 中 | 多页面复用后评估 `PlatformEntityCell` | 待观察 | 项目信息业务单元格暂留页面，等多页面复用后再抽。 |
| 中 | 多页面复用后评估 `PlatformProgress` | 待观察 | 项目进度列暂留页面，等多页面复用后再抽。 |
| 中 | 多页面复用后评估 `PlatformDescriptions` | 待观察 | 详情抽屉内容暂留页面，等多页面复用后再抽。 |
| 高 | 设计稿菜单骨架收敛 | 部分完成 | 顶部一级菜单已按设计稿展示；未开发菜单保留独立 path 并复用 Blank；`人员全生命周期 - 人员总览` 已指向 `/platform/typical-page`；仍需修复 `/system/user` 直访问兼容。 |
| 高 | `/system/user` 直访问兼容 | 待处理 | 当前浏览器直访 `/system/user` 未正确进入原真实页面。下次先排查 access mode、动态路由注入、mock 菜单源与隐藏路由关系，不要直接改 Vben 核心。 |
| 高 | 旧 `/system/user` 页面解绑 | 已完成 | 已删除旧页面路由入口和页面壳文件，菜单入口已收口到 `/platform/typical-page`，不再把旧页作为本阶段目标。 |
| 高 | 清理 Git 跟踪依赖产物问题 | 待确认 | 当前仓库存在 `node_modules` 等依赖产物被 Git 跟踪的问题，后续启动开发服务容易产生无意义变更；需用户确认清理范围和 `.gitignore` 策略。 |
| 高 | 建立业务页面 Mock 数据组织方式 | 部分完成 | `/project/information` 已采用页面专用 Mock 数据源和本地状态模拟；后续新增业务页继续沿用“页面专用数据源，后续可切接口”的方式。 |
| 中 | 将接续文档链接到文档入口 | 待处理 | 可考虑在 `README.md` 或内部文档入口中增加 `AGENTS.md` 和 docs 接续文档说明。 |
| 中 | 建立平台组件和业务页面的治理规则 | 已建立基础规则 | 已沉淀 ant-design-vue 组件改造默认规则和平台组件源头目录；仍需结合真实页面做迁移治理。 |

## 本轮收尾状态

| 日期 | 状态 | 说明 |
| --- | --- | --- |
| 2026-05-08 | 已完成，待视觉复核 | 已按用户截图批注微调 `/personnel/worktime` 的 `超工时人员预警` 区块：标题区仅保留下方 24px padding，预警卡片网格仅保留上方 24px padding；本轮只改页面布局类，不改平台组件、token 或全局样式。 |
| 2026-05-08 | 已完成，待视觉复核 | 已完成 `人员全生命周期 - 变动与流失率统计` 第一版：新增 `/personnel/turnover` 与页面专用数据源；菜单位于 `资质与准入管控` 下方、`工时与兼职管控` 上方；统计卡复用 `PlatformStatCard`，承包商流失率复用 `PlatformEchartsPanel` + ECharts；未改动人员总览、人员档案、资质与工时页面主体；目标 ESLint 与相关路由 HTTP 检查通过，全量 `vue-tsc` 仍因既有错误失败但不包含本轮文件。 |
| 2026-05-08 | 已完成，待视觉复核 | 已完成平台源组件统一：顶部系统名左侧使用本地 `/LOGO.svg`；`PlatformTable` 和 Vxe 适配层默认提供序号列；新增 `PlatformSectionTitle` 并接入指定标题；删除超工时说明文案；统计卡、超工时卡和待评估卡 hover 仅上移；目标 ESLint、`git diff --check` 和相关路由 HTTP 检查通过，应用级 `vue-tsc` 仍有既有存量错误。 |
| 2026-05-08 | 已完成，待视觉复核 | 已完成 `人员全生命周期 - 资质与准入管控` 第一版：新增 `/personnel/qualification` 和 `PlatformNoticeList` / `PlatformNoticeItem`；菜单位于人员档案管理下方；页面不使用表格，资质预警与准入规则配置一行两列；发送提醒按钮品牌绿描边、hover 绿底白字；批量提醒暂不开发；目标 ESLint、`git diff --check`、HTTP 检查通过；全量 `vue-tsc` 仍因既有错误失败但不包含本轮文件。 |
| 2026-05-08 | 已完成，待视觉复核 | 已完成 `/project/evaluation` 评论整改：删除顶部发起评估按钮、两处辅助文案、待评估工具栏状态/阶段下拉和内容区 padding；评估记录结果筛选改为表头筛选；待评估卡片按钮改为主按钮；评估记录与待评估项目左右位置已调换。 |
| 2026-05-08 | 已完成，待视觉复核 | 已按用户纠偏恢复 `人员全生命周期 - 人员总览` 独立入口：新增 `/personnel/overview` 页面和页面专用数据源；保留 `/platform/typical-page` 人员档案管理不覆盖；目标 ESLint、`git diff --check`、HTTP 检查通过，全量 `vue-tsc` 仍因既有错误失败但不包含本轮文件。 |
| 2026-05-08 | 已完成，待视觉复核 | 已完成平台页面头部组件一期：扩展 `PlatformViewToolbar` 的 `actions` 配置能力，并首批接入 `/workbench/index`、`/project/document`、`/project/progress`、`/personnel/overview`；目标文件 ESLint、`git diff --check` 与四个路由 HTTP 检查通过。 |
| 2026-05-08 | 已完成，待视觉复核 | 已完成平台页面头部组件二期：将 `/project/information`、`/project/evaluation`、`/personnel/turnover`、`/project/contract` 的手写头部统一替换为 `PlatformViewToolbar`；目标文件 ESLint、`git diff --check` 与四个路由 HTTP 检查通过。 |
| 2026-05-08 | 已完成，待视觉复核 | 已完成 `人员全生命周期 - 工时与兼职管控` 第一版：新增 `/personnel/worktime` 页面和页面专用数据源；超工时预警使用卡片样式，右侧显示 `阈值：180小时/月`，卡片 hover 上移，通知整改按钮默认品牌绿描边、hover 品牌绿填充白字；兼职核查模块暂不开发。 |
| 2026-05-08 | 已完成，待视觉复核 | 已完成 `项目全景管理 - 项目信息管理` 表格与新建项目弹窗整改：新增 `PlatformSegmented` 平台分段控件；新建项目弹窗已按基础信息、招采信息、进场信息分段；目标文件 ESLint、`git diff --check`、HTTP 检查通过，全量 `vue-tsc` 仍因既有错误失败但不包含本轮文件。 |
| 2026-05-08 | 已完成，待视觉复核 | 已完成平台表格列设置浮层交互调整：`PlatformTable` 已由居中 `Modal` 改为设置 icon 下方无蒙版浮层，移除头部标题和关闭按钮，宽度按内容自适应，支持点击外部关闭和 `Esc` 关闭；目标文件 ESLint、`git diff --check`、`/workbench/index` 与 `/project/information` HTTP 检查通过。 |
| 2026-05-08 | 已完成，待视觉复核 | 已完成 `人员全生命周期 - 人员总览` 第一版：菜单改名，页面接入统计卡、平台工具栏、平台表格、状态/资质表头筛选、新增人员弹窗；操作列已从 icon-only 改回文字按钮；所有录入控件已补业务化 placeholder；目标文件 ESLint、`git diff --check`、HTTP 检查通过，全量 `vue-tsc` 仍因既有错误失败但不再包含本轮文件。 |
| 2026-05-09 | 已完成，待视觉复核 | 已按截图微调顶部导航原组件：删除用户下拉中的“文档”入口，并将顶部待办/日程、消息通知、头像入口之间的相邻间距统一为 `8px`；`git diff --check` 通过，本轮未做浏览器截图验证。 |
| 2026-05-07 | 已收尾 | 已按用户要求停止开发并完成规则复盘收尾：`AGENTS.md`、`docs/decision-records.md`、`docs/project-log.md`、`docs/todo-next.md` 已更新；新增/扩展平台组件必须单独确认，小反馈落到平台层也必须先补简版映射和影响范围。 |
| 2026-05-07 | 已收尾 | 今天结束收尾：已更新接续文档，并将“新增或扩展平台组件必须单独确认”同步到 `AGENTS.md` 和 `docs/decision-records.md`；下一轮先审计 `/project/progress` 未完成 diff，再做 `/project/contract`、`/project/document`、`/project/evaluation`、`/project/progress` 视觉确认。 |
| 2026-05-07 | 已暂停 | 今天结束收尾：已停止继续开发并停掉本轮 Vite 服务；`/project/progress` 纠偏阶段只完成部分平台组件雏形和数据源调整，未完成页面重构、删除页面专用组件或重新验证；下一轮需先审计当前 diff，再决定继续、回退或迁移。 |
| 2026-05-07 | 已完成 | 已按用户确认将 `/project/contract` 付款节点区域改为 ECharts mini bar + 下方文字：新增页面内 `ContractPaymentMiniBar`，验证统计卡 3 张、合同卡片 8 张、ECharts canvas 8 个、节点文字 24 个，旧纯列表 DOM 不存在，控制台无 error；全量 `vue-tsc` 仍有既有模块错误。 |
| 2026-05-07 | 已完成 | 已补充“平台治理影响”长期收尾规则：`AGENTS.md` 和 `docs/decision-records.md` 已同步；`docs/project-log.md` 今天结束收尾记录已补平台治理影响七项盘点。 |
| 2026-05-07 | 已收尾 | 已完成今天结束收尾：`docs/project-log.md`、`docs/todo-next.md` 已更新；本轮产生的长期规则已确认同步到 `AGENTS.md` 和 `docs/decision-records.md`；下一轮优先做新页面视觉确认和全量 `vue-tsc` 存量错误治理。 |
| 2026-05-07 | 已完成 | 已完成 `/project/evaluation` 页面治理整改：评估记录改为 `PlatformTable`，左右两栏均接入 `PlatformTableToolbar` 查询筛选，页面 scoped CSS 收敛到布局和少量业务列表结构；`PlatformSelect` 已去掉 Antdv 废弃属性；目标文件 ESLint、`git diff --check`、HTTP 路由和隔离浏览器验证通过。 |
| 2026-05-07 | 已完成 | 已补充截图开发前规则自检：确认开发后仍必须先输出组件映射、文件归属和规则自检，明确是否局部修正、是否完整还原截图、是否优先复用平台组件、是否大量手写 CSS、是否新增平台组件和是否采用查询列表页模式；本轮只改文档，`git diff --check` 通过。 |
| 2026-05-07 | 已完成，待用户视觉确认 | 已完成 `项目全景管理 - 进度可视化跟踪` 右侧内容：新增 `/project/progress` 页面、专用 Mock 数据源、ECharts 甘特图组件和看板组件；目标文件 ESLint、`git diff --check`、HTTP 路由和隔离浏览器验证通过；全量 `vue-tsc` 仍有既有模块错误。 |
| 2026-05-07 | 已完成 | 已按用户反馈将 `/project/document` 文档列表调整为宽屏两列展示；`PlatformFileList` 新增 `columns` 配置，页面传入 `2`，隔离浏览器验证两列宽度为 `547px 547px`。 |
| 2026-05-07 | 已完成 | 已完成 `项目全景管理 - 中期评估与验收管理` 右侧内容：新增 `/project/evaluation` 页面、专用 Mock 数据源和菜单 component 指向；待评估项目与评估记录采用左右自适应布局；目标文件 ESLint、`git diff --check`、HTTP 路由和隔离浏览器验证通过。 |
| 2026-05-07 | 已完成 | 已完成 `项目全景管理 - 文档与台账管理` 右侧内容：新增 `/project/document` 页面、专用 Mock 数据源、`PlatformFileList` / `PlatformFileItem` 平台文件列表薄封装，并将菜单 component 指向真实页面；目标文件 ESLint、`git diff --check`、HTTP 路由和隔离浏览器验证通过；全量 `vue-tsc` 仍有既有模块错误。 |
| 2026-05-07 | 已完成 | 已完成 `项目全景管理 - 合同与付款管理` 右侧内容第一版：新增 `/project/contract` 页面、专用 Mock 数据源和菜单 component 指向；目标文件 ESLint、`git diff --check`、HTTP 路由和 headless Chrome 宽屏三列验证通过；应用级 `vue-tsc` 仍有存量/并行改动错误。 |
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
3. 下一轮第一优先级：继续按已完成业务页的收尾与复核推进，不再展开新的平台规划方向。
4. 优先在 `/project/information` 与 `/personnel/overview` 做一次视觉复核，确认顶部筛选区移除后页面节奏正常，且表头筛选仍满足当前演示目的。
5. 如需新增独立验证页，只能在不影响 `apps/web-antd` 当前开发的前提下单独评估，不批量迁移现有组件或业务页面。
6. 如继续处理 `/project/evaluation`，优先判断右侧评估记录表格在更窄浏览器宽度下是否还需要进一步微调列宽或响应式策略。
7. 如用户要求视觉确认，再重新启动 Vite 并打开 `/battery/construction`、`/project/contract`、`/project/progress`、`/project/evaluation`、`/project/document`；不要沿用今天的 `5672` / `5673` 端口状态。
8. 如继续处理平台表格存量事项，再刷新 `/workbench/index` 和 `/project/information`，人工拖动横向滚动条确认 `PlatformTable` 表头与表体同步不再抖动。
9. 如需继续查看典型页面，先确认当前 Vite 服务端口是否仍在运行；跨设备或新会话不要假设端口仍可用，应以实际 `lsof` 或新启动结果为准。
10. 旧 `/system/user` 页面已解绑并删除壳文件，不再作为当前阶段目标；`人员全生命周期 - 人员总览` 当前恢复为 `/personnel/overview` 独立入口，`/platform/typical-page` 保留为人员档案管理，下一步优先做两个页面的视觉复核和新增弹窗交互细化。
11. 继续抽查其他真实业务页，确认是否也已统一接入平台组件和 Vxe 适配层；`system/post`、`system/dept` 已验证，`system/role` 已删除。
12. Figma MCP Go 已恢复连接；后续如继续做 Figma 对齐，优先读取顶部导航节点 `2045-1586`，对照 `LayoutHeader`、`VbenLogo`、水平 `Menu` 和右侧按钮做节点级尺寸与切图校准。
13. 对表格工具栏继续遵守统一规则：业务主按钮放最左，次要按钮随后；搜索、刷新、设置、全屏等常规工具统一由平台表格工具栏或 Vxe 适配层承载。
14. 围绕 `/platform/typical-page` 继续做视觉对齐，由用户指出 Button、Table、Tree、Form、Modal、Drawer 等具体样式问题后回到平台组件源头改造。
15. 如果后续继续统一头部交互态，优先复用 `platform-header-icon-action`，把主题切换、时区等剩余头部图标按钮收口到同一套 hover/focus 规则。
16. 当前典型页面 Demo 下一步建议：先让用户在 `http://127.0.0.1:5173/platform/typical-page` 上确认第一版真实业务验证场的结构和组件问题。
17. 后端数据源可用后，在 `apps/web-antd/src/views/platform/typical-page/user-demo-source.ts` 内把受控数据源切回 `/system/user/list`、`/system/user/deptTree` 等真实接口，尽量不改页面主体。
18. 典型页面 Demo 开发时，顶部导航、左侧导航和面包屑必须纳入验证范围；组件视觉样式优先沉淀到平台组件场景，页面 scoped CSS 只写布局。
19. 后续用户提供截图或指出组件样式问题时，即使没有特别强调全局修改，也默认映射到 ant-design-vue 原生组件、平台薄封装和全局样式源头处理。
20. 如果用户提供截图或页面需求，先按 `AGENTS.md` 的截图与页面需求分析输出规则判断输出强度：简单组件反馈用简版映射，复杂页面再输出完整表格。
21. `/project/evaluation` 后续建议补充评估详情、评估模板配置、验收附件和导出能力；当前发起评估只是前端模拟流程。
22. 所有典型页面、截图页面、Figma 页面或业务右侧内容页收尾时，必须补“平台治理影响”章节，不得只写完成和验证。
23. 等用户确认后，再开始下一步具体平台组件改造、方案设计或代码修改。

## 暂时不处理的问题

1. 暂不批量迁移真实业务页面到 `components/platform`，应先完成 Vxe 适配层和首批真实页验证。
2. 暂不直接用当前 `PlatformTable` 替换真实业务页的 `useVbenVxeGrid`，真实业务页短期仍以 Vben Vxe 表格路线为主。
3. 暂不将截图分析模板拆分为独立规范文档，待后续页面需求增多后再判断是否需要。
4. 暂不将 dist 静态包、mock 数据和业务项目解耦等规则写成项目强约束，待结合实际需求确认后再沉淀。
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
13. 本轮验证端口曾使用 `http://127.0.0.1:5672/` 和 `http://127.0.0.1:5673/`；`5673` 已在合同付款 mini bar 验证后停止，下次接续时必须以实际 `lsof` 或新启动结果为准，不要直接沿用当前浏览器端口状态。
14. 当前预览已删除可见的 Vben 示例模块入口；如后续需要业务模块，应按真实业务范围重新接入，避免直接恢复示例模块造成平台范围混乱。
15. Figma MCP Go 已恢复连接，但不同电脑上本机二进制缓存路径可能变化；如再次断开，应优先按 `AGENTS.md` 第 8 节重新定位 `figma-mcp-go` 二进制并更新 MCP 配置。
16. 本轮 Vite 构建曾产生 `apps/web-antd/dist` 与 `apps/web-antd/dist.zip` 临时产物，现已清理；后续每次构建后仍需复查，避免把构建产物纳入源码提交。
17. 2026-05-09 第一批治理后，全量 `vue-tsc` 仍失败；`PlatformViewToolbar` 类型错误已清除，`apps/web-antd/src/views/演示使用自行删除/` 已删除，剩余错误仍需以后按实际命令输出重新确认。
18. `角色管理` 页面入口已删除，但 `system/user` 仍依赖角色数据范围配置；后续如果继续清理角色相关代码，需要先确认不会影响用户新增/编辑抽屉。
19. 当前 `agent-browser` 命令不可用，Playwright 浏览器二进制未下载；本轮可通过系统 Chrome headless 临时会话完成隔离验证，但需要提升权限，后续如需常态化自动视觉验证仍建议修复浏览器验证链路。
20. 当前 Browser Use in-app backend 初始化不可用；不要改用用户当前 Mac Chrome 窗口做验证，除非用户明确确认。
21. 当前典型页使用受控数据源只是后端不可用下的验证方案，不能替代真实 `/system/user` 联调；后端恢复后需要优先切回真实接口并复核筛选、分页、状态切换和操作入口。
22. 当前菜单骨架已让未开发菜单使用独立 path + Blank component，但 `/system/user` 直访问未正确进入原页面；如果下次直接改菜单核心或 route-to-menu，可能误伤 breadcrumb、tabs、权限路由和刷新激活态，必须先做最小归因。
23. 如果继续保留被 Git 跟踪的 `node_modules` 和 Vite 缓存，后续安装依赖、启动开发服务或热更新都可能造成大量无意义 diff。
24. 如果后续静态页面 Mock 数据没有统一组织，新增、编辑、删除、详情、筛选等前端模拟交互容易分散在页面内部，后续联调迁移成本会上升。
25. 如果一开始就批量迁移 `web-antd` 组件或业务页，可能打断当前业务开发；后续如有新增独立验证页，也必须先评估边界再接入。
26. “打开浏览器”“打开页面”“打开本地预览”现已固化为固定口令：默认直开 `http://127.0.0.1:5173/`，服务未启动则先拉起 Vite，再直接执行打开，不再重复确认。
