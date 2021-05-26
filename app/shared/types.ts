// Auth

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
