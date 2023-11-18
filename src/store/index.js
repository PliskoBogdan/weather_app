import Vue from "vue";
import Vuex from "vuex";
import axios from "@/api/axios";

import weatherByDaysMapper from "@/mappers/weatherByDays-mapper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPallete: null,

    model: {
      country: null,
      city: null,
      list: {},
    },
  },

  getters: {
    currentPallete: (state) => state.currentPallete,
  },
  mutations: {
    SET_CURRENT_APP_PALLETE(state, payload) {
      state.currentPallete = payload;
    },

    SET_WEATHER(state, payload) {
      state.model.country = payload.city.country;
      state.model.city = payload.city.name;
      state.list = weatherByDaysMapper(payload.list);
    },
  },
  actions: {
    async getUserLocationWeather({ commit }, { latitude, longitude, lang }) {
      const { data } = await axios.get(
        `forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}&lang=${lang}`
      );

      // const a = await axios.get(
      //   `forecast?q=Kharkiv&lang=ua&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
      // );
      commit("SET_WEATHER", data);
    },

    setCurrentPalleteInStorage({ commit }, theme) {
      localStorage.setItem("app-pallete", theme);
      commit("SET_CURRENT_APP_PALLETE", theme);
    },
    getCurrentAppPallete({ commit }) {
      try {
        const currentPallete = localStorage.getItem("app-pallete") || "light";
        commit("SET_CURRENT_APP_PALLETE", currentPallete);
      } catch (error) {
        console.error("Error when set pallete in storage");
      }
    },
  },
  modules: {},
});
