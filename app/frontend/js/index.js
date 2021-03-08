import { createApp } from 'vue';
import App from '@/components/app.vue';
import globals from '@/globals';

const vm = createApp(App);
globals.initialize(vm);
vm.mount('#app');

export default vm;
