import { combineReducers } from "redux";
import { allProductsReducer, VeiwProductReducer } from "./productReducers";
import { userReducer } from "./userReducer";
import { allUsersReducer } from "./adminReducer";

const reducers = combineReducers({
  allProducts: allProductsReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  viewProduct: VeiwProductReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
