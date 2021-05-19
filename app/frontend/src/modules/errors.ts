import { useNotifications, NotificationType } from '@/modules/notifications';

interface ErrorsModule {
  handleError(error: Error, options?: HandleErrorOptions): void;
  handleErrorQuietly(error: Error): void;
}

interface HandleErrorOptions {
  message?: string;
}

function useErrors(): ErrorsModule {
  const { showNotification } = useNotifications();

  function handleError(error: Error, options: HandleErrorOptions = {}) {
    console.error(error);

    showNotification({
      type: NotificationType.ERROR,
      autoHide: false,
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

export { useErrors };
