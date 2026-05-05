<script setup lang="ts">
import { Form } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    variant?: 'edit' | 'search';
  }>(),
  {
    variant: 'edit',
  },
);
</script>

<template>
  <Form v-bind="$attrs" :class="['platform-form', `platform-form--${variant}`]">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Form>
</template>

<style scoped>
.platform-form {
  width: 100%;
}

.platform-form--search {
  display: grid;
  gap: 16px 24px;
}

.platform-form--edit :deep(.ant-form-item) {
  margin-bottom: 18px;
}
</style>
