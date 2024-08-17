<template>
  <div ref="chartRef" style="width: 100%; height: 100%" class="lc-basic-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type PropType } from 'vue'
import * as echarts from 'echarts'
import shanxi from '@/assets/shanxi.json'
import { t } from '@/common/i18n'
import { type ComponentType } from '@/types'
const props = defineProps({
  element: {
    type: Object as PropType<ComponentType>,
    default: () => ({})
  },
  option: Object as PropType<any>,
  type: String
})
const chartRef = ref()
let chart: echarts.ECharts | null = null

function init() {
  chart = echarts.init(chartRef.value)
  echarts.registerMap('shanxi', shanxi)
  // 绘制图表
  const typeMap = {
    '柱状图': "bar",
    "折线图": "line",
    '饼图': 'pie',
    '环图': 'ring',
    '散点图': 'scatter',
    '雷达图': 'radar',
    '地图': 'map',
    '仪表盘': 'gauge',
  }
  let cnType = props.element?.props?.type || props?.type
  let type = cnType && typeMap[cnType] || 'line'
  let option = buildDefaultOption(type)
  chart.setOption({
    title: {
      // text: cnType || t('examples.chartTitle'),
      textStyle: {
        color: "#fff",
        fontSize: 12
      }
    },
    ...option
  })
}

function buildDefaultOption(type = 'line') {
  let option = {}
  switch (type) {
    case 'line':
    case 'bar':
      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: type
          }
        ]
      };
      break;
    case 'pie':
    case 'ring':
      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: "5%",
          left: "center"
        },
        padAngle: type === 'ring' ? 5 : 0,
        itemStyle: {
          borderRadius: type === 'ring' ? 10 : 0
        },
        series: [
          {
            type: 'pie',
            radius: type === 'ring' ? ['40%', '70%'] : '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
          }
        ]
      };
      break;
    case 'scatter':
      option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68]
            ],
            type: 'scatter'
          }
        ]
      };
      break;
    case 'radar':
      option = {
        xAxis: {},
        yAxis: {},
        legend: {
          data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      };
      break;
    case 'gauge':
      option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: 'Pressure',
            type: 'gauge',
            detail: {
              formatter: '{value}'
            },
            data: [
              {
                value: 50,
                name: 'SCORE'
              }
            ]
          }
        ]
      };
      break;
    case 'map':
      option = {
        series: [{
          name: '',
          type: 'map',
          mapType: 'shanxi',
          itemStyle: {
            normal: {
              areaColor: '#006BFF',
              borderColor: '#3B5077',
            },
            emphasis: {
              areaColor: '#2B91B7',
            }
          },
          label: {
            normal: { //静态的时候展示样式
              show: true, //是否显示地图省份得名称
              textStyle: {
                color: "#fff",
                fontSize: 12
              }
            },
            emphasis: { //动态展示的样式
              color: '#fff',
            },
          },
          data: [
          ]
        },]
      }
      break;
    default:
      break;
  }
  return option
}

function resize() {
  chart?.resize()
}

watch(() => [props.element.width, props.element.height], () => {
  chart?.resize()
})
watch(() => props.option, () => {
  // 绘制图表
  chart?.setOption(props.option)
})
onMounted(() => {
  init()
})

defineExpose({
  resize
})

</script>

<style>
.lc-basic-chart {}
</style>
