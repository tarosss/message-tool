import './bootstrap';
import { createApp } from "vue/dist/vue.esm-bundler.js";
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue';
import Sample from './Sample.vue'
import Route from './Route.vue'


const app = createApp({
    components:{
        'sample': Sample,
        'route': Route
    }
})
.use(createPinia())
.use(router)
.mount('#app')
