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

import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';



function components() {
  Vue.component('inputError', inputError);
  Vue.component('modal', modal);
  Vue.component('radioInput', radioInput);
  Vue.component('textInput', textInput);
  Vue.component('validatedForm', validatedForm);
}



function directives() {
  Vue.directive('autoFocus', autoFocus);
  Vue.directive('clickOutside', clickOutside); // TEST
  Vue.directive('dropDown', dropDown);
  Vue.directive('entrapFocus', entrapFocus);
  Vue.directive('maskInput', maskInput);
}



function filters() {
  Vue.filter('dollars', dollars);
  Vue.filter('lowercase', lowercase);
  Vue.filter('moment', moment);
}



function mixins() {
  Vue.mixin(modals);
  Vue.mixin(user);
}



function plugins() {
  Vue.use(VeeValidate, {
    classes: true,
    events: 'input'
  });

  Vue.use(VueMeta);
  Vue.use(VueRouter);
}



const globals = {
  initialize() {
    components();
    directives();
    filters();
    mixins();
    plugins();
  }
};



export default globals;
