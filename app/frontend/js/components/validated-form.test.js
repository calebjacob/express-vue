// subject:

import validatedForm from '@/components/validated-form.vue';



// mocks:

const validSubmit = jest.fn();
const $validator = {
  validateAll: jest.fn().mockReturnValue(new Promise(() => {}))
};



// wrapper:

function createWrapper(options = {}) {
  const template = options.template ? options.template : `
    <div>
      <input name="fieldOne" id="valid" type="text">
      <input name="fieldTwo" id="invalid" type="text" aria-invalid="true">
    </div>
  `;

  const wrapper = shallowMount(validatedForm, {
    propsData: {
      name: 'myForm',
      validSubmit
    },
    provide: {
      $validator
    },
    slots: {
      default: template
    }
  });

  return wrapper;
}



// tests:

describe('component - validatedForm', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = createWrapper();
  });

  it('correctly named', () => {
    expect(validatedForm.name).toEqual('ValidatedForm');
  });

  it('defaults model values', () => {
    expect(validatedForm.data().dirty).toEqual(false);
    expect(validatedForm.data().submitAttempted).toEqual(false);
  });

  it('allows props', () => {
    expect(validatedForm.props.disabled).toEqual({
      type: Boolean,
      default: false
    });

    expect(validatedForm.props.disableAutoFocus).toEqual({
      type: Boolean,
      default: false
    });

    expect(validatedForm.props.name).toEqual({
      type: String,
      required: true
    });

    expect(validatedForm.props.validSubmit).toEqual({
      type: Function,
      required: true
    });
  });

  it('injects $validator', () => {
    expect(validatedForm.inject.$validator.from).toEqual('$validator');
  });

  it('renders a view', () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });



  describe('mounted()', () => {
    beforeEach(() => {
      validatedForm.focusFirstInput = jest.fn();

      validatedForm.mounted();
    });

    it('calls focusFirstInput()', () => {
      expect(validatedForm.focusFirstInput).toHaveBeenCalled();
    });

    afterEach(() => {
      delete validatedForm.focusFirstInput;
    });
  });



  describe('methods.focusFirstInput()', () => {
    let input;

    describe('when disableAutoFocus is true', () => {
      describe('when a regular input is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <input name="first" id="first" type="text">
                <input name="second" id="second" type="text">
              </div>
            `
          });

          wrapper.setProps({
            disableAutoFocus: true
          });

          input = wrapper.element.querySelector('#first');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        it('input is not focused', () => {
          expect(input.focus).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('when disableAutoFocus is false', () => {
      describe('when a regular input is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <input name="first" id="first" type="text">
                <input name="second" id="second" type="text">
              </div>
            `
          });

          input = wrapper.element.querySelector('#first');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        it('input is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });

      describe('when a hidden input is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <input name="first" id="first" type="hidden">
                <input name="second" id="second" type="text">
              </div>
            `
          });

          input = wrapper.element.querySelector('#second');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        it('input is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });

      describe('when an input that is not tabbable is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <input name="first" id="first" type="text" tabindex="-1">
                <input name="second" id="second" type="text">
              </div>
            `
          });

          input = wrapper.element.querySelector('#second');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        it('input is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });

      describe('when a radio input is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <input name="myRadio" id="first" type="radio">
                <input name="myRadio" id="second" type="radio" checked>
              </div>
            `
          });

          input = wrapper.element.querySelector('#second');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        it('checked radio option is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });

      describe('when a select input is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <select name="first" id="first" type="text"></select>
                <input name="second" id="second" type="text">
              </div>
            `
          });

          input = wrapper.element.querySelector('#first');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        it('select is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });

      describe('when a button is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <button type="button" id="first">Click Me</button>
                <input name="second" id="second" type="text">
              </div>
            `
          });

          input = wrapper.element.querySelector('#first');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        it('button is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });
    });
  });



  describe('methods.markFormAsDirty()', () => {
    beforeEach(() => {
      wrapper.setData({
        dirty: false
      });

      wrapper.vm.markFormAsDirty();
    });

    it('sets dirty to true', () => {
      expect(wrapper.vm.dirty).toEqual(true);
    });
  });



  describe('methods.submit()', () => {
    const submitEvent = {};

    beforeEach(() => {
      submitEvent.preventDefault = jest.fn();

      wrapper.vm.submit(submitEvent);
    });

    it('sets submitAttempted to true', () => {
      expect(wrapper.vm.submitAttempted).toEqual(true);
    });

    it('preventService default form submit', () => {
      expect(submitEvent.preventDefault).toHaveBeenCalled();
    });

    it('calls $validator.validateAll() with form scope/name', () => {
      expect($validator.validateAll).toHaveBeenCalledWith('myForm');
    });

    describe('when $validator.validateAll() resolves with true', () => {
      beforeEach(() => {
        $validator.validateAll.mockResolvedValue(true);

        return wrapper.vm.submit(submitEvent);
      });

      it('calls passed in validSubmit() function', () => {
        expect(validSubmit).toHaveBeenCalled();
      });
    });

    describe('when $validator.validateAll() resolves with false', () => {
      let invalidInput;

      beforeEach(() => {
        jest.clearAllMocks();

        invalidInput = wrapper.element.querySelector('#invalid');
        jest.spyOn(invalidInput, 'focus');

        $validator.validateAll.mockResolvedValue(false);

        return wrapper.vm.submit(submitEvent);
      });

      it('does not call passed in validSubmit() function', () => {
        expect(validSubmit).not.toHaveBeenCalled();
      });

      it('focuses first invalid input', () => {
        expect(invalidInput.focus).toHaveBeenCalled();
      });
    });
  });



  describe('provide()', () => {
    beforeEach(() => {
      validatedForm.name = 'myCrazyForm';
    });

    it('returns the name of the form', () => {
      expect(validatedForm.provide().validatedForm.name).toEqual('myCrazyForm');
    });

    afterEach(() => {
      delete validatedForm.name;
    });
  });
});
