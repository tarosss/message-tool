import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Message from './Message.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Message },
  { path: '/about', component: Message },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router
