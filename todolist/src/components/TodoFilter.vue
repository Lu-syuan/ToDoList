<template>
  <li v-if="!todo.done">{{ todo.content }}</li>
  <li v-else>{{ todo.content }}</li>
</template>

<script>
export default {
  props: {
    done: {
      type: Boolean,
      require: true
    },
    todo: {
      type: Object,
      require: true
    }
  },
  mounted () {
    this.$store.dispatch('READ_TODOS')
  }
}
</script>
