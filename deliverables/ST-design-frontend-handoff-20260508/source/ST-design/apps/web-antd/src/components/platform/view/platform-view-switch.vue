<script setup lang="ts">
import type { PlatformViewOption } from './types';

import { VbenIcon } from '@vben/icons';

import { PlatformButton } from '../button';

defineProps<{
  modelValue: string;
  options: PlatformViewOption[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div class="platform-view-switch" aria-label="视图切换">
    <PlatformButton
      v-for="option in options"
      :key="option.value"
      scene="toolbar"
      :type="modelValue === option.value ? 'primary' : 'default'"
      @click="emit('update:modelValue', option.value)"
    >
      <template v-if="option.icon" #icon>
        <VbenIcon :icon="option.icon" />
      </template>
      {{ option.label }}
    </PlatformButton>
  </div>
</template>

<style scoped>
.platform-view-switch {
  display: inline-flex;
  flex: none;
  gap: 8px;
}

@media (max-width: 768px) {
  .platform-view-switch {
    width: 100%;
  }

  .platform-view-switch :deep(.platform-button) {
    flex: 1;
  }
}
</style>
