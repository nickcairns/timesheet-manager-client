import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)

// Create a new instance of Pinia and register it with the app
const pinia = createPinia()
app.use(pinia)

// Mount the app to the DOM with the router
app.use(router)
app.mount('#app')
