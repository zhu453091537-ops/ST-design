<script setup lang="ts">
import type { TableEmits, TableProps } from 'antdv-next';

import type {
  ProjectInformationQuery,
  ProjectInformationRecord,
} from './project-information-source';

import { computed, onMounted, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { VbenIcon } from '@vben/icons';

import {
  PlatformButton,
  PlatformDatePicker,
  PlatformEditForm,
  PlatformFormItem,
  PlatformIcon,
  PlatformInput,
  PlatformModal,
  PlatformSegmented,
  PlatformSelect,
  PlatformStatusTag,
  PlatformTable,
  PlatformTableToolbar,
  PlatformViewToolbar,
} from '@st/platform-ui';
import { Popconfirm, Space } from 'antdv-next';

import {
  archiveProjectInformationProject,
  deleteProjectInformationProject,
  getProjectInformationList,
  projectInformationBiddingResultOptions,
  projectInformationDepartmentOptions,
  projectInformationProcurementMethodOptions,
  projectInformationStatusMap,
  projectInformationStatusOptions,
  projectInformationTypeOptions,
  saveProjectInformationProject,
} from './project-information-source';

type ProjectFormModel = Partial<ProjectInformationRecord>;
type EntryEquipmentItem = {
  model: string;
  name: string;
  quantity: string;
};
type EntryStaffingItem = {
  name: string;
  role: string;
};

const createDefaultQuery = (): ProjectInformationQuery => ({
  keyword: '',
  status: '',
  type: '',
});

const query = reactive<ProjectInformationQuery>(createDefaultQuery());
const formModel = reactive<ProjectFormModel>({});
const tableRows = ref<ProjectInformationRecord[]>([]);
const loading = ref(false);
const saving = ref(false);
const formOpen = ref(false);
const currentRecord = ref<null | ProjectInformationRecord>(null);
const projectListPanelRef = ref<HTMLElement>();
const projectTableRef = ref<InstanceType<typeof PlatformTable>>();
const formSection = ref('basic');
const staffingRows = ref<EntryStaffingItem[]>([]);
const equipmentRows = ref<EntryEquipmentItem[]>([]);

const formSectionOptions = [
  { label: '基础信息', value: 'basic' },
  { label: '招采信息', value: 'procurement' },
  { label: '进场信息', value: 'entry' },
];

const tableColumns = computed<TableProps['columns']>(() => [
  {
    dataIndex: 'code',
    key: 'code',
    title: '项目编号',
    width: 130,
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: '项目名称',
    width: 260,
  },
  {
    dataIndex: 'type',
    filterMultiple: false,
    filteredValue: query.type ? [query.type] : null,
    filters: projectInformationTypeOptions
      .filter((item) => item.value)
      .map((item) => ({ text: item.label, value: item.value })),
    key: 'type',
    title: '项目类型',
    width: 130,
  },
  {
    dataIndex: 'contractor',
    key: 'contractor',
    title: '承包商',
    width: 150,
  },
  {
    dataIndex: 'amount',
    key: 'amount',
    title: '合同金额',
    width: 130,
  },
  {
    dataIndex: 'procurementMethod',
    key: 'procurementMethod',
    title: '招采方式',
    width: 140,
  },
  {
    dataIndex: 'status',
    filterMultiple: false,
    filteredValue: query.status ? [query.status] : null,
    filters: projectInformationStatusOptions
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
    width: 210,
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

async function loadProjectInformation() {
  loading.value = true;
  try {
    tableRows.value = await getProjectInformationList(query);
  } finally {
    loading.value = false;
  }
}

async function handleSearch() {
  await loadProjectInformation();
}

async function handleTableChange(...args: Parameters<TableEmits['change']>) {
  const [, filters] = args;
  query.type = getFirstFilterValue(filters.type);
  query.status = getFirstFilterValue(
    filters.status,
  ) as ProjectInformationQuery['status'];
  await loadProjectInformation();
}

function handleAdd() {
  currentRecord.value = null;
  resetForm();
  formSection.value = 'basic';
  formOpen.value = true;
}

function handleEdit(record: unknown) {
  const project = toProjectRecord(record);
  currentRecord.value = project;
  resetForm(project);
  formSection.value = 'basic';
  formOpen.value = true;
}

function handleDetail(record: unknown) {
  const project = toProjectRecord(record);
  window.message.info(
    `已保留“${project.name}”详情入口，详情页待后续设计确认后接入。`,
  );
}

async function handleSave() {
  if (!formModel.name?.trim()) {
    window.message.warning('请填写项目名称。');
    return;
  }

  saving.value = true;
  try {
    await saveProjectInformationProject({
      ...formModel,
      amount: Number(formModel.amount) || 0,
      durationDays: Number(formModel.durationDays) || 0,
      equipmentList: serializeEquipmentRows(equipmentRows.value),
      staffing: serializeStaffingRows(staffingRows.value),
    });
    window.message.success(currentRecord.value ? '项目已更新' : '项目已创建');
    formOpen.value = false;
    await loadProjectInformation();
  } finally {
    saving.value = false;
  }
}

async function handleArchive(record: unknown) {
  await archiveProjectInformationProject(toProjectRecord(record).id);
  window.message.success('项目已归档');
  await loadProjectInformation();
}

async function handleDelete(record: unknown) {
  await deleteProjectInformationProject(toProjectRecord(record).id);
  window.message.success('项目已删除');
  await loadProjectInformation();
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

function handleTableSetting(event: MouseEvent) {
  projectTableRef.value?.openColumnSetting(event);
}

function resetForm(record?: ProjectInformationRecord) {
  Object.assign(formModel, {
    amount: record?.amount ?? 0,
    bidOpenDate: record?.bidOpenDate ?? '',
    biddingResult: record?.biddingResult ?? '',
    code: record?.code ?? '',
    contractor: record?.contractor ?? '',
    department: record?.department ?? '',
    description: record?.description ?? '',
    durationDays: record?.durationDays ?? 0,
    entryDate: record?.entryDate ?? '',
    equipmentList: record?.equipmentList ?? '',
    filingCode: record?.filingCode ?? '',
    id: record?.id,
    manager: record?.manager ?? '',
    name: record?.name ?? '',
    plannedExitDate: record?.plannedExitDate ?? '',
    procurementAgency: record?.procurementAgency ?? '',
    procurementMethod: record?.procurementMethod ?? '公开招标',
    singleSourceFilingCode: record?.singleSourceFilingCode ?? '',
    staffing: record?.staffing ?? '',
    status: record?.status ?? 'pending',
    type: record?.type ?? projectInformationTypeOptions[1]?.value,
  });

  staffingRows.value = parseStaffingRows(record?.staffing);
  equipmentRows.value = parseEquipmentRows(record?.equipmentList);
}

function createEmptyStaffingItem(): EntryStaffingItem {
  return {
    name: '',
    role: '',
  };
}

function createEmptyEquipmentItem(): EntryEquipmentItem {
  return {
    model: '',
    name: '',
    quantity: '',
  };
}

function addStaffingRow() {
  staffingRows.value = [...staffingRows.value, createEmptyStaffingItem()];
}

function removeStaffingRow(index: number) {
  staffingRows.value = staffingRows.value.filter((_, rowIndex) => rowIndex !== index);
  if (staffingRows.value.length === 0) {
    staffingRows.value = [createEmptyStaffingItem()];
  }
}

function addEquipmentRow() {
  equipmentRows.value = [...equipmentRows.value, createEmptyEquipmentItem()];
}

function removeEquipmentRow(index: number) {
  equipmentRows.value = equipmentRows.value.filter((_, rowIndex) => rowIndex !== index);
  if (equipmentRows.value.length === 0) {
    equipmentRows.value = [createEmptyEquipmentItem()];
  }
}

function parseStaffingRows(value?: string) {
  if (!value?.trim()) {
    return [createEmptyStaffingItem()];
  }

  const rows = value
    .split('、')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const matched = item.match(/^(.*?)(\d+.*)$/);

      if (!matched) {
        return {
          name: item,
          role: '',
        };
      }

      return {
        name: matched[1]?.trim() || '',
        role: matched[2]?.trim() || '',
      };
    });

  return rows.length > 0 ? rows : [createEmptyStaffingItem()];
}

function parseEquipmentRows(value?: string) {
  if (!value?.trim()) {
    return [createEmptyEquipmentItem()];
  }

  const rows = value
    .split('、')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const matched = item.match(/^(.*?)(\d+.*|[一二三四五六七八九十]+.*)$/);

      if (!matched) {
        return {
          model: '',
          name: item,
          quantity: '',
        };
      }

      return {
        model: '',
        name: matched[1]?.trim() || '',
        quantity: matched[2]?.trim() || '',
      };
    });

  return rows.length > 0 ? rows : [createEmptyEquipmentItem()];
}

function serializeStaffingRows(rows: EntryStaffingItem[]) {
  return rows
    .map((item) => `${item.name}`.trim() && `${item.role}`.trim() ? `${item.name.trim()}${item.role.trim()}` : '')
    .filter(Boolean)
    .join('、');
}

function serializeEquipmentRows(rows: EntryEquipmentItem[]) {
  return rows
    .map((item) => {
      const segments = [item.name.trim(), item.model.trim(), item.quantity.trim()].filter(Boolean);
      return segments.join(' ');
    })
    .filter(Boolean)
    .join('、');
}

function handleCancelForm() {
  formOpen.value = false;
}

function formatAmount(amount: number) {
  return `${amount.toLocaleString()}万`;
}

function getStatusMeta(status: ProjectInformationRecord['status']) {
  return projectInformationStatusMap[status];
}

function getFirstFilterValue(value: unknown) {
  if (Array.isArray(value)) {
    return String(value[0] ?? '');
  }
  return '';
}

function toProjectRecord(record: unknown) {
  return record as ProjectInformationRecord;
}

onMounted(loadProjectInformation);
</script>

<template>
  <Page :auto-content-height="true">
    <div class="project-information-page">
      <PlatformViewToolbar
        description="维护委外项目基础信息、招采信息和进场信息"
        title="项目信息管理"
      />

      <section
        ref="projectListPanelRef"
        class="platform-surface project-information-panel"
      >
        <PlatformTableToolbar
          v-model:search-value="query.keyword"
          search-placeholder="搜索项目名称 / 编号 / 负责人"
          :tools="['search', 'refresh', 'setting', 'fullscreen']"
          @fullscreen="handleTableFullscreen"
          @refresh="handleSearch"
          @search="handleSearch"
          @setting="handleTableSetting"
        >
          <template #actions>
            <PlatformButton scene="toolbar" type="primary" @click="handleAdd">
              <template #icon>
                <PlatformIcon icon="icon-xinzeng" />
              </template>
              新建项目
            </PlatformButton>
          </template>
        </PlatformTableToolbar>

        <PlatformTable
          ref="projectTableRef"
          column-setting-key="project-information"
          :columns="tableColumns"
          :data-source="tableRows"
          :loading="loading"
          :pagination="pagination"
          row-key="id"
          size="middle"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <div class="project-name-cell">
                <strong>{{ record.name }}</strong>
                <span>{{ record.manager }}</span>
              </div>
            </template>
            <template v-else-if="column.key === 'amount'">
              <strong>{{ formatAmount(record.amount) }}</strong>
            </template>
            <template v-else-if="column.key === 'status'">
              <PlatformStatusTag
                :label="getStatusMeta(record.status).label"
                :status="getStatusMeta(record.status).status"
                variant="dot"
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
                  title="确认删除该项目？删除后将从当前列表移除。"
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
      cancel-text="取消"
      centered
      ok-text="保存"
      :title="formTitle"
      destroy-on-close
      width="720px"
      @cancel="handleCancelForm"
      @ok="handleSave"
    >
      <div class="project-form-tabs">
        <PlatformSegmented
          v-model:value="formSection"
          :options="formSectionOptions"
        />
      </div>

      <PlatformEditForm
        :model="formModel"
        class="project-modal-form"
        layout="vertical"
      >
        <section v-show="formSection === 'basic'" class="project-form-section">
          <div class="project-form-grid">
            <PlatformFormItem label="项目名称" required>
              <PlatformInput
                v-model:value="formModel.name"
                placeholder="请输入项目名称"
              />
            </PlatformFormItem>
            <PlatformFormItem label="项目类型" required>
              <PlatformSelect
                v-model:value="formModel.type"
                :options="
                  projectInformationTypeOptions.filter((item) => item.value)
                "
                placeholder="请选择项目类型"
              />
            </PlatformFormItem>
            <PlatformFormItem label="所属部门" required>
              <PlatformSelect
                v-model:value="formModel.department"
                :options="projectInformationDepartmentOptions"
                placeholder="请选择所属部门"
              />
            </PlatformFormItem>
            <PlatformFormItem label="承包商">
              <PlatformInput
                v-model:value="formModel.contractor"
                placeholder="请输入承包商"
              />
            </PlatformFormItem>
            <PlatformFormItem label="合同金额(万元)" required>
              <PlatformInput
                v-model:value="formModel.amount"
                placeholder="请输入合同金额"
                type="number"
              />
            </PlatformFormItem>
            <PlatformFormItem label="工期(天)" required>
              <PlatformInput
                v-model:value="formModel.durationDays"
                placeholder="请输入工期"
                type="number"
              />
            </PlatformFormItem>
            <PlatformFormItem label="项目负责人" required>
              <PlatformInput
                v-model:value="formModel.manager"
                placeholder="请输入项目负责人"
              />
            </PlatformFormItem>
            <PlatformFormItem label="状态">
              <PlatformSelect
                v-model:value="formModel.status"
                :options="
                  projectInformationStatusOptions.filter((item) => item.value)
                "
                placeholder="请选择项目状态"
              />
            </PlatformFormItem>
            <PlatformFormItem class="project-form-item--full" label="项目描述">
              <PlatformInput
                v-model:value="formModel.description"
                placeholder="请输入项目描述"
              />
            </PlatformFormItem>
          </div>
        </section>

        <section
          v-show="formSection === 'procurement'"
          class="project-form-section"
        >
          <div class="project-form-grid">
            <PlatformFormItem label="招采方式">
              <PlatformSelect
                v-model:value="formModel.procurementMethod"
                :options="projectInformationProcurementMethodOptions"
                placeholder="请选择招采方式"
              />
            </PlatformFormItem>
            <PlatformFormItem label="招标结果">
              <PlatformSelect
                v-model:value="formModel.biddingResult"
                :options="projectInformationBiddingResultOptions"
                placeholder="请选择招标结果"
              />
            </PlatformFormItem>
            <PlatformFormItem label="公开招标备案号">
              <PlatformInput
                v-model:value="formModel.filingCode"
                placeholder="请输入公开招标备案号"
              />
            </PlatformFormItem>
            <PlatformFormItem label="单一来源备案号">
              <PlatformInput
                v-model:value="formModel.singleSourceFilingCode"
                placeholder="请输入单一来源备案号"
              />
            </PlatformFormItem>
            <PlatformFormItem label="招标代理机构">
              <PlatformInput
                v-model:value="formModel.procurementAgency"
                placeholder="请输入招标代理机构"
              />
            </PlatformFormItem>
            <PlatformFormItem label="开标日期">
              <PlatformDatePicker
                v-model:value="formModel.bidOpenDate"
                placeholder="请选择开标日期"
                value-format="YYYY-MM-DD"
              />
            </PlatformFormItem>
          </div>
        </section>

        <section v-show="formSection === 'entry'" class="project-form-section">
          <div class="project-form-grid">
            <PlatformFormItem label="进场时间">
              <PlatformDatePicker
                v-model:value="formModel.entryDate"
                placeholder="请选择进场时间"
                value-format="YYYY-MM-DD"
              />
            </PlatformFormItem>
            <PlatformFormItem label="计划退场时间">
              <PlatformDatePicker
                v-model:value="formModel.plannedExitDate"
                placeholder="请选择计划退场时间"
                value-format="YYYY-MM-DD"
              />
            </PlatformFormItem>
            <div class="project-form-group project-form-item--full">
              <h3>人员配置</h3>
              <div class="project-form-list">
                <div
                  v-for="(item, index) in staffingRows"
                  :key="`staffing-${index}`"
                  class="project-form-inline"
                >
                  <PlatformInput
                    v-model:value="item.name"
                    placeholder="请输入姓名"
                  />
                  <PlatformInput
                    v-model:value="item.role"
                    placeholder="请输入岗位"
                  />
                  <div class="project-form-inline__actions">
                    <PlatformButton
                      class="project-form-inline__icon-button"
                      @click.prevent="addStaffingRow"
                    >
                      <template #icon>
                        <PlatformIcon icon="icon-xinzeng" />
                      </template>
                    </PlatformButton>
                    <PlatformButton
                      class="project-form-inline__icon-button"
                      danger
                      @click.prevent="removeStaffingRow(index)"
                    >
                      <template #icon>
                        <VbenIcon icon="lucide:minus" />
                      </template>
                    </PlatformButton>
                  </div>
                </div>
              </div>
            </div>
            <div class="project-form-group project-form-item--full">
              <h3>设备清单</h3>
              <div class="project-form-list">
                <div
                  v-for="(item, index) in equipmentRows"
                  :key="`equipment-${index}`"
                  class="project-form-inline project-form-inline--equipment"
                >
                  <PlatformInput
                    v-model:value="item.name"
                    placeholder="请输入设备名"
                  />
                  <PlatformInput
                    v-model:value="item.model"
                    placeholder="请输入型号"
                  />
                  <PlatformInput
                    v-model:value="item.quantity"
                    placeholder="请输入数量"
                  />
                  <div class="project-form-inline__actions">
                    <PlatformButton
                      class="project-form-inline__icon-button"
                      @click.prevent="addEquipmentRow"
                    >
                      <template #icon>
                        <PlatformIcon icon="icon-xinzeng" />
                      </template>
                    </PlatformButton>
                    <PlatformButton
                      class="project-form-inline__icon-button"
                      danger
                      @click.prevent="removeEquipmentRow(index)"
                    >
                      <template #icon>
                        <VbenIcon icon="lucide:minus" />
                      </template>
                    </PlatformButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PlatformEditForm>
    </PlatformModal>
  </Page>
</template>

<style scoped>
.project-information-page {
  display: flex;
  flex-direction: column;
  gap: var(--st-layout-section-gap);
  min-height: 100%;
}

.project-information-panel:fullscreen {
  overflow: auto;
  background: hsl(var(--st-color-card-bg));
}

.project-name-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.project-name-cell span {
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-sm);
}

