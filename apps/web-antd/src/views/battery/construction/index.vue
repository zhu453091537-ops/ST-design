<script setup lang="ts">
import type { PlatformTableColumn } from '#/components/platform';

import type {
  ConstructionQuery,
  ConstructionRecord,
} from './construction-source';

import { computed, onMounted, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Space } from 'antdv-next';

import {
  PlatformRangePicker,
  PlatformButton,
  PlatformFormItem,
  PlatformInput,
  PlatformQueryPanel,
  PlatformSelect,
  PlatformStatusTag,
  PlatformTable,
  PlatformTableToolbar,
  PlatformViewToolbar,
} from '#/components/platform';

import {
  constructionBusinessTypeOptions,
  constructionStatusOptions,
  constructionYearOptions,
  getConstructionList,
  getConstructionStatusMeta,
} from './construction-source';

const createDefaultQuery = (): ConstructionQuery => ({
  businessType: '',
  projectName: '',
  submittedDateRange: [],
  projectYear: '',
  status: '',
  submitter: '',
});

const query = reactive<ConstructionQuery>(createDefaultQuery());
const queryCollapsed = ref(true);
const loading = ref(false);
const tableRows = ref<ConstructionRecord[]>([]);
const panelRef = ref<HTMLElement>();
const constructionTableRef = ref<InstanceType<typeof PlatformTable>>();
type TableFilterValue = Array<boolean | number | string> | null;

const tableColumns = computed<PlatformTableColumn[]>(() => [
  {
    dataIndex: 'permitCode',
    key: 'permitCode',
    title: '许可证编号',
    width: 130,
  },
  {
    dataIndex: 'businessType',
    filteredValue: query.businessType ? [query.businessType] : null,
    filters: constructionBusinessTypeOptions
      .filter((item) => item.value)
      .map((item) => ({ text: item.label, value: item.value })),
    key: 'businessType',
    title: '业务类型',
    width: 130,
  },
  {
    dataIndex: 'projectCode',
    key: 'projectCode',
    title: '项目编号',
    width: 150,
  },
  {
    dataIndex: 'projectName',
    key: 'projectName',
    title: '项目名称',
    width: 260,
  },
  {
    dataIndex: 'projectYear',
    filteredValue: query.projectYear ? [String(query.projectYear)] : null,
    filters: constructionYearOptions
      .filter((item) => item.value)
      .map((item) => ({ text: item.label, value: String(item.value) })),
    key: 'projectYear',
    title: '项目年度',
    width: 110,
  },
  {
    dataIndex: 'plannedStartDate',
    key: 'plannedStartDate',
    title: '计划开工时间',
    width: 140,
  },
  {
    dataIndex: 'plannedEndDate',
    key: 'plannedEndDate',
    title: '计划结束时间',
    width: 140,
  },
  {
    dataIndex: 'submitter',
    key: 'submitter',
    title: '提交人',
    width: 120,
  },
  {
    dataIndex: 'submittedAt',
    filteredValue:
      query.submittedDateRange.length === 2
        ? [serializeDateRange(query.submittedDateRange)]
        : null,
    key: 'submittedAt',
    platformFilter: {
      placeholder: ['开始日期', '结束日期'],
      type: 'dateRange',
      valueFormat: 'YYYY-MM-DD',
    },
    title: '提交时间',
    width: 170,
  },
  {
    dataIndex: 'status',
    filteredValue: query.status ? [query.status] : null,
    filters: constructionStatusOptions
      .filter((item) => item.value)
      .map((item) => ({ text: item.label, value: item.value })),
    key: 'status',
    title: '状态',
    width: 110,
  },
  {
    fixed: 'right',
    key: 'action',
    title: '操作',
    width: 220,
  },
]);
const pagination = computed(() => ({
  pageSize: 10,
  showTotal: (total: number) => `共 ${total} 条`,
  total: tableRows.value.length,
}));

onMounted(async () => {
  await loadConstructionList();
});

async function loadConstructionList() {
  loading.value = true;
  try {
    tableRows.value = await getConstructionList(query);
  } finally {
    loading.value = false;
  }
}

async function handleSearch() {
  await loadConstructionList();
}

async function handleTableChange(
  _: unknown,
  filters: Record<string, TableFilterValue>,
) {
  query.businessType = getFirstFilterValue(
    filters.businessType,
  ) as ConstructionQuery['businessType'];
  query.projectYear = getNumberFilterValue(filters.projectYear);
  query.status = getFirstFilterValue(filters.status) as ConstructionQuery['status'];
  query.submittedDateRange = parseDateRangeFilter(filters.submittedAt);
  await loadConstructionList();
}

async function handleReset() {
  Object.assign(query, createDefaultQuery());
  await loadConstructionList();
}

function handleFirstApply() {
  window.message.info('已保留首次办理入口，后续确认表单后再接入。');
}

function handlePermitChange() {
  window.message.info('已保留许可证变更入口，后续确认流程后再接入。');
}

function handleView(record: ConstructionRecord) {
  window.message.info(`已保留“${record.projectName}”查看入口。`);
}

function handlePrint(record: ConstructionRecord) {
  window.message.info(`已保留“${record.projectName}”打印入口。`);
}

function handleTableSetting(event: MouseEvent) {
  constructionTableRef.value?.openColumnSetting(event);
}

