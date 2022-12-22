import { type } from "os";
import { Dispatch } from "redux";
import buildClient from "../../api/buildClient";
import { CartData } from "../../models/cart";
import {
  AddToCartAction,
  DeleteFromCartAction,
  GetCartAction,
} from "../action-models";
import { CartTypes } from "../constants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getCartItems =
  (req: any) => async (dispatch: Dispatch<GetCartAction>) => {
    try {
      console.log("cart adding");

      const { data } = await buildClient(req).get<CartData[]>(
        `/api/cart/`,
        config
      );

      console.log(data);

      dispatch({
        type: CartTypes.ADD_TO_CART_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CartTypes.ADD_TO_CART_FAIL,
        payload: error.response.data.errors,
      });
    }
  };

export const addToCart =
  (req: any, id: string) => async (dispatch: Dispatch<AddToCartAction>) => {
    try {
      console.log("cart adding");

      const { data } = await buildClient(req).get<CartData[]>(
        `/api/cart/${id}`,
        config
      );

      console.log(data);

      dispatch({
        type: CartTypes.ADD_TO_CART_SUCCESS,
        payload: data,
      });

      return "Product Added To Cart";
    } catch (error: any) {
      return "Something went wrong";
    }
  };

export const deleteFromCart =
  (req: any, id: string) =>
  async (dispatch: Dispatch<DeleteFromCartAction>) => {
    try {
      console.log("cart adding");

      const { data } = await buildClient(req).delete<CartData[]>(
        `/api/cart/${id}`,
        config
      );

      console.log(data);

      dispatch({
        type: CartTypes.ADD_TO_CART_SUCCESS,
        payload: data,
      });

      return "Product Delete from Cart";
    } catch (error: any) {
      return "Something went wrong";
    }
  };
