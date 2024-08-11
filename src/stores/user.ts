import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { fetchLoginStatusWithApi, loginWithApi } from '@/services/auth';

export const useUserStore = defineStore('UserStore', () => {
  const _isAuthenticated = ref(false);

  async function getLoginStatus() {
    _isAuthenticated.value = await fetchLoginStatusWithApi();
    return _isAuthenticated.value;
  }

  async function login(email: string, password: string) {
    const data = await loginWithApi(email, password);
    if (data) {
      _isAuthenticated.value = true;
    }
  }

  return {
    isAuthenticated: computed(() => _isAuthenticated.value),
    getLoginStatus,
    login
  };
});
