<script setup lang="ts">
import { computed, ref } from 'vue';
import { TODO_STATUS } from '@/models/todo';
import { TodoStatus } from '../constants';
import { useTodoListStore } from '@/stores/todoList';

const props = withDefaults(
  defineProps<{
    udpateTodo?: boolean;
    id?: string;
    title?: string;
    description?: string;
    status?: TODO_STATUS;
  }>(),
  {
    title: '',
    description: '',
    status: TODO_STATUS.NOT_STARTED
  }
);

const todoStore = useTodoListStore();

const index = computed(() => {
  if (!props.id) return undefined;
  return todoStore.todoList.findIndex((todo) => todo._id === props.id);
});

const originalSelectOptions = Object.values(TODO_STATUS).map((status) => ({
  title: TodoStatus[status],
  value: status
}));
const selectOptions = computed(() => {
  if (props.udpateTodo) return originalSelectOptions;
  return originalSelectOptions.filter((options) => options.value !== TODO_STATUS.DONE);
});

const _title = ref(props.title);
const _description = ref(props.description);
const _status = ref(props.status);

const mainButtonText = computed(() => (props.udpateTodo ? 'Update' : 'Create'));
const disableMainButton = computed(() => {
  if (props.udpateTodo && props.id !== undefined && index.value !== undefined) {
    return (
      todoStore.todoList[index.value].title === _title.value &&
      todoStore.todoList[index.value].description === _description.value &&
      todoStore.todoList[index.value].status === _status.value
    );
  }

  return !_title.value.trim().length;
});

const isloading = ref(false);
const saveHandler = async (callBackFun: Function) => {
  isloading.value = true;

  if (props.udpateTodo && props.id && index.value) {
    await todoStore.updateTodo(
      props.id,
      index.value,
      _title.value,
      _description.value,
      _status.value
    );
  } else {
    await todoStore.createTodo(_title.value, _description.value, _status.value);
    _title.value = '';
    _description.value = '';
    _status.value = TODO_STATUS.NOT_STARTED;
  }

  isloading.value = false;
  callBackFun();
};
</script>

<template>
  <v-dialog max-width="500" :persistent="isloading">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-if="udpateTodo" v-bind="activatorProps" icon="mdi-pencil" variant="text" />
      <v-btn v-else v-bind="activatorProps" color="primary" text="Create" class="ml-auto" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :title="udpateTodo ? 'Update todo' : 'Create Todo'">
        <v-container>
          <v-text-field v-model="_title" color="primary" label="Title" variant="underlined" />
          <v-textarea
            v-model="_description"
            color="primary"
            label="Description"
            variant="underlined"
            clearable
            rows="3"
          />
          <v-select v-model="_status" label="Status" :items="selectOptions" variant="underlined" />

          <section class="mt-6 d-flex">
            <v-btn
              text="Close"
              class="ml-auto mr-3"
              :disabled="isloading"
              @click="isActive.value = false"
            />
            <v-btn
              color="primary"
              :text="mainButtonText"
              :disabled="disableMainButton"
              :loading="isloading"
              @click="() => saveHandler(() => (isActive.value = false))"
            />
          </section>
        </v-container>
      </v-card>
    </template>
  </v-dialog>
</template>
