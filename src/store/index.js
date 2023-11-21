import Vue from "vue";
import Vuex from "vuex";

import axios from "@/api/axios";
import i18n from "@/i18n"

import weatherByDaysMapper from "@/mappers/weatherByDays-mapper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPallete: null,
    loadingsList: [],
    model: {
      country: null,
      city: null,
      list: {},
      latitude: 0,
      longitude: 0
    },
  },

  getters: {
    currentPallete: (state) => state.currentPallete,
    model: (state) => state.model,
    loadingsList: (state) => state.loadingsList
  },
  mutations: {
    ADD_LOADING_PROCESS(state, id) {
      state.loadingsList.push({ id })
    },

    CANCEL_LOADING_PROCESS(state, payload) {
      const index = state.loadingsList.findIndex((id) => id === payload);
      state.loadingsList.splice(index, 1)
    },

    SET_CURRENT_APP_PALLETE(state, payload) {
      state.currentPallete = payload;
    },

    SET_WEATHER(state, payload) {
      state.model.country = payload.city.country;
      state.model.city = payload.city.name;
      state.model.list = weatherByDaysMapper(payload.list);
      state.model.latitude = payload.latitude
      state.model.longitude = payload.longitude
    },
  },
  actions: {
    async getUserLocationWeather({ commit }, { latitude, longitude }) {
      const { data } = await axios.get(
        `data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}&lang=${i18n.locale}&units=metric`
      );

      // const a = await axios.get(
      //   `forecast?q=Kharkiv&lang=ua&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
      // );
      commit("SET_WEATHER", { ...data, latitude, longitude });
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
