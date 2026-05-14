<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue';

import { Drawer } from 'antdv-next';

import PlatformOverlayTitlebar from '../modal/platform-overlay-titlebar.vue';

defineOptions({
  inheritAttrs: false,
});
const attrs = useAttrs();
const slots = useSlots();
const open = defineModel<boolean>('open', {
  default: false,
});

const drawerTitle = computed(() => {
  if (typeof attrs.title === 'string' || typeof attrs.title === 'number') {
    return String(attrs.title);
  }
  return '';
});

const showTitleHeader = computed(() => {
  return !!drawerTitle.value || !!slots.title;
});

const forwardedSlotNames = computed(() => {
  return Object.keys(slots).filter(
    (name) => !['default', 'title', 'title-extra'].includes(name),
  );
});

function mergeClassNames(...values: unknown[]) {
  return values
    .filter((value) => typeof value === 'string' && value.trim())
    .join(' ');
}

function normalizeStyle(value: unknown) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return { ...value };
  }
  return {};
}

function normalizeSemanticStyles(value: unknown) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return { ...(value as Record<string, unknown>) };
  }
  return {};
}

const drawerAttrs = computed(() => {
  const {
    class: drawerClass,
    closable: _closable,
    styles,
    title: _title,
    ...rest
  } = attrs;

  const mergedSemanticStyles = normalizeSemanticStyles(styles);

  mergedSemanticStyles.header = {
    ...normalizeStyle(mergedSemanticStyles.header),
    padding: '0',
    borderBottom: 'none',
    boxShadow: 'none',
  };

  mergedSemanticStyles.body = {
    ...normalizeStyle(mergedSemanticStyles.body),
    padding: '24px 40px 24px 40px',
  };

  return {
    ...rest,
    class: mergeClassNames('platform-drawer', drawerClass),
    closable: false,
    styles: mergedSemanticStyles,
  };
});

function callAttrHandler(name: string, event: MouseEvent) {
  const handler = attrs[name];

  if (Array.isArray(handler)) {
    for (const item of handler) {
      if (typeof item === 'function') {
        item(event);
      }
    }
    return;
  }

  if (typeof handler === 'function') {
    handler(event);
  }
}

function handleCancel(event: MouseEvent) {
  open.value = false;
  callAttrHandler('onClose', event);
}
</script>

<template>
  <Drawer v-model:open="open" v-bind="drawerAttrs">
    <template v-if="showTitleHeader" #title>
      <PlatformOverlayTitlebar
        close-icon-class="icon-danchuangguanli"
        :title="drawerTitle"
        @cancel="handleCancel"
      >
        <template #title>
          <slot name="title">
            {{ drawerTitle }}
          </slot>
        </template>
        <template #title-extra>
          <slot name="title-extra"></slot>
        </template>
      </PlatformOverlayTitlebar>
    </template>

    <slot></slot>

    <template v-for="name in forwardedSlotNames" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </Drawer>
</template>

<style scoped>
.platform-drawer {
  --platform-overlay-titlebar-height: 48px;
  --platform-overlay-titlebar-line-inset-inline: 0px;
  --platform-overlay-titlebar-title-offset-top: 8px;
  --platform-overlay-titlebar-title-inset-inline-start: 0px;
  --platform-overlay-titlebar-title-inset-inline-end: 88px;
  --platform-overlay-titlebar-actions-offset-top: 0px;
  --platform-overlay-titlebar-actions-offset-inline-end: 0px;
}
</style>

<style>
.platform-drawer .ant-drawer-header {
  padding: 0 !important;
  border-bottom: none !important;
  box-shadow: none !important;
}

.platform-drawer .ant-drawer-title {
  display: block;
  width: 100%;
}

.platform-drawer .ant-drawer-content {
  border-radius: var(--st-radius-card) 0 0 var(--st-radius-card);
}

.platform-drawer .ant-drawer-body {
  padding: 24px 40px 24px 40px !important;
}
</style>
