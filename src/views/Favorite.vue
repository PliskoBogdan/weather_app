<template>
  <div class="block-container">
    <div
      v-for="(item, index) in favorite"
      :key="index"
      class="custom-block"
      @click="onSelectLocation(item)"
    >
      <div class="block-content">
        <span class="block-title">{{ item.title }}</span>
        <button @click.stop="removeBlock(index, item)" class="delete-button">
          <s-icon name="trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import FavoriteListService from "@/services/FavoriteListService";

export default {
  data() {
    return {
      favorite: [],
    };
  },

  created() {
    this.favorite = FavoriteListService.getList();
  },

  computed: {
    ...mapGetters(["model"]),
  },

  methods: {
    ...mapActions(["getUserLocationWeather"]),

    removeBlock(index) {
      this.favorite.splice(index, 1);
      localStorage.setItem("favorite", JSON.stringify(this.favorite));
    },

    async onSelectLocation(item) {
      if (
        item.longitude === this.model.longitude &&
        item.latitude === this.model.latitude
      ) {
        await this.$router.push("/");
      }

      const payload = {
        latitude: item.latitude,
        longitude: item.longitude,
      };

      await this.getUserLocationWeather(payload);
      // TODO fix fifferent title when change lang and add to favorite

      //   if (item.title !== `${this.model.country}, ${this.model.city}`) {
      //     // update title
      //   }

      await this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/favoriteView.css";
</style>
