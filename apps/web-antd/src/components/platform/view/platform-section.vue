<script setup lang="ts">
withDefaults(
  defineProps<{
    description?: string;
    title?: string;
  }>(),
  {
    description: '',
    title: '',
  },
);
</script>

<template>
  <section class="platform-section platform-surface">
    <header
      v-if="title || description || $slots.extra"
      class="platform-section__header"
    >
      <div class="platform-section__meta">
        <h2 v-if="title" class="platform-section__title">{{ title }}</h2>
        <p v-if="description" class="platform-section__description">
          {{ description }}
        </p>
      </div>
      <slot name="extra"></slot>
    </header>
    <slot></slot>
  </section>
</template>

<style scoped>
.platform-section {
  min-width: 0;
}

.platform-section__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.platform-section__meta {
  min-width: 0;
}

.platform-section__title {
  margin: 0;
  color: hsl(var(--foreground));
  font-size: var(--st-font-size-title);
  font-weight: 700;
  line-height: var(--st-line-height-lg);
}

.platform-section__description {
  margin: 4px 0 0;
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-sm);
}
</style>
