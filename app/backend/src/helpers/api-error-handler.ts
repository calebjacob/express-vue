import { ApiErrorCode, ApiErrorResponse } from 'shared/types/api';
import { Response } from '@/types/routes';
import logger from '@/services/logger';

interface ApiError {
  code?: ApiErrorCode;
  error?: Error;
  message?: string;
}

interface ApiErrorHandlerOptions {
  code?: ApiErrorCode;
  error?: Error;
  errors?: ApiError[];
  message?: string;
  res: Response;
  status?: number;
}

export default function apiErrorHandler({
  code: singleErrorCode,
  error: singleError,
  errors = [],
  message: singleErrorMessage,
  res,
  status = 500
}: ApiErrorHandlerOptions): void {
  const data: ApiErrorResponse = {
    errors: [],
    isApiError: true,
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
      code,
      error,
      message = 'Oops! An unknown error occurred. Please try again later.'
    }) => {
      if (error) {
        logger.error(error);
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
