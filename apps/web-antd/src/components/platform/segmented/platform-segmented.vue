<script setup lang="ts">
import type { SegmentedProps } from 'antdv-next';

import { Segmented } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

defineProps<{
  options: SegmentedProps['options'];
}>();

const value = defineModel<number | string>('value');
</script>

<template>
  <Segmented
    v-bind="$attrs"
    v-model:value="value"
    class="platform-segmented"
    :options="options"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Segmented>
</template>

<style scoped>
.platform-segmented {
  display: inline-flex;
  background: transparent;
}

.platform-segmented :deep(.ant-segmented-group) {
  gap: 8px;
}

.platform-segmented :deep(.ant-segmented-item) {
  min-width: 120px;
  color: hsl(var(--muted-foreground));
  font-size: 18px;
  font-weight: 700;
  border-radius: 0;
}

.platform-segmented :deep(.ant-segmented-item-label) {
  min-height: 56px;
  padding: 0 24px;
  line-height: 56px;
}

.platform-segmented :deep(.ant-segmented-thumb) {
  display: none;
}

.platform-segmented :deep(.ant-segmented-item-selected) {
  color: hsl(var(--primary));
  background: transparent;
  box-shadow: inset 0 -3px 0 hsl(var(--primary));
}

.platform-segmented :deep(.ant-segmented-item:not(.ant-segmented-item-selected):hover) {
  color: hsl(var(--foreground));
  background: transparent;
}
</style>
