// mocks:

jest.mock('@/components/globals/my-example.vue', () => {
  return 'my-example component';
});

jest.mock('@/router', () => {
  return 'router instance';
});

const vm = {
  component: jest.fn(),
  use: jest.fn()
};

// dependencies:

import MyExample from '@/components/globals/my-example.vue';
import router from '@/router';

// subject:

import globals from '@/globals';

// tests:

describe('globals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initialize()', () => {
    beforeEach(() => {
      globals.initialize(vm);
    });

    describe('plugins()', () => {
      it('configures the router', () => {
        expect(vm.use).toHaveBeenCalledWith(router);
      });
    });

    describe('components()', () => {
      it('registers the correct amount of components', () => {
        expect(vm.component).toHaveBeenCalledTimes(1);
      });

      it('registers the MyExample component', () => {
        expect(vm.component).toHaveBeenCalledWith('MyExample', MyExample);
      });
    });
  });
});
