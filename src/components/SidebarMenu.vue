<template>
  <div>
    <div
      class="left-drawer"

      :class="{'left-drawer-width': isCollapsed}"
    >
      <div style="text-align: right; margin: 5px">
        <button class="close" @click="isCollapsed = false">&#9587;</button>
      </div>
      <SidebarLink
        v-for="{ id, to, icon, name } in linksList"
        :key="id"
        :to="to"
        :icon="icon"
      >
        <div>{{ name }}</div>
      </SidebarLink>
    </div>
    <div
      class="drawer-mask"
      :style="{
        width: isCollapsed ? '100vw' : '0',
        opacity: isCollapsed ? '0.6' : '0',
      }"
      @click="isCollapsed = false"
    ></div>
  </div>
</template>

<script>
import SidebarLink from "@/components/SidebarLink.vue";

import { EventBus } from "@/main";

export default {
  components: {
    SidebarLink,
  },

  data() {
    return {
      isCollapsed: false,
      linksList: [
        { id: 1, icon: "house-user", to: "/", name: "Home" },
        { id: 2, icon: "star", to: "/favorite", name: "Favorite" },
      ],
    };
  },

  created() {
    EventBus.$on("open", () => {
      this.isCollapsed = true;
    });
  },
};
</script>

<style scoped>
.close {
  background: var(--sidebar-bg-color);
  border: 0;
  cursor: pointer;
}

.left-drawer {
  position: absolute;
  top: 0;
  width: 0;
  overflow: hidden;
  height: 100vh;
  padding-left: 0;
  background: var(--sidebar-bg-color);
  z-index: 200;
  transition: all 0.2s;
}

.drawer-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100vh;
  background: #000;
  opacity: 0.3;
  z-index: 199;
  transition: opacity 0.2s;
}
.left-drawer-width {
  width: 25vw;
}
@media screen and (max-width: 1000px) {
  .left-drawer-width {
    width: 35vw !important;
  }
}

@media screen and (max-width: 600px) {
  .left-drawer-width {
    width: 45vw !important;
  }
}
</style>
