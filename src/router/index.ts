import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useSpinnerStore } from '@/stores/spinner';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/AppLogin.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/todo',
      name: 'Todo',
      component: () => import('@/views/todo-list/TodoList.vue')
    }
  ]
});

export default router;

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const spinnerStore = useSpinnerStore();

  if (!userStore.isAuthenticated && to.name !== 'Login') {
    spinnerStore.setLoading(true);
    const loginStatus = await userStore.getLoginStatus();
    spinnerStore.setLoading(false);
    if (loginStatus) return true;
    return { name: 'Login' };
  }

  if (!userStore.isAuthenticated && to.name === 'Login') {
    spinnerStore.setLoading(true);
    const loginStatus = await userStore.getLoginStatus();
    spinnerStore.setLoading(false);
    if (!loginStatus) return true;
    return { name: 'Home' };
  }

  return true;
});
