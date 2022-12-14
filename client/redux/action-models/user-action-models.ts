import { UserAuthData } from "../../models/user";
import { UserActionsTypes } from "../constants/index";

interface UserSignUpSuccessAction {
  type: UserActionsTypes.SIGNUP_SUCCESS;
  payload: UserAuthData;
}

interface UserSignUpFailAction {
  type: UserActionsTypes.SIGNUP_FAIL;
  payload: any;
}



export type SignupAction = UserSignUpSuccessAction | UserSignUpFailAction;
export type SingInAction = UserSignUpSuccessAction | UserSignUpFailAction;
export type UpdateProfile = UserSignUpSuccessAction | UserSignUpFailAction;
