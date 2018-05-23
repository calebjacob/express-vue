import globals from '@/globals';
import layout from '@/components/layout.vue';
import router from '@/router';
import Vue from 'vue';



// global vue configurations:

Vue.config.productionTip = false;



// initialize global vue plugins, components, directives, filters, and mixins:

globals.initialize();



// confgiure vue instance and router:

const app = new Vue({
  router,
  render(createElement) {
    return createElement(layout);
  }
});

app.$mount('#app');



export default app;
