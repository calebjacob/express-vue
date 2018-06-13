// subject:

import globals from '@/globals';



// dependencies:

import inputError from '@/components/input-error.vue';
import modal from '@/components/modal.vue';
import radioInput from '@/components/radio-input.vue';
import textInput from '@/components/text-input.vue';
import validatedForm from '@/components/validated-form.vue';

import autoFocus from '@/directives/auto-focus';
import clickOutside from 'vue-click-outside';
import dropDown from '@/directives/drop-down';
import entrapFocus from '@/directives/entrap-focus';
import maskInput from '@/directives/mask-input';

import dollars from '@/filters/dollars';
import lowercase from '@/filters/lowercase';
import moment from '@/filters/moment';

import modals from '@/mixins/modals';
import user from '@/mixins/user';

import VeeValidate from 'vee-validate';
import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';



// mocks:

jest.mock('vue');



// tests:

describe('globals', () => {
  describe('initialize()', () => {
    beforeEach(() => {
      globals.initialize();
    });

    describe('components are initialized', () => {
      it('inputError', () => {
        expect(Vue.component).toHaveBeenCalledWith('inputError', inputError);
      });

      it('modal', () => {
        expect(Vue.component).toHaveBeenCalledWith('modal', modal);
      });

      it('radioInput', () => {
        expect(Vue.component).toHaveBeenCalledWith('radioInput', radioInput);
      });

      it('textInput', () => {
        expect(Vue.component).toHaveBeenCalledWith('textInput', textInput);
      });

      it('validatedForm', () => {
        expect(Vue.component).toHaveBeenCalledWith('validatedForm', validatedForm);
      });
    });

    describe('directives are initialized', () => {
      it('autoFocus', () => {
        expect(Vue.directive).toHaveBeenCalledWith('autoFocus', autoFocus);
      });

      it('clickOutside', () => {
        expect(Vue.directive).toHaveBeenCalledWith('clickOutside', clickOutside);
      });

      it('dropDown', () => {
        expect(Vue.directive).toHaveBeenCalledWith('dropDown', dropDown);
      });

      it('entrapFocus', () => {
        expect(Vue.directive).toHaveBeenCalledWith('entrapFocus', entrapFocus);
      });

      it('maskInput', () => {
        expect(Vue.directive).toHaveBeenCalledWith('maskInput', maskInput);
      });
    });

    describe('filters are initialized', () => {
      it('dollars', () => {
        expect(Vue.filter).toHaveBeenCalledWith('dollars', dollars);
      });

      it('lowercase', () => {
        expect(Vue.filter).toHaveBeenCalledWith('lowercase', lowercase);
      });

      it('moment', () => {
        expect(Vue.filter).toHaveBeenCalledWith('moment', moment);
      });
    });

    describe('mixins are initialized', () => {
      it('modals', () => {
        expect(Vue.mixin).toHaveBeenCalledWith(modals);
      });

      it('user', () => {
        expect(Vue.mixin).toHaveBeenCalledWith(user);
      });
    });

    describe('plugins are initialized', () => {
      it('VeeValidate', () => {
        expect(Vue.use).toHaveBeenCalledWith(VeeValidate, {
          classes: true,
          events: 'input'
        });
      });

      it('VueMeta', () => {
        expect(Vue.use).toHaveBeenCalledWith(VueMeta);
      });

      it('VueRouter', () => {
        expect(Vue.use).toHaveBeenCalledWith(VueRouter);
      });
    });
  });
});
