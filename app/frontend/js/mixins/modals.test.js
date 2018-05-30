// subject:

import modals from '@/mixins/modals';



// dependencies:

import events from '@/services/events';



// mocks:

jest.mock('@/services/events');



// mixin setup:

const component = {
  template: '<div></div>'
};

const localVue = createLocalVue();

localVue.mixin(modals);



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(component, {
    localVue
  });

  return wrapper;
}



// tests:

describe('mixin - modals', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  describe('methods.$modals.closeModal()', () => {
    beforeEach(() => {
      wrapper.vm.$closeModal('foobar');
    });

    it('emits a "modals:close" event message', () => {
      expect(events.$emit).toHaveBeenCalledWith('modals:close:foobar');
    });
  });

  describe('methods.$modals.openModal()', () => {
    beforeEach(() => {
      wrapper.vm.$openModal('foobar');
    });

    it('emits an "modals:open" event message', () => {
      expect(events.$emit).toHaveBeenCalledWith('modals:open:foobar');
    });
  });
});

