<script lang="ts" setup>
import TodoInputReader from './TodoListInputReader.vue';
import ListRenderer from './ListRenderer.vue';
</script>

<template>
  <v-row class="my-4 mx-8">
    <v-col>
      <TodoInputReader />
    </v-col>
    <v-col>
      <ListRenderer />
    </v-col>
  </v-row>
</template>
