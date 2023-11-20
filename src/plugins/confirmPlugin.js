// confirmPlugin.js
import ConfirmModal from "@/components/ConfirmModal.vue";
import i18n from '@/i18n'
import store from '@/store/index'

const ConfirmPlugin = {};

ConfirmPlugin.install = function (Vue) {
  const ConfirmComponent = Vue.extend({...ConfirmModal, i18n, store});
  const confirmInstance = new ConfirmComponent();

  document.body.appendChild(confirmInstance.$mount().$el);

  Vue.prototype.$confirm = function (message) {
    return new Promise((resolve) => {
      confirmInstance.$on("confirm", (value) => {
        resolve(value);
      });

      confirmInstance.isOpen = true;
      confirmInstance.message = message;
    });
  };
};

export default ConfirmPlugin;
