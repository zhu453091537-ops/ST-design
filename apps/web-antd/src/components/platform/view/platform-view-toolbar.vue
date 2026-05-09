<script setup lang="ts">
import type {
  PlatformViewAction,
  PlatformViewOption,
  PlatformViewTool,
} from './types';

import { computed } from 'vue';

import { VbenIcon } from '@vben/icons';

import { PlatformButton } from '../button';
import PlatformViewSwitch from './platform-view-switch.vue';

const props = withDefaults(
  defineProps<{
    actions?: PlatformViewAction[];
    description?: string;
    title?: string;
    tools?: PlatformViewTool[];
    viewOptions?: PlatformViewOption[];
    viewValue?: string;
  }>(),
  {
    actions: () => [],
    description: '',
    title: '',
    tools: () => [],
    viewOptions: () => [],
    viewValue: '',
  },
);

const emit = defineEmits<{
  action: [key: string];
  export: [];
  fullscreen: [];
  refresh: [];
  setting: [];
  'update:viewValue': [value: string];
}>();

const toolMeta = {
  export: {
    icon: 'lucide:download',
    label: '导出',
  },
  fullscreen: {
    icon: 'lucide:maximize-2',
    label: '全屏',
  },
  refresh: {
    icon: 'lucide:refresh-cw',
    label: '刷新',
  },
  setting: {
    icon: 'lucide:settings',
    label: '设置',
  },
} as const;

const toolbarTools = computed(() =>
  props.tools.map((tool) => ({
    key: tool,
    ...toolMeta[tool],
  })),
);
const toolbarActions = computed(() =>
  props.actions.filter((action) => !action.hidden),
);

function handleToolClick(tool: PlatformViewTool) {
  switch (tool) {
    case 'export': {
      emit('export');
      break;
    }
    case 'fullscreen': {
      emit('fullscreen');
      break;
    }
    case 'refresh': {
      emit('refresh');
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
  <div class="platform-view-toolbar">
    <div class="platform-view-toolbar__main">
      <div class="platform-view-toolbar__meta">
        <h1 v-if="title" class="platform-view-toolbar__title">{{ title }}</h1>
        <p v-if="description" class="platform-view-toolbar__description">
          {{ description }}
        </p>
      </div>
      <slot name="filters"></slot>
    </div>

    <div class="platform-view-toolbar__actions">
      <PlatformViewSwitch
        v-if="viewOptions.length > 0"
        :model-value="viewValue"
        :options="viewOptions"
        @update:model-value="emit('update:viewValue', $event)"
      />
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
      <PlatformButton
        v-for="action in toolbarActions"
        :key="action.key"
        :danger="action.danger"
        :disabled="action.disabled"
        :loading="action.loading"
        scene="toolbar"
        :type="action.type || 'default'"
        @click="emit('action', action.key)"
      >
        <template v-if="action.icon" #icon>
          <VbenIcon :icon="action.icon" />
        </template>
        {{ action.label }}
      </PlatformButton>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style scoped>
.platform-view-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
}

.platform-view-toolbar__main {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.platform-view-toolbar__meta {
  min-width: 0;
}

.platform-view-toolbar__title {
  margin: 0;
  color: hsl(var(--foreground));
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
}

.platform-view-toolbar__description {
  margin: 2px 0 0;
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-sm);
}

.platform-view-toolbar__actions {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

@media (max-width: 960px) {
  .platform-view-toolbar,
  .platform-view-toolbar__main {
    align-items: stretch;
    flex-direction: column;
  }

  .platform-view-toolbar__actions {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
