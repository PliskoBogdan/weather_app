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
  --sidebar-bg-color: #333333;
  --sidebar-item-hover: #f1f1f1;
  --sidebar-item-active: #2c3e50;
  --white: #ffffff;
  --header-bg: #333333;
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