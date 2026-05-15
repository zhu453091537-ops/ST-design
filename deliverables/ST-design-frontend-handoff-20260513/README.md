# ST-design 前端交付包

本包用于两个阶段：

1. 项目经理给客户演示已完成的前端静态交互系统。
2. 客户确认后，前端拿 `source/` 源码与后端联调，上线。

## 给项目经理：直接打开预览

Windows 电脑请双击：

```text
Start-Preview-Windows.vbs
```

它会自动启动本地预览服务，并打开浏览器进入登录页。无需手动打开终端。

如果公司电脑禁用了 `.vbs`，请双击备用入口：

```text
Start-Preview-Windows.cmd
```

Mac 电脑备用入口：

```text
Start-Preview-Mac.command
```

预览说明：

1. 预览使用前端 Mock 登录、Mock 菜单和本地数据，不依赖后端服务。
2. 启动器只监听本机 `127.0.0.1`，端口自动从 `8012-8020` 里选择。
3. 登录后默认进入项目总览，可从菜单查看已完成页面。

## 给前端：源码联调

源码目录：

```text
source/
```

标准启动：

```bash
cd source
pnpm install
pnpm dev:antd
```

如果依赖已存在但 `pnpm` 不可用，可进入：

```bash
source/apps/web-antd
```

执行：

```bash
../../node_modules/.bin/vite --mode development
```

开发访问地址通常是：

```text
http://127.0.0.1:5173/
```

## 目录说明

| 路径 | 说明 |
| --- | --- |
| `Start-Preview-Windows.vbs` | Windows 主预览入口，双击后无终端打开系统 |
| `Start-Preview-Windows.cmd` | Windows 备用预览入口 |
| `Start-Preview-Mac.command` | Mac 备用预览入口 |
| `preview/` | 客户演示用静态预览资源 |
| `source/` | 前端联调和上线用完整源码 |
| `docs/handoff-frontend.md` | 前后端接口联调主文档 |
| `index.html` | 备用说明入口，不作为主预览方式 |

## 注意

1. 不要只交 `preview/` 给前端联调，联调必须使用 `source/`。
2. 不要直接双击 `preview/index.html`，Vue/Vite SPA 需要本地 HTTP 服务，使用启动器即可。
3. 切真实后端时，优先关闭 Mock，再逐页替换页面 source 数据。
