import { createApp } from 'vue';
import App from '@/components/app.vue';
import router from '@/router';

const vm = createApp(App);
vm.use(router);
vm.mount('#app');

export default vm;
