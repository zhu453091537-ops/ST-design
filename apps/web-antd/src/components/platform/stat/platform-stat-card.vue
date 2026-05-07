<script setup lang="ts">
import { computed } from 'vue';

import { VbenIcon } from '@vben/icons';

import { Skeleton } from 'antdv-next';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    color?: string;
    description?: string;
    icon?: string;
    loading?: boolean;
    title: string;
    trendText?: string;
    trendType?: 'down' | 'neutral' | 'up';
    type?: 'danger' | 'info' | 'primary' | 'success' | 'warning';
    unit?: string;
    value: number | string;
  }>(),
  {
    type: 'primary',
  },
);

const cardStyle = computed(() =>
  props.color ? { '--platform-stat-color': props.color } : undefined,
);
const trendIcon = computed(() => {
  if (props.trendType === 'up') {
    return '↑';
  }
  if (props.trendType === 'down') {
    return '↓';
  }
  return '';
});
</script>

<template>
  <article
    v-bind="$attrs"
    :class="['platform-stat-card', `platform-stat-card--${type}`]"
    :style="cardStyle"
  >
    <Skeleton v-if="loading" active :paragraph="{ rows: 2 }" />
    <template v-else>
      <div class="platform-stat-card__header">
        <span class="platform-stat-card__title">{{ title }}</span>
        <span v-if="icon" class="platform-stat-card__icon">
          <VbenIcon :icon="icon" />
        </span>
      </div>
      <div class="platform-stat-card__value">
        <strong>{{ value }}</strong>
        <span v-if="unit">{{ unit }}</span>
      </div>
      <p
        v-if="trendText"
        :class="[
          'platform-stat-card__trend',
          `platform-stat-card__trend--${trendType || 'neutral'}`,
        ]"
      >
        <span v-if="trendIcon">{{ trendIcon }}</span>
        {{ trendText }}
      </p>
      <p v-else-if="description" class="platform-stat-card__description">
        {{ description }}
      </p>
    </template>
  </article>
</template>

<style scoped>
.platform-stat-card {
  --platform-stat-color: hsl(var(--primary));

  position: relative;
  min-height: 118px;
  padding: 18px 20px;
  overflow: hidden;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--st-radius-card);
  box-shadow: var(--st-shadow-card);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.platform-stat-card::before {
  position: absolute;
  inset: 0 0 auto;
  height: 3px;
  content: '';
  background: var(--platform-stat-color);
}

.platform-stat-card:hover {
  border-color: color-mix(in srgb, var(--platform-stat-color) 42%, transparent);
  box-shadow:
    var(--st-shadow-card),
    0 10px 22px hsl(var(--foreground) / 8%);
  transform: translateY(-4px);
}

.platform-stat-card--success {
  --platform-stat-color: hsl(var(--success));
}

.platform-stat-card--warning {
  --platform-stat-color: hsl(var(--warning));
}

.platform-stat-card--danger {
  --platform-stat-color: hsl(var(--destructive));
}

.platform-stat-card--info {
  --platform-stat-color: hsl(211 90% 56%);
}

.platform-stat-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.platform-stat-card__title,
.platform-stat-card__description {
  color: hsl(var(--muted-foreground));
}

.platform-stat-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--platform-stat-color);
  background: color-mix(in srgb, var(--platform-stat-color) 12%, transparent);
  border-radius: var(--st-radius-control);
}

.platform-stat-card__value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;
}

.platform-stat-card__value strong {
  font-size: 26px;
  line-height: 32px;
  color: var(--platform-stat-color);
}

.platform-stat-card__value span {
  font-size: 14px;
  color: hsl(var(--muted-foreground));
}

.platform-stat-card__trend,
.platform-stat-card__description {
  margin: 0;
  font-size: 13px;
}

.platform-stat-card__trend--up {
  color: hsl(var(--success));
}

.platform-stat-card__trend--down {
  color: hsl(var(--destructive));
}

.platform-stat-card__trend--neutral {
  color: hsl(var(--muted-foreground));
}
</style>
