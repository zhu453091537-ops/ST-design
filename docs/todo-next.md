# 下一步待办

本文件记录当前待办、优先级、推荐下一步、暂时不处理的问题和风险提醒，用于跨设备、跨聊天上下文恢复。

## 当前待办

| 优先级 | 事项 | 状态 | 说明 |
| --- | --- | --- | --- |
| 高 | 明确当前项目目标和业务范围 | 待确认 | 需要确认本项目是作为平台母版、具体业务项目，还是二者结合推进。 |
| 高 | 梳理当前技术栈和应用结构 | 部分完成 | 已确认仓库为 `vben-admin-monorepo`，主应用为 `apps/web-antd/src`；已新增平台组件源头，仍需审计真实业务页引用关系。 |
| 高 | 典型页面驱动平台组件改造一期 | 已完成 | 已新增 `components/platform` 平台薄封装与 `/platform/typical-page` 验证场。 |
| 高 | 审计 ant-design-vue 与平台组件引用关系 | 待处理 | 下一步需要扫描真实业务页面是否直接使用 `antdv-next`、`a-button`、`Tree`、`useVbenVxeGrid`、`useVbenForm`、`useVbenModal`、`useVbenDrawer`，并输出迁移优先级。 |
| 高 | 确认 `PlatformTable` 与 Vben Vxe 表格边界 | 待确认 | 当前典型页 `PlatformTable` 基于 ant-design-vue `Table`，真实业务页大量使用 `useVbenVxeGrid`，不能直接批量替换。 |
| 高 | 对下一张截图或页面需求输出结构化分析 | 待执行 | 需先输出页面结构、组件映射、文件归属、自检表、交互状态，再等待确认。 |
| 中 | 将接续文档链接到文档入口 | 待处理 | 可考虑在 `README.md` 或内部文档入口中增加 `AGENTS.md` 和 docs 接续文档说明。 |
| 中 | 建立平台组件和业务页面的治理规则 | 已建立基础规则 | 已沉淀 ant-design-vue 组件改造默认规则和平台组件源头目录；仍需结合真实页面做迁移治理。 |

## 本轮收尾状态

| 日期 | 状态 | 说明 |
| --- | --- | --- |
| 2026-05-05 | 已收尾 | 本轮完成项目长期协作规则、跨设备接续机制、ant-design-vue 组件改造默认规则、截图与页面需求分析输出规则的文档沉淀。 |
| 2026-05-05 | 已完成 | 已完成典型页面驱动平台组件改造一期，新增平台组件源头和 `/platform/typical-page` 验证场。 |

## 推荐下一步

1. 用户输入“开工继续”或提出下一个开发需求后，先读取 `AGENTS.md`、`docs/project-log.md`、`docs/decision-records.md`、`docs/todo-next.md`。
2. 输出项目接续摘要，明确当前项目目标、技术栈、最近完成内容、未完成事项、关键规则和建议执行顺序。
3. 可以访问 `http://127.0.0.1:5667/platform/typical-page` 查看典型页面验证场。
4. 围绕 `/platform/typical-page` 继续做视觉对齐，由用户指出 Button、Table、Tree、Form、Modal、Drawer 等具体样式问题后回到平台组件源头改造。
5. 审计真实业务页面中直接使用 `a-button`、`antdv-next`、`Tree`、`useVbenVxeGrid`、`useVbenForm`、`useVbenModal`、`useVbenDrawer` 的情况，输出迁移优先级。
6. 确认 `PlatformTable` 与现有 `useVbenVxeGrid` 的长期边界：是并存、逐步迁移，还是新增 Vben Vxe 平台适配组件。
7. 优先确认当前项目定位：平台母版、具体业务项目，还是二者结合推进。
8. 如果用户提供截图或页面需求，先按 `AGENTS.md` 的截图与页面需求分析输出规则产出 Markdown 分析。
9. 等用户确认后，再开始具体平台组件改造、方案设计或代码修改。

## 暂时不处理的问题

1. 暂不批量迁移真实业务页面到 `components/platform`，待完成真实页面组件引用审计后再推进。
2. 暂不直接用当前 `PlatformTable` 替换真实业务页的 `useVbenVxeGrid`，需先确认表格路线边界。
3. 暂不将截图分析模板拆分为独立规范文档，待后续页面需求增多后再判断是否需要。
4. 暂不将 dist 静态包、mock 数据、平台母版和业务项目解耦等规则写成项目强约束，待结合实际需求确认后再沉淀。

## 风险提醒

1. 如果后续不持续更新 `docs/project-log.md` 和 `docs/todo-next.md`，跨设备接续仍会依赖聊天记忆，违背当前项目规则。
2. 如果长期决策只写入任务日志而不写入 `docs/decision-records.md`，后续容易误判规则是否长期有效。
3. 当前项目目标和业务边界尚未正式记录，下一阶段需要优先补齐。
4. 如果业务页面继续直接大量使用 ant-design-vue 原生组件，平台级样式改造可能无法统一生效。
5. 如果只在页面 scoped CSS 中处理通用组件问题，后续会导致样式分散和维护成本上升。
6. 如果截图分析阶段直接跳到代码实现，容易误判组件归属、业务边界和样式落点。
7. 当前 `PlatformTable` 基于 ant-design-vue `Table`，但真实业务页可能大量使用 `useVbenVxeGrid`；如果不先确认表格路线边界，后续可能出现两套表格平台能力并行维护的问题。
