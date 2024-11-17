import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import axios from '@/plugins/axios'
import { AxiosKey } from '@/types/symbols'
import AnimateOnScroll from 'primevue/animateonscroll';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.provide(AxiosKey, axios)
app.directive('animateonscroll', AnimateOnScroll);

app.mount('#app')
