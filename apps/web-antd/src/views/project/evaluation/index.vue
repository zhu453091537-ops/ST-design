<script setup lang="ts">
import type { TableEmits, TableProps } from 'antdv-next';

import type {
  EvaluationProject,
  EvaluationRecord,
  EvaluationStatCard,
} from './project-evaluation-source';

import { computed, onMounted, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { VbenIcon } from '@vben/icons';

import {
  PlatformButton,
  PlatformEditForm,
  PlatformFormItem,
  PlatformInput,
  PlatformModal,
  PlatformSelect,
  PlatformStatCard,
  PlatformStatusTag,
  PlatformTable,
  PlatformTableToolbar,
  PlatformViewToolbar,
} from '#/components/platform';

import {
  evaluationProjectStageMap,
  evaluationProjectStatusMap,
  evaluationRecordResultMap,
  getEvaluationProjects,
  getEvaluationRecords,
  getEvaluationStats,
  submitEvaluation,
} from './project-evaluation-source';

interface EvaluationFormModel {
  evaluator: string;
  projectId?: number;
  remark: string;
  score: number;
}

const formModel = reactive<EvaluationFormModel>({
  evaluator: '项目管理部',
  projectId: undefined,
  remark: '',
  score: 90,
});
const evaluationProjects = ref<EvaluationProject[]>([]);
const evaluationRecords = ref<EvaluationRecord[]>([]);
const statCards = ref<EvaluationStatCard[]>([]);
const loading = ref(false);
const saving = ref(false);
const formOpen = ref(false);
const projectQuery = reactive({
  keyword: '',
});
const recordQuery = reactive({
  keyword: '',
  result: '',
});

const projectOptions = computed(() =>
  evaluationProjects.value.map((item) => ({
    label: item.name,
    value: item.id,
  })),
);
const recordResultOptions = computed(() => [
  { label: '全部结果', value: '' },
  ...Object.entries(evaluationRecordResultMap).map(([value, meta]) => ({
    label: meta.label,
    value,
  })),
]);
const currentProject = computed(() =>
  evaluationProjects.value.find((item) => item.id === formModel.projectId),
);
const filteredEvaluationProjects = computed(() =>
  evaluationProjects.value.filter((project) => {
    const keyword = projectQuery.keyword.trim().toLowerCase();
    const matchKeyword =
      !keyword ||
      [project.name, project.department, project.manager].some((value) =>
        value.toLowerCase().includes(keyword),
      );

    return matchKeyword;
  }),
);
const filteredEvaluationRecords = computed(() =>
  evaluationRecords.value.filter((record) => {
    const keyword = recordQuery.keyword.trim().toLowerCase();
    const matchKeyword =
      !keyword ||
      [record.name, record.evaluator].some((value) =>
        value.toLowerCase().includes(keyword),
      );
    const matchResult = !recordQuery.result || record.result === recordQuery.result;

    return matchKeyword && matchResult;
  }),
);
const recordColumns = computed<TableProps['columns']>(() => [
  {
    dataIndex: 'name',
    key: 'name',
    title: '项目名称',
    width: 260,
  },
  {
    dataIndex: 'result',
    filterMultiple: false,
    filteredValue: recordQuery.result ? [recordQuery.result] : null,
    filters: recordResultOptions.value
      .filter((item) => item.value)
      .map((item) => ({ text: item.label, value: item.value })),
    key: 'result',
    title: '评估结果',
    width: 110,
  },
  {
    dataIndex: 'date',
    key: 'date',
    title: '评估日期',
    width: 130,
  },
  {
    dataIndex: 'evaluator',
    key: 'evaluator',
    title: '评估组',
    width: 140,
  },
  {
    dataIndex: 'score',
    key: 'score',
    title: '得分',
    width: 96,
  },
]);
const recordPagination = computed(() => ({
  pageSize: 6,
  showTotal: (total: number) => `共 ${total} 条`,
  total: filteredEvaluationRecords.value.length,
}));

onMounted(loadEvaluationPage);

async function loadEvaluationPage() {
  loading.value = true;
  try {
    const [projects, records, stats] = await Promise.all([
      getEvaluationProjects(),
      getEvaluationRecords(),
      getEvaluationStats(),
    ]);
    evaluationProjects.value = projects;
    evaluationRecords.value = records;
    statCards.value = stats;
  } finally {
    loading.value = false;
  }
}

function handleRecordTableChange(...args: Parameters<TableEmits['change']>) {
  const [, filters] = args;
  recordQuery.result = getFirstFilterValue(
    filters.result,
  ) as '' | EvaluationRecord['result'];
}

function handleCreateEvaluation(project?: EvaluationProject) {
  Object.assign(formModel, {
    evaluator: '项目管理部',
    projectId: project?.id ?? evaluationProjects.value[0]?.id,
    remark: '',
    score: 90,
  });
  formOpen.value = true;
}

async function handleSubmitEvaluation() {
  if (!formModel.projectId) {
    window.message.warning('请选择待评估项目。');
    return;
  }

  saving.value = true;
  try {
    await submitEvaluation({
      evaluator: formModel.evaluator,
      projectId: formModel.projectId,
      remark: formModel.remark,
      score: Number(formModel.score) || 0,
    });
    window.message.success('评估记录已生成');
    formOpen.value = false;
    await loadEvaluationPage();
  } finally {
    saving.value = false;
  }
}

function getScoreClass(score: number) {
  return score >= 90
    ? 'project-evaluation-score--success'
    : 'project-evaluation-score--warning';
}

function getFirstFilterValue(value: unknown) {
  if (Array.isArray(value)) {
    return String(value[0] ?? '');
  }
  return '';
}

function getEvaluationRecord(record: unknown) {
  return record as EvaluationRecord;
}

function getRecordResultMeta(record: unknown) {
  return evaluationRecordResultMap[getEvaluationRecord(record).result];
}

function getRecordScore(record: unknown) {
  return getEvaluationRecord(record).score;
}
</script>

<template>
  <Page :auto-content-height="true">
    <div class="project-evaluation-page">
      <PlatformViewToolbar
        description="评估模板、验收流程数字化留痕"
        title="中期评估与验收管理"
      />

      <section class="project-evaluation-stat-grid">
        <PlatformStatCard
          v-for="card in statCards"
          :key="card.title"
          :loading="loading"
          v-bind="card"
        />
      </section>

      <section class="project-evaluation-workspace">
        <article class="platform-surface project-evaluation-panel">
          <PlatformTableToolbar
            v-model:search-value="recordQuery.keyword"
            search-placeholder="搜索项目 / 评估组"
            :tools="['search', 'refresh']"
            title="评估记录"
            @refresh="loadEvaluationPage"
            @search="() => {}"
          />

          <PlatformTable
            :adaptive-height-bottom-offset="48"
            :columns="recordColumns"
            :data-source="filteredEvaluationRecords"
            :loading="loading"
            :pagination="recordPagination"
            row-key="id"
            show-index
            size="middle"
            @change="handleRecordTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <div class="project-record-name">
                  <strong>{{ record.name }}</strong>
                  <span>{{ record.evaluator }}</span>
                </div>
              </template>
              <template v-else-if="column.key === 'result'">
                <PlatformStatusTag
                  :label="getRecordResultMeta(record).label"
                  :status="getRecordResultMeta(record).status"
                />
              </template>
              <template v-else-if="column.key === 'score'">
                <strong
                  class="project-evaluation-score"
                  :class="getScoreClass(getRecordScore(record))"
                >
                  {{ getRecordScore(record) }}分
                </strong>
              </template>
            </template>
          </PlatformTable>
        </article>

        <article class="platform-surface project-evaluation-panel">
          <PlatformTableToolbar
            v-model:search-value="projectQuery.keyword"
            search-placeholder="搜索项目 / 部门 / 负责人"
            :tools="['search', 'refresh']"
            title="待评估项目"
            @refresh="loadEvaluationPage"
            @search="() => {}"
          />

          <div class="project-evaluation-panel__body">
            <article
              v-for="project in filteredEvaluationProjects"
              :key="project.id"
              class="project-pending-card"
            >
              <div class="project-pending-card__main">
                <div>
                  <h3>{{ project.name }}</h3>
                  <p>{{ project.department }} · {{ project.manager }}</p>
                </div>
                <PlatformStatusTag
                  :label="evaluationProjectStageMap[project.stage].label"
                  :status="evaluationProjectStageMap[project.stage].status"
                />
              </div>
              <div class="project-pending-card__meta">
                <span>截止 {{ project.dueDate }}</span>
                <PlatformStatusTag
                  :label="evaluationProjectStatusMap[project.status].label"
                  :status="evaluationProjectStatusMap[project.status].status"
                />
              </div>
              <div class="project-pending-card__progress">
                <span
                  :style="{ width: `${project.progress}%` }"
                  class="project-pending-card__progress-bar"
                ></span>
              </div>
              <div class="project-pending-card__footer">
                <span>进度 {{ project.progress }}%</span>
                <PlatformButton
                  size="small"
                  type="primary"
                  @click="handleCreateEvaluation(project)"
                >
                  <template #icon>
                    <VbenIcon icon="lucide:plus" />
                  </template>
                  发起评估
                </PlatformButton>
              </div>
            </article>
            <div
              v-if="filteredEvaluationProjects.length === 0"
              class="project-evaluation-empty"
            >
              暂无符合条件的待评估项目
            </div>
          </div>
        </article>
      </section>
    </div>

    <PlatformModal
      v-model:open="formOpen"
      :confirm-loading="saving"
      destroy-on-hidden
      title="发起评估"
      width="720px"
      @cancel="formOpen = false"
      @ok="handleSubmitEvaluation"
    >
      <PlatformEditForm :model="formModel" layout="vertical">
        <div class="project-evaluation-form-grid">
          <PlatformFormItem label="待评估项目">
            <PlatformSelect
              v-model:value="formModel.projectId"
              :options="projectOptions"
            />
          </PlatformFormItem>
          <PlatformFormItem label="评估人 / 评估组">
            <PlatformInput v-model:value="formModel.evaluator" />
          </PlatformFormItem>
          <PlatformFormItem label="评估得分">
            <PlatformInput v-model:value="formModel.score" type="number" />
          </PlatformFormItem>
          <PlatformFormItem label="当前进度">
            <PlatformInput
              :value="
                currentProject ? `${currentProject.progress}%` : '未选择项目'
              "
              disabled
            />
          </PlatformFormItem>
        </div>
        <PlatformFormItem label="评估说明">
          <PlatformInput
            v-model:value="formModel.remark"
            placeholder="记录本次中期评估或验收意见"
          />
        </PlatformFormItem>
      </PlatformEditForm>
    </PlatformModal>
  </Page>
</template>

<style scoped>
.project-evaluation-page {
  display: flex;
  flex-direction: column;
  gap: var(--st-layout-section-gap);
  height: 100%;
  min-height: 0;
}

.project-pending-card h3 {
  margin: 0;
  color: hsl(var(--foreground));
  font-weight: 700;
}
.project-pending-card p,
.project-pending-card p,
.project-pending-card__meta,
.project-pending-card__footer {
  margin: 0;
  color: hsl(var(--muted-foreground));
}

.project-evaluation-stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--st-layout-section-gap);
}

