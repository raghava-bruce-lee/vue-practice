import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useSpinnerStore } from '@/stores/spinner';
import { HOME, LOGIN, TODO } from './constants';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: LOGIN.path,
      name: LOGIN.name,
      component: () => import('../components/AppLogin.vue')
    },
    {
      path: HOME.path,
      name: HOME.name,
      component: HomeView
    },
    {
      path: TODO.path,
      name: TODO.name,
      component: () => import('@/views/todo-list/TodoListView.vue')
    },
    {
      path: '/:notFound',
      name: 'Not Found',
      redirect: HOME.path
    }
  ]
});

export default router;

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const spinnerStore = useSpinnerStore();

  if (!userStore.isAuthenticated) {
    spinnerStore.setLoading(true);
    const loginStatus = await userStore.getLoginStatus();
    spinnerStore.setLoading(false);

    if (to.name !== LOGIN.name) {
      if (loginStatus) return true;
      return { name: LOGIN.name };
    } else {
      if (!loginStatus) return true;
      return { name: HOME.name };
    }
  }

  return true;
});
