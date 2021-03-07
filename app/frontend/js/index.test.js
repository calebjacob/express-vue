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
import app from '@/components/app.vue';
import globals from '@/globals';

// subject:

import vue from './index.js';

// tests:

describe('vue', () => {
  it('creates a vue app instance', () => {
    expect(createApp).toHaveBeenCalledWith(app);
  });

  it('globals are initialized with vue instance', () => {
    expect(globals.initialize).toHaveBeenCalledWith(vue);
  });

  it('mounts the app', () => {
    expect(vue.mount).toHaveBeenCalledWith('#app');
  });
});
