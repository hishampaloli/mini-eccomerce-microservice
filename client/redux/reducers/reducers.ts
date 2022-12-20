import { combineReducers } from "redux";
import { allProductsReducer } from "./productReducers";
import { userReducer } from "./userReducer";
import { allUsersReducer } from "./adminReducer";

const reducers = combineReducers({
  allProducts: allProductsReducer,
  user: userReducer,
  allUsers: allProductsReducer,
});

export default reducers;
