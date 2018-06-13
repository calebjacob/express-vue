// subject:

import radioInput from '@/components/radio-input.vue';



// mocks:

const $emit = jest.fn();
const validatedForm = {
  name: 'myForm'
};



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(radioInput, {
    mocks: {
      $emit
    },
    propsData: {
      label: 'My Radio',
      name: 'myRadio',
      options: [
        {
          display: 'One',
          value: 1
        },
        {
          display: 'Two',
          value: 2
        },
        {
          display: 'Three',
          value: 3
        }
      ],
      validations: {
        required: true
      },
      value: 1
    },
    provide: {
      validatedForm
    }
  });

  return wrapper;
}



// tests:

describe('component - radioInput', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('correctly named', () => {
    expect(radioInput.name).toEqual('RadioInput');
  });

  it('allows props', () => {
    expect(radioInput.props.label).toEqual({
      type: String,
      required: true
    });

    expect(radioInput.props.name).toEqual({
      type: String,
      required: true
    });

    expect(radioInput.props.options).toEqual({
      type: Array,
      required: true
    });

    expect(radioInput.props.validations.type).toEqual(Object);
    expect(radioInput.props.validations.default()).toEqual({});

    expect(radioInput.props.value).toEqual({
      type: [String, Number, Boolean],
      default: null
    });
  });

  it('injects $validator', () => {
    expect(radioInput.inject.$validator.from).toEqual('$validator');
  });

  it('injects validatedForm', () => {
    expect(radioInput.inject.validatedForm.from).toEqual('validatedForm');
    expect(radioInput.inject.validatedForm.default()).toEqual({});
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
});
