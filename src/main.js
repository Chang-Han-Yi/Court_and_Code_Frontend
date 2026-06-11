import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 引入 Bootstrap 樣式與全域 SCSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@/assets/front/css/main.css'

import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
