import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Tasks from './pages/Tasks.vue';

const routes = [
  { path: '/', redirect: '/tasks' },
  { path: '/login', component: Login },
  { path: '/tasks', component: Tasks, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) return next('/login');
  if (to.path === '/login' && token) return next('/tasks');
  next();
});

export default router;