.project-evaluation-workspace {
  display: grid;
  flex: 1;
  grid-template-columns: minmax(520px, 1.45fr) minmax(360px, 0.85fr);
  gap: var(--st-layout-section-gap);
  min-height: 0;
}

.project-evaluation-panel {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.project-evaluation-panel__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  overflow: auto;
}

.project-pending-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: 18px;
  text-align: left;
  background: hsl(var(--st-color-card-bg));
  border: 1px solid hsl(var(--border));
  border-radius: var(--st-radius-card);
  transition: transform 0.18s ease;
}

.project-pending-card:hover {
  transform: translateY(-4px);
}

.project-pending-card__main,
.project-pending-card__meta,
.project-pending-card__footer {
  display: flex;
  align-items: center;
}

.project-pending-card__main,
.project-pending-card__meta,
.project-pending-card__footer {
  justify-content: space-between;
  gap: 12px;
}

.project-pending-card h3 {
  font-size: var(--st-font-size-base);
  line-height: 24px;
}

.project-pending-card p {
  margin-top: 3px;
  font-size: var(--st-font-size-sm);
}

.project-pending-card__meta,
.project-pending-card__footer {
  font-size: var(--st-font-size-sm);
}

.project-pending-card__progress {
  height: 6px;
  overflow: hidden;
  background: hsl(var(--muted));
  border-radius: 999px;
}

