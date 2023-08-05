import '@mdi/font/css/materialdesignicons.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import VueKonva from 'vue-konva'
import { PoeTradeTheme } from './blueprints/PoeTradeTheme'
import router from './router'
import App from './App.vue'

const vuetify = createVuetify({
  blueprint: PoeTradeTheme,
  components,
  directives,
})
const app = createApp(App)
app.use(createPinia())
app.use(vuetify)
app.use(router)
app.use(VueKonva, { prefix: 'k' })
app.config.globalProperties.axios = axios

app.mount('#app')
