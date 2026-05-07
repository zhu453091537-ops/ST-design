<script setup lang="ts">
import type { PlatformFileListItem, PlatformFileType } from './types';

import { computed } from 'vue';

import { VbenIcon } from '@vben/icons';

import { PlatformButton } from '../button';

const props = withDefaults(
  defineProps<{
    downloading?: boolean;
    item: PlatformFileListItem;
  }>(),
  {
    downloading: false,
  },
);

const emit = defineEmits<{
  download: [item: PlatformFileListItem];
}>();

const fileTypeMeta: Record<
  PlatformFileType,
  { className: string; icon: string; label: string }
> = {
  doc: {
    className: 'platform-file-item__icon--doc',
    icon: 'lucide:file-text',
    label: 'DOC',
  },
  other: {
    className: 'platform-file-item__icon--other',
    icon: 'lucide:file',
    label: 'FILE',
  },
  pdf: {
    className: 'platform-file-item__icon--pdf',
    icon: 'lucide:file-text',
    label: 'PDF',
  },
  report: {
    className: 'platform-file-item__icon--report',
    icon: 'lucide:file-bar-chart',
    label: 'RPT',
  },
  xls: {
    className: 'platform-file-item__icon--xls',
    icon: 'lucide:file-spreadsheet',
    label: 'XLS',
  },
};

const meta = computed(() => fileTypeMeta[props.item.type || 'other']);
const secondaryText = computed(() =>
  [props.item.projectName, props.item.size, props.item.date]
    .filter(Boolean)
    .join(' · '),
);
</script>

<template>
  <li class="platform-file-item">
    <span class="platform-file-item__icon" :class="meta.className">
      <VbenIcon :icon="meta.icon" />
      <span>{{ meta.label }}</span>
    </span>

    <div class="platform-file-item__body">
      <strong>{{ item.name }}</strong>
      <p v-if="secondaryText">{{ secondaryText }}</p>
      <p v-else-if="item.description">{{ item.description }}</p>
    </div>

    <PlatformButton
      :loading="downloading"
      :title="`下载 ${item.name}`"
      class="platform-file-item__download"
      scene="toolbar"
      @click="emit('download', item)"
    >
      <template #icon>
        <VbenIcon icon="lucide:download" />
      </template>
    </PlatformButton>
  </li>
</template>

<style scoped>
.platform-file-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  min-height: 62px;
  padding: 10px 12px;
  background: hsl(var(--st-color-card-bg));
  border: 1px solid hsl(var(--st-color-table-outline));
  border-radius: var(--st-radius-control);
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.platform-file-item:hover {
  background: var(--st-color-table-row-hover-bg-solid);
  border-color: hsl(var(--st-color-brand-outline));
  box-shadow: var(--st-shadow-stat-card);
}

.platform-file-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex-direction: column;
  gap: 2px;
  flex: 0 0 42px;
  border-radius: var(--st-radius-control);
}

.platform-file-item__icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.platform-file-item__icon span {
  font-size: 9px;
  font-weight: 800;
  line-height: 10px;
}

.platform-file-item__icon--pdf {
  color: hsl(var(--st-color-danger));
  background: hsl(var(--st-color-danger) / 10%);
}

.platform-file-item__icon--doc {
  color: hsl(var(--st-color-stat-card-info));
  background: hsl(var(--st-color-stat-card-info) / 10%);
}

.platform-file-item__icon--xls {
  color: hsl(var(--success));
  background: hsl(var(--success) / 10%);
}

.platform-file-item__icon--report {
  color: hsl(var(--warning));
  background: hsl(var(--warning) / 12%);
}

.platform-file-item__icon--other {
  color: hsl(var(--muted-foreground));
  background: hsl(var(--muted));
}

.platform-file-item__body {
  min-width: 0;
}

.platform-file-item__body strong {
  display: block;
  min-width: 0;
  overflow: hidden;
  color: hsl(var(--foreground));
  font-size: var(--st-font-size-base);
  font-weight: 700;
  line-height: 22px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.platform-file-item__body p {
  margin: 2px 0 0;
  overflow: hidden;
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-sm);
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.platform-file-item__download {
  width: 36px;
  min-width: 36px;
  height: 36px;
  padding-inline: 0;
}

.platform-file-item__download :deep(svg) {
  width: 16px;
  height: 16px;
}

@media (max-width: 640px) {
  .platform-file-item {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .platform-file-item__download {
    grid-column: 2;
    justify-self: start;
  }
}
</style>
