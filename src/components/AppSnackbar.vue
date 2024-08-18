<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbar';

const snackbarStore = useSnackbarStore();
</script>

<template>
  <v-snackbar
    :model-value="!!snackbarStore.message"
    :text="snackbarStore.message"
    :color="snackbarStore.color"
  />
</template>
