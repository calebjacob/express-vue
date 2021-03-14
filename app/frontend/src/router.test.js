// mocks:

jest.mock('vue-router', () => {
  return {
    createRouter: jest.fn().mockReturnValue('mock router instance'),
    createWebHistory: jest.fn().mockReturnValue('mock web history instance')
  };
});

// dependencies:

import { createRouter, createWebHistory } from 'vue-router';
import AnotherPage from '@/components/pages/another-page.vue';
import HomePage from '@/components/pages/home-page.vue';

// subject:

import router from '@/router';

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
          path: '/another',
          name: 'another',
          component: AnotherPage
        }
      ]
    });
  });

  it('exports the router instance', () => {
    expect(router).toEqual('mock router instance');
  });
});
