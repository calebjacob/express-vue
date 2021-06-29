import timer from '@/helpers/timer';
import { v4 as uuid } from 'uuid';
import { NotificationsModule, Notification, Notifications, ShowNotificationOptions, NotificationType } from './types';
import { useStore } from '@/modules/store';

export function useNotifications(): NotificationsModule {
  const store = useStore<Notifications>('Notifications', {
    allNotifications: []
  });

  function closeAllErrorNotifications(): void {
    const allNotifications = store.state.allNotifications.filter((n) => {
      return n.type !== NotificationType.ERROR;
    });

    store.update({
      allNotifications
    });
  }

  function hideNotification(notification: Notification) {
    const allNotifications = store.state.allNotifications.filter((n) => {
      return n.id !== notification.id;
    });

    store.update({
      allNotifications
    });
  }

  async function showNotification({ autoHide = true, message, type }: ShowNotificationOptions) {
    const notification = {
      autoHide,
      id: uuid(),
      message,
      type
    };

    const allNotifications = [...store.state.allNotifications, notification];

    store.update({
      allNotifications
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
