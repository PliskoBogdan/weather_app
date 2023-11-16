<!-- App.vue -->
<template>
  <div id="app">
    <SidebarMenu />
    <!-- 16 left and right sidebar padding sum -->
    <div :style="{ 'margin-left': leftMarginForSidebar }">
      <router-view />
    </div>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2f855f;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<script>
import SidebarMenu from './components/SidebarMenu.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    SidebarMenu,
  },

  created() {
    console.log(this.leftMarginForSidebar);
  },

  computed: {
    ...mapGetters(["sidebarWidth"]),

    leftMarginForSidebar() {
      return `${this.sidebarWidth + 16}px`;
    }
  }
};
</script>