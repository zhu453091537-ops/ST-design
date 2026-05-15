import type {
  UseVbenVxeGrid,
  VxeGridPropTypes,
} from '@vben/plugins/vxe-table';

import { h } from 'vue';

import {
  setupVbenVxeTable,
  useVbenVxeGrid as useBaseVbenVxeGrid,
} from '@vben/plugins/vxe-table';

import { Button, Image } from 'antdv-next';

export * from '@vben/plugins/vxe-table';
export type * from '@vben/plugins/vxe-table';

type VbenVxeGridOptions = Parameters<UseVbenVxeGrid>[0];
type PlatformVxeGridOptions = VbenVxeGridOptions & {
  platformIndex?: boolean;
};

type SetupPlatformVxeTableOptions = {
  useVbenForm: (...args: any[]) => any;
};

function withPlatformIndexColumn(
  columns: NonNullable<VbenVxeGridOptions['gridOptions']>['columns'],
) {
  const indexColumn = {
    align: 'center' as const,
    field: '__platform_index',
    title: '序号',
    type: 'seq' as const,
    width: 88,
  };

  if (columns?.[0]?.type !== 'checkbox') {
    return [indexColumn, ...(columns ?? [])];
  }

  const [firstColumn, ...restColumns] = columns;
  return [firstColumn, indexColumn, ...restColumns];
}

function withPlatformVxeGridOptions(
  options: PlatformVxeGridOptions,
): VbenVxeGridOptions {
  const toolbarConfig = options.gridOptions?.toolbarConfig ?? {};
  const headerCellConfig = options.gridOptions?.headerCellConfig ?? {};
  const cellConfig = options.gridOptions?.cellConfig ?? {};
  const columns = options.gridOptions?.columns ?? [];
  const shouldShowIndex = options.platformIndex !== false;
  const hasIndexColumn = columns.some(
    (column) => column.type === 'seq' || column.field === '__platform_index',
  );
  const mergedColumns =
    shouldShowIndex && columns.length > 0 && !hasIndexColumn
      ? withPlatformIndexColumn(columns)
      : columns;

  return {
    ...options,
    gridOptions: {
      ...options.gridOptions,
      cellConfig: {
        height: 44,
        ...cellConfig,
      },
      columns: mergedColumns,
      headerCellConfig: {
        height: 44,
        ...headerCellConfig,
      },
      toolbarConfig: {
        custom: true,
        refresh: true,
        search: true,
        zoom: true,
        ...toolbarConfig,
        customOptions: {
          icon: 'vxe-icon-setting',
          ...toolbarConfig.customOptions,
        },
        refreshOptions: {
          code: 'query',
          ...toolbarConfig.refreshOptions,
        },
      },
    },
  };
}

export function setupPlatformVxeTable({
  useVbenForm,
}: SetupPlatformVxeTableOptions) {
  setupVbenVxeTable({
    configVxeTable: (vxeUI) => {
      vxeUI.setConfig({
        grid: {
          align: 'center',
          border: 'inner',
          cellConfig: {
            height: 44,
          },
          columnConfig: {
            resizable: true,
          },
          customConfig: {
            storage: false,
          },
          formConfig: {
            enabled: false,
          },
          headerCellConfig: {
            height: 44,
          },
          minHeight: 180,
          pagerConfig: {
            pageSize: 10,
            pageSizes: [10, 20, 30, 40, 50],
          },
          proxyConfig: {
            autoLoad: true,
            response: {
              list: 'rows',
              result: 'rows',
              total: 'total',
            },
            showActiveMsg: true,
            showResponseMsg: false,
          },
          round: true,
          rowConfig: {
            isCurrent: false,
            isHover: true,
          },
          showOverflow: true,
          size: 'medium',
          toolbarConfig: {
            custom: true,
            customOptions: {
              icon: 'vxe-icon-setting',
            },
            refresh: true,
            refreshOptions: {
              code: 'query',
            },
            zoom: true,
          },
        },
      });

      vxeUI.renderer.add('CellImage', {
        renderTableDefault(renderOpts, params) {
          const { props } = renderOpts;
          const { column, row } = params;
          return h(Image, { src: row[column.field], ...props });
        },
      });

      vxeUI.renderer.add('CellLink', {
        renderTableDefault(renderOpts) {
          const { props } = renderOpts;
          return h(
            Button,
            { size: 'small', type: 'link' },
            { default: () => props?.text },
          );
        },
      });
    },
    useVbenForm,
  });
}

export const usePlatformVxeGrid = ((options: any) =>
  useBaseVbenVxeGrid(withPlatformVxeGridOptions(options))) as UseVbenVxeGrid;

/**
 * 判断 vxe-table 的复选框是否选中。
 */
export function vxeCheckboxChecked(
  tableApi: ReturnType<typeof usePlatformVxeGrid>[1],
) {
  return tableApi?.grid?.getCheckboxRecords?.()?.length > 0;
}

/**
 * 将 vxe-table 排序参数添加到请求参数中。
 */
export function addSortParams(
  params: Record<string, any>,
  sortList: VxeGridPropTypes.ProxyAjaxQuerySortCheckedParams[],
) {
  if (sortList.length === 0) {
    return;
  }

  const orderByColumn = sortList.map((item) => item.field).join(',');
  const isAsc = sortList.map((item) => item.order).join(',');
  params.orderByColumn = orderByColumn;
  params.isAsc = isAsc;
}
