<script setup lang="ts">
import { HOME, LOGIN, TODO } from '@/router/constants';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const drawer = ref(true);

const router = useRouter();
const titleClickHandler = () => {
  router.replace({ name: HOME.name });
};

const userStore = useUserStore();
const logoutHandler = () => {
  userStore.logout();
  router.replace({ name: LOGIN.name });
};
</script>

<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
    <v-toolbar-title class="cursor-pointer" @click="titleClickHandler">
      Vue Practice
    </v-toolbar-title>
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" icon="mdi-account" variant="text" />
      </template>
      <v-list>
        <v-list-item
          title="Logout"
          value="logout"
          prepend-icon="mdi-logout"
          @click="logoutHandler"
        />
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" dark>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-format-list-checks" value="todos" :to="{ name: TODO.name }">
        <span class="text-button">Todos</span>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
