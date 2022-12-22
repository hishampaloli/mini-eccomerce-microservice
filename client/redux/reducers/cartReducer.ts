import { CartState } from "../../models/cart";
import { AddToCartAction } from "../action-models";
import { CartTypes } from "../constants";

export const cartReducer = (
  state: CartState = { cart: [], loading: false, error: null },
  action: AddToCartAction
): CartState => {
  switch (action.type) {
    case CartTypes.ADD_TO_CART_SUCCESS:
      return {
        loading: false,
        cart: action.payload,
        error: null,
      };

    case CartTypes.ADD_TO_CART_FAIL:
      return {
        error: action.payload,
        loading: false,
        cart: [],
      };

    default:
      return state;
  }
};
