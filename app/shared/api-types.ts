// AUTH

export interface CurrentUser {
  email: string;
  fullName: string;
  id: string;
}

export interface SignInBody {
  email: string;
  password: string;
}
