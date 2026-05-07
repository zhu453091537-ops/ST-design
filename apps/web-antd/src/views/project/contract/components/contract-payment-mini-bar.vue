<script setup lang="ts">
import type { EchartsUIType } from '@vben/plugins/echarts';

import type { ContractPaymentNode } from '../project-contract-source';

import { onMounted, ref, watch } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { paymentNodeStatusMap } from '../project-contract-source';

const props = defineProps<{
  nodes: ContractPaymentNode[];
}>();

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderChart();
});

watch(
  () => props.nodes,
  () => {
    renderChart();
  },
  { deep: true },
);

function formatAmount(value: number) {
  return `${value.toLocaleString()}万`;
}

function getSegmentBorderRadius(index: number) {
  if (index === 0) {
    return [8, 0, 0, 8];
  }
  if (index === props.nodes.length - 1) {
    return [0, 8, 8, 0];
  }
  return 0;
}

function renderChart() {
  renderEcharts({
    animationDuration: 400,
    grid: {
      bottom: 6,
      left: 0,
      right: 0,
      top: 6,
    },
    series: props.nodes.map((node, index) => ({
      barWidth: 16,
      data: [
        {
          amount: node.amount,
          nodeLabel: node.label,
          nodeStatus: paymentNodeStatusMap[node.status].label,
          percent: node.percent,
          value: node.percent,
        },
      ],
      emphasis: {
        focus: 'series' as const,
      },
      itemStyle: {
        borderRadius: getSegmentBorderRadius(index),
        color: paymentNodeStatusMap[node.status].color,
      },
      name: node.label,
      stack: 'payment',
      type: 'bar',
    })),
    tooltip: {
      borderColor: '#dbe3ea',
      formatter(params: unknown) {
        const data = (params as { data?: Record<string, unknown> }).data;
        const label = data?.nodeLabel || '';
        const percent = data?.percent || '';
        const status = data?.nodeStatus || '';
        const amount =
          typeof data?.amount === 'number' ? formatAmount(data.amount) : '';

        return `${label}（${percent}%）<br/>${status}：${amount}`;
      },
      trigger: 'item',
    },
    xAxis: {
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      max: 100,
      min: 0,
      splitLine: { show: false },
      type: 'value',
    },
    yAxis: {
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      data: ['付款节点'],
      splitLine: { show: false },
      type: 'category',
    },
  });
}
</script>

<template>
  <div class="contract-payment-mini-bar">
    <EchartsUI ref="chartRef" height="34px" width="100%" />

    <ul class="contract-payment-mini-bar__nodes">
      <li v-for="node in nodes" :key="node.label">
        <span
          class="contract-payment-mini-bar__dot"
          :style="{ backgroundColor: paymentNodeStatusMap[node.status].color }"
        ></span>
        <strong>{{ node.label }} {{ node.percent }}%</strong>
        <span>{{ paymentNodeStatusMap[node.status].label }}</span>
        <em>{{ formatAmount(node.amount) }}</em>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.contract-payment-mini-bar {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.contract-payment-mini-bar__nodes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.contract-payment-mini-bar__nodes li {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr);
  gap: 4px 8px;
  min-width: 0;
  align-items: center;
}

.contract-payment-mini-bar__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.contract-payment-mini-bar__nodes strong,
.contract-payment-mini-bar__nodes span,
.contract-payment-mini-bar__nodes em {
  grid-column: 2;
  min-width: 0;
}

.contract-payment-mini-bar__nodes strong {
  overflow-wrap: anywhere;
  color: hsl(var(--foreground));
  font-weight: 700;
}

.contract-payment-mini-bar__nodes span {
  color: hsl(var(--muted-foreground));
}

.contract-payment-mini-bar__nodes em {
  color: hsl(var(--foreground));
  font-style: normal;
  font-weight: 700;
}

@media (max-width: 720px) {
  .contract-payment-mini-bar__nodes {
    grid-template-columns: 1fr;
  }
}
</style>
