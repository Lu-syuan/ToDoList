<template>
  <div class="Todo">
    <h1>This is an todo page</h1>
    <p>show {{ filter }}</p>
    <p>{{ list }}</p>

    <router-link :to="{ name: 'Todo', query: { filter: 'all' } }" replace
      >all</router-link
    >
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
        :key="item.tId"
      ></TodoFilter>
    </ul>
  </div>
</template>

<script>
import TodoFilter from '../components/TodoFilter.vue'

export default {
  data () {
    return {
      filter: 'all' // all, active, done
    }
  },
  components: {
    TodoFilter: TodoFilter
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter)
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (route) {
        this.filter = route.query.filter
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
