import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
Vue.use(PerfectScrollbar)
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import './assets/css/vue2-perfect-scrollbar-theme.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
