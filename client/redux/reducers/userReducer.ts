import { SIGNUP_FAIL, SIGNUP_SUCCESS,CLEAR_ERRORS } from "../constants/userTypes";




export const userReducer = (
  state = {},
  action: any
) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        user: action.payload,
      };

    case SIGNUP_FAIL:
      return {
        error: action.payload,
      };

      case CLEAR_ERRORS:
        return {
          error: null,
        };

    default:
      return state;
  }
};
