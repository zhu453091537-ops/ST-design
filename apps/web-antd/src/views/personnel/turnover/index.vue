<script setup lang="ts">
import type { EChartsOption } from 'echarts';

import type {
  ContractorTurnoverRate,
  PersonnelTurnoverStatCard,
} from './personnel-turnover-source';

import { computed, onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { PlatformEchartsPanel, PlatformStatCard } from '#/components/platform';

import {
  getContractorTurnoverRates,
  getPersonnelTurnoverStats,
} from './personnel-turnover-source';

const loading = ref(false);
const statCards = ref<PersonnelTurnoverStatCard[]>([]);
const turnoverRows = ref<ContractorTurnoverRate[]>([]);

const turnoverChartOption = computed<EChartsOption>(() => {
  const rows = turnoverRows.value;
  const maxRate = Math.max(35, ...rows.map((item) => item.rate + 4));

  return {
    grid: {
      bottom: 12,
      containLabel: true,
      left: 0,
      right: 108,
      top: 10,
    },
    series: [
      {
        backgroundStyle: {
          borderRadius: 6,
          color: '#e6edf5',
        },
        barWidth: 6,
        data: rows.map((item) => ({
          itemStyle: {
            color: item.rate > 0 ? '#ef4444' : '#e6edf5',
          },
          label: {
            color: item.rate > 0 ? '#ef4444' : '#64748b',
            formatter: `${item.rate.toFixed(1)}%   (${item.resigned}/${item.total})`,
            fontSize: 13,
            fontWeight: 700,
            show: true,
          },
          value: item.rate,
        })),
        itemStyle: {
          borderRadius: 6,
        },
        label: {
          position: 'right',
        },
        showBackground: true,
        type: 'bar',
      },
    ],
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
      formatter(params: unknown) {
        const firstParam = Array.isArray(params) ? params[0] : params;
        const dataIndex = (firstParam as { dataIndex?: number }).dataIndex ?? 0;
        const row = rows[dataIndex];

        if (!row) {
          return '';
        }

        return [
          row.contractor,
          `流失率：${row.rate.toFixed(1)}%`,
          `离职人数：${row.resigned}/${row.total}`,
        ].join('<br/>');
      },
      trigger: 'axis',
    },
    xAxis: {
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      max: maxRate,
      splitLine: {
        show: false,
      },
      type: 'value',
    },
    yAxis: {
      axisLabel: {
        color: '#0f172a',
        fontSize: 13,
        fontWeight: 700,
        margin: 18,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: rows.map((item) => item.contractor),
      inverse: true,
      type: 'category',
    },
  };
});

onMounted(loadPersonnelTurnover);

async function loadPersonnelTurnover() {
  loading.value = true;
  try {
    const [cards, contractorRates] = await Promise.all([
      getPersonnelTurnoverStats(),
      getContractorTurnoverRates(),
    ]);

    statCards.value = cards;
    turnoverRows.value = contractorRates;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Page :auto-content-height="true">
    <div class="personnel-turnover-page">
      <header class="personnel-turnover-header">
        <div>
          <h1>变动与流失率统计</h1>
          <p>入职 / 离职 / 调动全流程追踪</p>
        </div>
      </header>

      <section class="personnel-turnover-stat-grid">
        <PlatformStatCard
          v-for="card in statCards"
          :key="card.title"
          :loading="loading"
          v-bind="card"
        />
      </section>

      <PlatformEchartsPanel
        class="personnel-turnover-chart"
        height="430px"
        :option="turnoverChartOption"
        title="各承包商流失率"
      />
    </div>
  </Page>
</template>

<style scoped>
.personnel-turnover-page {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  gap: var(--st-layout-section-gap);
}

.personnel-turnover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.personnel-turnover-header h1 {
  margin: 0;
  color: hsl(var(--foreground));
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
}

.personnel-turnover-header p {
  margin: 4px 0 0;
  color: hsl(var(--muted-foreground));
  font-size: var(--st-font-size-base);
}

.personnel-turnover-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--st-layout-section-gap);
}

.personnel-turnover-chart {
  min-height: 0;
}

@media (max-width: 1200px) {
  .personnel-turnover-stat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .personnel-turnover-stat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
