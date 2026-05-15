# 前端联调交接文档

本文档面向接手源码的前端同学，用于从当前静态 Mock 页面切换到真实后端接口。

## 1. 项目形态

| 项 | 内容 |
| --- | --- |
| 主应用 | `source/apps/web-antd` |
| 技术栈 | Vue 3、Vite、Vben Admin 5、ant-design-vue、Vxe Table、ECharts |
| 平台组件 | `source/apps/web-antd/src/components/platform` |
| Vxe 适配层 | `source/apps/web-antd/src/adapter/vxe-table.ts` |
| 全局样式 | `source/packages/styles/src/antd/index.css` |
| Mock 入口 | `source/apps/web-antd/src/mock/index.ts` |
| 交付预览环境 | `source/apps/web-antd/.env.handoff` |

## 2. 本地启动

```bash
cd source
pnpm install
pnpm dev:antd
```

如本机依赖已完整但 `pnpm` 不可用：

```bash
cd source/apps/web-antd
../../node_modules/.bin/vite --mode development
```

默认访问：

```text
http://127.0.0.1:5173/
```

## 3. Mock 与真实接口切换

当前阶段默认使用前端 Mock：

| 配置 | 当前值 | 文件 |
| --- | --- | --- |
| `VITE_USE_MOCK` | `true` | `source/apps/web-antd/.env.development` |
| `VITE_GLOB_API_URL` | `/api` | `source/apps/web-antd/.env.development` |
| 预览路由 | `hash` | `source/apps/web-antd/.env.handoff` |
| 预览资源根 | `./` | `source/apps/web-antd/.env.handoff` |

联调建议顺序：

1. 保留 Vben 登录、token、用户信息、权限、菜单和动态路由机制。
2. 将 `VITE_USE_MOCK=false`，配置真实接口代理或接口域名。
3. 先接登录、用户信息、菜单权限接口。
4. 再逐页把 `*-source.ts` 本地数据替换为 API 请求。
5. 页面字段尽量在 source 适配层转换，不要把接口字段散落在组件模板里。

## 4. 已完成页面清单

| 页面 | 路由 | 页面源码 | 当前数据源 |
| --- | --- | --- | --- |
| 登录页 | `/auth/login` | `src/views/_core/authentication/login.vue` | Mock 登录 |
| 项目总览 | `/workbench/index` | `src/views/project/overview/index.vue` | `project-overview-source.ts` |
| 项目信息管理 | `/project/information` | `src/views/project/information/index.vue` | `project-information-source.ts` |
| 进度可视化跟踪 | `/project/progress` | `src/views/project/progress/index.vue` | `project-progress-source.ts` |
| 合同与付款管理 | `/project/contract` | `src/views/project/contract/index.vue` | `project-contract-source.ts` |
| 文档与台账管理 | `/project/document` | `src/views/project/document/index.vue` | `project-document-source.ts` |
| 中期评估与验收管理 | `/project/evaluation` | `src/views/project/evaluation/index.vue` | `project-evaluation-source.ts` |
| 人员总览 | `/personnel/overview` | `src/views/personnel/overview/index.vue` | `personnel-overview-source.ts` |
| 人员详情壳 | `/personnel/overview/detail` | `src/views/personnel/detail/index.vue` | 路由 query |
| 资质与准入管控 | `/personnel/qualification` | `src/views/personnel/qualification/index.vue` | `personnel-qualification-source.ts` |
| 变动与流失率统计 | `/personnel/turnover` | `src/views/personnel/turnover/index.vue` | `personnel-turnover-source.ts` |
| 工时与兼职管控 | `/personnel/worktime` | `src/views/personnel/worktime/index.vue` | `personnel-worktime-source.ts` |
| 施工管理 | `/battery/construction` | `src/views/battery/construction/index.vue` | `construction-source.ts` |
| 人员档案管理典型页 | `/platform/typical-page` | `src/views/platform/typical-page/index.vue` | `user-demo-source.ts` |

