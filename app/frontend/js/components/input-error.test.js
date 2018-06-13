// subject:

import inputError from '@/components/input-error.vue';



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(inputError, {
    propsData: {
      afterSubmitAttempt: false,
      error: 'The world blew up!'
    }
  });

  return wrapper;
}



// tests:

describe('component - inputError', () => {
  beforeEach(() => {
    createWrapper();
  });

  it('correctly named', () => {
    expect(inputError.name).toEqual('InputError');
  });

  it('allows props', () => {
    expect(inputError.props.afterSubmitAttempt).toEqual({
      type: Boolean,
      default: false
    });

    expect(inputError.props.error).toEqual({
      type: String,
      default: null
    });
  });
});
