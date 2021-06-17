import timer from '@/helpers/timer';
import { v4 as uuid } from 'uuid';
import { NotificationsModule, Notification, Notifications, ShowNotificationOptions, NotificationType } from './types';
import { useStore } from '@/modules/store';

export function useNotifications(): NotificationsModule {
  const store = useStore<Notifications>('Notifications', {
    notifications: []
  });

  function closeAllErrorNotifications(): void {
    const notifications = store.state.notifications.filter((n) => {
      return n.type !== NotificationType.ERROR;
    });

    store.update({
      notifications
    });
  }

  function hideNotification(notification: Notification) {
    const notifications = store.state.notifications.filter((n) => {
      return n.id !== notification.id;
    });

    store.update({
      notifications
    });
  }

  async function showNotification({ autoHide = true, message, type }: ShowNotificationOptions) {
    const notification = {
      autoHide,
      id: uuid(),
      message,
      type
    };

    const notifications = [...store.state.notifications, notification];

    store.update({
      notifications
    });

    if (autoHide) {
      await timer(4000);
      hideNotification(notification);
    }
  }

  return {
    closeAllErrorNotifications,
    hideNotification,
    notifications: store.state,
    showNotification
  };
}
