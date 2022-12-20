import { ProductState, ViewProductState } from "../../models/product";
import {
  GetAllProductsAction,
  ViewProductAction,
} from "../action-models/product-action-model";
import { ProductTypes, ViewProductTypes } from "../constants/index";

export const allProductsReducer = (
  state: ProductState = { products: [], loading: false, error: null },
  action: GetAllProductsAction
): ProductState => {
  switch (action.type) {
    case ProductTypes.ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: null,
      };

    case ProductTypes.ALL_PRODUCTS_FAIL:
      return {
        error: action.payload,
        loading: false,
        products: [],
      };

    default:
      return state;
  }
};

export const VeiwProductReducer = (
  state: ViewProductState = { product: null, loading: false, error: null },
  action: ViewProductAction
): ViewProductState => {
  switch (action.type) {
    case ViewProductTypes.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        error: null,
      };

    case ViewProductTypes.GET_PRODUCTS_FAIL:
      return {
        error: action.payload,
        loading: false,
        product: null,
      };

    default:
      return state;
  }
};
