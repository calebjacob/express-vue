// Subject:

import { useNotifications } from './notifications';
import { NotificationType, Notification, Notifications, NotificationsModule } from './types';

// Utils:

import flushPromises from 'flush-promises';
import { mocked } from 'ts-jest/utils';
import { mockStore, StoreModuleMock } from '@/test-utils/mock-store';

// Dependencies:

import { useStore } from '@/modules/store';
import timer from '@/helpers/timer';

// Mocks:

jest.mock('@/modules/store');
const useStoreMock = mocked(useStore, true);

jest.mock('@/helpers/timer');
const timerMock = mocked(timer, true);

// Tests:

describe('notifications', () => {
  let notifications: NotificationsModule;
  let storeMock: StoreModuleMock<Notifications>;

  beforeEach(() => {
    timerMock.mockResolvedValue();

    storeMock = mockStore<Notifications>('Notifications', {
      allNotifications: []
    });

    jest.clearAllMocks();

    notifications = useNotifications();
  });

  it('creates and exports a "Notifications" store', () => {
    expect(useStoreMock).toBeCalledWith('Notifications', {
      allNotifications: []
    });

    expect(notifications.notifications).toBe(storeMock.state);
  });

  describe('closeAllErrorNotifications()', () => {
    it('closes all error notifications', () => {
      storeMock.state.allNotifications = [
        {
          id: '1',
          autoHide: false,
          message: 'Goodbye world 1!',
          type: NotificationType.ERROR
        },
        {
          id: '2',
          autoHide: false,
          message: 'Hello world!',
          type: NotificationType.GENERIC
        },
        {
          id: '3',
          autoHide: false,
          message: 'Goodbye world 2!',
          type: NotificationType.ERROR
        }
      ];

      notifications.closeAllErrorNotifications();

      expect(storeMock.update).toBeCalledWith({
        allNotifications: [
          {
            id: '2',
            autoHide: false,
            message: 'Hello world!',
            type: NotificationType.GENERIC
          }
        ]
      });
    });
  });

  describe('hideNotification()', () => {
    it('hides notification with matching id', () => {
      storeMock.state.allNotifications = [
        {
          id: '1',
          autoHide: true,
          message: 'Hello world!',
          type: NotificationType.GENERIC
        },
        {
          id: '2',
          autoHide: false,
          message: 'Goodbye world!',
          type: NotificationType.ERROR
        }
      ];

      notifications.hideNotification(storeMock.state.allNotifications[1]);

      expect(storeMock.update).toBeCalledWith({
        allNotifications: [
          {
            id: '1',
            autoHide: true,
            message: 'Hello world!',
            type: NotificationType.GENERIC
          }
        ]
      });
    });

    it('does not remove any notifications when passed a notification with non matching id', () => {
      storeMock.state.allNotifications = [
        {
          id: '1',
          autoHide: true,
          message: 'Hello world!',
          type: NotificationType.GENERIC
        },
        {
          id: '2',
          autoHide: false,
          message: 'Goodbye world!',
          type: NotificationType.ERROR
        }
      ];

      notifications.hideNotification({
        id: '3',
        autoHide: false,
        message: 'This does not exist',
        type: NotificationType.ERROR
      });

      expect(storeMock.update).toBeCalledWith({
        allNotifications: [
          {
            id: '1',
            autoHide: true,
            message: 'Hello world!',
            type: NotificationType.GENERIC
          },
          {
            id: '2',
            autoHide: false,
            message: 'Goodbye world!',
            type: NotificationType.ERROR
          }
        ]
      });
    });
  });

  describe('showNotification()', () => {
    const existingNotification: Notification = {
      autoHide: false,
      id: '1234',
      message: 'I am the existing notification',
      type: NotificationType.GENERIC
    };

    beforeEach(() => {
      storeMock.state.allNotifications = [existingNotification];
    });

    describe('when autoHide is not passed', () => {
      it('shows notification and eventually hides it after a delay', async () => {
        notifications.showNotification({
          message: 'Hello world!',
          type: NotificationType.GENERIC
        });

        expect(storeMock.update).toBeCalledWith({
          allNotifications: [
            existingNotification,
            {
              autoHide: true,
              id: expect.any(String),
              message: 'Hello world!',
              type: NotificationType.GENERIC
            }
          ]
        });

        expect(timer).toBeCalledWith(4000);

        await flushPromises();

        expect(storeMock.update).toHaveBeenLastCalledWith({
          allNotifications: [existingNotification]
        });
      });
    });

    describe('when autoHide is passed false', () => {
      it('shows notification and does not hide it after a delay', async () => {
        notifications.showNotification({
          autoHide: false,
          message: 'Hello world!',
          type: NotificationType.GENERIC
        });

        expect(storeMock.update).toBeCalledWith({
          allNotifications: [
            existingNotification,
            {
              autoHide: false,
              id: expect.any(String),
              message: 'Hello world!',
              type: NotificationType.GENERIC
            }
          ]
        });

        await flushPromises();

        expect(storeMock.update).toBeCalledTimes(1);
      });
    });
  });
});
