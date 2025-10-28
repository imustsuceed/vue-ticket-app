// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Create Vue app instance
const app = createApp(App)

// Register Pinia first
app.use(createPinia())

// Register Router next
app.use(router)

// Register Toast plugin
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  pauseOnHover: true,
  draggable: true,
})

// Mount the app
app.mount('#app')
