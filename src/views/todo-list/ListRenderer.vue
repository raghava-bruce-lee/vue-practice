<script setup lang="ts">
import { ref } from 'vue';
import { useTodoListStore } from '@/stores/todoList';

const todoListStore = useTodoListStore();
const todoList = ref(todoListStore.todoList);
</script>

<template>
  <v-card class="pa-2">
    <div v-if="!todoList.length">
      <span class="font-weight-bold">No Todo List</span>
    </div>
    <div v-else>
      <div v-for="(todo, index) in todoList" :key="todo">
        <div class="py-2 cursor-move">
          <v-icon class="mr-2" icon="mdi-close-circle" @click="todoListStore.removeTodo(index)" />
          <span>{{ todo }}</span>
        </div>
      </div>
    </div>
  </v-card>
</template>
