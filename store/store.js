import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    yhmc: '',
    xm: {},
    htje: '',
    ye: ''
  },
  mutations: {
    updataYe(state, ye) {
      state.ye = ye
    },
    updataHtje(state, htje) {
      state.htje = htje
    },
    logoutYh(state) {
      state.yhmc = ''
    },
    updataYh(state, yhmc) {
      state.yhmc = yhmc
    },
    updataXm(state, xm) {
      state.xm = xm
    }
  }
})

export default store
