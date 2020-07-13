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
    ownerAddress: key.encrypt(action.payload.address, "base64"),
    tokenSale: action.payload.tokenSale,
    childDonars: [], // add each user amount of tokens taken
  };
  return OwnerContractInfo;
}

export default function (state = init, action) {
  switch (action.type) {
    case AddMainOwner:
      const key = new NodeRsa({ keys });

      if (state.contracts.length > 0) {
        let val = state.contracts.filter((val) => {
          if (action.payload.address == val.ownerAddress) {
            return val;
          }
        });
        if (val.length > 0) {
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
