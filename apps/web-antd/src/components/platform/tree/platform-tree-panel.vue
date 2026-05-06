<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Empty, Skeleton } from 'antdv-next';

import { PlatformButton } from '../button';
import { PlatformInput } from '../field';
import PlatformTree from './platform-tree.vue';

type TreeKey = number | string;

interface TreeNode {
  children?: TreeNode[];
  [key: string]: any;
}

withDefaults(
  defineProps<{
    emptyDescription?: string;
    loading?: boolean;
    searchPlaceholder?: string;
    showRefresh?: boolean;
    showSearch?: boolean;
    treeData?: TreeNode[];
  }>(),
  {
    emptyDescription: '无数据',
    loading: false,
    searchPlaceholder: '请输入关键词',
    showRefresh: true,
    showSearch: true,
    treeData: () => [],
  },
);

const emit = defineEmits<{
  reload: [];
  select: [keys: TreeKey[]];
}>();

const attrs = useAttrs();
const selectedKeys = defineModel<TreeKey[]>('selectedKeys', {
  default: () => [],
});
const searchValue = defineModel<string>('searchValue', {
  default: '',
});

const rootClass = computed(() => attrs.class);
const rootStyle = computed(() => attrs.style);
const treeAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});

function handleSelect(keys: TreeKey[]) {
  emit('select', keys);
}
</script>

<template>
  <div class="platform-tree-panel" :class="rootClass" :style="rootStyle">
    <Skeleton
      :loading="loading"
      :paragraph="{ rows: 8 }"
      active
      class="platform-tree-panel__skeleton"
    >
      <div class="platform-tree-panel__surface">
        <div v-if="showSearch" class="platform-tree-panel__header">
          <PlatformInput
            v-model:value="searchValue"
            allow-clear
            :placeholder="searchPlaceholder"
          />
          <PlatformButton
            v-if="showRefresh"
            aria-label="刷新树结构"
            scene="toolbar"
            shape="circle"
            @click="emit('reload')"
          >
            <template #icon>
              <span class="i-lucide-refresh-cw text-[14px]"></span>
            </template>
          </PlatformButton>
        </div>
        <div class="platform-tree-panel__content">
          <PlatformTree
            v-if="treeData.length > 0"
            v-bind="treeAttrs"
            v-model:selected-keys="selectedKeys"
            class="platform-tree-panel__tree"
            :tree-data="treeData"
            @select="handleSelect"
          >
            <template v-for="(_, name) in $slots" #[name]="slotProps">
              <slot :name="name" v-bind="slotProps || {}"></slot>
            </template>
          </PlatformTree>
          <div v-else class="platform-tree-panel__empty">
            <Empty
              :image="Empty.PRESENTED_IMAGE_SIMPLE"
              :description="emptyDescription"
            />
          </div>
        </div>
      </div>
    </Skeleton>
  </div>
</template>

<style scoped>
.platform-tree-panel {
  min-height: 0;
}

.platform-tree-panel__surface {
  display: flex;
  height: 100%;
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--st-radius-card);
  background: hsl(var(--background));
}

.platform-tree-panel__header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: hsl(var(--background));
}

.platform-tree-panel__content {
  min-height: 0;
  flex: 1;
  overflow: hidden;
}

.platform-tree-panel__tree {
  height: 100%;
  overflow: auto;
  padding-inline: 8px;
}

.platform-tree-panel__empty {
  padding: 20px 8px;
}

.platform-tree-panel__skeleton {
  height: 100%;
}
</style>
