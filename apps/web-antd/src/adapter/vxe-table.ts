import {
  addSortParams,
  setupPlatformVxeTable,
  usePlatformVxeGrid,
  vxeCheckboxChecked,
} from '@st/platform-adapter/vxe-table';

import { useVbenForm } from './form';

setupPlatformVxeTable({
  useVbenForm,
});

export const useVbenVxeGrid = usePlatformVxeGrid;
export { addSortParams, vxeCheckboxChecked };
export type * from '@st/platform-adapter/vxe-table';
