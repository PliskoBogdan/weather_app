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

  methods: {
    changeLocale(locale) {
      this.$i18n.changeLocale(locale);
    },
  },
};
</script>
