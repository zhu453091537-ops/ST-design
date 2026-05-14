# @st/platform-styles

`@st/platform-styles` is the future home for ST-design platform tokens, theme variables, Ant Design Vue overrides, and global platform CSS.

Current status:

1. Package boundary is reserved.
2. Existing runtime styles still stay in `@vben/styles` and related Vben style packages.
3. `@st/platform-styles/antd` currently proxies `@vben/styles/antd` as a future migration entry.
4. Do not switch app imports here until style order and verification routes are confirmed.

Migration order:

1. Move stable platform tokens first.
2. Move Ant Design Vue overrides after confirming their current effective layer.
3. Keep app-specific layout CSS in `apps/web-antd`.
