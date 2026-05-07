<script setup lang="ts">
import { Button } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    scene?: 'action' | 'collapse' | 'default' | 'toolbar';
  }>(),
  {
    scene: 'default',
  },
);
</script>

<template>
  <Button
    v-bind="$attrs"
    class="platform-button"
    :class="`platform-button--${scene}`"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Button>
</template>

<style scoped>
.platform-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--st-control-height);
  font-size: var(--st-font-size-base);
  font-weight: 500;
  line-height: var(--st-line-height-base);
  border-radius: var(--st-radius-control);
}

.platform-button--toolbar {
  min-width: calc(var(--st-control-height) * 2.1);
}

.platform-button--toolbar:not(.ant-btn-circle):not(.ant-btn-primary):not(
    .ant-btn-dangerous
  ) {
  color: hsl(var(--primary));
  background: hsl(var(--st-color-fill-selected));
  border-color: hsl(var(--st-color-brand-outline));
}

.platform-button--toolbar:not(.ant-btn-circle):not(.ant-btn-primary):not(
    .ant-btn-dangerous
  ):not(:disabled):not(.ant-btn-disabled):hover,
.platform-button--toolbar:not(.ant-btn-circle):not(.ant-btn-primary):not(
    .ant-btn-dangerous
  ):not(:disabled):not(.ant-btn-disabled):focus-visible {
  color: hsl(var(--primary));
  background: hsl(var(--primary) / 14%);
  border-color: hsl(var(--primary) / 45%);
}

.platform-button--toolbar.ant-btn-circle {
  min-width: var(--st-control-height);
  color: hsl(var(--st-color-table-tool-icon));
  background: hsl(var(--background));
  border-color: hsl(0 0% 0% / 0);
}

.platform-button--toolbar.ant-btn-circle:not(:disabled):not(
    .ant-btn-disabled
  ):hover,
.platform-button--toolbar.ant-btn-circle:not(:disabled):not(
    .ant-btn-disabled
  ):focus-visible {
  color: hsl(var(--st-color-table-tool-hover-icon));
  background: hsl(var(--st-color-table-tool-hover-bg));
  border-color: hsl(var(--st-color-table-tool-hover-border));
}

.platform-button--collapse {
  min-width: calc(var(--st-control-height) * 2.1);
  color: hsl(var(--primary));
  background: transparent;
  border-color: transparent;
}

.platform-button--collapse:not(:disabled):not(.ant-btn-disabled):hover,
.platform-button--collapse:not(:disabled):not(.ant-btn-disabled):focus-visible {
  color: hsl(var(--primary));
  background: hsl(var(--st-color-fill-selected));
  border-color: transparent;
}

.platform-button--action {
  padding-inline: 0;
  text-decoration: none;
  text-underline-offset: 3px;
}

.platform-button--action:not(:disabled):not(.ant-btn-disabled):hover,
.platform-button--action:not(:disabled):not(.ant-btn-disabled):focus-visible {
  text-decoration: underline;
  background: transparent;
}

.platform-button--action.ant-btn-dangerous,
.platform-button--action.ant-btn-dangerous:not(:disabled):not(
    .ant-btn-disabled
  ):hover,
.platform-button--action.ant-btn-dangerous:not(:disabled):not(
    .ant-btn-disabled
  ):focus-visible {
  color: hsl(var(--st-color-danger)) !important;
}
</style>
