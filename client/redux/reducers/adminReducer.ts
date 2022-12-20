import { AllUsersState } from "../../models/admin";
import { AdminActionTypes } from "../constants/index";

export const allUsersReducer = (
  state: AllUsersState = { loading: false, users: [], error: null },
  action: any
): AllUsersState => {
  switch (action.type) {
    case AdminActionTypes.ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: null,
      };

    case AdminActionTypes.ALL_USERS_FAIL:
      return {
        error: action.payload,
        loading: false,
        users: [],
      };

    default:
      return state;
  }
};
