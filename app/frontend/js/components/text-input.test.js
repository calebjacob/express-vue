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
      validatedForm
    }
  });

  return wrapper;
}



// tests:

describe('component - textInput', () => {
  let wrapper;

  beforeEach(() => {
    $emit.mockClear();

    wrapper = createWrapper();
  });

  it('correctly named', () => {
    expect(textInput.name).toEqual('TextInput');
  });

  it('defaults model values', () => {
    expect(textInput.data().phoneRegex).toEqual(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
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



  describe('computed.scopedInputName', () => {
    describe('get()', () => {
      describe('when input is nested inside a <validated-form> scope', () => {
        beforeEach(() => {
          validatedForm.name = 'crazyForm';
          wrapper.vm.name = 'crazyInput';
        });

        it('returns input name nested inside form scope', () => {
          expect(wrapper.vm.scopedInputName).toEqual('crazyForm.crazyInput');
        });
      });

      describe('when input is not nested inside a <validated-form> scope', () => {
        beforeEach(() => {
          validatedForm.name = null;
          wrapper.vm.name = 'crazyInput';

          wrapper.vm.$nextTick();
        });

        it('returns input name', () => {
          expect(wrapper.vm.scopedInputName).toEqual('crazyInput');
        });
      });
    });
  });



  describe('computed.val', () => {
    describe('get()', () => {
      beforeEach(() => {
        wrapper.vm.value = 7;
      });

      it('returns value', () => {
        expect(wrapper.vm.val).toEqual(7);
      });
    });

    describe('set()', () => {
      beforeEach(() => {
        wrapper.vm.val = 'some text';
      });

      it('emit input event with new value', () => {
        expect($emit).toHaveBeenCalledWith('input', 'some text');
      });
    });
  });



  describe('methods.blurHandler()', () => {
    describe('when value is currently an empty string', () => {
      beforeEach(() => {
        wrapper.vm.value = '';
        wrapper.vm.blurHandler();
      });

      it('sets value to null', () => {
        expect($emit).toHaveBeenCalledWith('input', null);
      });
    });

    describe('when value is not currently an empty string', () => {
      beforeEach(() => {
        wrapper.vm.value = 'foo';
        wrapper.vm.blurHandler();
      });

      it('does not set value to null', () => {
        expect($emit).toHaveBeenCalledTimes(0);
      });
    });
  });
});
