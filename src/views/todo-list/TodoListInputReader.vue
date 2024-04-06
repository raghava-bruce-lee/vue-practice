<script setup lang="ts">
import { ref } from 'vue';
import { useTodoListStore } from '@/stores/todoList';

const todoListStore = useTodoListStore();
const todo = ref('');

function addTodo() {
  todoListStore.addTodo(todo.value?.trim());
  todo.value = '';
}
</script>

<template>
  <v-card class="pa-2">
    <v-text-field
      data-test="todo-input-field"
      v-model="todo"
      label="Add Todo"
      variant="underlined"
    />
    <v-btn data-test="add-todo-btn" @click="addTodo" color="secondary" :disabled="!todo.trim()">
      Add
    </v-btn>
  </v-card>
</template>
