<script setup lang="ts">
import { Button } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    scene?: 'default' | 'toolbar' | 'action';
  }>(),
  {
    scene: 'default',
  },
);
</script>

<template>
  <Button
    v-bind="$attrs"
    :class="['platform-button', `platform-button--${scene}`]"
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
  font-weight: 500;
}

.platform-button--toolbar {
  min-width: 76px;
}

.platform-button--action {
  padding-inline: 0;
}
</style>
