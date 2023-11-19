<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <s-icon :name="icon" />
      <span>
        <slot />
      </span>
  </router-link>
</template>

<script>
export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
  },

  computed: {
    isActive() {
      return this.$route.path === this.to;
    },
  },
};
</script>

<style scoped>
.link {
  display: flex;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;
  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;
  color: var(--text-main);
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: .4s;
}
.link span {
  margin-left: 0.25em;
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
