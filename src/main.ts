import { createApp } from 'vue'
import './assets/index.less'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import Message, { MessageTypeOptions } from 'vue-m-message'
import 'vue-m-message/dist/style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify()

createApp(App)
  .use(Message, {
    name: 'msg',
    defaultOptions: <MessageTypeOptions>{
      supportHTML: true,
      zIndex: 3000
    }
  })
  .use(vuetify)
  .use(i18n)
  .use(router)
  .mount('#app')

