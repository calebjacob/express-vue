// Subject:

import router from '@/router';

// Dependencies:

import { createRouter, createWebHistory } from 'vue-router';
import CreateAccountPage from '@/components/pages/create-account-page.vue';
import ErrorPage from '@/components/pages/error-page.vue';
import HomePage from '@/components/pages/home-page.vue';
import SignInPage from '@/components/pages/sign-in-page.vue';

// Mocks:

jest.mock('vue-router', () => {
  return {
    createRouter: jest.fn().mockReturnValue('mock router instance'),
    createWebHistory: jest.fn().mockReturnValue('mock web history instance')
  };
});

// Tests:

describe('router', () => {
  it('creates a router instance', () => {
    expect(createWebHistory).toBeCalled();
    expect(createRouter).toBeCalledWith({
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
