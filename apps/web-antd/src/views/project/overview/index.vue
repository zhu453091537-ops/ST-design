<script setup lang="ts">
import type { TableEmits, TableProps } from 'antdv-next';

import type {
  ProjectOverviewQuery,
  ProjectRecord,
  ProjectStatus,
} from './project-overview-source';

import { computed, onMounted, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { VbenIcon } from '@vben/icons';

import { Popconfirm, Progress, Space } from 'antdv-next';

import {
  PlatformButton,
  PlatformDrawer,
  PlatformEditForm,
  PlatformFormItem,
  PlatformInput,
  PlatformModal,
  PlatformSelect,
  PlatformStatCard,
  PlatformStatusTag,
  PlatformTable,
  PlatformTableToolbar,
} from '#/components/platform';

import {
  archiveProjectOverviewProject,
  deleteProjectOverviewProject,
  getProjectOverviewList,
  getProjectOverviewStats,
  projectStatusMap,
  projectStatusOptions,
  projectTypeOptions,
  saveProjectOverviewProject,
} from './project-overview-source';

type ProjectFormModel = Partial<ProjectRecord>;

const query = reactive<ProjectOverviewQuery>({
  keyword: '',
  status: '',
  type: '',
});
const formModel = reactive<ProjectFormModel>({});
const tableRows = ref<ProjectRecord[]>([]);
const statCards = ref<Awaited<ReturnType<typeof getProjectOverviewStats>>>([]);
const loading = ref(false);
const saving = ref(false);
const formOpen = ref(false);
const detailOpen = ref(false);
const currentRecord = ref<null | ProjectRecord>(null);
const projectListPanelRef = ref<HTMLElement>();

const tableColumns = computed<TableProps['columns']>(() => [
  {
    dataIndex: 'name',
    key: 'project',
    title: '项目信息',
    width: 280,
  },
  {
    dataIndex: 'type',
    filterMultiple: false,
    filteredValue: query.type ? [query.type] : null,
    filters: projectTypeOptions
      .filter((item) => item.value)
      .map((item) => ({ text: item.label, value: item.value })),
    key: 'type',
    title: '类型',
    width: 120,
  },
  {
    dataIndex: 'department',
    key: 'department',
    title: '部门',
    width: 130,
  },
  {
    dataIndex: 'amount',
    key: 'amount',
    title: '合同金额',
    width: 130,
  },
  {
    dataIndex: 'durationDays',
    key: 'duration',
    title: '工期',
    width: 110,
  },
  {
    dataIndex: 'manager',
    key: 'manager',
    title: '负责人',
    width: 120,
  },
  {
    dataIndex: 'progress',
    key: 'progress',
    title: '进度',
    width: 170,
  },
  {
    dataIndex: 'status',
    filterMultiple: false,
    filteredValue: query.status ? [query.status] : null,
    filters: projectStatusOptions
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
    width: 190,
  },
]);
const formTitle = computed(() =>
  currentRecord.value ? '编辑项目' : '新建项目',
);
const pagination = computed(() => ({
  pageSize: 10,
  showTotal: (total: number) => `共 ${total} 条`,
  total: tableRows.value.length,
}));

async function loadOverview() {
  loading.value = true;
  try {
    const [rows, stats] = await Promise.all([
      getProjectOverviewList(query),
      getProjectOverviewStats(),
    ]);
    tableRows.value = rows;
    statCards.value = stats;
  } finally {
    loading.value = false;
  }
}

async function handleSearch() {
  await loadOverview();
}

async function handleTableChange(
  ...args: Parameters<TableEmits['change']>
) {
  const [, filters] = args;
  query.type = getFirstFilterValue(filters.type);
  query.status = getFirstFilterValue(filters.status) as '' | ProjectStatus;
  await loadOverview();
}

function handleBoardEntry() {
  window.message.info('进度看板入口已保留，后续确认页面后再接入路由。');
}

function handleExport() {
  window.message.info('导出入口已保留，后续确认接口后再接入。');
}

function handleTableSetting() {
  window.message.info('表格设置入口已保留，后续按列配置方案接入。');
}

async function handleTableFullscreen() {
  const panel = projectListPanelRef.value;

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

function handleAdd() {
  currentRecord.value = null;
  resetForm();
  formOpen.value = true;
}

function handleEdit(record: unknown) {
  const project = toProjectRecord(record);
  currentRecord.value = project;
  resetForm(project);
  formOpen.value = true;
}

function handleDetail(record: unknown) {
  currentRecord.value = toProjectRecord(record);
  detailOpen.value = true;
}

async function handleSave() {
  saving.value = true;
  try {
    await saveProjectOverviewProject({
      ...formModel,
      amount: Number(formModel.amount) || 0,
      durationDays: Number(formModel.durationDays) || 0,
      progress: Number(formModel.progress) || 0,
    });
    window.message.success(currentRecord.value ? '项目已更新' : '项目已创建');
    formOpen.value = false;
    await loadOverview();
  } finally {
    saving.value = false;
  }
}

async function handleArchive(record: unknown) {
  await archiveProjectOverviewProject(toProjectRecord(record).id);
  window.message.success('项目已归档');
  await loadOverview();
}

async function handleDelete(record: unknown) {
  await deleteProjectOverviewProject(toProjectRecord(record).id);
  window.message.success('项目已删除');
  await loadOverview();
}

function resetForm(record?: ProjectRecord) {
  Object.assign(formModel, {
    amount: record?.amount ?? 0,
    code: record?.code ?? '',
    color: record?.color ?? '#10b981',
    department: record?.department ?? '工程一部',
    durationDays: record?.durationDays ?? 0,
    endDate: record?.endDate ?? '2026-12-31',
    id: record?.id,
    manager: record?.manager ?? '',
    name: record?.name ?? '',
    progress: record?.progress ?? 0,
    startDate: record?.startDate ?? '2026-01-01',
    status: record?.status ?? 'pending',
    type: record?.type ?? projectTypeOptions[1]?.value,
  });
}

function formatAmount(amount: number) {
  return `${amount.toLocaleString()}万`;
}

function getProjectInitial(name: string) {
  return name.slice(0, 1);
}

function getStatusMeta(status: ProjectStatus) {
  return projectStatusMap[status];
}

function getFirstFilterValue(value: unknown) {
  if (Array.isArray(value)) {
    return String(value[0] ?? '');
  }
  return '';
}

function toProjectRecord(record: unknown) {
  return record as ProjectRecord;
}

onMounted(loadOverview);
</script>

<template>
  <Page :auto-content-height="true">
    <div class="project-overview-page">
      <header class="project-overview-header">
        <div>
          <h1>项目总览</h1>
          <p>全生命周期数字化管理</p>
        </div>
        <Space>
          <PlatformButton @click="handleBoardEntry">
            <template #icon>
              <VbenIcon icon="lucide:bar-chart-3" />
            </template>
            查看进度看板
          </PlatformButton>
        </Space>
      </header>

      <section class="project-stat-grid">
        <PlatformStatCard
          v-for="card in statCards"
          :key="card.title"
          v-bind="card"
        />
      </section>

      <section ref="projectListPanelRef" class="platform-surface project-list-panel">
        <PlatformTableToolbar
          v-model:search-value="query.keyword"
          search-placeholder="搜索项目名称 / 编号 / 负责人"
          @fullscreen="handleTableFullscreen"
          @refresh="handleSearch"
          @search="handleSearch"
          @setting="handleTableSetting"
        >
          <template #actions>
            <PlatformButton scene="toolbar" type="primary" @click="handleAdd">
              <template #icon>
                <VbenIcon icon="lucide:plus" />
              </template>
              新建项目
            </PlatformButton>
            <PlatformButton scene="toolbar" @click="handleExport">
              <template #icon>
                <VbenIcon icon="lucide:download" />
              </template>
              导出
            </PlatformButton>
          </template>
        </PlatformTableToolbar>

        <PlatformTable
          :columns="tableColumns"
          :data-source="tableRows"
          :loading="loading"
          :pagination="pagination"
          row-key="id"
          size="middle"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'project'">
              <div class="project-info-cell">
                <span
                  class="project-avatar"
                  :style="{ backgroundColor: record.color }"
                >
                  {{ getProjectInitial(record.name) }}
                </span>
                <div>
                  <PlatformButton
                    scene="action"
                    type="link"
                    @click="handleDetail(record)"
                  >
                    {{ record.name }}
                  </PlatformButton>
                  <p>{{ record.code }}</p>
                </div>
              </div>
            </template>
            <template v-else-if="column.key === 'amount'">
              <strong>{{ formatAmount(record.amount) }}</strong>
            </template>
            <template v-else-if="column.key === 'duration'">
              {{ record.durationDays }}天
            </template>
            <template v-else-if="column.key === 'progress'">
              <div class="project-progress-cell">
                <Progress
                  :percent="record.progress"
                  :show-info="false"
                  :stroke-width="6"
                  class="project-progress"
                  size="small"
                />
                <span>{{ record.progress }}%</span>
              </div>
            </template>
            <template v-else-if="column.key === 'status'">
              <PlatformStatusTag
                :label="getStatusMeta(record.status).label"
                :status="getStatusMeta(record.status).status"
              />
            </template>
            <template v-else-if="column.key === 'action'">
              <Space>
                <PlatformButton
                  scene="action"
                  size="small"
                  type="link"
                  @click="handleEdit(record)"
                >
                  编辑
                </PlatformButton>
                <PlatformButton
                  scene="action"
                  size="small"
                  type="link"
                  @click="handleDetail(record)"
                >
                  详情
                </PlatformButton>
                <Popconfirm
                  placement="left"
                  title="确认归档该项目？"
                  @confirm="handleArchive(record)"
                >
                  <PlatformButton scene="action" size="small" type="link">
                    归档
                  </PlatformButton>
                </Popconfirm>
                <Popconfirm
                  placement="left"
                  title="确认删除该项目？"
                  @confirm="handleDelete(record)"
                >
                  <PlatformButton
                    danger
                    scene="action"
                    size="small"
                    type="link"
                  >
                    删除
                  </PlatformButton>
                </Popconfirm>
              </Space>
            </template>
          </template>
        </PlatformTable>
      </section>
    </div>

    <PlatformModal
      v-model:open="formOpen"
      :confirm-loading="saving"
      :title="formTitle"
      destroy-on-close
      width="720px"
      @cancel="formOpen = false"
      @ok="handleSave"
    >
      <PlatformEditForm
        :model="formModel"
        class="project-form-grid"
        layout="vertical"
      >
        <PlatformFormItem label="项目名称">
          <PlatformInput v-model:value="formModel.name" />
        </PlatformFormItem>
        <PlatformFormItem label="项目编号">
          <PlatformInput v-model:value="formModel.code" />
        </PlatformFormItem>
        <PlatformFormItem label="项目类型">
          <PlatformSelect
            v-model:value="formModel.type"
            :options="projectTypeOptions.filter((item) => item.value)"
          />
        </PlatformFormItem>
        <PlatformFormItem label="所属部门">
          <PlatformInput v-model:value="formModel.department" />
        </PlatformFormItem>
        <PlatformFormItem label="合同金额（万）">
          <PlatformInput v-model:value="formModel.amount" type="number" />
        </PlatformFormItem>
        <PlatformFormItem label="工期（天）">
          <PlatformInput v-model:value="formModel.durationDays" type="number" />
        </PlatformFormItem>
        <PlatformFormItem label="负责人">
          <PlatformInput v-model:value="formModel.manager" />
        </PlatformFormItem>
        <PlatformFormItem label="进度（%）">
          <PlatformInput v-model:value="formModel.progress" type="number" />
        </PlatformFormItem>
        <PlatformFormItem label="状态">
          <PlatformSelect
            v-model:value="formModel.status"
            :options="projectStatusOptions.filter((item) => item.value)"
          />
        </PlatformFormItem>
        <PlatformFormItem label="图标颜色">
          <PlatformInput v-model:value="formModel.color" />
        </PlatformFormItem>
      </PlatformEditForm>
    </PlatformModal>

    <PlatformDrawer
      v-model:open="detailOpen"
      destroy-on-close
      size="large"
      title="项目详情"
    >
      <div v-if="currentRecord" class="project-detail">
        <div class="project-detail-title">
          <span
            class="project-avatar project-avatar--large"
            :style="{ backgroundColor: currentRecord.color }"
          >
            {{ getProjectInitial(currentRecord.name) }}
          </span>
          <div>
            <h3>{{ currentRecord.name }}</h3>
            <p>{{ currentRecord.code }}</p>
          </div>
        </div>
        <div class="project-detail-grid">
          <span>项目类型</span>
          <strong>{{ currentRecord.type }}</strong>
          <span>所属部门</span>
          <strong>{{ currentRecord.department }}</strong>
          <span>合同金额</span>
          <strong>{{ formatAmount(currentRecord.amount) }}</strong>
          <span>工期</span>
          <strong>{{ currentRecord.durationDays }}天</strong>
          <span>负责人</span>
          <strong>{{ currentRecord.manager }}</strong>
          <span>项目状态</span>
          <PlatformStatusTag
            :label="projectStatusMap[currentRecord.status].label"
            :status="projectStatusMap[currentRecord.status].status"
          />
          <span>计划周期</span>
          <strong>{{ currentRecord.startDate }} 至 {{ currentRecord.endDate }}</strong>
          <span>当前进度</span>
          <div class="project-progress-cell">
            <Progress
              :percent="currentRecord.progress"
              :show-info="false"
              :stroke-width="6"
              class="project-progress"
              size="small"
            />
            <span>{{ currentRecord.progress }}%</span>
          </div>
        </div>
      </div>
    </PlatformDrawer>
  </Page>
</template>

<style scoped>
.project-overview-page {
  display: flex;
  flex-direction: column;
  gap: var(--st-layout-section-gap);
  min-height: 100%;
}

.project-overview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.project-overview-header h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
  color: hsl(var(--foreground));
}

.project-overview-header p,
.project-info-cell p,
.project-detail-title p {
  margin: 0;
  color: hsl(var(--muted-foreground));
}

.project-stat-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--st-layout-section-gap);
}

.project-list-panel:fullscreen {
  overflow: auto;
  background: hsl(var(--st-color-card-bg));
}

.project-info-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.project-avatar {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-weight: 700;
  color: #fff;
  border-radius: 8px;
}

.project-avatar--large {
  width: 48px;
  height: 48px;
  font-size: 18px;
}

.project-progress-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.project-progress {
  width: 92px;
}

.project-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 16px;
}

.project-detail-title {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid hsl(var(--border));
}

.project-detail-title h3 {
  margin: 0 0 4px;
  font-size: 18px;
}

.project-detail-grid {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 14px 18px;
  align-items: center;
}

.project-detail-grid > span {
  color: hsl(var(--muted-foreground));
}

@media (max-width: 1280px) {
  .project-stat-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 960px) {
  .project-overview-header {
    align-items: stretch;
    flex-direction: column;
  }

  .project-stat-grid,
  .project-form-grid {
    grid-template-columns: 1fr;
  }

}
</style>
