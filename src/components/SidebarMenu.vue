<template>
  <div class="sidebar" :style="{ width: `${sidebarWidth}px` }" @click.self="TOGGLE_SIDEBAR" ref="sidebar">
    <SidebarLink
      v-for="{ id, to, icon, name } in linksList"
      :key="id"
      :to="to"
      :icon="icon"
    >
      <div>{{ name }}</div>
    </SidebarLink>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import { headerHeight } from "@/vars/index";

import { EventBus } from "@/main";

import SidebarLink from "@/components/SidebarLink.vue";

export default {
  components: {
    SidebarLink,
  },

  data() {
    return {
      headerHeight,
      linksList: [
        { id: 1, icon: "house-user", to: "/", name: "Home" },
        { id: 2, icon: "star", to: "/favorite", name: "Favorite" },
      ],
      isFirstOpen: true
    };
  },

  created() {
    EventBus.$on('open-sidebar', () => {
      this.TOGGLE_SIDEBAR(true);
      // document.addEventListener('click', this.onClose);
      if (this.isCollapsed) {

        window.addEventListener('click', this.onClose);
      } else {
        window.removeEventListener('click', this.onClose);
      }
    })
  },

  computed: {
    ...mapGetters(["isCollapsed", "sidebarWidth"]),
  },

  methods: {
    ...mapMutations(["TOGGLE_SIDEBAR"]),

    onClose(event) {
      if (!this.$refs.sidebar.contains(event.target) && event.target.tagName !== 'BUTTON') {
        this.TOGGLE_SIDEBAR(false);
      }
    }
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
</style>
