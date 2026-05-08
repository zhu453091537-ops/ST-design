<script setup lang="ts">
import type { TableEmits, TableProps } from 'antdv-next';

import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
  type VNodeChild,
  watch,
} from 'vue';

import { Checkbox, CheckboxGroup, Modal, Table } from 'antdv-next';

type PlatformTableColumn = NonNullable<TableProps['columns']>[number];
type PlatformTableIndexColumn = Partial<PlatformTableColumn>;
type PlatformFilterKey = boolean | number | string;
type PlatformFilterItem = {
  children?: PlatformFilterItem[];
  text?: VNodeChild;
  value?: PlatformFilterKey;
};
type PlatformFilterDropdownProps = {
  close?: () => void;
  confirm: (param?: { closeDropdown: boolean }) => void;
  filterMultiple?: boolean;
  filters?: PlatformFilterItem[];
  selectedKeys: PlatformFilterKey[];
  setSelectedKeys: (selectedKeys: PlatformFilterKey[]) => void;
};
type PlatformFlattenedFilterItem = {
  depth: number;
  label: VNodeChild;
  value: PlatformFilterKey;
};
type PlatformColumnSettingItem = {
  key: string;
  label: string;
  required: boolean;
};

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    actionColumnWidth?: number | string;
    adaptiveHeight?: boolean;
    adaptiveHeightBottomOffset?: number;
    adaptiveHeightMin?: number;
    columns?: TableProps['columns'];
    columnSettingEnabled?: boolean;
    columnSettingKey?: string;
    indexColumn?: PlatformTableIndexColumn;
    pagination?: TableProps['pagination'];
    scroll?: TableProps['scroll'];
    showIndex?: boolean;
  }>(),
  {
    adaptiveHeight: true,
    adaptiveHeightBottomOffset: 24,
    adaptiveHeightMin: 240,
    actionColumnWidth: 184,
    columnSettingEnabled: true,
    columnSettingKey: '',
    columns: () => [],
    indexColumn: () => ({}),
    pagination: undefined,
    scroll: undefined,
    showIndex: true,
  },
);
const emit = defineEmits<{
  change: Parameters<TableEmits['change']>;
}>();

const PLATFORM_ALL_FILTER_KEY = '__platform_table_filter_all__';
const PLATFORM_ALL_FILTER_LABEL = '全部';

const slots = useSlots();
const tableWrapperRef = ref<HTMLElement>();
const adaptiveScrollY = ref<number>();
const columnSettingOpen = ref(false);
const visibleColumnKeys = ref<string[]>([]);
let resizeObserver: ResizeObserver | undefined;
let updateFrame = 0;

