import Preloader from '@/components/Preloader.vue'

export default function setCustomDirectives(Vue) {
  Vue.directive("preloader", {
    bind(el, binding) {
      const preloader = new Vue({
        render: (h) => h(Preloader, { props: { loading: binding.value } }),
      }).$mount();

      el.appendChild(preloader.$el);
    },
    update(el, binding) {
      const preloader = el.querySelector("#preloader");
      if (!preloader) {
        return;
      }
      if (binding.value) {
        preloader.classList.remove("d-none");
      } else {
        preloader.classList.add("d-none");
      }
    },
  });
}
