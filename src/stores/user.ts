import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { fetchLoginStatusWithApi, loginWithApi, logoutWithApi } from '@/services/auth';
import { useSpinnerStore } from './spinner';

export const useUserStore = defineStore('UserStore', () => {
  const spinnerStore = useSpinnerStore();

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

  async function logout(): Promise<void> {
    spinnerStore.setLoading(true);
    await logoutWithApi();
    spinnerStore.setLoading(false);
    _isAuthenticated.value = false;
  }

  return {
    isAuthenticated: computed(() => _isAuthenticated.value),
    authenticationFailureMsg: computed(() => _authenticationFailureMsg.value),
    getLoginStatus,
    login,
    logout
  };
});
