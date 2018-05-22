// subject:

import user from '@/mixins/user';



// dependencies:

import events from '@/services/events';
import session from '@/services/session';



// mocks:

jest.mock('@/services/session');



// mixin setup:

const component = {
  template: '<div></div>'
};

const localVue = createLocalVue();

localVue.mixin(user);



// wrapper:

function createWrapper() {
  const wrapper = shallowMount(component, {
    localVue
  });

  return wrapper;
}



// tests:

describe('mixin - user', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('defaults data values', () => {
    expect(user.data().global__user).toEqual(null);
  });

  describe('created()', () => {
    beforeEach(() => {
      user.$getUser = jest.fn();

      user.created();
    });

    it('calls $getUser()', () => {
      expect(user.$getUser).toHaveBeenCalled();
    });

    describe('when "session:update:user" event occurs', () => {
      beforeEach(() => {
        events.$emit('session:update:user', {
          user: 'newly updated user'
        });
      });

      it('updates model with updated user info', () => {
        expect(wrapper.vm.global__user).toEqual('newly updated user');
      });
    });

    afterEach(() => {
      delete user.$getUser;
    });
  });

  describe('computed.$user()', () => {
    it('returns the value of global__user', () => {
      wrapper.vm.global__user = 'chuck norris user';
      expect(wrapper.vm.$user).toEqual(wrapper.vm.global__user);
    });
  });

  describe('methods.$getUser', () => {
    beforeEach(() => {
      session.user.get.mockReturnValue('chuck norris user');

      wrapper.vm.$getUser();
    });

    it('makes a request to fetch current user', () => {
      expect(session.user.get).toHaveBeenCalled();
    });

    it('loads user to model', () => {
      expect(wrapper.vm.global__user).toEqual('chuck norris user');
    });
  });
});
