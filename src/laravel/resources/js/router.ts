import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Route from './Route.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Route,
  },
  {
    path: '/about',
    component: Route,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router
