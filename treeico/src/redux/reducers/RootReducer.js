import { combineReducers } from "redux";
import ContractReducer from "./ContractReducer";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
  contracts: ContractReducer, //handle all contract func
  err: ErrorReducer, //handle all error on clien
});
