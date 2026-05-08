<script setup lang="ts">
withDefaults(
  defineProps<{
    description?: string;
    title: string;
  }>(),
  {
    description: '',
  },
);
</script>

<template>
  <header class="platform-section-title">
    <div class="platform-section-title__meta">
      <h2 class="platform-section-title__text">{{ title }}</h2>
      <p v-if="description" class="platform-section-title__description">
        {{ description }}
      </p>
    </div>
    <div v-if="$slots.extra" class="platform-section-title__extra">
      <slot name="extra"></slot>
    </div>
  </header>
</template>

<style scoped>
.platform-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
}

.platform-section-title__meta {
  min-width: 0;
}

.platform-section-title__text {
  margin: 0;
  color: hsl(var(--foreground));
  font-size: var(--st-font-size-title);
  font-weight: 700;
  line-height: var(--st-line-height-lg);
}

.platform-section-title__description {
  margin: 4px 0 0;
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-sm);
  line-height: 20px;
}

.platform-section-title__extra {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-sm);
  line-height: 22px;
}

@media (max-width: 640px) {
  .platform-section-title {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
