<script setup lang="ts">
import { useTodoListStore } from '@/stores/todoList';

const todoListStore = useTodoListStore();
</script>

<template>
  <v-card class="pa-2">
    <div v-if="!todoListStore.getTodoList.length" data-test="no-todo-list">
      <span class="font-weight-bold">No Todo List</span>
    </div>
    <div v-else data-test="todo-list">
      <div v-for="(todo, index) in todoListStore.getTodoList" :key="todo">
        <div class="py-2">
          <v-icon
            data-test="remove-todo-icon"
            class="mr-2"
            icon="mdi-close-circle"
            @click="todoListStore.removeTodo(index)"
          />
          <span>{{ todo }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>
