import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useSpinnerStore = defineStore('SpinnerStore', () => {
  const _isLoading = ref(false);

  function setLoading(value: boolean) {
    _isLoading.value = value;
  }

  return {
    isloading: computed(() => _isLoading.value),
    setLoading
  };
});
