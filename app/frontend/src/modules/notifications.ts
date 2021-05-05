import timer from '@/helpers/timer';
import { ref, Ref } from 'vue';

interface Notification {
  id: Number;
  message: String;
  type: String;
}

interface NotificationOptions {
  message: String;
  type: String;
}

const notifications: Ref<Notification[]> = ref([]);

export default function useNotifications() {
  function hideNotification(notification: Notification) {
    notifications.value = notifications.value.filter(n => {
      return n.id !== notification.id;
    });
  }

  async function showNotification(options: NotificationOptions) {
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
