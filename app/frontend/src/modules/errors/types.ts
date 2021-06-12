import { ApiErrorCode } from 'shared/types/api';
import { AxiosError } from 'axios';

export interface ErrorsModule {
  handleError(error: AxiosError, options?: HandleErrorOptions): ParsedErrors;
  handleErrorManually(error: AxiosError, options?: HandleErrorOptions): ParsedErrors;
  handleErrorQuietly(error: AxiosError): void;
}

export interface HandleErrorOptions {
  message?: string;
}

export interface ParsedError {
  code?: ApiErrorCode;
  message: string;
}

export interface ParsedErrors {
  codes: ApiErrorCode[];
  errors: ParsedError[];
}
