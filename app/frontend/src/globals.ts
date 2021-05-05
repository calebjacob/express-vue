import { App } from 'vue';
import CheckboxInput from '@/components/globals/checkbox-input.vue';
import RadioInput from '@/components/globals/radio-input.vue';
import TextInput from '@/components/globals/text-input.vue';
import ValidatedForm from '@/components/globals/validated-form.vue';
import configureVeeValidate from '@/helpers/configure-vee-validate';
import router from '@/router';

function components(vm: App) {
  vm.component('CheckboxInput', CheckboxInput);
  vm.component('RadioInput', RadioInput);
  vm.component('TextInput', TextInput);
  vm.component('ValidatedForm', ValidatedForm);
}

function plugins(vm: App) {
  configureVeeValidate();
  vm.use(router);
}

const globals = {
  initialize(vm: App) {
    plugins(vm);
    components(vm);
  }
};

export default globals;
