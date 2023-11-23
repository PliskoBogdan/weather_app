<template>
  <header>
    <s-icon class="collapse-icon" @click="openSidebar" name="bars" scale="2" />
    <div class="header-controls">
      <LocaleSwitch />
      <div class="header-color__pallete">
        <s-icon name="sun" scale="1" class="sun__image" />
        <CSwitch
          :value="isDarkPallete"
          @input="onChangePallete"
          style="display: flex"
        />
        <s-icon name="moon" scale="1" class="moon__image" />
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { EventBus } from "@/main";

import CSwitch from "@/components/CSwitch.vue";
import LocaleSwitch from "./LocaleSwitch.vue";

import ColorPallete from "@/services/ColorPallete";

export default {
  components: {
    CSwitch,
    LocaleSwitch,
  },

  data() {
    return {
      isDarkPallete: false,
    };
  },

  created() {
    this.setDefaultPallete();
  },

  computed: {
    ...mapGetters(["currentPallete"]),
  },

  methods: {
    ...mapActions(["setCurrentPalleteInStorage"]),

    setDefaultPallete() {
      if (window?.matchMedia("(prefers-color-scheme: dark)")?.matches) {
        this.onChangePallete(true);
        this.isDarkPallete = true;
      } else {
        this.isDarkPallete = this.currentPallete === "dark";
      }
    },

    changeLocale(locale) {
      this.$i18n.changeLocale(locale);
    },

    onChangePallete(value) {
      this.isDarkPallete = value;

      const theme = value ? "dark" : "light";
      this.setCurrentPalleteInStorage(theme);
      this.setPallete(theme);
    },

    setPallete(theme) {
      ColorPallete.setTheme(theme);
    },

    openSidebar() {
      EventBus.$emit("open", true);
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/header.css";
</style>
