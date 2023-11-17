<template>
  <header :style="{ height: `${headerHeight}px` }">
    <div>
      <span
        class="collapse-icon"
        :class="{ 'rotate-180': isCollapsed }"
        @click="openSidebar"
      >
        <s-icon name="arrow-right" scale="2" />
      </span>
    </div>
    <div class="right-block">
      <div>Switch</div>
      <div>EN</div>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import { headerHeight } from "@/vars/index";

import { EventBus } from "@/main";

export default {
  data() {
    return {
      headerHeight,
    };
  },

  computed: {
    ...mapGetters(["isCollapsed"]),
  },

  methods: {
    ...mapMutations(["TOGGLE_SIDEBAR"]),

    openSidebar() {
      EventBus.$emit("open-sidebar", true);
    },
  },
};
</script>

<style scoped>
header {
  background-color: var(--sidebar-bg-color);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}

.right-block {
  display: flex;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
  cursor: pointer;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
