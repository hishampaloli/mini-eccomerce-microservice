export interface SignUnData {
  name: string;
  email: string;
  password: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  address?: string;
  image?: string;
}

export interface UserAuthData {
  email: string;
  name: string;
  isBlocked: boolean;
  address: string;
  image: string;
  id: string;
}

export interface ErrorState {
  message: string;
}

export interface AuthState {
  user: UserAuthData | null;
  error: ErrorState[] | null;
  loading: boolean;
}
