import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useTodoListStore = defineStore('todoList', () => {
  const todoList = ref<string[]>([]);

  const getTodoList = computed(() => todoList.value);

  function addTodo(value: string) {
    if (value?.trim()) todoList.value.push(value);
  }

  function removeTodo(index: number) {
    todoList.value.splice(index, 1);
  }

  return {
    todoList,
    getTodoList,
    addTodo,
    removeTodo
  };
});
