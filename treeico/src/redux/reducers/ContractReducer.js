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

export default function (state = init, action) {
  switch (action.type) {
    case AddMainOwner:
      const OwnerContractInfo = {
        rootContract: action.payload.contract,
        rootAddress: action.payload.addresses,
        childDonars: [], // add each user amount of tokens taken
      };
      return {
        ...state,
        contracts: [...state.contracts, OwnerContractInfo],
      };
    default:
      return state;
  }
}
