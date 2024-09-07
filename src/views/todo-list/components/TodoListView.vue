<script setup lang="ts">
import { TODO_PAGE_CONTAINER_ID } from '@/constants/pageContainerIds';
import TodoListTable from './TodoListTable.vue';
import TodoListDialog from './TodoListDialog.vue';
</script>

<template>
  <section :id="TODO_PAGE_CONTAINER_ID" class="my-4 mx-8">
    <v-card class="d-flex flex-column pa-3">
      <section class="d-flex pb-3">
        <TodoListDialog />
      </section>
      <TodoListTable />
    </v-card>
  </section>
</template>
