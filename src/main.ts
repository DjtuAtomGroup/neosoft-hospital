import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from './router/index'
import './style.css'
import './assets/css/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'

// 引入mock数据
import './mock'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')
