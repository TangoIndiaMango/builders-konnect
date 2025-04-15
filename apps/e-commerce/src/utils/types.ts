export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  how?: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface VerifyEmailData {
  entity: string;
  token: string;
  code: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ForgotPasswordValue {
  email: string;
}

export interface NewPasswordValue {
  password: string;
  password_confirmation: string;
  token: string;
  code: string;
  entity: string;
}