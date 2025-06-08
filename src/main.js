import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import VueCookies from 'vue-cookies'

import './assets/scss/base.scss'
import '@/assets/icon/iconfont.css'
import Dialog from './components/Dialog.vue'
import Vertify from './utils/Vertify'
import Message from './utils/Message'
import Request from './utils/Request'
import { Api } from './utils/Api'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus, {
  locale: zhCn,
})

app.component('Dialog', Dialog)

app.config.globalProperties.VueCookies = VueCookies
app.config.globalProperties.bodyMaxWidth = 2000
app.config.globalProperties.bodyMinWidth = 1250
app.config.globalProperties.Vertify = Vertify
app.config.globalProperties.Message = Message
app.config.globalProperties.Request = Request
app.config.globalProperties.Api = Api

app.mount('#app')
