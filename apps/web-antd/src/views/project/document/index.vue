<script setup lang="ts">
import type {
  ProjectDocumentRecord,
  ProjectDocumentStatCard,
} from './project-document-source';

import type { PlatformFileListItem } from '#/components/platform';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { VbenIcon } from '@vben/icons';

import {
  PlatformButton,
  PlatformFileList,
  PlatformSectionTitle,
  PlatformStatCard,
} from '#/components/platform';

import {
  downloadProjectDocument,
  exportProjectDocumentLedger,
  getProjectDocumentList,
  getProjectDocumentStats,
  uploadProjectDocuments,
} from './project-document-source';

const documents = ref<ProjectDocumentRecord[]>([]);
const statCards = ref<ProjectDocumentStatCard[]>([]);
const loading = ref(false);
const uploading = ref(false);
const exporting = ref(false);
const downloadingId = ref<null | number | string>(null);
const fileInputRef = ref<HTMLInputElement>();

onMounted(loadDocumentManagement);

async function loadDocumentManagement() {
  loading.value = true;
  try {
    const [rows, stats] = await Promise.all([
      getProjectDocumentList(),
      getProjectDocumentStats(),
    ]);
    documents.value = rows;
    statCards.value = stats;
  } finally {
    loading.value = false;
  }
}

async function handleDownload(item: PlatformFileListItem) {
  downloadingId.value = item.id;
  try {
    const document = await downloadProjectDocument(item.id);
    window.message.success(`已下载 ${document?.name || item.name}`);
  } finally {
    downloadingId.value = null;
  }
}

async function handleExportLedger() {
  exporting.value = true;
  try {
    const result = await exportProjectDocumentLedger();
    window.message.success(
      `已导出 ${result.fileName}，共 ${result.total} 条文档记录`,
    );
  } finally {
    exporting.value = false;
  }
}

function handleUploadClick() {
  fileInputRef.value?.click();
}

async function handleUploadChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const files = [...(input.files || [])];

  if (files.length === 0) {
    return;
  }

  uploading.value = true;
  try {
    const uploadedRows = await uploadProjectDocuments(files);
    window.message.success(`已上传 ${uploadedRows.length} 个文件`);
    await loadDocumentManagement();
  } finally {
    uploading.value = false;
    input.value = '';
  }
}
</script>

<template>
  <Page :auto-content-height="true">
    <div class="project-document-page">
      <header class="project-document-header">
        <div>
          <h1>文档与台账管理</h1>
          <p>合同、技术方案、验收报告等文档分类管理</p>
        </div>

        <div class="project-document-header__actions">
          <PlatformButton
            :loading="exporting"
            scene="toolbar"
            @click="handleExportLedger"
          >
            <template #icon>
              <VbenIcon icon="lucide:download" />
            </template>
            导出台账
          </PlatformButton>
          <PlatformButton
            :loading="uploading"
            scene="toolbar"
            type="primary"
            @click="handleUploadClick"
          >
            <template #icon>
              <VbenIcon icon="lucide:upload" />
            </template>
            批量上传
          </PlatformButton>
          <input
            ref="fileInputRef"
            class="project-document-upload-input"
            multiple
            type="file"
            @change="handleUploadChange"
          />
        </div>
      </header>

      <section class="project-document-stat-grid">
        <PlatformStatCard
          v-for="card in statCards"
          :key="card.title"
          :loading="loading"
          v-bind="card"
        />
      </section>

      <section class="platform-surface project-document-panel">
        <PlatformSectionTitle
          class="project-document-panel__header"
          title="文档列表"
        />

        <PlatformFileList
          :columns="2"
          :downloading-id="downloadingId"
          empty-text="暂无文档"
          :items="documents"
          :loading="loading"
          @download="handleDownload"
        />
      </section>
    </div>
  </Page>
</template>

<style scoped>
.project-document-page {
  display: flex;
  flex-direction: column;
  gap: var(--st-layout-section-gap);
  min-height: 100%;
}

.project-document-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.project-document-header h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
  color: hsl(var(--foreground));
}

.project-document-header p {
  margin: 0;
  color: hsl(var(--muted-foreground));
}

.project-document-header__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.project-document-upload-input {
  display: none;
}

.project-document-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--st-layout-section-gap);
}

.project-document-panel {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 16px;
}

.project-document-panel__header {
  margin-bottom: 20px;
}

@media (max-width: 1280px) {
  .project-document-stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .project-document-header {
    align-items: stretch;
    flex-direction: column;
  }

  .project-document-header__actions {
    justify-content: flex-start;
  }

  .project-document-stat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
