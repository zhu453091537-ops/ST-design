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
  display: block;
  width: fit-content;
  margin-inline: auto;
  background: transparent !important;
  box-shadow: none !important;
}

.platform-segmented :deep(.ant-segmented-group) {
  gap: 8px;
}

.platform-segmented :deep(.ant-segmented-item-input) {
  inset: 0;
}

.platform-segmented :deep(.ant-segmented-item-icon + *) {
  margin-inline-start: 0 !important;
}

.platform-segmented :deep(.ant-segmented-item) {
  position: relative;
  min-width: 120px;
  color: hsl(var(--muted-foreground));
  font-size: 16px;
  font-weight: 700;
  border-radius: 0;
  background: transparent !important;
  box-shadow: none !important;
  transition: none;
}

.platform-segmented :deep(.ant-segmented-item-label) {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  padding: 0 24px;
  line-height: 56px;
  background: transparent !important;
}

.platform-segmented :deep(.ant-segmented-item::after) {
  background: transparent !important;
}

.platform-segmented :deep(.ant-segmented-thumb) {
  display: none !important;
}

.platform-segmented :deep(.ant-segmented-item-selected) {
  color: hsl(var(--primary));
  background: transparent !important;
  box-shadow: none !important;
}

.platform-segmented :deep(.ant-segmented-item-selected .ant-segmented-item-label::after) {
  position: absolute;
  right: 24px;
  bottom: 0;
  left: 24px;
  height: 3px;
  content: '';
  background: hsl(var(--primary));
}

.platform-segmented
  :deep(.ant-segmented-item:not(.ant-segmented-item-selected):hover),
.platform-segmented
  :deep(.ant-segmented-item:not(.ant-segmented-item-selected):focus),
.platform-segmented
  :deep(.ant-segmented-item:not(.ant-segmented-item-selected):active),
.platform-segmented
  :deep(.ant-segmented-item:not(.ant-segmented-item-selected):hover .ant-segmented-item-label) {
  color: hsl(var(--muted-foreground));
  background: transparent !important;
  box-shadow: none !important;
}

.platform-segmented
  :deep(.ant-segmented-item:not(.ant-segmented-item-selected):hover::after),
.platform-segmented
  :deep(.ant-segmented-item:not(.ant-segmented-item-selected):focus::after),
.platform-segmented
  :deep(.ant-segmented-item:not(.ant-segmented-item-selected):active::after),
.platform-segmented
  :deep(.ant-segmented-item:not(.ant-segmented-item-selected):hover .ant-segmented-item-label::after) {
  background: transparent !important;
  box-shadow: none !important;
}
</style>
