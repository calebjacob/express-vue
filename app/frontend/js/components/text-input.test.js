// subject:

import textInput from '@/components/text-input.vue';



// mocks:

const $emit = jest.fn();
const validatedForm = {
  name: 'myForm'
};



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(textInput, {
    mocks: {
      $emit
    },
    propsData: {
      label: 'My Input',
      name: 'myInput',
      placeholder: 'Enter some text...',
      type: 'text',
      validations: {
        required: true
      },
      value: 'foobar'
    },
    provide: {
      $validator: {},
      validatedForm
    }
  });

  return wrapper;
}



// tests:

describe('component - textInput', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();

    wrapper = createWrapper();
  });

  it('correctly named', () => {
    expect(textInput.name).toEqual('TextInput');
  });

  it('allows props', () => {
    expect(textInput.props.label).toEqual({
      type: String,
      required: true
    });

    expect(textInput.props.mask).toEqual({
      type: [String, Object],
      default: null
    });

    expect(textInput.props.name).toEqual({
      type: String,
      required: true
    });

    expect(textInput.props.placeholder).toEqual({
      type: String,
      default: null
    });

    expect(textInput.props.type).toEqual({
      type: String,
      required: true
    });

    expect(textInput.props.validations.type).toEqual(Object);
    expect(textInput.props.validations.default()).toEqual({});

    expect(textInput.props.value).toEqual({
      type: [String, Number],
      default: null
    });
  });

  it('injects $validator', () => {
    expect(textInput.inject.$validator.from).toEqual('$validator');
  });

  it('injects validatedForm', () => {
    expect(textInput.inject.validatedForm.from).toEqual('validatedForm');
    expect(textInput.inject.validatedForm.default()).toEqual({});
  });

  it('renders a view', () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });



  describe('computed.allValidations', () => {
    beforeEach(() => {
      wrapper.setProps({
        validations: {
          foo: true,
          bar: 2
        }
      });
    });

    describe('get()', () => {
      describe('when input type is "dollars"', () => {
        beforeEach(() => {
          wrapper.setProps({
            type: 'dollars'
          });
        });

        it('returns validations with defaults', () => {
          expect(wrapper.vm.allValidations).toEqual({
            foo: true,
            bar: 2,
            decimal: 2
          });
        });
      });

      describe('when input type is "email"', () => {
        beforeEach(() => {
          wrapper.setProps({
            type: 'email'
          });
        });

        it('returns validations with defaults', () => {
          expect(wrapper.vm.allValidations).toEqual({
            foo: true,
            bar: 2,
            email: true
          });
        });
      });

      describe('when input type is "phone"', () => {
        beforeEach(() => {
          wrapper.setProps({
            type: 'phone'
          });
        });

        it('returns validations with defaults', () => {
          expect(wrapper.vm.allValidations).toEqual({
            foo: true,
            bar: 2,
            regex: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
          });
        });
      });

      describe('when input type is anything else', () => {
        beforeEach(() => {
          wrapper.setProps({
            type: 'text'
          });
        });

        it('returns validations with defaults', () => {
          expect(wrapper.vm.allValidations).toEqual({
            foo: true,
            bar: 2
          });
        });
      });
    });
  });



  describe('computed.attributes', () => {
    describe('get()', () => {
      beforeEach(() => {
        wrapper.setProps({
          label: 'My Crazy Input',
          name: 'myCrazyInput',
          placeholder: 'Fill something here...',
          value: 12
        });
      });

      it('returns all attributes that should be bound for input', () => {
        expect(wrapper.vm.attributes).toEqual({
          'data-vv-as': 'my crazy input',
          id: 'myCrazyInput',
          name: 'myCrazyInput',
          placeholder: 'Fill something here...',
          value: 12
        });
      });
    });
  });



  describe('computed.scopedInputName', () => {
    describe('get()', () => {
      describe('when input is nested inside a <validated-form> scope', () => {
        beforeEach(() => {
          validatedForm.name = 'crazyForm';

          wrapper.setData({
            name: 'crazyInput'
          });
        });

        it('returns input name nested inside form scope', () => {
          expect(wrapper.vm.scopedInputName).toEqual('crazyForm.crazyInput');
        });
      });

      describe('when input is not nested inside a <validated-form> scope', () => {
        beforeEach(() => {
          validatedForm.name = null;

          wrapper.setData({
            name: 'stinkyInput'
          });
        });

        it('returns input name', () => {
          expect(wrapper.vm.scopedInputName).toEqual('stinkyInput');
        });
      });
    });
  });



  describe('methods.blurHandler()', () => {
    describe('when input value is an empty string', () => {
      beforeEach(() => {
        wrapper.vm.blurHandler({
          target: {
            value: ''
          }
        });
      });

      it('sets model value to null', () => {
        expect($emit).toHaveBeenCalledWith('input', null);
      });
    });

    describe('when input value is not an empty string', () => {
      beforeEach(() => {
        wrapper.vm.blurHandler({
          target: {
            value: '1'
          }
        });
      });

      it('does not update model', () => {
        expect($emit).not.toHaveBeenCalled();
      });
    });
  });



  describe('methods.inputHandler()', () => {
    describe('when input type is "dollars"', () => {
      beforeEach(() => {
        wrapper.setProps({
          type: 'dollars'
        });
      });

      describe('when input has a value', () => {
        beforeEach(() => {
          wrapper.vm.inputHandler({
            target: {
              value: '12.32'
            }
          });
        });

        it('updates model with parsed number', () => {
          expect($emit).toHaveBeenCalledWith('input', 12.32);
        });
      });

      describe('when input does not have a value', () => {
        beforeEach(() => {
          wrapper.vm.inputHandler({
            target: {
              value: ''
            }
          });
        });

        it('updates model with raw value', () => {
          expect($emit).toHaveBeenCalledWith('input', '');
        });
      });
    });

    describe('when input type is "number"', () => {
      beforeEach(() => {
        wrapper.setProps({
          type: 'number'
        });
      });

      describe('when input has a value', () => {
        beforeEach(() => {
          wrapper.vm.inputHandler({
            target: {
              value: '5.2'
            }
          });
        });

        it('updates model with parsed number', () => {
          expect($emit).toHaveBeenCalledWith('input', 5.2);
        });
      });

      describe('when input does not have a value', () => {
        beforeEach(() => {
          wrapper.vm.inputHandler({
            target: {
              value: ''
            }
          });
        });

        it('updates model with raw value', () => {
          expect($emit).toHaveBeenCalledWith('input', '');
        });
      });
    });

    describe('when input type is anything else', () => {
      beforeEach(() => {
        wrapper.setProps({
          type: 'text'
        });
      });

      describe('when input has a value', () => {
        beforeEach(() => {
          wrapper.vm.inputHandler({
            target: {
              value: '5.2'
            }
          });
        });

        it('updates model with raw value', () => {
          expect($emit).toHaveBeenCalledWith('input', '5.2');
        });
      });

      describe('when input does not have a value', () => {
        beforeEach(() => {
          wrapper.vm.inputHandler({
            target: {
              value: ''
            }
          });
        });

        it('updates model with raw value', () => {
          expect($emit).toHaveBeenCalledWith('input', '');
        });
      });
    });
  });
});
