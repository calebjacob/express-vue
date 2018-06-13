import fourOhFour from '@/components/four-oh-four.vue';
import home from '@/components/home.vue';
import otherPage from '@/components/other-page.vue';

import VueRouter from 'vue-router';



const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },

    {
      path: '/other-page',
      name: 'otherPage',
      component: otherPage
    },

    {
      path: '*',
      name: 'fourOhFour',
      component: fourOhFour
    }
  ]
});



export default router;
