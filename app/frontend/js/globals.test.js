// mocks:

jest.mock('@/components/globals/my-example.vue', () => {
  return 'my-example component';
});

jest.mock('@/router', () => {
  return 'router instance';
});

const vue = {
  component: jest.fn(),
  use: jest.fn()
};

// dependencies:

import myExampleComponent from '@/components/globals/my-example.vue';
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
      globals.initialize(vue);
    });

    describe('plugins()', () => {
      it('configures the router', () => {
        expect(vue.use).toHaveBeenCalledWith(router);
      });
    });

    describe('components()', () => {
      it('registers the correct amount of components', () => {
        expect(vue.component).toHaveBeenCalledTimes(1);
      });

      it('registers the myExample component', () => {
        expect(vue.component).toHaveBeenCalledWith(
          'myExample',
          myExampleComponent
        );
      });
    });
  });
});
