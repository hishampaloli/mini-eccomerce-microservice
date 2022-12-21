import { ProductTypes, ViewProductTypes } from "../constants/productsTypes";
import { Dispatch } from "react";
import buildClient from "../../api/buildClient";
import {
  AddNewProductAction,
  GetAllProductsAction,
  ViewProductAction,
} from "../action-models/index";
import { AddNewProductData, ProductData } from "../../models/product";

export const getProducts =
  (req: any) => async (dispatch: Dispatch<GetAllProductsAction>) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await buildClient(req).get<ProductData[]>(
        "/api/product/allProducts",
        config
      );

      dispatch({
        type: ProductTypes.ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ProductTypes.ALL_PRODUCTS_FAIL,
        payload: error.response.data,
      });
    }
  };

export const getSingleProduct =
  (req: any, id: string) => async (dispatch: Dispatch<ViewProductAction>) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await buildClient(req).get<ProductData>(
        `/api/product/${id}`,
        config
      );

      dispatch({
        type: ViewProductTypes.GET_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ViewProductTypes.GET_PRODUCTS_FAIL,
        payload: error.response.data.errors,
      });
    }
  };

export const addNewProduct =
  (req: any, productData: AddNewProductData) =>
  async (dispatch: Dispatch<AddNewProductAction>, getState: any) => {
    console.log(productData);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await buildClient(req).post<ProductData>(
        `/api/product`,
        productData,
        config
      );

      let product = getState().allProducts.products;

      console.log(product);

      dispatch({
        type: ProductTypes.ALL_PRODUCTS_SUCCESS,
        payload: product,
      });
    } catch (error: any) {
      console.log(error.respone.data);

      dispatch({
        type: ProductTypes.ALL_PRODUCTS_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
