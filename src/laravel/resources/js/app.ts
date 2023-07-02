import './bootstrap'
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createPinia } from 'pinia'
import router from './router'
import Message from './Message.vue'
import Route from './Route.vue'

const app = createApp({
    components: {
        message: Message,
        route: Route,
    },
})
    .use(createPinia())
    .use(router)
    .mount('#app')
