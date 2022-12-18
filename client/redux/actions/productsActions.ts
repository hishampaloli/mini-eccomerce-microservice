import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
} from "../constants/productsTypes";
import { Dispatch } from "react";
import axios from "axios";
import buildClient from "../../api/buildClient";

export const getProducts = (req: any) => async (dispatch: Dispatch<any>) => {
  try {
    

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await buildClient(req).get(
      "/api/auth/currentuser",
      config
    );

    console.log(data);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&7");
    

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    console.log(error.response);

    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data,
    });
  }
};
