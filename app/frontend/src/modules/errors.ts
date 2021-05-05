import useNotifications from '@/modules/notifications';

interface HandleErrorOptions {
  message?: String;
}

export default function useErrors() {
  const { showNotification } = useNotifications();

  function handleError(error: Error, options: HandleErrorOptions = {}) {
    console.error(error);

    showNotification({
      type: 'error',
      message:
        options.message ||
        error.message ||
        'Oops! Something went wrong. Try again later.'
    });
  }

  function handleErrorQuietly(error: Error) {
    console.error(error);
  }

  return {
    handleError,
    handleErrorQuietly
  };
}
