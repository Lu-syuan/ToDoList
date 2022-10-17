<template>
  <div class="Todo">
    <h1>This is an todo page</h1>
    <input
      type="text"
      @keyup.enter="creatTodoHandler(creatTodo)"
      v-model="creatTodo"
    />
    <p>show {{ filter }}</p>
    <router-link to="/todo" replace>all</router-link>
    |
    <router-link :to="{ name: 'Todo', query: { filter: 'active' } }" replace
      >active</router-link
    >
    |
    <router-link :to="{ name: 'Todo', query: { filter: 'done' } }" replace
      >done</router-link
    >

    <ul>
      <TodoFilter
        v-for="item of list"
        :todo="item.todo"
        :edit="item.tId === edit"
        :key="item.tId + item.todo.content"
        @check="
          (value) => {
            checkHandler(item.tId, value)
          }
        "
        @completeEdit="
          (value) => {
            completeEditHandler(item.tId, value)
          }
        "
        @editThis="edit = item.tId"
        @deleteThis="deleteHandler(item.tId)"
      ></TodoFilter>
    </ul>
  </div>
</template>

<script>
import TodoFilter from '../components/TodoFilter.vue'

export default {
  data () {
    return {
      filter: 'all', // all, active, done
      edit: null,
      creatTodo: ''
    }
  },
  mounted () {
    this.$store.dispatch('READ_TODOS')
  },
  components: {
    TodoFilter: TodoFilter
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter)
    }
  },
  methods: {
    checkHandler (tId, value) {
      this.$store.dispatch('CHECK_TODOS', { tId, value })
    },
    completeEditHandler (tId, todo) {
      this.edit = null
      this.$store.dispatch('UPDATE_TODOS', { tId, todo })
    },
    creatTodoHandler (todo) {
      this.$store.dispatch('CREATE_TODOS', { todo })
      this.creatTodo = ''
    },
    deleteHandler (tId) {
      this.$store.dispatch('DELETE_TODOS', { tId })
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler: function (route) {
        this.edit = null
        this.filter = route.query.filter || 'all'
      }
    }
  }
}
</script>

<style scoped>
.Todo > a {
  text-decoration: none;
  color: black;
}

.Todo .router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
</style>
