import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'

// Components
import Icon from 'vue-awesome/components/Icon'

Vue.component('s-icon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
