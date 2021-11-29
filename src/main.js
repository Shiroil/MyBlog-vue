import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import VueParticles from 'vue-particles'
import 'mavon-editor/dist/css/index.css'



import 'element-ui/lib/theme-chalk/index.css'
import 'mavon-editor/dist/css/index.css'
import './permission'
Vue.use(mavonEditor)
Vue.use(Element)
Vue.use(VueParticles)
import './axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
