<template>
  <div class="dashboard-container">
    <div class="chart-wrapper full-width">
      <v-chart class="chart" :option="barOption" autoresize />
    </div>
    <div class="chart-row">
      <div class="chart-wrapper half-width">
        <v-chart class="chart" :option="pieOption" autoresize />
      </div>
      <div class="chart-wrapper half-width">
        <v-chart class="chart" :option="lineOption" autoresize />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart, LineChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { ref } from 'vue'



use([CanvasRenderer, BarChart, PieChart, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const barOption = ref({
  title: {
    text: 'Sales Statistics',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
})

const pieOption = ref({
  title: {
    text: 'Traffic Sources',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

const lineOption = ref({
  title: {
    text: 'User Growth',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
})
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Or 100vh if specific layout requires */
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
}

.chart-wrapper {
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.full-width {
  flex: 1;
  min-height: 300px;
}

.chart-row {
  display: flex;
  flex: 1;
  gap: 20px;
  min-height: 300px;
}

.half-width {
  flex: 1;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>
