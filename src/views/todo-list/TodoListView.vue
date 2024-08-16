<script setup lang="ts">
import { TODO_PAGE_CONTAINER_ID } from '@/constants/pageContainerIds';
import TodoListTable from './TodoListTable.vue';
</script>

<template>
  <section :id="TODO_PAGE_CONTAINER_ID" class="my-4 mx-8">
    <v-card class="d-flex flex-column pa-2">
      <section class="d-flex pb-2">
        <v-btn class="ml-auto" color="primary">Create</v-btn>
      </section>
      <TodoListTable />
    </v-card>
  </section>
</template>
