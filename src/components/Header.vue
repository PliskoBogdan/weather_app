<template>
  <header :style="{ height: `${headerHeight}px` }">
    <div>
      <span class="collapse-icon" @click="openSidebar">
        <s-icon name="bars" scale="2" />
      </span>
    </div>
    <div class="right-block">
      <CMenu style="margin-right: 1em;">
        <template #activator>
          RU
        </template>
        <li>RU</li>
        <li>EN</li>
      </CMenu>
      <div class="header-color__pallete">
        <s-icon name="sun" scale="1" style="fill: white;"/>
        <CSwitch :value="isDarkPallete" @input="onChangePallete" style="display: flex;" />
        <s-icon name="moon" scale="1" />
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { headerHeight } from "@/vars/index";

import { EventBus } from "@/main";

import CSwitch from "@/components/CSwitch.vue";
import CMenu from '@/components/CMenu';

import ColorPallete from '@/services/ColorPallete'

export default {
  components: {
    CSwitch,
    CMenu
  },

  data() {
    return {
      headerHeight,
      isDarkPallete: false,
    };
  },

  created() {
    this.isDarkPallete = this.currentPallete === 'dark'
  },

  computed: {
    ...mapGetters(['currentPallete'])
  },

  methods: {
    ...mapActions(['setCurrentPalleteInStorage']),

    onChangePallete(value) {
      this.isDarkPallete = value;

      const theme = value ? 'dark' : 'light';
      this.setCurrentPalleteInStorage(theme);
      this.setPallete(theme);
    },

    setPallete(theme) {
      ColorPallete.setTheme(theme)
    },

    openSidebar() {
      EventBus.$emit("open", true);
    },
  },
};
</script>

<style scoped>
header {
  background-color: var(--header-bg);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  color: var(--text-main);
}

.right-block {
  display: flex;
}

.collapse-icon {
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
  cursor: pointer;
}

.header-color__pallete {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
