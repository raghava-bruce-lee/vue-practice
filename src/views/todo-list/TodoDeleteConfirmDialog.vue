<script setup lang="ts">
import { ref } from 'vue';
import { useTodoListStore } from '@/stores/todoList';

const props = defineProps<{ id: string }>();

const isloading = ref(false);
const todoListStore = useTodoListStore();
const deleteHandler = async (callBackFun: Function) => {
  isloading.value = true;
  await todoListStore.deleteTodo(props.id);
  isloading.value = false;
  callBackFun();
};
</script>

<template>
  <v-dialog max-width="500" :persistent="isloading">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" icon="mdi-delete" variant="text" />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this Todo?</v-card-title>
        <section class="mt-6 pa-2 d-flex">
          <v-btn
            text="Cancel"
            class="ml-auto mr-2"
            :disabled="isloading"
            @click="isActive.value = false"
          />
          <v-btn
            color="primary"
            text="Ok"
            :loading="isloading"
            @click="() => deleteHandler(() => (isActive.value = false))"
          />
        </section>
      </v-card>
    </template>
  </v-dialog>
</template>
