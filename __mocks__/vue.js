const Vue = jest.fn(() => {
  return {
    name: 'vue instance',
    $mount: jest.fn()
  };
});



Vue.component = jest.fn();
Vue.directive = jest.fn();
Vue.filter = jest.fn();
Vue.mixin = jest.fn();
Vue.use = jest.fn();

Vue.config = {};



module.exports = Vue;
