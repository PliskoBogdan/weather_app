<template>
  <CMenu class="header-lang__switch">
    <template #activator>
      <span class="header-lang__switch-activator">
        {{ $i18n.locale }}
      </span>
    </template>
    <li
      v-for="locale in locales"
      :key="locale"
      class="header-lang__switch-lang"
      @click="changeLocale(locale)"
    >
      {{ locale }}
    </li>
  </CMenu>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import { locales } from "@/vars";

import CMenu from "@/components/CMenu";

export default {
  components: {
    CMenu,
  },

  data() {
    return {
      locales,
    };
  },

  computed: {
    ...mapGetters(["model"]),
  },

  methods: {
    ...mapMutations(["ADD_LOADING_PROCESS", "CANCEL_LOADING_PROCESS"]),

    async changeLocale(locale) {
      const processId = `${Math.random()}`;
      this.$store.commit("ADD_LOADING_PROCESS", processId);
      this.$i18n.changeLocale(locale);
      await this.$store.dispatch('getUserLocationWeather', this.model);
      this.$store.commit("CANCEL_LOADING_PROCESS", processId);
    },
  },
};
</script>
