import './bootstrap';
import { createApp } from "vue/dist/vue.esm-bundler.js";;
import App from './App.vue';
import Sample from './Sample.vue'
import {useStores} from './store/vuex'

const app = createApp({
    components:{
        'sample': Sample
    }
}).use(useStores).mount('#app')
