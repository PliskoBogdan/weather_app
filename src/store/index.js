import Vue from "vue";
import Vuex from "vuex";

import axios from "@/api/axios";
import i18n from "@/i18n";

import { findLocationByCoords } from "@/api/index";

import weatherByDaysMapper from "@/mappers/weatherByDays-mapper";
import modelMapper from "@/mappers/model-mapper";
import FavoriteListService from "@/services/FavoriteListService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPallete: null,
    loadingsList: [],
    activeTabIndex: 0,
    models: [],
    model: {
      id: "",
      country: null,
      city: null,
      list: {},
      currentTimeStampInfo: {},
      latitude: 0,
      longitude: 0,
    },
  },

  getters: {
    currentPallete: (state) => state.currentPallete,
    model: (state) => state.model,
    models: (state) => state.models,
    loadingsList: (state) => state.loadingsList,
    activeTabIndex: (state) => state.activeTabIndex,
  },
  mutations: {
    SET_ACTIVE_TAB(state, index) {
      state.activeTabIndex = index;
    },

    ADD_LOADING_PROCESS(state, id) {
      state.loadingsList.push({ id });
    },

    CANCEL_LOADING_PROCESS(state, payload) {
      const index = state.loadingsList.findIndex((id) => id === payload);
      state.loadingsList.splice(index, 1);
    },

    SET_CURRENT_APP_PALLETE(state, payload) {
      state.currentPallete = payload;
    },

    SET_CURRENT_TIME_STAMP_INFO(state, payload) {
      state.model.currentTimeStampInfo = payload;
    },

    SET_WEATHER(state, payload) {
      const { currentTimeStampInfo, list } = weatherByDaysMapper(payload.list);
      state.model.country = payload.city.country;
      state.model.city = payload.city.name;
      state.model.list = list;
      state.model.currentTimeStampInfo = currentTimeStampInfo;
      state.model.latitude = payload.latitude;
      state.model.longitude = payload.longitude;
      state.model.id = payload.city.id;
    },

    SET_MODELS(state, payload) {
      payload.forEach((item) => {
        state.models.push(modelMapper(item));
      });
    },

    SET_CURRENT_TIME_STAMP_INFO_FOR_MODEL(state, payload) {
      const indexNeededModel = state.models.findIndex(
        ({ id }) => id === payload.modelId
      );
      const neededModelCopy = JSON.parse(
        JSON.stringify(state.models[indexNeededModel])
      );
      neededModelCopy.currentTimeStampInfo = payload;
      state.models.splice(indexNeededModel, 1, neededModelCopy);
    },
  },
  actions: {
    async getModels({ commit }) {
      const list = FavoriteListService.getList();

      const getLocationPromises = list.map(({ latitude, longitude }) =>
        findLocationByCoords({ latitude, longitude })
      );

      try {
        const result = await Promise.all(getLocationPromises);
        commit("SET_MODELS", result);
      } catch (error) {
        console.error("Error get data for favorites", error);
      }
    },

    async getNewWeatherForModel({commit}, payload) {
      const indexModelToUpdate = payload.id;
      
    },

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
