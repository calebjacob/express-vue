// subject:

import vm from './index';

// dependencies:

import { createApp } from 'vue';
import App from '@/components/app.vue';
import configureVeeValidate from '@/helpers/configure-vee-validate';
import router from '@/router';

// mocks:

jest.mock('vue', () => {
  return {
    createApp: jest.fn().mockReturnValue({
      mount: jest.fn(),
      use: jest.fn()
    })
  };
});

jest.mock('@/router', () => {
  return 'router config';
});

jest.mock('@/components/app.vue', () => {
  return 'app component';
});

jest.mock('@/helpers/configure-vee-validate', () => {
  return jest.fn();
});

// tests:

describe('index', () => {
  it('configures vee validate', () => {
    expect(configureVeeValidate).toBeCalled();
  });

  it('creates a vue instance with the primary App component', () => {
    expect(createApp).toBeCalledWith(App);
  });

  it('registers router', () => {
    expect(vm.use).toBeCalledWith(router);
  });

  it('mounts the app', () => {
    expect(vm.mount).toBeCalledWith('#app');
  });
});
