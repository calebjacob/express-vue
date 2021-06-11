// subject:

import { useNotifications, NotificationType } from './notifications';

// utils:

import flushPromises from 'flush-promises';
import { mocked } from 'ts-jest/utils';

// dependencies:

import timer from '@/helpers/timer';

// mocks:

jest.mock('@/helpers/timer');
const mockedTimer = mocked(timer, true);

// tests:

describe('notifications', () => {
  beforeEach(() => {
    const { resetState } = useNotifications();
    resetState();
    mockedTimer.mockResolvedValue();
    jest.clearAllMocks();
  });

  describe('useNotifications()', () => {
    it('defaults notifications to an empty array', () => {
      const { notifications } = useNotifications();
      expect(notifications.value).toEqual([]);
    });

    it('shares state between instances', () => {
      const { notifications: notifications1, showNotification } =
        useNotifications();
      const { notifications: notifications2 } = useNotifications();

      showNotification({
        message: 'Hello world!',
        type: NotificationType.SUCCESS
      });

      expect(notifications1.value.length).toEqual(1);
      expect(notifications2.value.length).toEqual(1);
    });

    describe('closeAllErrorNotifications()', () => {
      it('closes all error notifications', () => {
        const { closeAllErrorNotifications, notifications, showNotification } =
          useNotifications();
        showNotification({
          autoHide: false,
          message: 'Goodbye world 1!',
          type: NotificationType.ERROR
        });

        showNotification({
          autoHide: false,
          message: 'Hello world!',
          type: NotificationType.GENERIC
        });

        showNotification({
          autoHide: false,
          message: 'Goodbye world 2!',
          type: NotificationType.ERROR
        });

        expect(notifications.value.length).toEqual(3);

        closeAllErrorNotifications();

        expect(notifications.value.length).toEqual(1);
        expect(notifications.value[0].message).toEqual('Hello world!');
      });
    });

    describe('hideNotification()', () => {
      it('hides notification with matching id', () => {
        const { hideNotification, notifications, showNotification } =
          useNotifications();

        showNotification({
          autoHide: true,
          message: 'Hello world!',
          type: NotificationType.GENERIC
        });

        showNotification({
          autoHide: false,
          message: 'Goodbye world!',
          type: NotificationType.ERROR
        });

        expect(notifications.value.length).toEqual(2);
        expect(notifications.value[0].message).toEqual('Hello world!');
        expect(notifications.value[1].message).toEqual('Goodbye world!');

        hideNotification(notifications.value[1]);

        expect(notifications.value.length).toEqual(1);
        expect(notifications.value[0].message).toEqual('Hello world!');

        hideNotification(notifications.value[0]);

        expect(notifications.value.length).toEqual(0);
      });

      it('does nothing when passed a notification with non matching id', () => {
        const { hideNotification, notifications, showNotification } =
          useNotifications();

        showNotification({
          autoHide: false,
          message: 'Hello world!',
          type: NotificationType.GENERIC
        });

        expect(notifications.value.length).toEqual(1);

        hideNotification({
          autoHide: false,
          id: 'some-dumb-id',
          message: 'Hello world!',
          type: NotificationType.GENERIC
        });

        expect(notifications.value.length).toEqual(1);
      });
    });

    describe('showNotification()', () => {
      describe('when autoHide is not passed', () => {
        it('shows notification and eventually hides it after a delay', async () => {
          const { notifications, showNotification } = useNotifications();

          showNotification({
            message: 'Hello world!',
            type: NotificationType.GENERIC
          });

          expect(notifications.value.length).toEqual(1);
          expect(notifications.value[0]).toEqual({
            autoHide: true,
            id: expect.any(String),
            message: 'Hello world!',
            type: NotificationType.GENERIC
          });
          expect(timer).toHaveBeenCalledWith(4000);
          await flushPromises();
          expect(notifications.value.length).toEqual(0);
        });
      });

      it('shows multiple notifications at once', async () => {
        const { notifications, showNotification } = useNotifications();

        showNotification({
          message: 'Hello world!',
          type: NotificationType.GENERIC
        });

        showNotification({
          message: 'Goodbye world!',
          type: NotificationType.ERROR
        });

        expect(notifications.value.length).toEqual(2);
        expect(notifications.value[0].message).toEqual('Hello world!');
        expect(notifications.value[1].message).toEqual('Goodbye world!');
        await flushPromises();
        expect(notifications.value.length).toEqual(0);
      });
    });

    describe('when autoHide is passed false', () => {
      it('shows notification and does not hide it after a delay', async () => {
        const { notifications, showNotification } = useNotifications();

        showNotification({
          autoHide: true,
          message: 'I am but dust in the wind!',
          type: NotificationType.SUCCESS
        });

        showNotification({
          autoHide: false,
          message: 'I stay forever!',
          type: NotificationType.SUCCESS
        });

        expect(notifications.value.length).toEqual(2);
        expect(notifications.value[0].autoHide).toEqual(true);
        expect(notifications.value[1].autoHide).toEqual(false);
        await flushPromises();
        expect(notifications.value.length).toEqual(1);
        expect(notifications.value[0].message).toEqual('I stay forever!');
      });
    });
  });
});
