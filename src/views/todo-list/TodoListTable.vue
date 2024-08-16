<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTodoListStore } from '@/stores/todoList';
import { useTablePageScaling } from '@/composables/useTablePageScaling';
import { TODO_PAGE_CONTAINER_ID } from '@/constants/pageContainerIds';
import type { VuetifyTableElement } from '@/models/common';

const todoListStore = useTodoListStore();

const headers = [
  { key: 'title', title: 'Title' },
  { key: 'description', title: 'Description' },
  { key: 'status', title: 'Status' },
  { key: 'createdAt', title: 'Created At' },
  { key: 'actions', title: 'Actions' }
];

const tableRef = ref<VuetifyTableElement | null>(null);
const { tableHeight } = useTablePageScaling(tableRef, TODO_PAGE_CONTAINER_ID);

const isTableDataLoading = ref(false);
onMounted(async () => {
  isTableDataLoading.value = true;
  await todoListStore.fetchTodos();
  isTableDataLoading.value = false;
});
</script>

<template>
  <v-data-table
    ref="tableRef"
    :headers="headers"
    :items="todoListStore.todoList"
    :loading="isTableDataLoading"
    :height="tableHeight"
    items-key="_id"
  >
  </v-data-table>
</template>
