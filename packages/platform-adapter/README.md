# @st/platform-adapter

`@st/platform-adapter` is the future home for ST-design adapters around Vben, Vxe, ECharts, Upload, and similar integration layers.

Current status:

1. Package boundary is reserved.
2. `@st/platform-adapter/vxe-table` re-exports the base Vben Vxe plugin and now owns stable platform Vxe rules.
3. Platform Vxe defaults currently include the seq index column, toolbar defaults, header/body row heights, refresh behavior, checkbox state helper, and sort parameter helper.
4. App-specific initialization still stays in `apps/web-antd/src/adapter/vxe-table.ts`, including `useVbenForm` wiring and custom `CellImage` / `CellLink` renderers.
5. Do not move app-specific adapter code here until the public API and affected pages are clear.

Migration order:

1. Continue extracting stable adapter types and factory functions.
2. Move Vxe style and theme variables only after confirming the current effective layer.
3. Move ECharts and Upload integration only after page-level verification.
4. Keep business API calls, route state, page mocks, and page-only renderers out of this package.
