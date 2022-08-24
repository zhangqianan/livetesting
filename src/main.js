import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import 'amfe-flexible'
// import store from "./store"
import Vconsole from 'vconsole'

const vConsole = new Vconsole()



createApp(App).use(router).use(store).mount('#app')

// const app = createApp(App);
// app.config.globalProperties.$name = '';
// app.config.globalProperties.$idcard = '';
// app.use(router)
//   .mount('#app')
