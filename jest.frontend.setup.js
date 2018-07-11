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

Vue.config.warnHandler = (message, vm, trace) => {

  if (
    message.indexOf('Unknown custom element') === -1 &&
    message.indexOf('Failed to resolve directive') === -1 &&
    message.indexOf('Failed to resolve filter') === -1 &&
    message.indexOf('Avoid mutating a prop directly') === -1
  ) {
    console.error(message);
    console.log(trace);
  }
};

global.createLocalVue = vueTestUtils.createLocalVue;
global.mount = vueTestUtils.mount;
global.shallowMount = vueTestUtils.shallowMount;
