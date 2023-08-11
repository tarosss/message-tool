import './bootstrap'
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'reset-css';
// import { createVuetify } from 'vuetify';
// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
// import 'vuetify/styles'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
import router from './router'
import Route from './Route.vue'

// const vuetify = createVuetify({
//   icons: {
//     defaultSet: 'mdi',
//     aliases,
//     sets: {
//       mdi,
//     },
//   },
//   components,
//   directives,
// })

const app = createApp({
  components: {
    route: Route,
  },
})
.use(createPinia())
.use(router)
.mount('#app')
