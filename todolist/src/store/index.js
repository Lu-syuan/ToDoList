import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from '../modules/LocalStorage'

const STORE = localStorage('todo-vue')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {},
  mutations: {
    SET_TODOS (state) {
      state.todos = STORE.load()
    }
  },
  actions: {
    READ_TODOS ({ commit }) {
      // 1.GET
      const todos = STORE.load()
      // 2. commit mutations
      commit('SET_TODOS')
      // 3.return
      return {
        todos
      }
    }
  },
  modules: {}
})
