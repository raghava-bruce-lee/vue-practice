import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useSnackbarStore = defineStore('SnackbarStore', () => {
  const _message = ref('');
  const _color = ref('');

  function addSuccessSnackbar(msg: string) {
    _color.value = 'green';
    _message.value = msg;
  }

  function addFailureSnackbar(msg: string) {
    _color.value = 'red';
    _message.value = msg;
  }

  return {
    message: computed(() => _message.value),
    color: computed(() => _color.value),
    addSuccessSnackbar,
    addFailureSnackbar
  };
});
