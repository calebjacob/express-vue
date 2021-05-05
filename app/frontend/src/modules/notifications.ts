import timer from '@/helpers/timer';
import { ref } from 'vue';
const notifications = ref([]);

export default function useNotifications() {
  function hideNotification(notification) {
    notifications.value = notifications.value.filter(n => {
      return n.id !== notification.id;
    });
  }

  async function showNotification(options) {
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
