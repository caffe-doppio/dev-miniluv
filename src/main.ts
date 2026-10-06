import { createApp } from 'vue'
import App from './App.vue'
import { say } from './api'
import './style.css'

say('Portal awake. Citizen observed.')
say('Your session is for your protection.')

createApp(App).mount('#app')
