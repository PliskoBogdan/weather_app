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
        :disabled="isInFavorite"
        :list="list"
        @search="onSearch"
        @input="getNewWeather"
        itemValue="title"
      />
    </div>
    <WeatherCard
      class="mt-2"
      :activeTabIndex="activeTabIndex"
      :model="model"
      @change-tab="changeTab"
    />
  </div>
</template>

<script>
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

  props: {
    model: { type: Object, required: true },
  },

  data() {
    return {
      isInFavorite: false,
      activeTabIndex: 0,
      list: [],
    };
  },

  watch: {
    model: {
      handler(val) {
        this.isInFavorite = FavoriteListService.isItemInList(val.id);
      },
      immediate: true,
      deep: true,
    },
  },

  computed: {
    isActiveFirstTab() {
      return this.activeTabIndex === 0;
    },
  },

  methods: {
    async onSearch(value) {
      const data = await findLocationByQuery(value);
      this.list = data.map((e) => {
        const stateByLocale = e?.local_names?.[this.$i18n.locale]
          ? `${e.local_names[this.$i18n.locale]},`
          : "";

        return {
          title: `${e.country}, ${stateByLocale} ${e.state || e.name}`,
          id: generateId(),
          lat: e.lat,
          lon: e.lon,
        };
      });
    },

    async getNewWeather(event) {
      const { lat, lon } = event.item;
      const payload = { latitude: lat, longitude: lon };
      await this.$store.dispatch('getNewWeatherForModel',{ ...payload, id: this.model.id });
    },

    changeTab(value) {
      this.activeTabIndex = value;
    },

    async addToFavorite() {
      if (this.isInFavorite) {
        const result = await this.$confirm(this.$t("Are you sure?"));
        if (!result) {
          return;
        }
      }

      const processId = generateId();
      this.$store.commit("ADD_LOADING_PROCESS", processId);
      const favoriteList = FavoriteListService.getList();

      // if favorite list is full
      if (favoriteList.length === 5) {
        await this.$confirm(this.$t("favorite list full"), true);
        return;
      }

      const { isInFavorite } = await FavoriteListService.setFavorite(
        this.model
      );
      this.isInFavorite = isInFavorite;

      this.$store.commit("CANCEL_LOADING_PROCESS", processId);
    },
  },
};
</script>
