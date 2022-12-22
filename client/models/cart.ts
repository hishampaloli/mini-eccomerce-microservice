import { ProductData } from "./product";
import { ErrorState } from "./user";

export interface CartData {
  count: number;
  product: ProductData;
}


export interface CartState {
    cart: CartData[] | [];
    error: ErrorState[] | null;
    loading: boolean;
  }