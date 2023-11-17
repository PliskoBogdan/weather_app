import Vue from 'vue'
import Vuex from 'vuex'

import { openedSidebarWidth, closedSidebarWidth } from '@/vars/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapsed: false,
    openedSidebarWidth,
    closedSidebarWidth,
  },
  getters: {
    sidebarWidth: (state) => state.isCollapsed ? state.openedSidebarWidth : state.closedSidebarWidth,
    isCollapsed: ({ isCollapsed }) => isCollapsed
  },
  mutations: {
    TOGGLE_SIDEBAR(state, payload){
      state.isCollapsed = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
