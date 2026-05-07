<script setup lang="ts">
import type {
  ProjectProgressRecord,
  ProjectProgressWarning,
} from './project-progress-source';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { VbenIcon } from '@vben/icons';

import { Empty } from 'antdv-next';

import { PlatformButton } from '#/components/platform';

import ProjectProgressBoard from './components/project-progress-board.vue';
import ProjectProgressGanttChart from './components/project-progress-gantt-chart.vue';
import {
  getProjectProgressBoardList,
  getProjectProgressGanttList,
  getProjectProgressWarnings,
} from './project-progress-source';

type ProjectProgressView = 'board' | 'gantt';

const activeView = ref<ProjectProgressView>('gantt');
const boardRows = ref<ProjectProgressRecord[]>([]);
const ganttRows = ref<ProjectProgressRecord[]>([]);
const warnings = ref<ProjectProgressWarning[]>([]);
const loading = ref(false);

onMounted(async () => {
  await loadProgress();
});

async function loadProgress() {
  loading.value = true;
  try {
    const [boardList, ganttList, warningList] = await Promise.all([
      getProjectProgressBoardList(),
      getProjectProgressGanttList(),
      getProjectProgressWarnings(),
    ]);
    boardRows.value = boardList;
    ganttRows.value = ganttList;
    warnings.value = warningList;
  } finally {
    loading.value = false;
  }
}

function setActiveView(view: ProjectProgressView) {
  activeView.value = view;
}
</script>

<template>
  <Page auto-content-height>
    <div class="project-progress-page" :aria-busy="loading">
      <header class="project-progress-header">
        <div class="project-progress-header__title">
          <h1>进度可视化跟踪</h1>
          <p>甘特图 / 看板 / 进度条</p>
        </div>

        <div class="project-progress-switch" aria-label="进度视图切换">
          <PlatformButton
            scene="toolbar"
            :type="activeView === 'gantt' ? 'primary' : 'default'"
            @click="setActiveView('gantt')"
          >
            <template #icon>
              <VbenIcon icon="lucide:chart-gantt" />
            </template>
            甘特图
          </PlatformButton>
          <PlatformButton
            scene="toolbar"
            :type="activeView === 'board' ? 'primary' : 'default'"
            @click="setActiveView('board')"
          >
            <template #icon>
              <VbenIcon icon="lucide:columns-3" />
            </template>
            看板
          </PlatformButton>
        </div>
      </header>

      <section v-if="activeView === 'gantt'" class="platform-surface">
        <ProjectProgressGanttChart :rows="ganttRows" :year="2026" />
      </section>

      <section v-else class="project-progress-board-section">
        <ProjectProgressBoard :rows="boardRows" />
      </section>

      <section v-if="activeView === 'gantt'" class="platform-surface">
        <h2 class="project-progress-section-title">进度预警</h2>
        <ul v-if="warnings.length > 0" class="project-progress-warning-list">
          <li v-for="warning in warnings" :key="warning.id">
            <strong>{{ warning.name }}</strong>
            <span>{{ warning.reason }}</span>
          </li>
        </ul>
        <Empty
          v-else
          class="project-progress-empty"
          description="暂无进度滞后项目"
          :image="Empty.PRESENTED_IMAGE_SIMPLE"
        />
      </section>
    </div>
  </Page>
</template>

<style scoped>
.project-progress-page {
  display: flex;
  flex-direction: column;
  gap: var(--st-layout-section-gap);
  min-height: 100%;
}

.project-progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.project-progress-header__title {
  display: flex;
  align-items: baseline;
  gap: 10px;
  min-width: 0;
}

.project-progress-header__title h1 {
  margin: 0;
  color: hsl(var(--foreground));
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
}

.project-progress-header__title p {
  margin: 0;
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-sm);
}

.project-progress-switch {
  display: inline-flex;
  flex: none;
  gap: 8px;
}

.project-progress-board-section {
  min-width: 0;
}

.project-progress-section-title {
  margin: 0 0 18px;
  color: hsl(var(--foreground));
  font-size: var(--st-font-size-title);
  font-weight: 700;
  line-height: var(--st-line-height-lg);
}

.project-progress-warning-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.project-progress-warning-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid hsl(var(--st-color-border-subtle));
}

.project-progress-warning-list strong {
  color: hsl(var(--foreground));
}

.project-progress-warning-list span {
  color: hsl(var(--muted-foreground));
}

.project-progress-empty {
  padding: 10px 0;
  text-align: left;
}

@media (max-width: 768px) {
  .project-progress-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .project-progress-header__title {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }

  .project-progress-switch {
    width: 100%;
  }

  .project-progress-switch :deep(.platform-button) {
    flex: 1;
  }
}
</style>
