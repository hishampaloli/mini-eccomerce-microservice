import { combineReducers } from "redux";
import { allProductsReducer} from "./productReducers";

const reducers = combineReducers({
  allProducts: allProductsReducer,
});

export default reducers;
