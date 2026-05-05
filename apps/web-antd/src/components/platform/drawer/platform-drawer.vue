<script setup lang="ts">
import { Drawer } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

const open = defineModel<boolean>('open', {
  default: false,
});
</script>

<template>
  <Drawer v-model:open="open" v-bind="$attrs" class="platform-drawer">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Drawer>
</template>

<style scoped>
.platform-drawer :deep(.ant-drawer-content) {
  border-radius: 8px 0 0 8px;
}
</style>
