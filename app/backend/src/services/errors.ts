import logger from '@/services/logger';
import { Response } from 'express';

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
  errors?: ApiError[];
  res: Response;
  status?: number;
}

function apiErrorHandler({
  errors = [],
  res,
  status = 500
}: ApiErrorHandlerOptions): void {
  const data: DataResponse = {
    errors: [],
    status
  };

  errors.forEach(
    ({
      code = 'UNKNOWN',
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

export { apiErrorHandler };
