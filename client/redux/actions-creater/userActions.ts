import { UserActionsTypes } from "../constants/userTypes";
import buildClient from "../../api/buildClient";
import { Dispatch } from "react";
import nookies from "nookies";
import Router from "next/router";
import {
  SigninData,
  SignUnData,
  UpdateProfileData,
  UserAuthData,
} from "../../models/user";
import {
  SignupAction,
  SingInAction,
  UpdateProfile,
} from "../action-models/index";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signUp =
  (req: any, signupData: SignUnData) =>
  async (dispatch: Dispatch<SignupAction>) => {
    try {
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

    return "Logged Out Successfully";
  } catch (error: any) {
    console.log("EROREOROEOROE");
    console.log(error);
    dispatch({
      type: UserActionsTypes.SIGNUP_FAIL,
      payload: error.response,
    });
    return "Please try again";
  }
};

export const UpdateUser =
  (req: any, updateData: UpdateProfileData, id: string) =>
  async (dispatch: Dispatch<UpdateProfile>) => {
    try {
      console.log("////////");

      const { data } = await buildClient(req).post<UserAuthData>(
        `/api/user/${id}`,
        updateData,
        config
      );

      console.log(data);

      dispatch({
        type: UserActionsTypes.SIGNUP_SUCCESS,
        payload: data,
      });

      return "User Updated";
    } catch (error: any) {
      console.log("EROREOROEOROE");
      return "Something went wrong";
    }
  };

export const currentUser =
  (req: any, userData: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: UserActionsTypes.SIGNUP_SUCCESS,
        payload: userData,
      });
    } catch (error: any) {
      console.log("Not Authenticated");
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
