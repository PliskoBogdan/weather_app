<template>
  <div class="weather__card">
    <div class="weather__card-header">
      <div
        class="weather__card-tab"
        :class="{ 'weather__card-tab-active': activeTab === 0 }"
        @click="onChangeTab(0)"
      >
        {{ $t("day") }}
      </div>
      <div
        class="weather__card-tab"
        :class="{ 'weather__card-tab-active': activeTab === 1 }"
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
        <span> {{ currentDayWeather.temp }} °C </span>
      </div>
      <div>
        {{ $t("Feels like") }} {{ currentDayWeather.feelsLike }},
        {{ currentDayWeather.description }}
      </div>
    </div>

    <div v-else>Days tab</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activeTab: 0,
    };
  },

  computed: {
    ...mapGetters(["model"]),

    currentDayWeather() {
      const model = this.model.list?.[0];
      const currWeather = model?.weather?.[0] || {};

      const data = {
        temp: Math.round(model?.main?.temp || 0),
        feelsLike: Math.round(model?.main?.feelsLike || 0),
        icon: currWeather.icon || "",
        description: currWeather.description || "",
      };

      return data;
    },

    singleDayTabActive() {
      return this.activeTab === 0;
    },
  },

  methods: {
    onChangeTab(value) {
      this.activeTab = value;
    },
  },
};
</script>

<style scoped>
.weather__card {
  position: relative;
  background-color: #b9b7b7;
  border-radius: 0px 4px 4px 4px;
}
.weather__card-header {
  position: absolute;
  display: flex;
  top: -2em;
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
  background: #b9b7b7;
  color: var(--text-main);
  transition: 0.5s;
}
.weather__card-tab:first-child {
  border-radius: 10px 0px 0px 0px;
}
.weather__card-tab:hover {
  background: #625f65;
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
</style>
