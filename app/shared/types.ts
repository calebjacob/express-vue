// Auth

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignInResponse {
  email: string;
  fullName: string;
  id: string;
}
