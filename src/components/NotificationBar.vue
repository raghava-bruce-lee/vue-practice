<script setup lang="ts">
defineProps<{
  type: 'error' | 'warning';
  text: string;
}>();
</script>

<template>
  <v-sheet :height="40" :color="type" rounded class="d-flex align-center justify-center">
    {{ text }}
  </v-sheet>
</template>
