// subject:

import autoFocus from '@/directives/auto-focus';



// directive setup:

const component = {
  template: '<input type="text" v-auto-focus>'
};

const localVue = createLocalVue();

localVue.directive('autoFocus', autoFocus);



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(component, {
    localVue
  });

  return wrapper;
}



// tests:

describe('directive - autoFocus', () => {
  let input;
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();

    input = wrapper.element;

    jest.spyOn(input, 'focus');
  });

  describe('when the input is inserted into the DOM', () => {
    beforeEach(() => {
      autoFocus.inserted(input);
    });

    it('focuses the input', () => {
      expect(input.focus).toHaveBeenCalled();
    });
  });
});
