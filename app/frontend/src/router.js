import { createRouter, createWebHistory } from 'vue-router';
import AnotherPage from '@/components/pages/another-page.vue';
import HomePage from '@/components/pages/home-page.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/another',
    name: 'another',
    component: AnotherPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
