<script setup lang="ts">
import { Tree } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <Tree v-bind="$attrs" class="platform-tree">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
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
</style>
