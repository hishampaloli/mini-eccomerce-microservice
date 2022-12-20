import { AdminActionTypes } from "../constants/adminTypes";

export const allUsersReducer = (
  state = { products: [], loading: false },
  action: any
) => {
  switch (action.type) {
    case AdminActionTypes.ALL_USERS_SUCCESS:
      return {
        loading: true,
        users: action.payload,
      };

    case AdminActionTypes.ALL_USERS_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};
