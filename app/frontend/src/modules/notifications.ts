import timer from '@/helpers/timer';
import { readonly, ref, Ref } from 'vue';
import { v4 as uuid } from 'uuid';

interface NotificationsModule {
  closeAllErrorNotifications(): void;
  hideNotification(notification: Notification): void;
  notifications: Ref<readonly Notification[]>;
  resetState(): void;
  showNotification(options: ShowNotificationOptions): void;
}

interface Notification {
  autoHide: boolean;
  id: string;
  message: string;
  type: NotificationType;
}

interface ShowNotificationOptions {
  autoHide?: boolean;
  message: string;
  type: NotificationType;
}

enum NotificationType {
  ERROR = 'Error',
  GENERIC = 'Generic',
  SUCCESS = 'Success'
}

const notifications: Ref<Notification[]> = ref([]);

function useNotifications(): NotificationsModule {
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

  function resetState(): void {
    notifications.value = [];
  }

  async function showNotification({
    autoHide = true,
    message,
    type
  }: ShowNotificationOptions) {
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
    resetState,
    showNotification
  };
}

export { useNotifications, NotificationsModule, NotificationType };
