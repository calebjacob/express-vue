import useNotifications from '@/modules/notifications';

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

  function handleErrorQuietly(error) {
    console.error(error);
  }

  return {
    handleError,
    handleErrorQuietly
  };
}
