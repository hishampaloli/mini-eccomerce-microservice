import {
  ProductTypes
} from "../constants/productsTypes";

export const allProductsReducer = (state = { products: [], loading: false }, action: any) => {
  switch (action.type) {
    case ProductTypes.ALL_PRODUCTS_SUCCESS:
      return {
        loading: true,
        products: action.payload,
      };

    case ProductTypes.ALL_PRODUCTS_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};
