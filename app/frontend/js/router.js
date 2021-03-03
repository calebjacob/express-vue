import { createRouter, createWebHistory } from 'vue-router';
import homePage from '@/pages/home-page.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});



export default router;
