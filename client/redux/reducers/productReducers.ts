import { ProductState } from "../../models/product";
import { GetAllProductsAction } from "../action-models/product-action-model";
import { ProductTypes } from "../constants/index";

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
