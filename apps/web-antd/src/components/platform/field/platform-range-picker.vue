<script setup lang="ts">
import { DatePicker } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

const RangePicker = DatePicker.RangePicker;
</script>

<template>
  <RangePicker v-bind="$attrs" class="platform-range-picker">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </RangePicker>
</template>

<style scoped>
.platform-range-picker {
  width: 100%;
}
</style>
