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
    id: string
}

export interface AuthState {
    user: UserAuthData | null
    error: string[] | null
    loading: boolean
}