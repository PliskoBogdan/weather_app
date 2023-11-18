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
.pointer {
  cursor: pointer;
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
