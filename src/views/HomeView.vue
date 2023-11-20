<template>
  <div class="home">
    <div class="home-header">
      <div>Input</div>
      <div class="home-add__favorite">
        <CButton @click="addToFavorite">{{
          isInFavorite ? $t("Delete from Favorite") : $t("Add to favorite")
        }}</CButton>
      </div>
    </div>
    <WeatherCard class="mt-2" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CButton from "@/components/CButton.vue";
import WeatherCard from "@/components/WeatherCard.vue";

export default {
  components: {
    CButton,
    WeatherCard,
  },

  data() {
    return {
      isInFavorite: false,
    };
  },

  computed: {
    ...mapGetters(["model"]),
  },

  watch: {
    model: {
      handler() {
        this.isInFavorite = this.findIndexCurrentLocationInFavorite() !== -1;
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    findIndexCurrentLocationInFavorite() {
      try {
        const favorite = JSON.parse(localStorage.getItem("favorite"));
        // TO-DO move this var
        const indexFavorite = favorite.findIndex(
          ({ latitude, longitude }) =>
            latitude === this.model.latitude &&
            longitude === this.model.longitude
        );
        return indexFavorite;
      } catch (error) {
        return -1;
      }
    },

    async addToFavorite() {
      if (this.isInFavorite) {
        const result = await this.$confirm("Вы уверены?");
        if (!result) {
          return;
        }
      }
      const { latitude, longitude } = this.model;

      try {
        const favorite = JSON.parse(localStorage.getItem("favorite")) || [];

        if (favorite.length === 5) {
          return;
        }

        const indexCurrentLocationInFavorit =
          this.findIndexCurrentLocationInFavorite();

        if (indexCurrentLocationInFavorit !== -1) {
          favorite.splice(indexCurrentLocationInFavorit, 1);
          this.isInFavorite = false;
        } else {
          favorite.push({
            latitude,
            longitude,
            title: `${this.model.country}, ${this.model.city}`,
          });
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
