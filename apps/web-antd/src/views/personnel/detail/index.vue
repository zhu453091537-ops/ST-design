<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { PlatformPageBreadcrumb } from '#/components/platform';

const breadcrumbItems = [
  {
    icon: 'icon-renyuanzonglan',
    path: '/personnel/overview',
    title: '人员总览',
  },
  {
    title: '人员详情',
  },
];
</script>

<template>
  <Page :auto-content-height="true">
    <div class="personnel-detail-page">
      <PlatformPageBreadcrumb :items="breadcrumbItems" />

      <section class="platform-surface personnel-detail-page__content"></section>
    </div>
  </Page>
</template>

<style scoped>
.personnel-detail-page {
  display: flex;
  flex-direction: column;
  gap: var(--st-layout-section-gap);
  min-height: 100%;
}

.personnel-detail-page__content {
  flex: 1;
  min-height: 360px;
}
</style>
