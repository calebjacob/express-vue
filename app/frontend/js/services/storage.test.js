// subject:

import storage from '@/services/storage';



// dependencies:

import engine from 'store/src/store-engine';

import cookieStorage from 'store/storages/cookieStorage';
import localStorage from 'store/storages/localStorage';
import sessionStorage from 'store/storages/sessionStorage';

import defaultsPlugin from 'store/plugins/defaults';
import expirePlugin from 'store/plugins/expire';



// mocks:

jest.mock('store/src/store-engine', () => {
  return {
    createStore: jest.fn((passedStorages, passedPlugins) => {
      return {
        storages: passedStorages,
        plugins: passedPlugins
      };
    })
  };
});

jest.mock('store/storages/cookieStorage', () => {
  return 'cookie storage';
});

jest.mock('store/storages/localStorage', () => {
  return 'local storage';
});

jest.mock('store/storages/sessionStorage', () => {
  return 'session storage';
});

jest.mock('store/plugins/defaults', () => {
  return 'defaults plugin';
});

jest.mock('store/plugins/expire', () => {
  return 'expire plugin';
});



// tests:

describe('service - storage', () => {
  describe('cookie', () => {
    it('creates a cookie store', () => {
      expect(engine.createStore).toHaveBeenCalledWith([cookieStorage], [defaultsPlugin, expirePlugin]);
    });

    it('returns the cookie store', () => {
      expect(storage.cookie).toEqual({
        storages: [cookieStorage],
        plugins: [defaultsPlugin, expirePlugin]
      });
    });
  });



  describe('local', () => {
    it('creates a local store', () => {
      expect(engine.createStore).toHaveBeenCalledWith([localStorage], [defaultsPlugin]);
    });

    it('returns the local store', () => {
      expect(storage.local).toEqual({
        storages: [localStorage],
        plugins: [defaultsPlugin]
      });
    });
  });



  describe('session', () => {
    it('creates a session store', () => {
      expect(engine.createStore).toHaveBeenCalledWith([sessionStorage], [defaultsPlugin]);
    });

    it('returns the session store', () => {
      expect(storage.session).toEqual({
        storages: [sessionStorage],
        plugins: [defaultsPlugin]
      });
    });
  });
});
