<script setup lang="ts">
import { ChevronsLeft, ChevronsRight } from '@vben-core/icons';

const collapsed = defineModel<boolean>('collapsed');

function handleCollapsed() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div
    class="vben-sidebar-collapse-button absolute bottom-2 left-3 z-10 flex-center cursor-pointer p-1"
    @click.stop="handleCollapsed"
  >
    <ChevronsRight v-if="collapsed" class="size-4" />
    <ChevronsLeft v-else class="size-4" />
  </div>
</template>

<style scoped>
.vben-sidebar-collapse-button {
  color: hsl(var(--st-color-text-tertiary));
  background: hsl(var(--st-color-fill-selected));
  border: 1px solid hsl(var(--st-color-brand-outline));
  border-radius: var(--st-radius-control);
  transition:
    color 0.16s ease,
    background-color 0.16s ease,
    border-color 0.16s ease;
}

.vben-sidebar-collapse-button:hover {
  color: hsl(var(--primary));
  background: hsl(var(--primary) / 14%);
  border-color: hsl(var(--primary) / 45%);
}
</style>
