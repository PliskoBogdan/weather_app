<!-- App.vue -->
<template>
  <div id="app">
    <Header />
    <SidebarMenu />
    <!-- 16 left and right sidebar padding sum -->
    <div>
      <router-view />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
}

#preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

#preloader img {
  width: 50px;
  height: 50px;
}
</style>

<script>
import { mapActions, mapGetters } from "vuex";

import ColorPallete from "@/services/ColorPallete";

import SidebarMenu from "./components/SidebarMenu.vue";
import Header from "./components/Header.vue";

export default {
  components: {
    SidebarMenu,
    Header,
  },

  created() {
    this.getCurrentAppPallete();
    ColorPallete.setTheme(this.currentPallete);
  },

  computed: {
    ...mapGetters(["currentPallete"]),
  },

  methods: {
    ...mapActions(["getCurrentAppPallete"]),
  },
};
</script>