.project-pending-card__progress-bar {
  display: block;
  height: 100%;
  background: hsl(var(--st-color-brand));
  border-radius: inherit;
}

.project-record-name {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.project-record-name span {
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-sm);
}

.project-evaluation-score {
  flex: 0 0 auto;
  font-size: var(--st-font-size-base);
  line-height: 24px;
}

.project-evaluation-score--success {
  color: hsl(var(--st-color-brand));
}

.project-evaluation-score--warning {
  color: hsl(var(--st-color-warning-action));
}

.project-evaluation-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  color: hsl(var(--muted-foreground));
  border: 1px dashed hsl(var(--border));
  border-radius: var(--st-radius-card);
}

.project-evaluation-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 16px;
}

@media (max-width: 1200px) {
  .project-evaluation-workspace {
    grid-template-columns: minmax(420px, 1.2fr) minmax(320px, 0.95fr);
  }
}

@media (max-width: 960px) {
  .project-evaluation-page {
    height: auto;
    min-height: 100%;
  }

  .project-evaluation-stat-grid,
  .project-evaluation-workspace,
  .project-evaluation-form-grid {
    grid-template-columns: 1fr;
  }

  .project-evaluation-workspace {
    flex: none;
  }

  .project-evaluation-panel {
    max-height: none;
  }
}
</style>
