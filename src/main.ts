import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import {createPinia} from 'pinia'
import element from '@/plugins/element'
import i18n from '@/common/i18n'
import '@/utils/echarts'
import 'es-drager/lib/style.css'
import '@/assets/css/index.scss'
import lcComponents from '@/components'
const app = createApp(App)
app
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(element)
  .use(lcComponents)
  .mount('#app')
