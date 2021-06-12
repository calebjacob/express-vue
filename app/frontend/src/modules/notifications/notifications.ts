import timer from '@/helpers/timer';
import { readonly, ref, Ref } from 'vue';
import { v4 as uuid } from 'uuid';
import { NotificationsModule, Notification, ShowNotificationOptions, NotificationType } from './types';

export function useNotifications(): NotificationsModule {
  const notifications: Ref<Notification[]> = ref([]);

  function closeAllErrorNotifications(): void {
    notifications.value = notifications.value.filter((n) => {
      return n.type !== NotificationType.ERROR;
    });
  }

  function hideNotification(notification: Notification) {
    notifications.value = notifications.value.filter((n) => {
      return n.id !== notification.id;
    });
  }

  async function showNotification({ autoHide = true, message, type }: ShowNotificationOptions) {
    const notification = {
      autoHide,
      id: uuid(),
      message,
      type
    };

    notifications.value.push(notification);

    if (autoHide) {
      await timer(4000);
      hideNotification(notification);
    }
  }

  return {
    closeAllErrorNotifications,
    hideNotification,
    notifications: readonly(notifications),
    showNotification
  };
}
