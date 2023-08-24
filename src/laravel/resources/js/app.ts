import './bootstrap'
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createPinia } from 'pinia'
import { Quasar, Dialog, Notify } from 'quasar'
import quasarLang from 'quasar/lang/ja'
import '@mdi/font/css/materialdesignicons.css'
import 'reset-css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
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
.use(Quasar, {
  plugins: [Dialog, Notify],
  lang: quasarLang,
})
.use(router)
.mount('#app')
