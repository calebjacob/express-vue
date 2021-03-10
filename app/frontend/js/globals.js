import rules from '@vee-validate/rules';
import MyExample from '@/components/globals/my-example.vue';
import TextInput from '@/components/globals/text-input.vue';
import ValidatedForm from '@/components/globals/validated-form.vue';
import router from '@/router';
import { defineRule } from 'vee-validate';

function components(vm) {
  vm.component('MyExample', MyExample);
  vm.component('TextInput', TextInput);
  vm.component('ValidatedForm', ValidatedForm);
}

function plugins(vm) {
  vm.use(router);

  // TODO: Import correct "en" locale dictionary as seen here: https://codesandbox.io/s/global-rules-playground-hd5r8?from-embed=&file=/src/locales.js:545-555

  Object.keys(rules).forEach(rule => {
    defineRule(rule, rules[rule]);
  });
}

const globals = {
  initialize(vm) {
    plugins(vm);
    components(vm);
  }
};

export default globals;
