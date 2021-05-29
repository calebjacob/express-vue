import { createRouter, createWebHistory } from 'vue-router';
import CreateAccountPage from '@/components/pages/create-account-page.vue';
import ErrorPage from '@/components/pages/error-page.vue';
import HomePage from '@/components/pages/home-page.vue';
import SignInPage from '@/components/pages/sign-in-page.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/create-account',
    name: 'createAccount',
    component: CreateAccountPage
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: SignInPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: ErrorPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
