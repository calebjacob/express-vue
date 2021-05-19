// subject:

import { useNotifications, NotificationType } from './notifications';

// dependencies:

import timer from '@/helpers/timer';
import { ref, Ref } from 'vue';

// mocks:

jest.mock('@/helpers/timer');

// tests:

describe('notifications', () => {
  describe('useNotifications()', () => {
    it('defaults notifications to an empty array', () => {
      const { notifications } = useNotifications();
      expect(notifications.value).toEqual([]);
    });

    describe('showing notifications', () => {});
  });
});
