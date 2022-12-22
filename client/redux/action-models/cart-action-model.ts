import { CartData } from "../../models/cart";
import { CartTypes } from "../constants/cartTypes";

export interface AddToCartSuccessAction {
  type: CartTypes.ADD_TO_CART_SUCCESS;
  payload: CartData[];
}

export interface AddToCartFailAction {
  type: CartTypes.ADD_TO_CART_FAIL;
  payload: any;
}

export type AddToCartAction = AddToCartSuccessAction | AddToCartFailAction;

export interface GetCartSuccessAction {
  type: CartTypes.ADD_TO_CART_SUCCESS;
  payload: CartData[];
}

export interface GetCartFailAction {
  type: CartTypes.ADD_TO_CART_FAIL;
  payload: any;
}

export type GetCartAction = GetCartSuccessAction | GetCartFailAction;

export interface DeleteFromCartSuccessAction {
  type: CartTypes.ADD_TO_CART_SUCCESS;
  payload: CartData[];
}

export type DeleteFromCartAction = DeleteFromCartSuccessAction;
