<script setup lang="ts">
import { Page } from '@vben/common-ui';

import ditieIcon from '#/assets/images/ditie.png';
import { PlatformPageBreadcrumb, PlatformSectionTitle } from '#/components/platform';

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

      <section class="platform-surface personnel-detail-page__content">
        <PlatformSectionTitle
          divider
          image-alt="基本信息"
          :icon-gap="4"
          :icon-height="16"
          :icon-src="ditieIcon"
          :icon-width="28"
          padding="0 0 14px"
          title="基本信息"
          :title-size="16"
          :title-weight="600"
        />
      </section>
    </div>
  </Page>
</template>

<style scoped>
.personnel-detail-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
}

.personnel-detail-page__content {
  flex: 1;
  min-height: 360px;
}
</style>
