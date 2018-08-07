// subject:

import session from '@/services/session';



// dependencies:

import events from '@/services/events';
import storage from '@/services/storage';



// mocks:

jest.mock('@/services/events');
jest.mock('@/services/storage');



describe('service - session', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });



  describe('reset()', () => {
    beforeEach(() => {
      jest.spyOn(session.user, 'set');

      session.reset();
    });

    it('sets user to null', () => {
      expect(session.user.set).toHaveBeenCalledWith(null);
    });
  });



  describe('user.get()', () => {
    beforeEach(() => {
      session.user.get();
    });

    it('fetches the user from storage', () => {
      expect(storage.local.get).toHaveBeenCalledWith('user');
    });

    it('returns the saved result', () => {
      expect(session.user.get()).toEqual('get local storage - user');
    });
  });



  describe('user.set()', () => {
    beforeEach(() => {
      session.user.set('a crazy user');
    });

    it('stores passed user', () => {
      expect(storage.local.set).toHaveBeenCalledWith('user', 'a crazy user');
    });

    it('emits "sessionUpdate:user" event with user data', () => {
      expect(events.$emit).toHaveBeenCalledWith('session:update:user', {
        user: 'a crazy user'
      });
    });
  });
});
