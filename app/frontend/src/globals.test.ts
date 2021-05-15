// subject:

import globals from '@/globals';

// dependencies:

import { mock } from 'jest-mock-extended';
import { App } from 'vue';
import CheckboxInput from '@/components/globals/checkbox-input.vue';
import RadioInput from '@/components/globals/radio-input.vue';
import TextInput from '@/components/globals/text-input.vue';
import ValidatedForm from '@/components/globals/validated-form.vue';
import configureVeeValidate from '@/helpers/configure-vee-validate';
import router from '@/router';

// mocks:

jest.mock('@/router', () => {
  return 'mocked router object';
});

jest.mock('@/helpers/configure-vee-validate', () => {
  return jest.fn();
});

// tests:

describe('globals', () => {
  let vm: App;

  beforeEach(() => {
    vm = mock<App>();

    jest.clearAllMocks();
  });

  it('is true', () => {
    expect(true).toEqual(true);
  });

  describe('initialize()', () => {
    beforeEach(() => {
      globals.initialize(vm);
    });

    describe('plugins()', () => {
      it('configures VeeValidated', () => {
        expect(configureVeeValidate).toHaveBeenCalled();
      });

      it('configures the router', () => {
        expect(vm.use).toHaveBeenCalledWith(router);
      });
    });

    describe('components()', () => {
      it('registers the correct amount of components', () => {
        expect(vm.component).toHaveBeenCalledTimes(4);
      });

      it('registers the CheckboxInput component', () => {
        expect(vm.component).toHaveBeenCalledWith(
          'CheckboxInput',
          CheckboxInput
        );
      });

      it('registers the RadioInput component', () => {
        expect(vm.component).toHaveBeenCalledWith('RadioInput', RadioInput);
      });

      it('registers the TextInput component', () => {
        expect(vm.component).toHaveBeenCalledWith('TextInput', TextInput);
      });

      it('registers the ValidatedForm component', () => {
        expect(vm.component).toHaveBeenCalledWith(
          'ValidatedForm',
          ValidatedForm
        );
      });
    });
  });
});
