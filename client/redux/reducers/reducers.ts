import { combineReducers } from "redux";
import { allProductsReducer, VeiwProductReducer } from "./productReducers";
import { userReducer } from "./userReducer";
import { allUsersReducer } from "./adminReducer";
import { cartReducer } from "./cartReducer";

const reducers = combineReducers({
  allProducts: allProductsReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  viewProduct: VeiwProductReducer,
  cart: cartReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
