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
  min-height: 32px;
  align-items: center;
}

.platform-tree :deep(.ant-tree-node-content-wrapper) {
  min-height: 28px;
  display: inline-flex;
  align-items: center;
}
</style>
