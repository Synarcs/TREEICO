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
import { keys } from "../actions/configKeys";

function getInfo(action, key) {
  const OwnerContractInfo = {
    // contractMethods: action.payload.contractMethods,
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
      const key = 10;
      let val;
      if (state.contracts.length > 0) {
        val = state.contracts.filter((value) => {
          if (action.payload.address == value.ownerAddress) {
            return value;
          }
        });
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
    case FetchAllData:
      const ServiceDate = action.payload.map((serverData) => {
        return serverData.data();
      });
      if (ServiceDate.length > 0) {
        return {
          ...state,
          contracts: ServiceDate,
        };
      }
    default:
      return state;
  }
}
