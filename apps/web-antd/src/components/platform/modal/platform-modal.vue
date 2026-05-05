<script setup lang="ts">
import { Modal } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

const open = defineModel<boolean>('open', {
  default: false,
});
</script>

<template>
  <Modal v-model:open="open" v-bind="$attrs" class="platform-modal">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Modal>
</template>

<style scoped>
.platform-modal :deep(.ant-modal-content) {
  border-radius: var(--st-radius-card);
}
</style>
