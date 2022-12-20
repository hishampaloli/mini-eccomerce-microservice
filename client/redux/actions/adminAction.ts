import { ALL_USERS_FAIL, ALL_USERS_SUCCESS } from "../constants/adminTypes";
import { Dispatch } from "react";
import axios from "axios";
import buildClient from "../../api/buildClient";

export const getAllUsers = (req: any) => async (dispatch: Dispatch<any>) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await buildClient(req).get("/api/admin/allusers", config);

    console.log(data);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&7");

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log(error.response);

    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data,
    });
  }
};
