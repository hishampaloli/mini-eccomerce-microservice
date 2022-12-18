import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";

const bindMiddlware = (middlware: any[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middlware));
  }

  return applyMiddleware(...middlware);
};

const reducer = (state: any, action: any): any => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};

let initialState: any;

if (typeof window !== "undefined") {
  const userInfoFromStorage = window.localStorage?.getItem("userInfo")
    ? JSON.parse(window.localStorage?.getItem("userInfo"))
    : null;

  initialState = {
    user: { userInfo: userInfoFromStorage },
  };
} else {
  console.log("You are on the server");
}

const initStore = () => {
  return createStore(reducer, initialState, bindMiddlware([thunk]));
};

export const wrapper = createWrapper(initStore);
