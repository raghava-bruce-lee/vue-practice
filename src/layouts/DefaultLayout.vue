<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(true);

const router = useRouter();
function titleClickHandler() {
  router.replace({ name: 'Home' });
}
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
        <v-list-item title="Logout" value="logout" />
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" dark>
    <v-list nav>
      <v-list-item title="Todo" value="todo" :to="{ name: 'Todo' }" />
    </v-list>
  </v-navigation-drawer>
</template>
