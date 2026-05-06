<script setup lang="ts">
import { computed, useSlots } from 'vue';

import PlatformForm from './platform-form.vue';

defineOptions({
  inheritAttrs: false,
});

const slots = useSlots();
const fieldSlotNames = computed(() =>
  Object.keys(slots).filter((name) => name !== 'actions'),
);
</script>

<template>
  <PlatformForm v-bind="$attrs" class="platform-search-form" variant="search">
    <template v-for="name in fieldSlotNames" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
    <div v-if="$slots.actions" class="platform-search-form__actions">
      <slot name="actions"></slot>
    </div>
  </PlatformForm>
</template>

<style scoped>
.platform-search-form__actions {
  display: flex;
  grid-column: 1 / -1;
  align-items: center;
  justify-content: flex-end;
  gap: var(--st-search-form-action-gap);
  margin-top: var(--st-search-form-action-margin-top);
}
</style>
