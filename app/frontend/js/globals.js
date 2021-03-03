import myExampleComponent from '@/components/my-example.vue';
import router from '@/router';
import store from '@/store';



function components(vue) {
  vue.component('myExample', myExampleComponent);
}



function directives(vue) {}



function mixins(vue) {}



function plugins(vue) {
  vue.use(store);
  vue.use(router);
}



const globals = {
  initialize(vue) {
    plugins(vue);
    components(vue);
    directives(vue);
    mixins(vue);
  }
};



export default globals;
