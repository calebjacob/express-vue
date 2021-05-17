import timer from '@/helpers/timer';
import { ref, Ref } from 'vue';

interface NotificationsModule {
  hideNotification(notification: Notification): void;
  notifications: Ref<Notification[]>;
  showNotification(options: ShowNotificationOptions): void;
}

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

interface ShowNotificationOptions {
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
  function hideNotification(notification: Notification) {
    notifications.value = notifications.value.filter((n) => {
      return n.id !== notification.id;
    });
  }

  async function showNotification(options: ShowNotificationOptions) {
    const notification = {
      id: Date.now(),
      message: options.message,
      type: options.type
    };

    notifications.value.unshift(notification);
    await timer(4000);
    hideNotification(notification);
  }

  return {
    hideNotification,
    notifications,
    showNotification
  };
}

export { useNotifications, NotificationType };
