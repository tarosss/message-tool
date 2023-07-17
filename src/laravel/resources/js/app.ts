import './bootstrap'
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createPinia } from 'pinia'
import router from './router'
import Route from './Route.vue'

const app = createApp({
  components: {
    route: Route,
  },
})
  .use(createPinia())
  .use(router)
  .mount('#app')
