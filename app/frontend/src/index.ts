import { createApp } from 'vue';
import App from '@/components/app.vue';
import configureVeeValidate from '@/helpers/configure-vee-validate';
import router from '@/router';

configureVeeValidate();

const vm = createApp(App);
vm.use(router);
vm.mount('#app');

export default vm;
