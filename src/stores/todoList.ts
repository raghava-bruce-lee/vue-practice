import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoListStore = defineStore('todoList', () => {
  const todoList = ref<string[]>([])

  function addTodo(value: string) {
    if (value?.trim()) todoList.value.push(value)
  }

  function removeTodo(index: number) {
    todoList.value.splice(index, 1)
  }

  return {
    todoList,
    addTodo,
    removeTodo
  }
})
