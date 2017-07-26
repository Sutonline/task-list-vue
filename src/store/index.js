import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,

  getters: {
    userInfo: state => state.userInfo
  },
  mutations: {
    [types.SET_USER_INFO] (state, info) {
      state.userInfo = info
    }
  }
})

export default store
