<!-- App.vue -->
<template>
  <div id="app">
    <Header />
    <SidebarMenu/>
    <!-- 16 left and right sidebar padding sum -->
    <div>
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

body {
  margin: 0;
}

</style>

<script>
import SidebarMenu from './components/SidebarMenu.vue';
import Header from './components/Header.vue';

export default {
  components: {
    SidebarMenu,
    Header
  },
};
</script>