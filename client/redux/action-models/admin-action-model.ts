import { UserAuthData } from "../../models/user";
import { AdminActionTypes } from "../constants/index";

interface AllUsersSuccessAction {
  type: AdminActionTypes.ALL_USERS_SUCCESS;
  payload: UserAuthData[];
}

interface AllUsersFailAction {
  type: AdminActionTypes.ALL_USERS_FAIL;
  payload: any;
}

export type AllUsersAction = AllUsersSuccessAction | AllUsersFailAction;
