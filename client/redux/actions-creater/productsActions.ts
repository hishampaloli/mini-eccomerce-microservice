import { ProductTypes, ViewProductTypes } from "../constants/productsTypes";
import { Dispatch } from "react";
import buildClient from "../../api/buildClient";
import {
  AddNewProductAction,
  GetAllProductsAction,
  UpdateProductAction,
  ViewProductAction,
} from "../action-models/index";
import { AddNewProductData, ProductData, UpdateProductData } from "../../models/product";

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

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log(productData);
      
      const { data } = await buildClient(req).post<ProductData>(
        `/api/admin/product`,
        productData,
        config
      );

      console.log(data);

      getState().allProducts.products.push(data);

      console.log(getState().allProducts);

      dispatch({
        type: ProductTypes.ALL_PRODUCTS_SUCCESS,
        payload: getState().allProducts.products,
      });

      return "product added";
    } catch (error: any) {
      console.log(error.response);
      
      return "Something went wrong";
    }
  };

export const UpdateProduct =
  (req: any, productData: UpdateProductData, id: string) =>
  async (dispatch: Dispatch<UpdateProductAction>, getState: any) => {

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log(productData);
      

      const { data } = await buildClient(req).put<ProductData>(
        `/api/admin/product/${id}`,
        productData,
        config
      );

      console.log(data);
      

      getState().viewProduct.product = data

      dispatch({
        type: ViewProductTypes.GET_PRODUCTS_SUCCESS,
        payload: getState().viewProduct.product,
      });

      return "Product updated";
    } catch (error: any) {
      console.log(error);
      
      return "Something went wrong";
    }
  };
