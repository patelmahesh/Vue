import Vue from 'vue'

import { store } from './store'
import router from './router'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate';

import App from './App.vue'

import { setupComponents } from './config/setup-components'

import 'vuetify/dist/vuetify.min.css'



Vue.config.productionTip = false

setupComponents(Vue);

Vue.use(Vuetify, { rtl: true, iconfont: 'md', });
Vue.use(VeeValidate);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
