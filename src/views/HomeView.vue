<template>
  <div class="home">
    <div class="home-header" :class="{ 'justify-center': !isActiveFirstTab }">
      <div class="home-add__favorite mr-1">
        <CButton @click="addToFavorite">{{
          isInFavorite ? $t("Delete from Favorite") : $t("Add to favorite")
        }}</CButton>
      </div>
      <CAutocomplete
        v-if="isActiveFirstTab"
        :list="list"
        @search="onSearch"
        @input="getNewWeather"
        itemValue="title"
      />
    </div>
    <WeatherCard class="mt-2" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { findLocationByQuery } from "@/api/index";

import FavoriteListService from "@/services/FavoriteListService";

import CButton from "@/components/CButton.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import CAutocomplete from "@/components/CAutocomplete";

export default {
  components: {
    CAutocomplete,
    CButton,
    WeatherCard,
  },

  data() {
    return {
      isInFavorite: false,
      list: [],
    };
  },

  computed: {
    ...mapGetters(["model", "activeTabIndex"]),

    isActiveFirstTab() {
      return this.activeTabIndex === 0;
    },
  },

  watch: {
    model: {
      handler(val) {
        this.isInFavorite = FavoriteListService.findInList(val.latitude, val.longitude) !== -1;
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    ...mapActions(["getUserLocationWeather"]),

    async onSearch(value) {
      const data = await findLocationByQuery(value);
      this.list = data.map((e) => {
        const stateByLocale = e?.local_names?.[this.$i18n.locale]
          ? `${e.local_names[this.$i18n.locale]},`
          : "";

        return {
          title: `${e.country}, ${stateByLocale} ${e.state || e.name}`,
          id: e.lat,
          lat: e.lat,
          lon: e.lon,
        };
      });
    },

    async getNewWeather(event) {
      const { lat, lon } = event.item;
      const payload = { latitude: lat, longitude: lon };
      await this.getUserLocationWeather(payload);
    },

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
      const favoriteList = FavoriteListService.getList();

      if (this.isInFavorite) {
        const result = await this.$confirm(this.$t("Are you sure?"));
        if (!result) {
          return;
        }
      }
      const { latitude, longitude } = this.model;

      try {
        if (favoriteList.length > 1) {
          await this.$confirm(this.$t("favorite list full"), true)
          return;
        }

        const indexCurrentLocationInFavorit = FavoriteListService.findInList(latitude, longitude);

        if (indexCurrentLocationInFavorit !== -1) {
          favoriteList.splice(indexCurrentLocationInFavorit, 1);
          this.isInFavorite = false;
        } else {
          favoriteList.push({
            latitude,
            longitude,
            title: `${this.model.country}, ${this.model.city}`,
          });
          this.isInFavorite = true;
        }

        localStorage.setItem("favorite", JSON.stringify(favoriteList));
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
