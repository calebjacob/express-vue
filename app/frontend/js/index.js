import { createApp } from 'vue';
import app from '@/components/app.vue';
// import globals from '@/globals';
import router from '@/router';
import store from '@/store';

createApp(app)
  .use(store)
  .use(router)
  .mount('#app');
