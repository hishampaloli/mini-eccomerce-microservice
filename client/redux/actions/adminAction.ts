import { AdminActionTypes } from "../constants/adminTypes";
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
      type: AdminActionTypes.ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log(error.response);

    dispatch({
      type: AdminActionTypes.ALL_USERS_FAIL,
      payload: error.response.data,
    });
  }
};

export const blockUser =
  (req: any, id: string) => async (dispatch: Dispatch<any>, getState: any) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await buildClient(req).patch(
        `/api/admin/block/${id}/`,
        config
      );


      const user = getState().allUsers.users.find((el: any) => {
        return el.id === id;
      });

      user.isBlocked = !user.isBlocked;

      console.log(getState().allUsers.users);

      dispatch({
        type: AdminActionTypes.ALL_USERS_SUCCESS,
        payload: getState().allUsers.users,
      });
    } catch (error: any) {
      console.log(error.response);
    }
  };
