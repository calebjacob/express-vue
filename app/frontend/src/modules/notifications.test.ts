// subject:

import { useNotifications, NotificationType } from './notifications';

// dependencies:

import timer from '@/helpers/timer';
import { ref, Ref } from 'vue';

// mocks:

jest.mock('@/helpers/timer');

// tests:

describe('notifications', () => {
  let module;

  beforeEach(() => {
    module = useNotifications();
  });

  describe('Name of the group', () => {});
});
