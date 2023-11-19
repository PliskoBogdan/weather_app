<template>
  <div class="home">
    <div class="home-header">
      <div>Input</div>
      <div class="home-add__favorite">
        <button @click="addToFavorite">{{ isInFavorite ? $t('Delete from Favorite') : $t("Add to favorite") }}</button>
      </div>
    </div>
    <WeatherCard class="mt-2" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import WeatherCard from "@/components/WeatherCard.vue";

export default {
  components: {
    WeatherCard,
  },

  data() {
    return {
      isInFavorite: false,
    };
  },

  created() {
    this.isInFavorite = this.findIndexCurrentLocationInFavorite() !== -1;
  },

  computed: {
    ...mapGetters(["model"]),
  },

  methods: {
    findIndexCurrentLocationInFavorite() {
      try {
        const favorite = JSON.parse(localStorage.getItem("favorite"));
        // TO-DO create method for title validation and creation
        const indexFavorite = favorite.findIndex(({ title }) => title === `${this.model.country}, ${this.model.city}`);

        
        return indexFavorite;
      } catch (error) {
        return -1;
      }
    },

    addToFavorite() {
      const { latitude, longitude } = this.model;

      try {
        const favorite = JSON.parse(localStorage.getItem("favorite")) || [];

        if (favorite.length === 5) {
          return;
        }

        const indexCurrentLocationInFavorit = this.findIndexCurrentLocationInFavorite()

        if (indexCurrentLocationInFavorit !== -1) {
          favorite.splice(indexCurrentLocationInFavorit, 1)
          this.isInFavorite = false;
        } else {
          // TO-DO create method for title validation and creation
          favorite.push({ latitude, longitude, title: `${this.model.country}, ${this.model.city}` });
          this.isInFavorite = true;
        }

        localStorage.setItem("favorite", JSON.stringify(favorite));

      } catch (error) {
        console.error("Error when add to favorite--", error);
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/home.css";
</style>
