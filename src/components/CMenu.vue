<template>
  <div class="simple-menu">
    <div @click="toggleMenu" class="pointer">
      <slot name="activator">Toggle Menu</slot>
    </div>
    <ul v-show="isOpen" @click.stop="closeMenu">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.simple-menu {
  position: relative;
}

button {
  cursor: pointer;
}

ul {
  position: absolute;
  margin: 0;
  padding: 0;
  list-style-type: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #c7c7c7;
  min-height: 30px;
}

li {
  padding: 8px;
  cursor: pointer;
  color: #565656;
  transition: background-color 0.3s;
}

li:hover {
  background-color: var(--bg-menu);
}
</style>