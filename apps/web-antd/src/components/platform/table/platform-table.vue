<script setup lang="ts">
import type { TableProps } from 'antdv-next';

import { computed, useSlots } from 'vue';

import { Table } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

type PlatformTableColumn = NonNullable<TableProps['columns']>[number];
type PlatformTableIndexColumn = Partial<PlatformTableColumn>;

const props = withDefaults(
  defineProps<{
    columns?: TableProps['columns'];
    indexColumn?: PlatformTableIndexColumn;
    pagination?: TableProps['pagination'];
    showIndex?: boolean;
  }>(),
  {
    columns: () => [],
    indexColumn: () => ({}),
    showIndex: false,
  },
);

const slots = useSlots();
const passthroughSlotNames = computed(() =>
  Object.keys(slots).filter((name) => name !== 'bodyCell'),
);
const mergedColumns = computed(() => {
  const columns = props.columns ?? [];
  if (
    !props.showIndex ||
    columns.some((column) => column.key === '__platform_index')
  ) {
    return columns;
  }

  const indexColumn: PlatformTableColumn = {
    align: 'center',
    dataIndex: '__platform_index',
    key: '__platform_index',
    title: '序号',
    width: 72,
    customRender: ({ index }: { index: number }) =>
      getPaginationOffset() + index + 1,
    ...props.indexColumn,
  };

  return [indexColumn, ...columns];
});

function getIndexCellValue(index: number) {
  return getPaginationOffset() + index + 1;
}

function getPaginationOffset() {
  const pagination = props.pagination;
  if (!pagination || typeof pagination === 'boolean') {
    return 0;
  }

  const current = Number(
    pagination.current ?? pagination.defaultCurrent ?? 1,
  );
  const pageSize = Number(
    pagination.pageSize ?? pagination.defaultPageSize ?? 10,
  );

  return (Math.max(current, 1) - 1) * Math.max(pageSize, 1);
}
</script>

<template>
  <Table
    v-bind="$attrs"
    class="platform-table"
    :columns="mergedColumns"
    :pagination="pagination"
  >
    <template #bodyCell="slotProps">
      <template v-if="slotProps.column?.key === '__platform_index'">
        {{ getIndexCellValue(slotProps.index) }}
      </template>
      <slot v-else name="bodyCell" v-bind="slotProps || {}"></slot>
    </template>
    <template v-for="name in passthroughSlotNames" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Table>
</template>

<style scoped>
.platform-table {
  width: 100%;
}

.platform-table :deep(.ant-table) {
  border-radius: var(--st-radius-card);
}

.platform-table :deep(.ant-table-thead > tr > th) {
  font-weight: 500;
}
</style>
