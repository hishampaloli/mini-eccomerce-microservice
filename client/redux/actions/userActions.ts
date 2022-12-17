import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "../constants/userTypes";
import buildClient from "../../api/buildClient";
import { Dispatch } from "react";

export const signUp =
  (req: any, email: string, name: string, password: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
        
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await buildClient(req).post(
        "api/auth/signup",
        { email, name, password },
        config
      );
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.log(error.response.data);

      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response.data,
      });
    }
  };
