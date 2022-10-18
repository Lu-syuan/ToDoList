<style scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li .btn {
  display: none;
  /* justify-content: flex-end; */
}

li button {
  cursor: pointer;
}

li:hover .btn {
  display: inline-block;
}
</style>

<template>
  <li>
    <template v-if="!edit">
      <input type="checkbox" v-model="done" />{{ todo.content }}

      <div class="btn">
        <button class="edit" @click="$emit('editThis')">編輯</button>
        <button class="delete" @click="$emit('deleteThis')">刪除</button>
      </div>
    </template>
    <template v-else>
      <input type="text" v-model="editContent" />
      <button @click="$emit('completeEdit', editContent)">完成</button>
    </template>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      require: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editContent: ''
    }
  },
  mounted () {
    this.editContent = this.todo.content
  },
  computed: {
    done: {
      get () {
        return this.todo.done
      },
      set (value) {
        this.$emit('check', value)
      }
    }
  }
}
</script>
