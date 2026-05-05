<script setup lang="ts">
import { Table } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <Table v-bind="$attrs" class="platform-table">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Table>
</template>

<style scoped>
.platform-table {
  width: 100%;
}

.platform-table :deep(.ant-table) {
  border-radius: var(--st-radius-card);
}

.platform-table :deep(.ant-table-thead > tr > th) {
  font-weight: 500;
}
</style>
