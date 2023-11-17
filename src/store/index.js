import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPallete: null,
  },

  getters: {
    currentPallete: (state) => state.currentPallete
  },
  mutations: {
    SET_CURRENT_APP_PALLETE(state, payload) {
      state.currentPallete = payload
    },
  },
  actions: {
    setCurrentPalleteInStorage({ commit }, theme) {
      localStorage.setItem('app-pallete', theme)
      commit('SET_CURRENT_APP_PALLETE', theme)
    },
    getCurrentAppPallete({ commit }) {
      try {
        const currentPallete = localStorage.getItem("app-pallete") || 'light';
        commit('SET_CURRENT_APP_PALLETE', currentPallete)
      } catch (error) {
        console.error('Error when set pallete in storage');
      }
    }
  },
  modules: {
  }
})
