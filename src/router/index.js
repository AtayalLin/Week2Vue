import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(), // ✅ 改成 hash 模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/review',
      component: () => import('../views/ReviewView.vue'),
    },
    {
      path: '/todo',
      component: () => import('../views/TodoView.vue'),
    },
  ],
})

export default router
