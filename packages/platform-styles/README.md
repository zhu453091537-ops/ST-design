# @st/platform-styles

`@st/platform-styles` is the future home for ST-design platform tokens, theme variables, Ant Design Vue overrides, and global platform CSS.

Current status:

1. Package boundary is reserved.
2. `@st/platform-styles/antd` owns the current Ant Design Vue global overrides and platform CSS entry.
3. `@vben/styles/antd` now only bridges to `packages/platform-styles/src/antd/index.css` for compatibility.
4. `@st/platform-styles/vxe-table` owns stable Vxe table variables and global overrides; the Vben Vxe plugin style file only imports this platform entry.
5. `apps/web-antd` already imports `@st/platform-styles/antd`; continue moving stable platform tokens and overrides into this package in small verified steps.

Migration order:

1. Move stable platform tokens first.
2. Keep Ant Design Vue global overrides in `src/antd/index.css`.
3. Keep Vxe table variables and Vxe-only global overrides in `src/vxe-table/index.css`.
4. Keep app-specific layout CSS in `apps/web-antd`.
