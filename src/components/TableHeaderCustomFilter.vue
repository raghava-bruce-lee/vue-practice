<script setup lang="ts">
import type { TitleValuePair } from '@/models/common';
import { ref, watch } from 'vue';

const props = defineProps<{
  headerTitle: string;
  optionsList: TitleValuePair[];
  preSelectedOptions: TitleValuePair[];
}>();

const emits = defineEmits<{
  (event: 'selectedOptions', value: TitleValuePair[]): void;
}>();

const selectedOptions = ref<number[]>([]);
watch(
  () => props.preSelectedOptions,
  () => {
    selectedOptions.value = props.preSelectedOptions
      .map((selectedItem) => {
        return props.optionsList.findIndex((item) => item.value === selectedItem.value);
      })
      .filter((index) => index !== -1);
  },
  { immediate: true }
);

const updateSelectedHandler = (selectedList: number[]) => {
  const _selectedOptions = selectedList.map((optionIndex) => props.optionsList[optionIndex]);
  emits('selectedOptions', _selectedOptions);
};
</script>

<template>
  <span class="pr-2">{{ headerTitle }}</span>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-icon v-if="!preSelectedOptions.length" v-bind="props" icon="mdi-menu-down" />
      <v-icon v-else v-bind="props" icon="mdi-filter" />
    </template>
    <v-list
      v-model:selected="selectedOptions"
      select-strategy="classic"
      @update:selected="updateSelectedHandler"
    >
      <v-list-item v-for="(item, index) in optionsList" :key="index" :value="index">
        <template #prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive" />
          </v-list-item-action>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
