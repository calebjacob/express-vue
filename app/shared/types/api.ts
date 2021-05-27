import { User } from './models';

/* ---- Auth ---- */

export type CurrentUserResponse = SignInResponse;

export interface RegisterBody {
  email: string;
  fullName: string;
  password: string;
}

export type RegisterResponse = SignInResponse;

export interface SignInBody {
  email: string;
  password: string;
}

export type SignInResponse = User;

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
