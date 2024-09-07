<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useTodoListStore } from '@/stores/todoList';
import { useTablePageScaling } from '@/composables/useTablePageScaling';
import { TODO_PAGE_CONTAINER_ID } from '@/constants/pageContainerIds';
import type { TitleValuePair, VuetifyTableElement } from '@/models/common';
import { TODO_STATUS, type TodoTableData } from '@/models/todo';
import { TodoStatus } from '../constants';
import { format } from 'date-fns';
import TodoListDialog from './TodoListDialog.vue';
import TodoDeleteConfirmDialog from './TodoDeleteConfirmDialog.vue';
import TruncateTextWithTooltip from '@/components/TruncateTextWithTooltip.vue';
import TableHeaderCustomFilter from '@/components/TableHeaderCustomFilter.vue';
import { applyFilters } from '../functions/filter-todo-list-table';
import cloneDeep from 'lodash/cloneDeep';

const todoListStore = useTodoListStore();

const headers = [
  { key: 'title', title: 'Title' },
  { key: 'description', title: 'Description', width: 300 },
  { key: 'status', title: 'Status', sortable: false },
  { key: 'createdAt', title: 'Created At' },
  { key: 'actions', title: 'Actions', sortable: false }
];

const originalItems = ref<TodoTableData[]>([]);
const filteredItems = ref<TodoTableData[]>([]);
watch(
  () => todoListStore.todoList,
  (_todoList) => {
    originalItems.value = _todoList.map((todo) => ({
      ...todo,
      actions: todo
    }));
    filteredItems.value = cloneDeep(originalItems.value);
  },
  {
    immediate: true
  }
);

const tableRef = ref<VuetifyTableElement | null>(null);
const { tableHeight } = useTablePageScaling(tableRef, TODO_PAGE_CONTAINER_ID);

const isTableDataLoading = ref(false);
onMounted(async () => {
  isTableDataLoading.value = true;
  await todoListStore.fetchTodos();
  isTableDataLoading.value = false;
});

const getChipColor = (status: TODO_STATUS) => {
  switch (status) {
    case TODO_STATUS.NOT_STARTED:
      return 'default';
    case TODO_STATUS.IN_PROGRESS:
      return 'primary';
    case TODO_STATUS.DONE:
      return 'green';
  }
};

const statusList = Object.values(TODO_STATUS).map((status) => ({
  title: TodoStatus[status],
  value: status
}));

const selectedStatusFilter = ref<TitleValuePair[]>([]);
const onStatusFilterSelected = (options: TitleValuePair[]) => {
  selectedStatusFilter.value = options;
  filterRows();
};

const filterRows = () => {
  filteredItems.value = applyFilters(originalItems.value, selectedStatusFilter.value);
};
</script>

<template>
  <v-data-table
    ref="tableRef"
    class="todo-data-table elevation-2"
    :headers="headers"
    :items="filteredItems"
    :loading="isTableDataLoading"
    :height="tableHeight"
    fixed-header
    items-key="_id"
  >
    <template #header.status="{ column }">
      <TableHeaderCustomFilter
        :header-title="`${column.title}`"
        :options-list="statusList"
        :pre-selected-options="selectedStatusFilter"
        @selected-options="onStatusFilterSelected"
      />
    </template>
    <template #item.description="{ value }">
      <TruncateTextWithTooltip :text="value" max-width="250px" />
    </template>
    <template #item.status="{ value }">
      <v-chip variant="flat" :color="getChipColor(value)">
        {{ TodoStatus[value as TODO_STATUS] }}
      </v-chip>
    </template>
    <template #item.createdAt="{ value }">
      {{ format(value, 'dd-MM-yyyy') }}
    </template>
    <template #item.actions="{ value }">
      <section>
        <TodoListDialog
          udpate-todo
          :id="value._id"
          :title="value.title"
          :description="value.description"
          :status="value.status"
        />
        <TodoDeleteConfirmDialog :id="value._id" />
      </section>
    </template>
  </v-data-table>
</template>

<style scoped>
.todo-data-table :deep(thead th),
.todo-data-table :deep(.v-data-table-footer) {
  background-color: #eeeeee !important;
}
</style>
