import Vue from 'vue';
import vueTestUtils from '@vue/test-utils';



jest.unmock('vue');

jest.setTimeout(500);

Vue.mixin({
  data() {
    return {
      errors: {
        first() {}
      }
    };
  }
});

Vue.config.warnHandler = () => {};

global.createLocalVue = vueTestUtils.createLocalVue;
global.mount = vueTestUtils.mount;
global.shallowMount = vueTestUtils.shallowMount;
