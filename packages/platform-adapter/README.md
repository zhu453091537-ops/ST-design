# @st/platform-adapter

`@st/platform-adapter` is the future home for ST-design adapters around Vben, Vxe, ECharts, Upload, and similar integration layers.

Current status:

1. Package boundary is reserved.
2. Existing adapters remain in their current Vben/effects locations.
3. `@st/platform-adapter/vxe-table` currently proxies `@vben/plugins/vxe-table` as a safe transition entry.
4. Do not move app-specific adapter code here until the public API and affected pages are clear.

Migration order:

1. Extract stable adapter types and factory functions.
2. Move Vxe and ECharts integration only after page-level verification.
3. Keep business API calls, route state, and page mocks out of this package.
