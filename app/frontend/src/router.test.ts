// subject:

import router from '@/router';

// dependencies:

import { createRouter, createWebHistory } from 'vue-router';
import CreateAccountPage from '@/components/pages/create-account-page.vue';
import ErrorPage from '@/components/pages/error-page.vue';
import HomePage from '@/components/pages/home-page.vue';
import SignInPage from '@/components/pages/sign-in-page.vue';

// mocks:

jest.mock('vue-router', () => {
  return {
    createRouter: jest.fn().mockReturnValue('mock router instance'),
    createWebHistory: jest.fn().mockReturnValue('mock web history instance')
  };
});

// tests:

describe('router', () => {
  it('creates a router instance', () => {
    expect(createWebHistory).toHaveBeenCalled();
    expect(createRouter).toHaveBeenCalledWith({
      history: 'mock web history instance',
      routes: [
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
      ]
    });
  });

  it('exports the router instance', () => {
    expect(router).toEqual('mock router instance');
  });
});
