# @st/platform-adapter

`@st/platform-adapter` is the future home for ST-design adapters around Vben, Vxe, ECharts, Upload, and similar integration layers.

Current status:

1. Package boundary is reserved.
2. `@st/platform-adapter/vxe-table` re-exports the base Vben Vxe plugin and owns the ST-design default Vxe grid wrapper.
3. App-specific form integration is still injected by `apps/web-antd/src/adapter/vxe-table.ts` via `setupPlatformVxeTable({ useVbenForm })`.
4. Business API calls, route state, page mocks, and page-specific query logic must stay in the app.

Migration order:

1. Extract stable adapter types and factory functions.
2. Move Vxe defaults before ECharts and Upload adapters.
3. Keep business API calls, route state, and page mocks out of this package.
