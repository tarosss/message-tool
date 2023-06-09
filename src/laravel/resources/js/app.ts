import './bootstrap';
import { createApp } from 'vue';
import App from './App.vue';
import {useStores} from './store/vuex'

createApp(App).use(useStores).mount('#app')