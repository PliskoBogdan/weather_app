<!-- App.vue -->
<template>
  <div id="app">
    <Header />
    <SidebarMenu />
    <!-- 16 left and right sidebar padding sum -->
    <div v-preloader="isLoading" class="main__wrapper">
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
import { mapActions, mapGetters } from "vuex";

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

    this.isLoading = true;
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
      this.isLoading = false;
    }
  },

  computed: {
    ...mapGetters(["currentPallete"]),
  },

  methods: {
    ...mapActions(["getCurrentAppPallete", "getUserLocationWeather"]),
  },
};
</script>
