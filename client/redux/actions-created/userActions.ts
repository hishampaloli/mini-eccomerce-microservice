import { UserActionsTypes } from "../constants/userTypes";
import buildClient from "../../api/buildClient";
import { Dispatch } from "react";
import nookies from "nookies";
import Router from "next/router";
import { SigninData, SignUnData, UserAuthData } from "../../models/user";
import { SignupAction, SingInAction } from "../action-models/index";

export const signUp =
  (req: any, signupData: SignUnData) =>
  async (dispatch: Dispatch<SignupAction>) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await buildClient(req).post<UserAuthData>(
        "api/auth/signup",
        signupData,
        config
      );

      console.log(data);

      dispatch({
        type: UserActionsTypes.SIGNUP_SUCCESS,
        payload: data,
      });

      Router.push("/");
    } catch (error: any) {
      dispatch({
        type: UserActionsTypes.SIGNUP_FAIL,
        payload: error.response.data.errors,
      });
    }
  };

export const Login =
  (req: any, LoginData: SigninData) =>
  async (dispatch: Dispatch<SingInAction>) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data: existingUser } = await buildClient(req).post<UserAuthData>(
        "api/auth/signin",
        LoginData,
        config
      );

      dispatch({
        type: UserActionsTypes.SIGNUP_SUCCESS,
        payload: existingUser,
      });

      Router.push("/");
    } catch (error: any) {
      dispatch({
        type: UserActionsTypes.SIGNUP_FAIL,
        payload: error.response.data.errors,
      });
    }
  };

export const Logout = (req: any) => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await buildClient(req).post("api/auth/signout");

    Router.push("/");

    dispatch({
      type: UserActionsTypes.SIGNUP_SUCCESS,
      payload: null,
    });
  } catch (error: any) {
    console.log("EROREOROEOROE");

    console.log(error);
    dispatch({
      type: UserActionsTypes.SIGNUP_FAIL,
      payload: error.response,
    });
  }
};

export const currentUser = (data: any) => async (dispatch: Dispatch<any>) => {
  try {
    console.log(data);

    dispatch({
      type: UserActionsTypes.SIGNUP_SUCCESS,
      payload: data.id,
    });
  } catch (error: any) {
    console.log("EROREOROEOROE");

    console.log(error);
    dispatch({
      type: UserActionsTypes.SIGNUP_FAIL,
      payload: error.response,
    });
  }
};

export const clearErrors = () => async (dispatch: Dispatch<any>) => {
  dispatch({
    type: UserActionsTypes.CLEAR_ERRORS,
  });
};
