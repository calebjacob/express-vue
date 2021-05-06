import timer from '@/helpers/timer';
import { ref, Ref } from 'vue';

interface NotificationsModule {
  hideNotification(notification: Notification): void;
  showNotification(options: ShowNotificationOptions): void;
  notifications: Ref<Notification[]>;
}

interface Notification {
  id: number;
  message: string;
  type: string;
}

interface ShowNotificationOptions {
  message: string;
  type: string;
}

const notifications: Ref<Notification[]> = ref([]);

export default function useNotifications(): NotificationsModule {
  function hideNotification(notification: Notification) {
    notifications.value = notifications.value.filter((n) => {
      return n.id !== notification.id;
    });
  }

  async function showNotification(options: ShowNotificationOptions) {
    const notification = {
      id: Date.now(),
      message: options.message,
      type: options.type || 'general'
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
