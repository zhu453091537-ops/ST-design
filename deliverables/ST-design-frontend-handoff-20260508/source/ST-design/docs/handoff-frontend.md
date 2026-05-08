# 前端联调交付说明

本文档面向接收源码包的前端同学，用于本地启动、后端联调和二次开发。

## 交付包

- 源码包：`ST-design-source-handoff-20260508.zip`
- 主应用：`apps/web-antd`
- 项目形态：Vben Admin 5 monorepo
- 技术栈：Vue 3、Vite、Vben Admin 5、ant-design-vue、Vxe Table、ECharts、pnpm workspace

本项目不能只解压 `apps/web-antd` 单独开发。`apps/web-antd` 依赖根目录 `pnpm-workspace.yaml`、`pnpm-lock.yaml`、`packages/**`、`internal/**` 等 workspace 包。

源码包不包含：

1. `.git`
2. `node_modules`
3. `apps/web-antd/dist`
4. 本机临时文件和压缩包

## 本地启动

建议 Node.js 使用仓库 `package.json` 声明的版本范围：`^20.19.0 || ^22.18.0 || ^24.0.0`。

```bash
pnpm install
pnpm dev:antd
```

如果本机已经有依赖但 `pnpm` 暂不可用，也可以在 `apps/web-antd` 目录下临时使用本地 Vite 二进制启动：

```bash
cd apps/web-antd
../../node_modules/.bin/vite --mode development
```

常用访问地址以终端输出为准，通常为：

```text
http://127.0.0.1:5173/
```

## 构建与预览

生产构建：

```bash
pnpm build:antd
```

预览构建产物：

```bash
cd apps/web-antd
vite preview
```

不要直接双击 `apps/web-antd/dist/index.html`。当前构建产物使用站点根路径资源，例如 `/_app.config.js`、`/js/...`、`/jse/...`，并且是 Vue Router history 模式的 SPA，必须通过 HTTP 服务或 Nginx 访问。

## 后端联调

当前静态开发阶段默认使用 Mock：

- 开关位置：`apps/web-antd/.env.development`
- 当前值：`VITE_USE_MOCK=true`
- 开发接口前缀：`VITE_GLOB_API_URL=/api`
- Vite 代理目标：`apps/web-antd/vite.config.ts` 中 `/api -> http://localhost:8080`

切换真实后端时建议：

1. 按后端网关修改 `apps/web-antd/.env.development` 的 `VITE_GLOB_API_URL` 或 Vite proxy target。
2. 将 `VITE_USE_MOCK` 调整为 `false` 后，再逐步替换登录、用户信息、权限、菜单和页面数据接口。
3. 保留 Vben 既有登录、token、权限、菜单和动态路由流程，不建议另起一套权限体系。
4. 生产构建默认读取 `apps/web-antd/.env.production`，当前生产接口前缀为 `/prod-api`。

部署到 Nginx 时，history 模式需要 fallback：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}

location /prod-api/ {
  proxy_pass http://后端服务地址/;
}
```

## 页面清单

| 页面 | 路由 | 主要源码 | 当前数据来源 |
| --- | --- | --- | --- |
| 项目总览 | `/workbench/index` | `apps/web-antd/src/views/project/overview/index.vue` | 页面专用静态数据 |
| 项目信息管理 | `/project/information` | `apps/web-antd/src/views/project/information/index.vue` | `project-information-source.ts` |
| 合同与付款管理 | `/project/contract` | `apps/web-antd/src/views/project/contract/index.vue` | `project-contract-source.ts` |
| 进度可视化跟踪 | `/project/progress` | `apps/web-antd/src/views/project/progress/index.vue` | `project-progress-source.ts` |
| 文档与台账管理 | `/project/document` | `apps/web-antd/src/views/project/document/index.vue` | `project-document-source.ts` |
| 中期评估与验收 | `/project/evaluation` | `apps/web-antd/src/views/project/evaluation/index.vue` | `project-evaluation-source.ts` |
| 人员档案管理 | `/platform/typical-page` | `apps/web-antd/src/views/platform/typical-page/index.vue` | `user-demo-source.ts` |
| 人员总览 | `/personnel/overview` | `apps/web-antd/src/views/personnel/overview/index.vue` | `personnel-overview-source.ts` |
| 资质与准入管控 | `/personnel/qualification` | `apps/web-antd/src/views/personnel/qualification/index.vue` | `personnel-qualification-source.ts` |
| 变动与流失率统计 | `/personnel/turnover` | `apps/web-antd/src/views/personnel/turnover/index.vue` | `personnel-turnover-source.ts` |
| 工时与兼职管控 | `/personnel/worktime` | `apps/web-antd/src/views/personnel/worktime/index.vue` | `personnel-worktime-source.ts` |

## Mock 与接口替换位置

全局 Mock 菜单和登录相关入口：

- `apps/web-antd/src/mock/index.ts`

页面数据当前多放在页面同级 `*-source.ts` 文件中。后端接口接入时，优先把这些数据源替换为 API 调用，尽量不改页面主体布局和平台组件。

## 平台组件边界

通用后台组件优先从平台层复用：

- `apps/web-antd/src/components/platform`
- `apps/web-antd/src/components/platform/index.ts`
- `apps/web-antd/src/adapter/vxe-table.ts`

后续联调和二开时，不建议在页面内重复维护通用 Table、Toolbar、StatCard、SectionTitle、FileList、NoticeList、Segmented、Modal、Drawer 等样式。确需扩展，应优先回到平台组件或适配层处理。

## 当前已知事项

1. 当前页面数据以静态 Mock 和本地状态模拟为主，刷新后不保证页面业务数据持久化。
2. 登录和权限流程保留 Vben 原机制，Mock 模式可进入系统；真实后端接入时需逐步替换认证、用户信息、权限和菜单接口。
3. 应用级 `vue-tsc` 仍存在部分存量类型错误，前期交接记录显示新增业务页面不在主要失败范围内，后续建议单独治理。
4. `dist` 只是预览产物，不是二次开发或接口联调的主交付物。
