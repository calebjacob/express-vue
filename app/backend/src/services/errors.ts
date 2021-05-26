import { logError } from '@/services/logger';
import { Response } from '@/routes/types';

interface DataResponse {
  errors: DataResponseError[];
  status: number;
}

interface DataResponseError {
  code: string;
  message: string;
}

interface ApiError {
  code?: string;
  error?: Error;
  message?: string;
}

interface ApiErrorHandlerOptions {
  code?: string;
  error?: Error;
  errors?: ApiError[];
  message?: string;
  res: Response;
  status?: number;
}

export function apiErrorHandler({
  code: singleErrorCode,
  error: singleError,
  errors = [],
  message: singleErrorMessage,
  res,
  status = 500
}: ApiErrorHandlerOptions): void {
  const data: DataResponse = {
    errors: [],
    status
  };

  const allErrors = [...errors];

  if (singleErrorCode || singleError || singleErrorMessage) {
    allErrors.push({
      code: singleErrorCode,
      error: singleError,
      message: singleErrorMessage
    });
  }

  allErrors.forEach(
    ({
      code = 'UNKNOWN',
      error,
      message = 'Oops! An unknown error occurred. Please try again later.'
    }) => {
      if (error) {
        logError(error);
      }

      data.errors.push({
        code,
        message
      });
    }
  );

  res.status(status);
  res.json(data);
}

export default { apiErrorHandler };
