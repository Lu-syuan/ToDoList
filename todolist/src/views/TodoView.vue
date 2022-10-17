<template>
  <div class="Todo">
    <h1>This is an todo page</h1>
    <p>{{ filter }}</p>
    <p>{{ list }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: 'all' // all, active, done
    }
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter)
    }
  }
}
</script>
