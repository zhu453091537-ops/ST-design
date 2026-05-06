<script setup lang="ts">
import { computed, useSlots } from 'vue';

import { Tree } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

const slots = useSlots();
const passthroughSlotNames = computed(() =>
  Object.keys(slots).filter((name) => name !== 'switcherIcon'),
);

function isLeafNode(slotProps: any) {
  if (slotProps?.isLeaf || slotProps?.dataRef?.isLeaf || slotProps?.data?.isLeaf) {
    return true;
  }

  const children = slotProps?.dataRef?.children ?? slotProps?.data?.children;
  return !children || children.length === 0;
}

function isExpanded(slotProps: any) {
  return Boolean(slotProps?.expanded);
}
</script>

<template>
  <Tree v-bind="$attrs" class="platform-tree">
    <template #switcherIcon="slotProps">
      <slot name="switcherIcon" v-bind="slotProps || {}">
        <span
          v-if="!isLeafNode(slotProps)"
          class="platform-tree__switcher"
          :class="{ 'is-expanded': isExpanded(slotProps) }"
        ></span>
      </slot>
    </template>
    <template v-for="name in passthroughSlotNames" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Tree>
</template>

<style scoped>
.platform-tree {
  padding-block: 4px;
}

.platform-tree :deep(.ant-tree-treenode) {
  min-height: var(--st-tree-node-height);
  align-items: center;
}

.platform-tree :deep(.ant-tree-node-content-wrapper) {
  min-height: calc(var(--st-tree-node-height) - 2px);
  display: inline-flex;
  align-items: center;
}

.platform-tree :deep(.ant-tree-switcher) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.platform-tree__switcher {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 6px solid hsl(var(--st-color-tree-switcher));
  transition: transform 0.16s ease;
}

.platform-tree__switcher.is-expanded {
  transform: rotate(90deg);
}
</style>
