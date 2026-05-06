<script setup lang="ts">
import { computed } from 'vue';

import { VbenIcon } from '@vben/icons';

import { PlatformButton } from '../button';

type TableTool = 'fullscreen' | 'refresh' | 'search' | 'setting';

const props = withDefaults(
  defineProps<{
    tools?: TableTool[];
  }>(),
  {
    tools: () => ['search', 'refresh', 'setting', 'fullscreen'],
  },
);

const emit = defineEmits<{
  fullscreen: [];
  refresh: [];
  search: [];
  setting: [];
}>();

const toolMeta = {
  fullscreen: {
    icon: 'lucide:maximize-2',
    label: '全屏表格',
  },
  refresh: {
    icon: 'lucide:refresh-cw',
    label: '刷新表格',
  },
  search: {
    icon: 'lucide:search',
    label: '搜索表格',
  },
  setting: {
    icon: 'lucide:settings',
    label: '表格设置',
  },
} as const;

const toolbarTools = computed(() =>
  props.tools.map((tool) => ({
    key: tool,
    ...toolMeta[tool],
  })),
);

function handleToolClick(tool: TableTool) {
  switch (tool) {
    case 'fullscreen': {
      emit('fullscreen');
      break;
    }
    case 'refresh': {
      emit('refresh');
      break;
    }
    case 'search': {
      emit('search');
      break;
    }
    case 'setting': {
      emit('setting');
      break;
    }
  }
}
</script>

<template>
  <div class="platform-table-toolbar">
    <div class="platform-table-toolbar__actions">
      <slot name="actions"></slot>
    </div>
    <div class="platform-table-toolbar__tools">
      <slot name="tools-before"></slot>
      <PlatformButton
        v-for="tool in toolbarTools"
        :key="tool.key"
        :aria-label="tool.label"
        scene="toolbar"
        shape="circle"
        @click="handleToolClick(tool.key)"
      >
        <template #icon>
          <VbenIcon :icon="tool.icon" />
        </template>
      </PlatformButton>
      <slot name="tools-after"></slot>
    </div>
  </div>
</template>

<style scoped>
.platform-table-toolbar {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 56px;
  padding: 10px 12px;
  background: hsl(var(--st-color-table-toolbar-bg));
  border-radius: var(--st-radius-card);
}

.platform-table-toolbar__actions,
.platform-table-toolbar__tools {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.platform-table-toolbar__actions {
  min-width: 0;
  flex-wrap: wrap;
}

.platform-table-toolbar__tools {
  flex-shrink: 0;
}
</style>
