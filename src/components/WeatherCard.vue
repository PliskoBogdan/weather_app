<template>
  <div class="weather__card">
    <div class="weather__card-header">
      <div
        class="weather__card-tab"
        :class="{ 'weather__card-tab-active': activeTabIndex === 0 }"
        @click="onChangeTab(0)"
      >
        {{ $t("day") }}
      </div>
      <div
        class="weather__card-tab"
        :class="{ 'weather__card-tab-active': activeTabIndex === 1 }"
        @click="onChangeTab(1)"
      >
        {{ $t("week") }}
      </div>
    </div>
    <div v-if="singleDayTabActive" class="weather__card-single">
      <div>{{ model.city }}, {{ model.country }}</div>
      <div>
        <img
          :src="`http://openweathermap.org/img/wn/${currentDayWeather.icon}@2x.png`"
          width="50px"
          height="50px"
          alt="weather_icon"
        />
        <span> {{ Math.round(currentDayWeather.temp) }} °C </span>
      </div>
      <div>
        {{ $t("Feels like") }} {{ currentDayWeather.feelsLike }},
        {{ currentDayWeather.description }}
      </div>
    </div>

    <template v-else>
      <div class="truncated__cards">
        <TruncatedWeatherCard
          v-for="(item, key) in model.list"
          :item="item"
          :key="key"
          @select="select"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import getMidDayItemIndex from "@/utils/getMidDayItemIndex";

import TruncatedWeatherCard from "@/components/TruncatedWeatherCard.vue";

export default {
  components: {
    TruncatedWeatherCard,
  },

  data() {
    return {
      activeTab: 0,
    };
  },

  computed: {
    ...mapGetters(["model", "activeTabIndex"]),

    currentDayWeather() {
      const currentTimeStampInfo = this.model.currentTimeStampInfo;
      const midDayItem = getMidDayItemIndex(currentTimeStampInfo?.weather);

      const currWeather = currentTimeStampInfo?.weather?.[midDayItem] || {};

      const data = {
        temp: Math.round(currentTimeStampInfo?.main?.temp || 0),
        feelsLike: Math.round(currentTimeStampInfo?.main?.feelsLike || 0),
        icon: currWeather.icon || "",
        description: currWeather.description || "",
      };

      return data;
    },

    singleDayTabActive() {
      return this.activeTabIndex === 0;
    },
  },

  methods: {
    select(currentDayList) {
      const midDayItem = getMidDayItemIndex(currentDayList)
      const data = currentDayList[midDayItem];
      this.$store.commit("SET_CURRENT_TIME_STAMP_INFO", data);
      this.$store.commit("SET_ACTIVE_TAB", 0);
    },

    onChangeTab(value) {
      this.$store.commit("SET_ACTIVE_TAB", value);
    },
  },
};
</script>

<style scoped>
.truncated__cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border: 1px solid var(--bg-button);
  background-color: var(--main-soul);
  border-radius: 3px;
}
.weather__card {
  position: relative;
  background-color: white;
  border-radius: 0px 4px 4px 4px;
}
.weather__card-header {
  position: absolute;
  display: flex;
  top: -1.9em;
  left: -1px;
}
.weather__card-tab {
  min-width: 4em;
  display: flex;
  justify-content: center;
  padding: 0.4em;
  border: 1px solid var(--main-soul);
  border-bottom: 0;
  border-right: none;
  cursor: pointer;
  background-color: var(--bg-button);
  color: var(--text-main);
  transition: 0.5s;
}
.weather__card-tab:first-child {
  border-radius: 10px 0px 0px 0px;
}
.weather__card-tab:hover {
  background: var(--hover);
}
.weather__card-tab-active {
  background: var(--accent-primary);
}
.weather__card-tab:last-child {
  border-right: 1px solid var(--main-soul);
  border-radius: 0px 10px 0px 0px;
}
.weather__card-single {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

@media screen and (max-width: 500px) {
  .weather__card {
    margin-top: 2.4em;
  }
}
</style>
