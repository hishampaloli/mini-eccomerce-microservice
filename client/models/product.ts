import { ErrorState } from "./user";

export interface ProductData {
  description: string;
  id: string;
  image: string;
  price: number;
  stock: number;
  title: string;
}


export interface ProductState {
    products: ProductData[] | []
    error: ErrorState[] | null
    loading: boolean
}