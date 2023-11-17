<!-- App.vue -->
<template>
  <div id="app">
    <Header />
    <transition name="slide">
      <SidebarMenu v-show="isCollapsed"/>
    </transition>
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

body {
  margin: 0;
}

.slide-enter {
  transform: translateX(-300px);
}

.slide-enter-active {
  transition: all .3s ease-in;
}

.slide-leave-active {
  transition: all .3s ease-in;
}
.slide-leave-to {
  transform: translateX(-300px);
}


.slide-two-enter {
  transform: translateX(-300px);
}

.slide-two-enter-active {
  transition: all .3s ease-in;
}

.slide-two-leave-active {
  transition: all .3s ease-in;
}
.slide-two-leave-to {
  transform: translateX(-300px);
}
</style>

<script>
import SidebarMenu from './components/SidebarMenu.vue';
import Header from './components/Header.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    SidebarMenu,
    Header
  },

  computed: {
    ...mapGetters(["sidebarWidth", "isCollapsed"]),

    leftMarginForSidebar() {
      if (!this.isCollapsed) {
        return `0px`
      }

      return `${this.sidebarWidth + 16}px`;
    }
  }
};
</script>