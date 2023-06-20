import { createRouter, createWebHistory } from 'vue-router'
import MainPagePI from '@/app/pages/main-page-pi.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main',
      name: 'main',
      component: MainPagePI
    }
  ]
})

export default router
