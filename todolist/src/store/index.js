import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from '../modules/LocalStorage'

const STORE = localStorage('todo-vue')
// STORE.save([])
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // {content:123,done:false},{content:456,done:false},{content:789,done:false}
    todos: []
  },
  getters: {
    list (state) {
      if (window.localStorage.getItem('todo-vue') === null) {
        STORE.save([])
      }

      return state.todos.map((todo, tId) => {
        return {
          todo,
          tId
        }
      })
    },
    filterList (state, getters) {
      return (filter) => {
        let stauts = null
        switch (filter) {
          case 'all':
            return getters.list
          case 'active':
            stauts = false
            break
          case 'done':
            stauts = true
            break
        }
        return getters.list.filter((todo) => {
          return todo.todo.done === stauts
        })
      }
    }
  },

  mutations: {
    SET_TODOS (state, todos) {
      state.todos = todos
    }
  },
  // {content:123,done:false}
  // todo:{content:"",
  //        done:false}
  actions: {
    CREATE_TODOS ({ commit }, { todo }) {
      // Calling setItem() with a named key that already exists will silently overwrite the previous value.
      // 要記得用push後再setItem，不能直接setItem

      // 1 POST
      const todos = STORE.load()
      todos.push({ content: todo, done: false })
      // todos.push(todo)
      STORE.save(todos)
      // 2 commit mutations
      commit('SET_TODOS', todos)
      // 3 return
      return {
        tId: todos.length - 1,
        todo
      }
    },
    READ_TODOS ({ commit }) {
      // 1.GET
      const todos = STORE.load()
      // 2. commit mutations
      commit('SET_TODOS', todos)
      // 3.return
      return {
        todos
      }
    },
    UPDATE_TODOS ({ commit }, { tId, todo }) {
      const todos = STORE.load()
      // console.log(todo)
      todos[tId].content = todo
      // todos.splice(tId, 1, todos[tId])
      STORE.save(todos)
      commit('SET_TODOS', todos)
      return {
        tId,
        todo
      }
    },
    DELETE_TODOS ({ commit }, { tId }) {
      const todos = STORE.load()
      const deleteTodos = todos.splice(tId, 1)[0]
      STORE.save(todos)

      commit('SET_TODOS', todos)
      return {
        deleteTodos,
        tId
      }
    },
    CHECK_TODOS ({ commit }, { tId, value }) {
      const todos = STORE.load()
      todos[tId].done = value
      STORE.save(todos)
      commit('SET_TODOS', todos)
      return {
        todos,
        tId
      }
    },

    CLEAR_TODOS ({ commit }) {
      const todos = []
      STORE.save(todos)
      commit('SET_TODOS', todos)
    }
  },
  modules: {}
})
