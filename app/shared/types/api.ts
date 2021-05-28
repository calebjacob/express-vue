import { User } from './models';

/* ---- Auth ---- */

export interface CurrentUserResponse {
  user: User;
}

export interface CreateAccountBody {
  email: string;
  fullName: string;
  password: string;
}

export interface CreateAccountResponse {
  user: User;
}

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: User;
}

/* ---- Example ---- */

export interface SomethingPublicResponse {
  lovesFood: boolean;
  name: string;
}

export interface SomethingPrivateResponse {
  address: string;
  age: number;
  birthday: string;
}

/* ---- Errors ---- */

export interface ApiErrorResponse {
  errors: ApiErrorChildResponse[];
  isApiError?: true;
  status: number;
}

export interface ApiErrorChildResponse {
  code?: ApiErrorCode;
  message: string;
}

export enum ApiErrorCode {
  EMAIL_CONFLICT = 'EMAIL_CONFLICT',
  INVALID_AUTH = 'INVALID_AUTH'
}
