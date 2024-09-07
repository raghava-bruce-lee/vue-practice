<script setup lang="ts">
import { ref, watchEffect, nextTick } from 'vue';

const props = defineProps<{
  text: string;
  maxWidth: string;
}>();

const textElement = ref<HTMLElement | null>(null);
const isTruncatedText = ref(false);

watchEffect(() => {
  if (props.text) {
    nextTick(() => {
      if (textElement.value) {
        isTruncatedText.value = textElement.value.scrollWidth > textElement.value.clientWidth;
      }
    });
  }
});
</script>

<template>
  <v-tooltip v-if="isTruncatedText" :text="text" :max-width="500" location="top">
    <template v-slot:activator="{ props }">
      <p v-bind="props" class="text-truncate">{{ text }}</p>
    </template>
  </v-tooltip>
  <p v-else ref="textElement" class="text-truncate">{{ text }}</p>
</template>

<style scoped>
.text-truncate {
  max-width: v-bind(maxWidth);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