const passthroughSlotNames = computed(() =>
  Object.keys(slots).filter((name) => name !== 'bodyCell'),
);
const baseColumns = computed(() => {
  const columns = props.columns ?? [];
  let nextColumns = columns;

  if (
    props.showIndex &&
    !columns.some((column) => column.key === '__platform_index')
  ) {
    const indexColumn: PlatformTableColumn = {
      align: 'center',
      dataIndex: '__platform_index',
      key: '__platform_index',
      title: '序号',
      width: 72,
      ...props.indexColumn,
    };
    nextColumns = [indexColumn, ...columns];
  }

  return nextColumns;
});
const columnSettingItems = computed<PlatformColumnSettingItem[]>(() =>
  flattenColumns(baseColumns.value).map((column: PlatformTableColumn, index: number) => ({
    key: getColumnIdentity(column, index),
    label: getColumnSettingLabel(column, index),
    required: isColumnRequired(column),
  })),
);
const mergedColumns = computed(() => {
  const enabledVisibleKeys =
    visibleColumnKeys.value.length > 0
      ? new Set(visibleColumnKeys.value)
      : new Set(columnSettingItems.value.map((item) => item.key));

  return enhancePlatformColumns(
    filterColumnsByVisibility(baseColumns.value, enabledVisibleKeys),
  );
});
const mergedScroll = computed<TableProps['scroll']>(() => {
  const baseScroll = props.scroll ? { ...props.scroll } : {};
  const nextScroll = { ...baseScroll };
  const defaultScrollX = getDefaultScrollX(mergedColumns.value);

  if (nextScroll.x === undefined && defaultScrollX !== undefined) {
    nextScroll.x = defaultScrollX;
  }

  if (
    props.adaptiveHeight &&
    nextScroll.y === undefined &&
    adaptiveScrollY.value !== undefined
  ) {
    nextScroll.y = adaptiveScrollY.value;
  }

  return Object.keys(nextScroll).length > 0 ? nextScroll : undefined;
});
const checkedColumnKeys = computed({
  get: () => visibleColumnKeys.value,
  set: (value) => {
    const allowedKeys = new Set(
      columnSettingItems.value
        .filter((item) => !item.required)
        .map((item) => item.key),
    );
    const requiredKeys = columnSettingItems.value
      .filter((item) => item.required)
      .map((item) => item.key);
    visibleColumnKeys.value = [
      ...requiredKeys,
      ...value.filter((key) => allowedKeys.has(key)),
    ];
    persistVisibleColumns();
  },
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

function handleChange(
  ...args: Parameters<TableEmits['change']>
) {
  emit('change', ...args);
}

function getElementHeight(selector: string) {
  const element = tableWrapperRef.value?.querySelector(selector);

  if (!(element instanceof HTMLElement)) {
    return 0;
  }

  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);

  return (
    rect.height +
    Number.parseFloat(style.marginTop || '0') +
    Number.parseFloat(style.marginBottom || '0')
  );
}

function getTableBodyTop() {
  const body = tableWrapperRef.value?.querySelector('.ant-table-tbody');

  if (body instanceof HTMLElement) {
    return body.getBoundingClientRect().top;
  }

  const table = tableWrapperRef.value?.querySelector('.ant-table');

  if (table instanceof HTMLElement) {
    return table.getBoundingClientRect().top;
  }

  return tableWrapperRef.value?.getBoundingClientRect().top ?? 0;
}

function updateAdaptiveHeight() {
  if (!props.adaptiveHeight || props.scroll?.y !== undefined) {
    adaptiveScrollY.value = undefined;
    return;
  }

  const tableBodyTop = getTableBodyTop();
  const paginationHeight = getElementHeight('.ant-pagination');
  const availableHeight =
    window.innerHeight -
    tableBodyTop -
    paginationHeight -
    props.adaptiveHeightBottomOffset;

  adaptiveScrollY.value = Math.max(
    props.adaptiveHeightMin,
    Math.floor(availableHeight),
  );
}

function scheduleAdaptiveHeightUpdate() {
  if (updateFrame) {
    cancelAnimationFrame(updateFrame);
  }

  updateFrame = requestAnimationFrame(() => {
    updateFrame = 0;
    updateAdaptiveHeight();
  });
}

onMounted(() => {
  syncVisibleColumns();
  nextTick(scheduleAdaptiveHeightUpdate);
  window.addEventListener('resize', scheduleAdaptiveHeightUpdate);

  if (tableWrapperRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(scheduleAdaptiveHeightUpdate);
    resizeObserver.observe(tableWrapperRef.value);

    if (tableWrapperRef.value.parentElement) {
      resizeObserver.observe(tableWrapperRef.value.parentElement);
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', scheduleAdaptiveHeightUpdate);
  resizeObserver?.disconnect();

  if (updateFrame) {
    cancelAnimationFrame(updateFrame);
  }
});

watch(
  () => props.columns,
  () => {
    syncVisibleColumns();
  },
  { deep: true },
);

function createPlatformFilterDropdown(column: PlatformTableColumn) {
  return (dropdownProps: PlatformFilterDropdownProps) =>
    h(PlatformTableFilterDropdown, {
      ...dropdownProps,
      filterMultiple: column.filterMultiple,
    });
}

function enhancePlatformColumns(
  columns: TableProps['columns'],
): TableProps['columns'] {
  return (columns ?? []).map((column) => {
    if ('children' in column && column.children?.length) {
      return {
        ...column,
        children: enhancePlatformColumns(column.children),
      };
    }

    const nextColumn = isActionColumn(column)
      ? appendColumnClass(
          {
            ...column,
            width: props.actionColumnWidth,
          },
          'platform-table__action-column',
        )
      : column;

    if (!nextColumn.filters?.length || nextColumn.filterDropdown) {
      return nextColumn;
    }

    return {
      ...nextColumn,
      filterDropdown: createPlatformFilterDropdown(nextColumn),
    };
  });
}

function isActionColumn(column: PlatformTableColumn) {
  return column.key === 'action' || column.title === '操作';
}

function appendColumnClass(column: PlatformTableColumn, className: string) {
  return {
    ...column,
    className: [column.className, className].filter(Boolean).join(' '),
  };
}

function getDefaultScrollX(columns: TableProps['columns']) {
  const leafColumns = flattenColumns(columns);

  if (leafColumns.length === 0) {
    return undefined;
  }

  const hasExplicitWidth = leafColumns.some(
    (column: PlatformTableColumn) => getColumnWidth(column) > 0,
  );
  const totalWidth = leafColumns.reduce(
    (total: number, column: PlatformTableColumn) => total + getColumnWidth(column),
    0,
  );

  if (hasExplicitWidth && totalWidth > 0) {
    return totalWidth;
  }

  return 'max-content';
}

function flattenColumns(
  columns: PlatformTableColumn[] | undefined,
): PlatformTableColumn[] {
  return (columns ?? []).flatMap((column) =>
    'children' in column && column.children?.length
      ? flattenColumns(column.children)
      : [column],
  );
}

function getColumnDataIndex(column: PlatformTableColumn) {
  if ('dataIndex' in column) {
    return column.dataIndex;
  }
  return undefined;
}

function getColumnWidth(column: PlatformTableColumn) {
  const width = column.width;

  if (typeof width === 'number') {
    return width;
  }

  if (typeof width === 'string') {
    const numericWidth = Number.parseFloat(width);
    return Number.isFinite(numericWidth) ? numericWidth : 0;
  }

  return 0;
}

function getColumnIdentity(column: PlatformTableColumn, index: number) {
  if (typeof column.key === 'string' || typeof column.key === 'number') {
    return String(column.key);
  }
  const dataIndex = getColumnDataIndex(column);
  if (typeof dataIndex === 'string' || typeof dataIndex === 'number') {
    return String(dataIndex);
  }
  if (Array.isArray(dataIndex)) {
    return dataIndex.join('.');
  }
  return `column-${index}`;
}

function getColumnSettingLabel(column: PlatformTableColumn, index: number) {
  if (typeof column.title === 'string' && column.title.trim()) {
    return column.title;
  }
  const dataIndex = getColumnDataIndex(column);
  if (typeof dataIndex === 'string' && dataIndex) {
    return dataIndex;
  }
  if (Array.isArray(dataIndex) && dataIndex.length > 0) {
    return dataIndex.join('.');
  }
  return `列${index + 1}`;
}

function isColumnRequired(column: PlatformTableColumn) {
  return (
    column.key === '__platform_index' ||
    column.key === 'action' ||
    column.title === '操作'
  );
}

function filterColumnsByVisibility(columns: PlatformTableColumn[], visibleKeys: Set<string>) {
  return (columns ?? []).filter((column, index) =>
    visibleKeys.has(getColumnIdentity(column, index)),
  );
}

function getColumnSettingStorageKey() {
  if (!props.columnSettingKey) {
    return '';
  }
  return `platform-table-columns:${props.columnSettingKey}`;
}

function syncVisibleColumns() {
  const nextItems = columnSettingItems.value;
  const defaultKeys = nextItems.map((item) => item.key);
  const storageKey = getColumnSettingStorageKey();

  if (!storageKey || typeof window === 'undefined') {
    visibleColumnKeys.value = defaultKeys;
    return;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      visibleColumnKeys.value = defaultKeys;
      return;
    }

    const savedKeys = JSON.parse(rawValue);
    if (!Array.isArray(savedKeys)) {
      visibleColumnKeys.value = defaultKeys;
      return;
    }

    const allowedKeys = new Set(defaultKeys);
    const requiredKeys = nextItems
      .filter((item) => item.required)
      .map((item) => item.key);
    visibleColumnKeys.value = [
      ...requiredKeys,
      ...savedKeys
        .map(String)
        .filter((key) => allowedKeys.has(key) && !requiredKeys.includes(key)),
    ];
  } catch {
    visibleColumnKeys.value = defaultKeys;
  }
}

function persistVisibleColumns() {
  const storageKey = getColumnSettingStorageKey();
  if (!storageKey || typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(visibleColumnKeys.value));
}

function openColumnSetting() {
  if (!props.columnSettingEnabled) {
    return;
  }
  columnSettingOpen.value = true;
}

function closeColumnSetting() {
  columnSettingOpen.value = false;
}

defineExpose({
  closeColumnSetting,
  openColumnSetting,
});

function flattenFilterItems(
  filters: PlatformFilterItem[] | undefined,
  depth = 0,
): PlatformFlattenedFilterItem[] {
  return (filters ?? []).flatMap((item, index) => {
    const value = item.value ?? String(index);
    const current = {
      depth,
      label: item.text ?? value,
      value,
    };
    return [
      current,
      ...flattenFilterItems(item.children, depth + 1),
    ];
  });
}

function isSameFilterKey(a: PlatformFilterKey, b: PlatformFilterKey) {
  return String(a) === String(b);
}

const PlatformTableFilterDropdown = defineComponent({
  name: 'PlatformTableFilterDropdown',
  props: {
    confirm: {
      required: true,
      type: Function,
    },
    filterMultiple: {
      default: false,
      type: Boolean,
    },
    filters: {
      default: () => [],
      type: Array,
    },
    selectedKeys: {
      default: () => [],
      type: Array,
    },
    setSelectedKeys: {
      required: true,
      type: Function,
    },
  },
  setup(componentProps) {
    const flatItems = computed(() =>
      flattenFilterItems(componentProps.filters as PlatformFilterItem[]),
    );
    const selectedKeys = computed(() =>
      (componentProps.selectedKeys as PlatformFilterKey[]).map((key) => key),
    );
    const isAllSelected = computed(() => selectedKeys.value.length === 0);

    function applySelectedKeys(keys: PlatformFilterKey[]) {
      componentProps.setSelectedKeys(keys);
      componentProps.confirm({
        closeDropdown: !componentProps.filterMultiple,
      });
    }

    function handleItemClick(value: PlatformFilterKey) {
      if (isSameFilterKey(value, PLATFORM_ALL_FILTER_KEY)) {
        applySelectedKeys([]);
        return;
      }

      if (!componentProps.filterMultiple) {
        applySelectedKeys([value]);
        return;
      }

      const hasValue = selectedKeys.value.some((key) =>
        isSameFilterKey(key, value),
      );
      applySelectedKeys(
        hasValue
          ? selectedKeys.value.filter((key) => !isSameFilterKey(key, value))
          : [...selectedKeys.value, value],
      );
    }

    function renderItem(
      item: PlatformFlattenedFilterItem,
      active: boolean,
    ) {
      return h(
        'button',
        {
          'aria-checked': active,
          class: [
            'platform-table-filter-dropdown__item',
            active && 'platform-table-filter-dropdown__item--active',
          ],
          role: componentProps.filterMultiple
            ? 'menuitemcheckbox'
            : 'menuitemradio',
          style: {
            paddingInlineStart: `${12 + item.depth * 16}px`,
          },
          type: 'button',
          onClick: (event: MouseEvent) => {
            event.stopPropagation();
            handleItemClick(item.value);
          },
        },
        [
          h('span', {
            class: [
              'platform-table-filter-dropdown__indicator',
              active &&
                'platform-table-filter-dropdown__indicator--active',
            ],
          }),
          h('span', { class: 'platform-table-filter-dropdown__label' }, [
            item.label,
          ]),
        ],
      );
    }

    return () => {
      const items = [
        {
          depth: 0,
          label: PLATFORM_ALL_FILTER_LABEL,
          value: PLATFORM_ALL_FILTER_KEY,
        },
        ...flatItems.value,
      ];

      return h(
        'div',
        {
          class: 'platform-table-filter-dropdown',
          role: 'menu',
        },
        items.map((item) =>
          renderItem(
            item,
            isSameFilterKey(item.value, PLATFORM_ALL_FILTER_KEY)
              ? isAllSelected.value
              : selectedKeys.value.some((key) =>
                  isSameFilterKey(key, item.value),
                ),
          ),
        ),
      );
    };
  },
});
</script>

<template>
  <div ref="tableWrapperRef" class="platform-table-wrapper">
    <Table
      v-bind="$attrs"
      class="platform-table"
      :columns="mergedColumns"
      :pagination="pagination"
      :scroll="mergedScroll"
      @change="handleChange"
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

    <Modal
      :footer="null"
      :open="columnSettingOpen"
      title="表头显示设置"
      width="360px"
      @cancel="closeColumnSetting"
    >
      <div class="platform-table-column-setting">
        <CheckboxGroup v-model:value="checkedColumnKeys">
          <Checkbox
            v-for="item in columnSettingItems"
            :key="item.key"
            :disabled="item.required"
            :value="item.key"
          >
            {{ item.label }}
          </Checkbox>
        </CheckboxGroup>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.platform-table-wrapper {
  min-height: 0;
}

.platform-table-column-setting {
  display: grid;
  gap: 12px;
}

.platform-table-column-setting :deep(.ant-checkbox-group) {
  display: grid;
  gap: 12px;
}

.platform-table-column-setting :deep(.ant-checkbox-wrapper) {
  margin-inline-start: 0;
}

.platform-table {
  width: 100%;
}

.platform-table :deep(.ant-table) {
  border-radius: var(--st-radius-card);
}

.platform-table :deep(.ant-table-container) {
  overflow: hidden;
  border: 1px solid hsl(var(--st-color-table-outline));
  border-radius: var(--st-radius-card);
}

.platform-table :deep(.ant-table-content),
.platform-table :deep(.ant-table-body) {
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
}

.platform-table :deep(.ant-table-content::-webkit-scrollbar),
.platform-table :deep(.ant-table-body::-webkit-scrollbar) {
  height: 0;
}

.platform-table:hover :deep(.ant-table-content),
.platform-table:hover :deep(.ant-table-body) {
  scrollbar-color: hsl(var(--st-color-border-control)) transparent;
}

.platform-table:hover :deep(.ant-table-content::-webkit-scrollbar),
.platform-table:hover :deep(.ant-table-body::-webkit-scrollbar) {
  height: 10px;
}

.platform-table:hover :deep(.ant-table-content::-webkit-scrollbar-thumb),
.platform-table:hover :deep(.ant-table-body::-webkit-scrollbar-thumb) {
  background: hsl(var(--st-color-border-control));
  border-radius: 999px;
}

.platform-table:hover :deep(.ant-table-content::-webkit-scrollbar-track),
.platform-table:hover :deep(.ant-table-body::-webkit-scrollbar-track) {
  background: transparent;
}

.platform-table :deep(.ant-table-thead > tr > th) {
  font-weight: 500;
}

.platform-table :deep(.ant-table-thead > tr > th:first-child),
.platform-table :deep(.ant-table-tbody > tr > td:first-child),
.platform-table :deep(.platform-table__action-column) {
  padding-inline: var(--st-table-edge-cell-padding);
}

.platform-table :deep(.ant-table-cell-fix),
.platform-table :deep(.ant-table-cell-fix-left),
.platform-table :deep(.ant-table-cell-fix-right),
.platform-table :deep(.ant-table-cell-fix-left-last),
.platform-table :deep(.ant-table-cell-fix-right-first) {
  isolation: isolate;
  z-index: 30 !important;
  overflow: hidden;
  background: hsl(var(--st-color-table-cell-bg-solid)) !important;
  background-color: hsl(var(--st-color-table-cell-bg-solid)) !important;
  background-clip: padding-box;
  background-image: none !important;
}

.platform-table :deep(.ant-table-thead > tr > th.ant-table-cell-fix),
.platform-table :deep(.ant-table-thead > tr > th.ant-table-cell-fix-left),
.platform-table :deep(.ant-table-thead > tr > th.ant-table-cell-fix-right),
.platform-table :deep(.ant-table-thead > tr > th.ant-table-cell-fix-left-last),
.platform-table :deep(.ant-table-thead > tr > th.ant-table-cell-fix-right-first) {
  z-index: 31 !important;
  background: hsl(var(--st-color-table-header-bg)) !important;
  background-color: hsl(var(--st-color-table-header-bg)) !important;
  background-image: none !important;
}

.platform-table
  :deep(.ant-table-tbody > tr.ant-table-row:hover > td.ant-table-cell-fix),
.platform-table
  :deep(.ant-table-tbody > tr.ant-table-row:hover > td.ant-table-cell-fix-left),
.platform-table
  :deep(.ant-table-tbody > tr.ant-table-row:hover > td.ant-table-cell-fix-right),
.platform-table
  :deep(.ant-table-tbody > tr.ant-table-row:hover > td.ant-table-cell-fix-left-last),
.platform-table
  :deep(.ant-table-tbody > tr.ant-table-row:hover > td.ant-table-cell-fix-right-first),
.platform-table
  :deep(.ant-table-tbody > tr > td.ant-table-cell-fix.ant-table-cell-row-hover),
.platform-table
  :deep(.ant-table-tbody > tr > td.ant-table-cell-fix-left.ant-table-cell-row-hover),
.platform-table
  :deep(.ant-table-tbody > tr > td.ant-table-cell-fix-right.ant-table-cell-row-hover),
.platform-table
  :deep(.ant-table-tbody > tr > td.ant-table-cell-fix-left-last.ant-table-cell-row-hover),
.platform-table
  :deep(.ant-table-tbody > tr > td.ant-table-cell-fix-right-first.ant-table-cell-row-hover),
.platform-table
  :deep(
    .ant-table-tbody
      > tr.ant-table-row-selected
      > td.ant-table-cell-fix
  ),
.platform-table
  :deep(
    .ant-table-tbody
      > tr.ant-table-row-selected
      > td.ant-table-cell-fix-left
  ),
.platform-table
  :deep(
    .ant-table-tbody
      > tr.ant-table-row-selected
      > td.ant-table-cell-fix-right
  ) {
  z-index: 32 !important;
  background: var(--st-color-table-row-hover-bg-solid) !important;
  background-color: var(--st-color-table-row-hover-bg-solid) !important;
  background-image: none !important;
}

.platform-table :deep(.ant-table-filter-column) {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  max-width: 100%;
}

.platform-table :deep(.ant-table-filter-column-title) {
  flex: none;
}

.platform-table :deep(.ant-table-filter-trigger) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-inline-start: 2px;
  color: hsl(var(--st-color-text-tertiary));
  border-radius: var(--st-radius-control);
  transition:
    color 0.16s ease,
    background-color 0.16s ease;
}

.platform-table :deep(.ant-table-filter-trigger:hover),
.platform-table :deep(.ant-table-filter-trigger.active) {
  color: hsl(var(--primary));
  background: hsl(var(--st-color-fill-selected));
}

:global(.platform-table-filter-dropdown) {
  min-width: 168px;
  max-height: 320px;
  padding: 6px;
  overflow-y: auto;
}

:global(.platform-table-filter-dropdown__item) {
  display: flex;
  width: 100%;
  height: 36px;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  color: hsl(var(--foreground));
  font-size: var(--st-font-size-base);
  line-height: var(--st-line-height-base);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: var(--st-radius-control);
  transition:
    color 0.16s ease,
    background-color 0.16s ease;
}

:global(.platform-table-filter-dropdown__item:hover),
:global(.platform-table-filter-dropdown__item--active) {
  background: hsl(var(--st-color-fill-selected));
}

:global(.platform-table-filter-dropdown__indicator) {
  position: relative;
  display: inline-flex;
  flex: none;
  width: 16px;
  height: 16px;
  background: hsl(var(--background));
  border: 1px solid hsl(var(--st-color-border-control));
  border-radius: 999px;
  transition:
    background-color 0.16s ease,
    border-color 0.16s ease;
}

:global(.platform-table-filter-dropdown__indicator--active) {
  border-color: hsl(var(--primary));
}

:global(.platform-table-filter-dropdown__indicator--active::after) {
  position: absolute;
  inset: 4px;
  content: '';
  background: hsl(var(--primary));
  border-radius: inherit;
}

:global(.platform-table-filter-dropdown__label) {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
