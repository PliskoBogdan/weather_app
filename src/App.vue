<!-- App.vue -->
<template>
  <div id="app">
    <Header />
    <SidebarMenu />
    <!-- 16 left and right sidebar padding sum -->
    <div v-preloader="isShowPreloader" class="main__wrapper">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
@import "@/assets/styles/general.css";
</style>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import ColorPallete from "@/services/ColorPallete";

import SidebarMenu from "@/components/SidebarMenu.vue";
import Header from "@/components/Header/Header.vue";

export default {
  components: {
    SidebarMenu,
    Header,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  async created() {
    const lang = this.$i18n.locale;

    const processId = `${Math.random()}`;
    this.ADD_LOADING_PROCESS(processId)

    try {
      this.getCurrentAppPallete();
      ColorPallete.setTheme(this.currentPallete);

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const payload = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        lang,
      };
      await this.getUserLocationWeather(payload);
    } catch (e) {
      console.warn("Error getting user location or weather:", e);

      const defaultPosition = {
        latitude: 50.427919,
        longitude: 30.562632,
        lang,
      };
      await this.getUserLocationWeather(defaultPosition);
    } finally {
      this.CANCEL_LOADING_PROCESS(processId)
    }
  },

  computed: {
    ...mapGetters(["currentPallete", "loadingsList"]),

    isShowPreloader() {
      return this.loadingsList.length > 0;
    },
  },

  methods: {
    ...mapActions(["getCurrentAppPallete", "getUserLocationWeather"]),
    ...mapMutations(["ADD_LOADING_PROCESS", "CANCEL_LOADING_PROCESS"])
  },
};
</script>
