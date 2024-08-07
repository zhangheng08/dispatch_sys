import './assets/main.css'

import { createApp } from 'vue'
import {createPinia} from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/nav'
import { zhCn } from 'element-plus/es/locales.mjs'
import BaiduMap from 'vue-baidu-map-3x'
import * as echarts from 'echarts';

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(ElementPlus, {locale: zhCn})
app.use(BaiduMap, {
    ak: 'ipX8kAd7S5aMs5wSW96rscF7zBpkQODp'
  });
app.use(router)
app.mount('#app')