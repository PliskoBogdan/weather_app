<template>
  <div class="sidebar" :style="{ width: `${sidebarWidth}px` }">
    <SidebarLink
      v-for="{ id, to, icon, name } in linksList"
      :key="id"
      :to="to"
      :icon="icon"
    >
      <div>{{ name }}</div>
    </SidebarLink>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': isCollapsed }"
      @click="TOGGLE_SIDEBAR()"
    >
      <s-icon name="arrow-right" scale="2" />
    </span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import SidebarLink from "@/components/SidebarLink.vue";

export default {
  components: {
    SidebarLink,
  },

  data() {
    return {
      linksList: [
        { id: 1, icon: "house-user", to: "/", name: "Home" },
        { id: 2, icon: "star", to: "/favorite", name: "Favorite" },
      ],
    };
  },

  computed: {
    ...mapGetters(["isCollapsed", "sidebarWidth"]),
  },

  methods: {
    ...mapMutations(["TOGGLE_SIDEBAR"]),
  },
};
</script>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5rem;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  right: 4px;
  padding: 8px;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
  cursor: pointer;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
