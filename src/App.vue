<script setup lang="ts">
import DefaultLayout from './layouts/DefaultLayout.vue';
import { useSpinnerStore } from './stores/spinner';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
const spinnerStore = useSpinnerStore();
</script>

<template>
  <v-app>
    <v-main class="bg-blue-lighten-5">
      <div v-if="spinnerStore.isloading" class="spinner-container">
        <v-progress-circular color="blue-darken-1" indeterminate :size="80" :width="9" />
      </div>
      <DefaultLayout v-if="userStore.isAuthenticated" />
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.spinner-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
