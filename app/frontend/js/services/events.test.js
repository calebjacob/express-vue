// subject:

import events from '@/services/events';



// dependencies:

import Vue from 'vue';



// mocks:

jest.mock('vue');



// tests:

describe('service - events', () => {
  it('default vue instance is configured', () => {
    expect(Vue).toHaveBeenCalled();
  });

  it('vue instance is exported', () => {
    expect(events.name).toEqual('vue instance');
  });
});
