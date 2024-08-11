import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { fetchTodos } from '@/services/todos';

export const useTodoListStore = defineStore('todoList', () => {
  const _todoList = ref<string[]>([]);

  async function getTodos() {
    await fetchTodos();
  }

  function addTodo(value: string) {
    if (value?.trim()) _todoList.value.push(value);
  }

  function removeTodo(index: number) {
    _todoList.value.splice(index, 1);
  }

  return {
    getTodoList: computed(() => _todoList.value),
    getTodos,
    addTodo,
    removeTodo
  };
});