## 5. 待接接口建议

| 模块 | 列表/详情 | 新增/编辑 | 删除/状态 | 统计/图表 |
| --- | --- | --- | --- | --- |
| 项目总览 | `GET /project/overview/list` | `POST/PUT /project/overview` | `DELETE /project/overview/{id}`、`POST /project/overview/{id}/archive` | `GET /project/overview/stats` |
| 项目信息 | `GET /project/information/list` | `POST/PUT /project/information` | `DELETE /project/information/{id}`、`POST /project/information/{id}/archive` | - |
| 进度跟踪 | `GET /project/progress/list` | `PUT /project/progress/{id}` | - | `GET /project/progress/gantt`、`GET /project/progress/board` |
| 合同付款 | `GET /project/contract/list` | `POST/PUT /project/contract` | - | `GET /project/contract/stats` |
| 文档台账 | `GET /project/document/list` | `POST /project/document/upload` | `DELETE /project/document/{id}` | `GET /project/document/stats` |
| 评估验收 | `GET /project/evaluation/list` | `POST /project/evaluation/start` | `PUT /project/evaluation/{id}/status` | `GET /project/evaluation/stats` |
| 人员总览 | `GET /personnel/overview/list`、`GET /personnel/overview/{id}` | `POST/PUT /personnel` | `DELETE /personnel/{id}` | `GET /personnel/overview/stats` |
| 资质准入 | `GET /personnel/qualification/list` | `POST/PUT /personnel/qualification` | `POST /personnel/qualification/remind` | `GET /personnel/qualification/stats` |
| 变动流失率 | `GET /personnel/turnover/list` | - | - | `GET /personnel/turnover/stats` |
| 工时兼职 | `GET /personnel/worktime/list` | `PUT /personnel/worktime/{id}` | `POST /personnel/worktime/remind` | `GET /personnel/worktime/stats` |
| 施工管理 | `GET /battery/construction/list`、`GET /battery/construction/{id}` | `POST/PUT /battery/construction` | `PUT /battery/construction/{id}/status` | `GET /battery/construction/stats` |

## 6. 字段映射建议

通用分页返回：

| 页面需要 | 建议字段 |
| --- | --- |
| 列表数据 | `records` 或 `list` |
| 总数 | `total` |
| 当前页 | `pageNum` |
| 每页数量 | `pageSize` |

项目类字段：

| 页面字段 | 后端建议字段 |
| --- | --- |
| 项目编号 | `projectCode` |
| 项目名称 | `projectName` |
| 项目类型 | `projectType` |
| 所属部门 | `departmentName` |
| 承包商 | `contractorName` |
| 合同金额 | `contractAmount` |
| 负责人 | `managerName` |
| 进度 | `progressPercent` |
| 状态 | `status` |

人员类字段：

| 页面字段 | 后端建议字段 |
| --- | --- |
| 姓名 | `personName` |
| 所属承包商 | `contractorName` |
| 岗位 | `positionName` |
| 资质状态 | `qualificationStatus` |
| 准入状态 | `accessStatus` |
| 月工时 | `monthlyHours` |
| 兼职状态 | `partTimeStatus` |

文档/附件字段：

| 页面字段 | 后端建议字段 |
| --- | --- |
| 文件名 | `fileName` |
| 文件类型 | `fileType` |
| 文件大小 | `fileSize` |
| 上传人 | `uploaderName` |
| 上传时间 | `uploadTime` |
| 下载地址 | `downloadUrl` |

## 7. 联调注意事项

1. 不要绕开当前 Vben 登录和路由守卫另起一套权限体系。
2. 不要把接口请求直接写死在模板里，优先在页面 source/adaptor 层做字段转换。
3. 不要只改 `preview/`，真实联调必须改 `source/`。
4. 平台组件样式优先在 `src/components/platform` 或全局样式中维护。
5. `preview/` 是客户演示快照，不等同于生产发布产物。
