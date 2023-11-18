<template>
  <header :style="{ height: `${headerHeight}px` }">
    <div>
      <span class="collapse-icon" @click="openSidebar">
        <s-icon name="bars" scale="2" />
      </span>
    </div>
    <div class="header-controls">
      <CMenu class="header-lang__switch">
        <template #activator>
          RU
        </template>
        <li>RU</li>
        <li>EN</li>
      </CMenu>
      <div class="header-color__pallete">
        <s-icon name="sun" scale="1" class="sun__image" />
        <CSwitch :value="isDarkPallete" @input="onChangePallete" style="display: flex;" />
        <s-icon name="moon" scale="1" class="moon__image"/>
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
@import '@/assets/styles/header.css';
</style>
