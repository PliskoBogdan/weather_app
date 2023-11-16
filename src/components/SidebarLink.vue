<template>
  <router-link :to="to" class="link" :class="{ active: isActive, 'link-collapsed': isCollapsed }">
    <s-icon :name="icon" />
    <transition name="fade">
      <span v-if="isCollapsed">
        <slot />
      </span>
    </transition>
  </router-link>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
  },

  computed: {
    ...mapGetters(["isCollapsed"]),
    isActive() {
      return this.$route.path === this.to;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
}

.link-collapsed {
    justify-content: flex-start;
}

.link-collapsed span {
    margin-left: 0.4em;
}

.link:hover {
  background-color: var(--sidebar-item-hover);
}
.link.active {
  background-color: var(--sidebar-item-active);
}
.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>
