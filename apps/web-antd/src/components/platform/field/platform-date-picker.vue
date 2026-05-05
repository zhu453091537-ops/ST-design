<script setup lang="ts">
import { DatePicker } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <DatePicker v-bind="$attrs" class="platform-date-picker">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </DatePicker>
</template>

<style scoped>
.platform-date-picker {
  width: 100%;
}
</style>
