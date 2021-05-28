/* ------------------- */
/* ------- API ------- */
/* ------------------- */

// Auth

export type CurrentUserResponse = SignInResponse;

export interface CreateAccountBody {
  email: string;
  fullName: string;
  password: string;
}

export type CreateAccountResponse = SignInResponse;

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignInResponse {
  email: string;
  fullName: string;
  id: string;
}

// Example

export interface SomethingPublicResponse {
  lovesFood: boolean;
  name: string;
}

export interface SomethingPrivateResponse {
  address: string;
  age: number;
  birthday: string;
}

/* ---------------------- */
/* ------- Models ------- */
/* ---------------------- */

// Users

export interface User {
  email: string;
  fullName: string;
  id: string;
}
