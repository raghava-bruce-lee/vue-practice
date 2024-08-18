import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {
  fetchTodosWithApi,
  createTodoWithApi,
  updateTodoWithApi,
  deleteTodoWithApi
} from '@/services/todos';
import { useSnackbarStore } from './snackbar';
import type { Todo, TODO_STATUS } from '@/models/todo';
import constants from '@/constants/common';

export const useTodoListStore = defineStore('todoList', () => {
  const snackbarStore = useSnackbarStore();
  const _todoList = ref<Todo[]>([]);

  async function fetchTodos() {
    if (_todoList.value.length) return;

    const todos = await fetchTodosWithApi();
    if (todos) {
      _todoList.value = todos;
    } else {
      snackbarStore.addFailureSnackbar(constants.defaultErrorMessage);
    }
  }

  async function createTodo(title: string, description: string, status: TODO_STATUS) {
    const newTodo = await createTodoWithApi(title, description, status);
    if (newTodo) {
      _todoList.value.push(newTodo);
      snackbarStore.addSuccessSnackbar('Todo created successfully!');
    } else {
      snackbarStore.addFailureSnackbar(constants.defaultErrorMessage);
    }
  }

  async function updateTodo(
    todoId: string,
    index: number,
    title: string,
    description: string,
    status: TODO_STATUS
  ) {
    const updatedTodo = await updateTodoWithApi(todoId, title, description, status);
    if (updatedTodo) {
      _todoList.value.splice(index, 1, updatedTodo);
      snackbarStore.addSuccessSnackbar('Todo updated successfully!');
    } else {
      snackbarStore.addFailureSnackbar(constants.defaultErrorMessage);
    }
  }

  async function deleteTodo(todoId: string) {
    const id = _todoList.value.findIndex((todo) => todo._id === todoId);
    const isDeleted = await deleteTodoWithApi(todoId);

    if (isDeleted) {
      _todoList.value.splice(id, 1);
      snackbarStore.addSuccessSnackbar('Todo deleted successfully!');
    } else {
      snackbarStore.addFailureSnackbar(constants.defaultErrorMessage);
    }
  }

  return {
    todoList: computed(() => _todoList.value),
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoListStore, import.meta.hot));
}
