import "vue-awesome/icons/flag";
import "vue-awesome/icons";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

import setGlobalComponents from "@/utils/setGlobalComponents.js";
import setCustomFilters from "@/filters/index";
import setCustomDirectives from "@/directives/index";
import ConfirmPlugin from "@/plugins/confirmPlugin";

setGlobalComponents(Vue)
setCustomDirectives(Vue);
setCustomFilters(Vue);

// Plugins
Vue.use(ConfirmPlugin);

// Event Bus
export const EventBus = new Vue();

Vue.config.productionTip = false;
new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
