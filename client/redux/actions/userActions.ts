import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "../constants/userTypes";
import buildClient from "../../api/buildClient";
import { Dispatch } from "react";
import nookies from "nookies";

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

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));

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

export const currentUser = (data: any) => async (dispatch: Dispatch<any>) => {
  try {

    console.log(data+"<><>");
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log("EROREOROEOROE");

    console.log(error);
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response,
    });
  }
};
