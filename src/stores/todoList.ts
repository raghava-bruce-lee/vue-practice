import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { fetchTodosWithApi } from '@/services/todos';
import type { Todo } from '@/models/todo';

export const useTodoListStore = defineStore('todoList', () => {
  const _todoList = ref<Todo[]>([]);

  async function fetchTodos() {
    if (_todoList.value.length) return;

    const todos = await fetchTodosWithApi();
    if (todos) {
      _todoList.value = todos;
    }
  }

  return {
    fetchTodos,
    todoList: computed(() => _todoList.value)
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoListStore, import.meta.hot));
}
