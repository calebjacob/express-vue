// subject:

import entrapFocus from '@/directives/entrap-focus';



// directive setup:

const component = {
  template: `
    <div v-entrap-focus>
      <input type="text" id="first">
      <button type="button" id="second">Click Me</button>
      <textarea id="third"></textarea>
      <select id="last"></select>
    </div>
  `
};

const localVue = createLocalVue();

localVue.directive('entrapFocus', entrapFocus);



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(component, {
    localVue
  });

  return wrapper;
}



// tests:

describe('directive - entrapFocus', () => {
  let firstInput;
  let lastInput;
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = createWrapper();

    firstInput = wrapper.element.querySelector('#first');
    lastInput = wrapper.element.querySelector('#last');

    jest.spyOn(firstInput, 'focus');
    jest.spyOn(lastInput, 'focus');

    entrapFocus.inserted(wrapper.element);
  });



  describe('when the input is inserted into the DOM', () => {
    it('automatically focuses the first input', () => {
      expect(firstInput.focus).toHaveBeenCalled();
    });
  });



  describe('when tabbing downwards', () => {
    let keydownEvent;

    beforeEach(() => {
      keydownEvent = new Event('keydown');
      keydownEvent.keyCode = 9;
      keydownEvent.shiftKey = false;

      jest.spyOn(keydownEvent, 'preventDefault');
    });

    describe('when currently focused in first input', () => {
      beforeEach(() => {
        firstInput.dispatchEvent(keydownEvent);
      });

      it('does not preventDefault()', () => {
        expect(keydownEvent.preventDefault).toHaveBeenCalledTimes(0);
      });

      it('does not focus last input', () => {
        expect(lastInput.focus).toHaveBeenCalledTimes(0);
      });
    });

    describe('when currently focused in last input', () => {
      beforeEach(() => {
        lastInput.dispatchEvent(keydownEvent);
      });

      it('does preventDefault()', () => {
        expect(keydownEvent.preventDefault).toHaveBeenCalled();
      });

      it('focuses first input', () => {
        expect(firstInput.focus).toHaveBeenCalled();
      });
    });
  });



  describe('when tabbing upwards', () => {
    let keydownEvent;

    beforeEach(() => {
      keydownEvent = new Event('keydown');
      keydownEvent.keyCode = 9;
      keydownEvent.shiftKey = true;

      jest.clearAllMocks();

      jest.spyOn(keydownEvent, 'preventDefault');
    });

    describe('when currently focused in first input', () => {
      beforeEach(() => {
        firstInput.dispatchEvent(keydownEvent);
      });

      it('does preventDefault()', () => {
        expect(keydownEvent.preventDefault).toHaveBeenCalled();
      });

      it('focuses last input', () => {
        expect(lastInput.focus).toHaveBeenCalled();
      });
    });



    describe('when currently focused in last input', () => {
      beforeEach(() => {
        lastInput.dispatchEvent(keydownEvent);
      });

      it('does not preventDefault()', () => {
        expect(keydownEvent.preventDefault).toHaveBeenCalledTimes(0);
      });

      it('does not focus first input', () => {
        expect(firstInput.focus).toHaveBeenCalledTimes(0);
      });
    });
  });
});
