<script setup lang="ts">
import { computed } from 'vue';

import { Tag } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    label?: string;
    status?: 'default' | 'error' | 'processing' | 'success' | 'warning';
  }>(),
  {
    label: '',
    status: 'default',
  },
);

const color = computed(() => {
  const colorMap = {
    default: 'default',
    error: 'error',
    processing: 'processing',
    success: 'success',
    warning: 'warning',
  } as const;
  return colorMap[props.status];
});
</script>

<template>
  <Tag v-bind="$attrs" :color="color" class="platform-status-tag">
    <slot>{{ label }}</slot>
  </Tag>
</template>

<style scoped>
.platform-status-tag {
  min-width: 56px;
  margin-inline-end: 0;
  text-align: center;
}
</style>
