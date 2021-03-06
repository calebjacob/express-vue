import useNotifications from '@/composables/notifications';
import { ref } from 'vue';
const errors = ref([]);

export default function useErrors() {
  const { showNotification } = useNotifications();

  function handleError(error, options = {}) {
    console.error(error);

    showNotification({
      type: 'error',
      message:
        options.message ||
        error.message ||
        'Oops! Something went wrong. Try again later.'
    });
  }

  return {
    errors,
    handleError
  };
}
