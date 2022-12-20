import { AuthState } from "../../models/user";
import { UserActionsTypes } from "../constants/userTypes";

export const userReducer = (
  state: AuthState = { loading: false, error: null, user: null },
  action: any
): AuthState => {
  switch (action.type) {
    case UserActionsTypes.SIGNUP_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };

    case UserActionsTypes.SIGNUP_FAIL:
      return {
        error: action.payload,
        loading: false,
        user: null,
      };

    case UserActionsTypes.CLEAR_ERRORS:
      return {
        error: null,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};
