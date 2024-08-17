import type { ComponentType, IconType } from '../types'
function createEditorConfig() {
  const componentList: ComponentType[] = []
  const iconList: IconType[] = []
  const componentMap = {}
  return {
    componentList,
    iconList,
    componentMap,
    registerCommon(component: ComponentType) {
      componentList.push(component)
    },
    registerIcon(icon: IconType) {
      iconList.push(icon)
    }
  }
}

export const registerConfig = createEditorConfig()

registerConfig.registerCommon({
  component: 'span',
  text: '文本'
})
registerConfig.registerCommon({
  component: 'el-button',
  text: '按钮'
})
// registerConfig.registerCommon({
//   component: 'div',
//   text: '矩形',
//   style: { border: '1px solid var(--el-text-color-primary)' }
// })
// registerConfig.registerCommon({
//   component: 'div',
//   text: '圆形',
//   width: 100,
//   height: 100,
//   style: { border: '1px solid var(--el-text-color-primary)', borderRadius: '50%' }
// })

const charts = ['柱状图', '折线图', '饼图', '环图', '散点图', '雷达图','仪表盘','地图']
charts.forEach(name => {
  registerConfig.registerCommon({
    component: 'lc-chart',
    text: name,
    width: 300,
    height: 200,
    props: { type: name }
  })
})
// registerConfig.registerCommon({
//   component: 'lc-chart',
//   text: '图表'
// })

// 注册icons
// const icons = ['Plus', 'Minus', 'CirclePlus', 'Search', 'Female', 'Male']
// icons.forEach(icon => {
//   registerConfig.registerIcon({
//     component: 'lc-icon',
//     props: { icon }
//   })
// })
