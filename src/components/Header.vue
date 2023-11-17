<template>
  <header :style="{ height: `${headerHeight}px` }">
    <div>
      <span
        class="collapse-icon"
        @click="openSidebar"
      >
        <s-icon name="bars" scale="2" />
      </span>
    </div>
    <div class="right-block">
      <div>Switch</div>
      <div>EN</div>
    </div>
  </header>
</template>

<script>
import { mapMutations } from "vuex";

import { headerHeight } from "@/vars/index";

import { EventBus } from "@/main";

export default {
  data() {
    return {
      headerHeight,
    };
  },

  methods: {
    ...mapMutations(["TOGGLE_SIDEBAR"]),

    openSidebar() {
      EventBus.$emit("open", true);
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
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
  cursor: pointer;
}
</style>
