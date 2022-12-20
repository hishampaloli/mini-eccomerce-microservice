import { ProductTypes } from "../constants/index";
import { ProductData } from "../../models/product";

interface GetAllProductsSuccessAction {
    type: ProductTypes.ALL_PRODUCTS_SUCCESS
    payload: ProductData[]
  }
  
  interface GetAllProductsFailAction {
    type: ProductTypes.ALL_PRODUCTS_FAIL;
    payload: any
  }
  
  export type GetAllProductsAction = GetAllProductsSuccessAction | GetAllProductsFailAction;
