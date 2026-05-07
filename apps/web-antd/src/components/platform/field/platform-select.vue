<script setup lang="ts">
import type { SelectProps } from 'antdv-next';

import { computed } from 'vue';

import { Select } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  minChars?: number;
  options?: SelectProps['options'];
  width?: number | string;
}>();

const triggerChars = computed(() => {
  const maxLabelLength = getMaxOptionLabelLength(props.options);
  if (maxLabelLength > 0) {
    return maxLabelLength > 4 ? 5 : maxLabelLength;
  }
  return props.minChars;
});
const selectStyle = computed(() => {
  if (props.width) {
    const width =
      typeof props.width === 'number' ? `${props.width}px` : props.width;
    return {
      '--platform-select-width': width,
    };
  }
  if (triggerChars.value) {
    return {
      '--platform-select-width': `calc(${triggerChars.value}em + 72px)`,
    };
  }
  return undefined;
});

function getMaxOptionLabelLength(options?: SelectProps['options']): number {
  if (!options?.length) {
    return 0;
  }

  return options.reduce((max, option) => {
    const labelLength = getOptionLabel(option);
    const childrenLength = getMaxOptionLabelLength(
      'options' in option ? option.options : undefined,
    );
    return Math.max(max, labelLength, childrenLength);
  }, 0);
}

function getOptionLabel(option: NonNullable<SelectProps['options']>[number]) {
  const label = 'label' in option ? option.label : undefined;
  if (typeof label === 'number' || typeof label === 'string') {
    return Array.from(String(label)).length;
  }
  if (typeof option.value === 'number' || typeof option.value === 'string') {
    return Array.from(String(option.value)).length;
  }
  return 0;
}
</script>

<template>
  <Select
    v-bind="$attrs"
    class="platform-select"
    :options="options"
    popup-class-name="platform-select-dropdown"
    :popup-match-select-width="false"
    :style="selectStyle"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Select>
</template>

<style scoped>
.platform-select {
  min-width: var(--platform-select-width, 0);
  width: var(--platform-select-width, 100%);
}

.platform-select :deep(.ant-select-selection-item),
.platform-select :deep(.ant-select-selection-placeholder) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:global(.platform-select-dropdown .ant-select-item-option-content) {
  white-space: nowrap;
}
</style>
