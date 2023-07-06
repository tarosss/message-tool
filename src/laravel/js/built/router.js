import { createRouter, createWebHistory } from 'vue-router'
import Message from './Message.vue'
const routes = [
  { path: '/', component: Message },
  { path: '/about', component: Message },
]
const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})
export default router
//# sourceMappingURL=router.js.map
