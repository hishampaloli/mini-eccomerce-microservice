import { UserAuthData } from "./user";

export interface AllUsersState {
  error: string[] | null;
  loading: boolean;
  users: UserAuthData[] | [];
}
