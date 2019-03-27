import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import axios from 'axios'
Vue.use(PerfectScrollbar)
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import './assets/css/vue2-perfect-scrollbar-theme.css'
import jwtDecode from 'jwt-decode'
import lodash from 'lodash'


Vue.prototype.$axios = axios
Vue.prototype.$jwtDecode= jwtDecode
Vue.prototype.$lodash = lodash

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
