import { createApp } from 'vue';
import App from '@/components/app.vue';
import router from '@/router';
import entrapFocus from '@/directives/entrap-focus';

const vm = createApp(App);

// Directives:

vm.directive('entrapFocus', entrapFocus);

// Plugins:

vm.use(router);

// Mount:

vm.mount('#app');

export default vm;
