import MyExample from '@/components/globals/my-example.vue';
import router from '@/router';

function components(vm) {
  vm.component('MyExample', MyExample);
}

function plugins(vm) {
  vm.use(router);
}

const globals = {
  initialize(vm) {
    plugins(vm);
    components(vm);
  }
};

export default globals;
