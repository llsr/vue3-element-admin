import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element plus
import installElementPlus from '@/plugins/element'
// 初始化css 重置css默认样式
import 'normalize.css/normalize.css'
// 全局 css
import '@/styles/index.scss'

createApp(App)
  .use(store)
  .use(router)
  .use(installElementPlus)
  .mount('#app')
