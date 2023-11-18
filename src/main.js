import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'

// Components
import Icon from 'vue-awesome/components/Icon'
import Preloader from '@/components/Preloader.vue'

Vue.component('s-icon', Icon)

// Event Bus
export const EventBus = new Vue();

// Directives
Vue.directive('preloader', {
  bind(el, binding) {
    const preloader = new Vue({
      render: (h) => h(Preloader, { props: { loading: binding.value } }),
    }).$mount();

    el.appendChild(preloader.$el);
  },
  update(el, binding) {
    const preloader = el.querySelector('#preloader');
    if (preloader) {
      preloader.loading = binding.value;
    }
  },
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
