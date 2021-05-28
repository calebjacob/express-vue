import { ApiErrorResponse } from 'shared/types/api';
import { AxiosError } from 'axios';
import { useNotifications, NotificationType } from '@/modules/notifications';

interface AppError {
  code?: string;
  message: string;
}

interface ErrorsModule {
  handleError(error: AxiosError, options?: HandleErrorOptions): void;
  handleErrorManually(error: AxiosError, options?: HandleErrorOptions): void;
  handleErrorQuietly(error: AxiosError): void;
}

interface HandleErrorOptions {
  message?: string;
}

interface ParsedErrors {
  codes: string[];
  errors: AppError[];
}

const { showNotification } = useNotifications();

function useErrors(): ErrorsModule {
  function handleError(
    error: AxiosError,
    options: HandleErrorOptions = {}
  ): ParsedErrors {
    console.error(error);

    const parsed = parseErrors(error, options);

    parsed.errors.forEach((e) => {
      showNotification({
        type: NotificationType.ERROR,
        autoHide: false,
        message: e.message
      });
    });

    return parsed;
  }

  function handleErrorManually(
    error: AxiosError,
    options: HandleErrorOptions = {}
  ): ParsedErrors {
    console.error(error);
    const parsed = parseErrors(error, options);
    return parsed;
  }

  function handleErrorQuietly(error: AxiosError) {
    console.error(error);
  }

  function parseErrors(
    error: AxiosError,
    options: HandleErrorOptions = {}
  ): ParsedErrors {
    const codes: string[] = [];
    const errors: AppError[] = [];

    if (error.response) {
      const data = error.response.data as ApiErrorResponse;

      if (data.isApiError) {
        data.errors.forEach((e) => {
          errors.push(e);

          if (e.code) {
            codes.push(e.code);
          }
        });
      }
    }

    if (errors.length === 0) {
      errors.push({
        message:
          options.message || 'Oops! Something went wrong. Try again later.'
      });
    }

    return {
      codes,
      errors
    };
  }

  return {
    handleError,
    handleErrorManually,
    handleErrorQuietly
  };
}

export { useErrors };
