// mocks:

jest.mock('vue', () => {
  return {
    createApp: jest.fn().mockReturnValue({
      mount: jest.fn()
    })
  };
});

jest.mock('@/components/app.vue', () => {
  return 'app component';
});

jest.mock('@/globals', () => {
  return {
    initialize: jest.fn()
  };
});

// dependencies:

import { createApp } from 'vue';
import App from '@/components/app.vue';
import globals from '@/globals';

// subject:

import vm from './index.js';

// tests:

describe('index', () => {
  it('creates a vue instance with the primary App component', () => {
    expect(createApp).toHaveBeenCalledWith(App);
  });

  it('globals are initialized with vue instance', () => {
    expect(globals.initialize).toHaveBeenCalledWith(vm);
  });

  it('mounts the app', () => {
    expect(vm.mount).toHaveBeenCalledWith('#app');
  });
});
