<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { HOME } from '@/router/constants';
import NotificationBar from './NotificationBar.vue';

const router = useRouter();
const userStore = useUserStore();

const username = ref('');
const password = ref('');
const isloading = ref(false);

async function loginHanlder() {
  isloading.value = true;
  await userStore.login(username.value.trim(), password.value.trim());
  isloading.value = false;
  if (userStore.isAuthenticated) router.push({ name: HOME.name });
}
</script>

<template>
  <v-card class="mx-auto my-16" title="Login" max-width="400">
    <v-container>
      <v-text-field v-model="username" color="primary" label="Username" variant="underlined" />
      <v-text-field
        v-model="password"
        type="password"
        color="primary"
        label="Password"
        variant="underlined"
      />
      <NotificationBar
        v-if="userStore.authenticationFailureMsg"
        type="error"
        :text="userStore.authenticationFailureMsg"
      />
      <v-btn class="mt-2" color="primary" :loading="isloading" @click="loginHanlder">Login</v-btn>
    </v-container>
  </v-card>
</template>
