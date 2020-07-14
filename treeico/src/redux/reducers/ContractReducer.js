import {
  AddMainOwner,
  GetSomeTokens,
  BuyTokensInSale,
  FetchAllData,
  EndSale,
} from "./types";

const init = {
  contracts: [], // all global store of contracts
};
import NodeRsa from "node-rsa";
import { keys } from "../actions/configKeys";

function getInfo(action, key) {
  const OwnerContractInfo = {
    rootContract: action.payload.contract,
    deployedAddress: action.payload.addresses,
    ownerAddress: action.payload.address,
    tokenSale: action.payload.tokenSale,
    childDonars: [], // add each user amount of tokens taken
  };
  return OwnerContractInfo;
}

export default function (state = init, action) {
  switch (action.type) {
    case AddMainOwner:
      const key = new NodeRsa(keys);
      let val;
      if (state.contracts.length > 0) {
        val = state.contracts.filter((value) => {
          if (action.payload.address == value.ownerAddress) {
            return value;
          }
        });
        console.log(val);
        if (val.length > 0) {
          alert("Only one contract sale allowed till child fullfils");
          return {
            ...state,
          };
        } else {
          let OwnerContractInfo = getInfo(action, key);
          return {
            ...state,
            contracts: [...state.contracts, OwnerContractInfo],
          };
        }
      } else {
        let OwnerContractInfo = getInfo(action, key);
        return {
          ...state,
          contracts: [...state.contracts, OwnerContractInfo],
        };
      }
    default:
      return state;
  }
}
