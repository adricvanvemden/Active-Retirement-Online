import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: undefined
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setUser ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('setUser', user)
        resolve()
      })
    }
  },
  modules: {
  }
})
