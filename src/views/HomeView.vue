<template>
  <div>
    <WeatherContainer v-for="model in models" :key="model.id" :model="model" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import WeatherContainer from "@/components/WeatherContainer.vue";

export default {
  components: {
    WeatherContainer,
  },

  async created() {
    await this.$store.dispatch("getModels");
  },

  computed: {
    ...mapGetters(["models"]),
  },
};
</script>

<style scoped>
@import "@/assets/styles/home.css";
</style>
