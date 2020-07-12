import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "../redux/reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

export const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
