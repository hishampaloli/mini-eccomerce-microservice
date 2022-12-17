import { combineReducers } from "redux";
import { allProductsReducer } from "./productReducers";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  allProducts: allProductsReducer,
  user: userReducer,
});

export default reducers;
