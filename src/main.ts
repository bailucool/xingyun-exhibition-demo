import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误:', err, info)
  // 这里可以集成Sentry等错误监控服务
}

// 全局警告处理
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('全局警告:', msg, trace)
}
