import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapsed: false,
    openedSidebarWidth: 180,
    closedSidebarWidth: 38
  },
  getters: {
    sidebarWidth: (state) => state.isCollapsed ? state.openedSidebarWidth : state.closedSidebarWidth,
    isCollapsed: ({ isCollapsed }) => isCollapsed
  },
  mutations: {
    TOGGLE_SIDEBAR(state){
      state.isCollapsed = !state.isCollapsed
    }
  },
  actions: {
  },
  modules: {
  }
})
