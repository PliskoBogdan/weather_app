<template>
  <div
    class="weather__card"
    :class="{ 'weather__card-dark': currentPallete === 'dark' }"
  >
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
      <div class="weather__card-single-content">
        <div class="text-main">{{ model.city }}, {{ model.country }}</div>
        <div class="weather__card-single-content-icon">
          <img
            :src="`http://openweathermap.org/img/wn/${currentDayWeather.icon}@2x.png`"
            width="50px"
            height="50px"
            alt="weather_icon"
          />
          <span class="text-main">
            {{ Math.round(currentDayWeather.temp) }} °C
          </span>
        </div>
        <div class="text-main">
          {{ $t("Feels like") }} {{ currentDayWeather.feelsLike }}°,
          {{ currentDayWeather.description }}
        </div>
      </div>
      <TemperatureChart :chart-data="chartData" />
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
import TemperatureChart from "@/components/TemperatureChart.vue";

export default {
  components: {
    TruncatedWeatherCard,
    TemperatureChart,
  },

  data() {
    return {
      activeTab: 0,
    };
  },

  computed: {
    ...mapGetters(["model", "activeTabIndex", "currentPallete"]),

    chartData() {
      const keyCurrentInList = Object.keys(this.model?.list).find(
        (key) =>
          this.$options.filters.formattedDate(key) ===
          this.$options.filters.formattedDate(
            this.model.currentTimeStampInfo.dt_txt
          )
      );

      const curr = this.model?.list?.[keyCurrentInList] || [];

      const labels =
        curr?.map((item) => this.$options.filters.formatTime(item.dt_txt)) ||
        [];
      const data = curr?.map((item) => Math.round(item.main.temp)) || [];
      const secData = curr?.map((item) => item.wind.speed) || [];

      return {
        labels,
        datasets: [
          {
            label: this.$t("Temperature"),
            backgroundColor: "#796316",
            borderColor: "#79736a",
            data,
            yAxisID: "y",
          },
          {
            label: this.$t("Wind speed"),
            backgroundColor: "blue",
            borderColor: "#494949e0",
            data: secData,
            yAxisID: "y1",
          },
        ],
      };
    },

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
      const midDayItem = getMidDayItemIndex(currentDayList);
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
  background: #2d508b;
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

.weather__card-single-content {
  background-color: var(--main-soul);
  border: 1px solid var(--accent-primary);
  text-align: center;
}

/* Chart */
.weather-chart {
  background-color: var(--main-soul);
}

.weather__card-single-content-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 500px) {
  .weather__card {
    margin-top: 2.4em;
  }
}
.weather__card-dark .weather__card-tab-active {
  background-color: #737477;
}
</style>
