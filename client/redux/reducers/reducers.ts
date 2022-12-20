import { combineReducers } from "redux";
import { allProductsReducer } from "./productReducers";
import { userReducer } from "./userReducer";
import { allUsersReducer } from "./adminReducer";

const reducers = combineReducers({
  allProducts: allProductsReducer,
  user: userReducer,
  allUsers: allUsersReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
