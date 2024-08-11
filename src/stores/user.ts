import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { fetchLoginStatusWithApi, loginWithApi } from '@/services/auth';

export const useUserStore = defineStore('UserStore', () => {
  const _isAuthenticated = ref(false);
  const _authenticationFailureMsg = ref('');

  async function getLoginStatus() {
    _isAuthenticated.value = await fetchLoginStatusWithApi();
    return _isAuthenticated.value;
  }

  async function login(email: string, password: string): Promise<void> {
    try {
      const status = await loginWithApi(email, password);
      if (status === 200) {
        _isAuthenticated.value = true;
        _authenticationFailureMsg.value = '';
      }
    } catch (error: any) {
      _authenticationFailureMsg.value = error.response.data.message;
    }
  }

  return {
    isAuthenticated: computed(() => _isAuthenticated.value),
    authenticationFailureMsg: computed(() => _authenticationFailureMsg.value),
    getLoginStatus,
    login
  };
});
