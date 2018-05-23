// subject:

import app from '@/index';



// dependencies:

import globals from '@/globals';
import layout from '@/components/layout.vue';
import router from '@/router';
import Vue from 'vue';



// mocks:

jest.mock('@/globals', () => {
  return {
    initialize: jest.fn()
  };
});

jest.mock('@/router', () => {
  return 'router config';
});

jest.mock('vue');



// tests:

describe('app', () => {
  it('show production tip is set to false', () => {
    expect(Vue.config.productionTip).toEqual(false);
  });

  it('global vue components, directives, etc. are initialized', () => {
    expect(globals.initialize).toHaveBeenCalled();
  });

  it('vue instance is configured', () => {
    const createElement = jest.fn(() => {
      return 'created element';
    });

    expect(Vue.mock.calls[0]).toHaveLength(1);
    expect(Vue.mock.calls[0][0].router).toEqual(router);
    expect(Vue.mock.calls[0][0].render).toBeTruthy();

    const renderResult = Vue.mock.calls[0][0].render(createElement);

    expect(createElement).toHaveBeenCalledWith(layout);
    expect(renderResult).toEqual('created element');
  });

  it('vue instance is exported', () => {
    expect(app.name).toEqual('vue instance');
  });
});