.project-form-tabs {
  margin: -8px -24px 24px;
}

.project-modal-form {
  min-height: 420px;
}

.project-form-section {
  min-height: 420px;
}

.project-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 24px;
}

.project-form-grid :deep(.ant-form-item) {
  margin-bottom: 0;
}

.project-form-grid :deep(.ant-picker),
.project-form-grid :deep(.ant-select),
.project-form-grid :deep(.ant-input-affix-wrapper),
.project-form-grid :deep(.ant-input-number),
.project-form-grid :deep(.ant-input) {
  width: 100%;
}

.project-form-item--full {
  grid-column: 1 / -1;
}

.project-form-group h3 {
  margin: 0 0 12px;
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-base);
  font-weight: 700;
}

.project-form-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-form-inline {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  gap: 12px 16px;
  align-items: end;
}

.project-form-inline--equipment {
  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1fr)
    minmax(0, 1fr)
    auto;
}

.project-form-inline > * {
  min-width: 0;
}

.project-form-inline__actions {
  display: flex;
  gap: 8px;
  align-items: center;
  align-self: end;
  padding-bottom: 4px;
}

.project-form-inline :deep(.project-form-inline__icon-button.ant-btn) {
  width: 28px;
  min-width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 999px;
}

.project-form-inline :deep(.project-form-inline__icon-button.ant-btn .anticon) {
  font-size: 14px;
}

.project-form-inline
  :deep(.project-form-inline__icon-button.ant-btn.ant-btn-dangerous) {
  background: rgba(255, 77, 79, 0.08);
}

.project-form-inline
  :deep(
    .project-form-inline__icon-button.ant-btn.ant-btn-dangerous:not(:disabled):not(.ant-btn-disabled):hover
  ),
.project-form-inline
  :deep(
    .project-form-inline__icon-button.ant-btn.ant-btn-dangerous:not(:disabled):not(.ant-btn-disabled):focus-visible
  ) {
  background: rgba(255, 77, 79, 0.12);
}

@media (max-width: 960px) {
  .project-form-grid {
    grid-template-columns: 1fr;
  }

  .project-form-inline,
  .project-form-inline--equipment {
    grid-template-columns: 1fr;
  }
}
</style>
