import { ErrorState, UserAuthData } from "./user";

export interface AllUsersState {
  error: ErrorState[] | null;
  loading: boolean;
  users: UserAuthData[] | [];
}