async function handleTableFullscreen() {
  const panel = panelRef.value;

  if (!panel) {
    return;
  }

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await panel.requestFullscreen();
  } catch {
    window.message.warning('当前浏览器暂不支持全屏展示。');
  }
}

function toConstructionRecord(record: unknown) {
  return record as ConstructionRecord;
}

function getFirstFilterValue(filters?: TableFilterValue) {
  if (!filters?.length) {
    return '';
  }

  const [firstValue] = filters;
  return typeof firstValue === 'string' || typeof firstValue === 'number'
    ? String(firstValue)
    : '';
}

function getNumberFilterValue(filters?: TableFilterValue): '' | number {
  const value = getFirstFilterValue(filters);

  if (!value) {
    return '';
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : '';
}

function parseDateRangeFilter(filters?: TableFilterValue) {
  const value = getFirstFilterValue(filters);

  if (!value) {
    return [];
  }

  const [startDate = '', endDate = ''] = value.split('|');
  return startDate && endDate ? [startDate, endDate] : [];
}

function serializeDateRange(value: string[]) {
  return value.join('|');
}
</script>

<template>
  <Page auto-content-height>
    <div class="construction-management-page">
      <PlatformViewToolbar
        description="统一查看施工许可证办理、变更提报与审批结果"
        title="施工管理"
      />

      <PlatformQueryPanel
        v-model:collapsed="queryCollapsed"
        collapsible
        :columns="4"
        @query="handleSearch"
        @reset="handleReset"
      >
        <PlatformFormItem label="项目名称">
          <PlatformInput
            v-model:value="query.projectName"
            allow-clear
            placeholder="请输入项目名称"
            @press-enter="handleSearch"
          />
        </PlatformFormItem>
        <PlatformFormItem label="项目年度">
          <PlatformSelect
            v-model:value="query.projectYear"
            :options="constructionYearOptions"
            placeholder="请选择项目年度"
          />
        </PlatformFormItem>
        <PlatformFormItem label="状态">
          <PlatformSelect
            v-model:value="query.status"
            :options="constructionStatusOptions"
            placeholder="请选择状态"
          />
        </PlatformFormItem>
        <PlatformFormItem label="提交人">
          <PlatformInput
            v-model:value="query.submitter"
            allow-clear
            placeholder="请输入提交人"
            @press-enter="handleSearch"
          />
        </PlatformFormItem>
        <PlatformFormItem label="提交时间段">
          <PlatformRangePicker
            v-model:value="query.submittedDateRange"
            format="YYYY-MM-DD"
            :placeholder="['开始日期', '结束日期']"
            value-format="YYYY-MM-DD"
          />
        </PlatformFormItem>
        <PlatformFormItem label="业务类型">
          <PlatformSelect
            v-model:value="query.businessType"
            :options="constructionBusinessTypeOptions"
            placeholder="请选择业务类型"
          />
        </PlatformFormItem>
      </PlatformQueryPanel>

      <section
        ref="panelRef"
        class="platform-surface construction-management-panel"
      >
        <PlatformTableToolbar
          @fullscreen="handleTableFullscreen"
          @refresh="handleSearch"
          @search="handleSearch"
          @setting="handleTableSetting"
        >
          <template #actions>
            <PlatformButton
              scene="toolbar"
              type="primary"
              @click="handleFirstApply"
            >
              首次办理
            </PlatformButton>
            <PlatformButton scene="toolbar" @click="handlePermitChange">
              许可证变更
            </PlatformButton>
          </template>
        </PlatformTableToolbar>

        <PlatformTable
          ref="constructionTableRef"
          column-setting-key="battery-construction"
          :columns="tableColumns"
          :data-source="tableRows"
          :loading="loading"
          :pagination="pagination"
          row-key="id"
          size="middle"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'permitCode'">
              {{ record.permitCode || '-' }}
            </template>
            <template v-else-if="column.key === 'projectName'">
              <div class="construction-management-project-cell">
                <strong>{{ record.projectName }}</strong>
                <span>{{ record.projectCode }}</span>
              </div>
            </template>
            <template v-else-if="column.key === 'submitter'">
              {{ record.submitter || '-' }}
            </template>
            <template v-else-if="column.key === 'submittedAt'">
              {{ record.submittedAt || '-' }}
            </template>
            <template v-else-if="column.key === 'status'">
              <PlatformStatusTag
                :label="getConstructionStatusMeta(record.status).label"
                :status="getConstructionStatusMeta(record.status).status"
                variant="dot"
              />
            </template>
            <template v-else-if="column.key === 'action'">
              <Space>
                <PlatformButton
                  scene="action"
                  size="small"
                  type="link"
                  @click="handleView(toConstructionRecord(record))"
                >
                  查看
                </PlatformButton>
                <PlatformButton
                  v-if="record.status === 'completed'"
                  scene="action"
                  size="small"
                  type="link"
                  @click="handlePrint(toConstructionRecord(record))"
                >
                  打印施工安全许可证
                </PlatformButton>
              </Space>
            </template>
          </template>
        </PlatformTable>
      </section>
    </div>
  </Page>
</template>

<style scoped>
.construction-management-page {
  display: flex;
  flex-direction: column;
  gap: var(--st-layout-section-gap);
}

.construction-management-panel:fullscreen {
  background: hsl(var(--background));
}

.construction-management-project-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.construction-management-project-cell strong,
.construction-management-project-cell span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.construction-management-project-cell span {
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-sm);
}
</style>
