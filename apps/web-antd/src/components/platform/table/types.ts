import type { TableProps } from 'antdv-next';

export type PlatformTableDateRangeFilterConfig = {
  placeholder?: [string, string];
  type: 'dateRange';
  valueFormat?: string;
};

export type PlatformTableFilterConfig = PlatformTableDateRangeFilterConfig;

export type PlatformTableColumn = NonNullable<TableProps['columns']>[number] & {
  platformFilter?: PlatformTableFilterConfig;
};

export type PlatformTableColumns = PlatformTableColumn[];
