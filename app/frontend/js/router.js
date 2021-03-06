import { createRouter, createWebHistory } from 'vue-router';
import anotherPage from '@/components/pages/another-page.vue';
import homePage from '@/components/pages/home-page.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  },
  {
    path: '/another',
    name: 'another',
    component: anotherPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
