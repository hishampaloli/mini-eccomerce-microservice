import { ProductTypes, ViewProductTypes } from "../constants/index";
import { ProductData } from "../../models/product";

interface GetAllProductsSuccessAction {
  type: ProductTypes.ALL_PRODUCTS_SUCCESS;
  payload: ProductData[];
}

interface GetAllProductsFailAction {
  type: ProductTypes.ALL_PRODUCTS_FAIL;
  payload: any;
}

export type GetAllProductsAction =
  | GetAllProductsSuccessAction
  | GetAllProductsFailAction;

interface ViewProductSuccessAction {
  type: ViewProductTypes.GET_PRODUCTS_SUCCESS;
  payload: ProductData;
}

interface ViewProductFailAction {
  type: ViewProductTypes.GET_PRODUCTS_FAIL;
  payload: any;
}

export type ViewProductAction =
  | ViewProductSuccessAction
  | ViewProductFailAction;

export type AddNewProductAction =
  | GetAllProductsSuccessAction
  | GetAllProductsFailAction;

export type UpdateProductAction = ViewProductSuccessAction;
