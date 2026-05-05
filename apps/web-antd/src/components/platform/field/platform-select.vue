<script setup lang="ts">
import { Select } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <Select v-bind="$attrs" class="platform-select">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Select>
</template>

<style scoped>
.platform-select {
  width: 100%;
}
</style>
