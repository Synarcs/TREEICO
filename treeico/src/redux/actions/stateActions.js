import axios from "axios";
import nodersa from "node-rsa";

// redux
import { AddMainOwner, FetchAllData } from "../reducers/types";
// web3
import DeployContract from "../../ethereumconfig/DeployContract";

export const MainOwner = (address, tokenSale) => {
  return async (dispatch) => {
    const contract = await DeployContract("ERC", address, tokenSale);
    const addresses = await contract.options.address;
    axios
      .post("/", {
        addresses,
        address,
        tokenSale,
      })
      .then(console.log)
      .catch((err) => {
        console.log(err);
      });
    dispatch({
      type: AddMainOwner,
      payload: {
        contract,
        addresses,
        address,
        tokenSale,
      },
    });
  };
};
