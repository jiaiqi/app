import { createRouter, createWebHistory,createWebHashHistory} from 'vue-router'
import Editor from '@/views/editor/index.vue'
console.log('import.meta.env.BASE_URL:',import.meta.env.BASE_URL)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    }
  ]
})

export default router
