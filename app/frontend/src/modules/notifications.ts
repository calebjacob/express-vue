import timer from '@/helpers/timer';
import { computed, ComputedRef, ref, Ref } from 'vue';
import { v4 as uuid } from 'uuid';

interface NotificationsModule {
  hideNotification(notification: Notification): void;
  notifications: ComputedRef<Notification[]>;
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

    notifications.value.unshift(notification);

    if (autoHide) {
      await timer(4000);
      hideNotification(notification);
    }
  }

  return {
    hideNotification,
    notifications: computed(() => notifications.value),
    resetState,
    showNotification
  };
}

export { useNotifications, NotificationsModule, NotificationType };
