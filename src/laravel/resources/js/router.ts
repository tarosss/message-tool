import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import SampleVue from './Sample.vue';
import App2 from './App2.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: SampleVue },
  { path: '/about', component: App2 },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router
