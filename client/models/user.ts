export interface SignUnData {
  name: string;
  email: string;
  password: string;
}

export interface SigninData {
  email: string;
  password: string;
}


export interface UserAuthData {
    email: string,
    name: string,
    isBlocked: boolean
    id: string
}

export interface ErrorState {
    message: string
}

export interface AuthState {
    user: UserAuthData | null
    error: ErrorState[] | null
    loading: boolean
}