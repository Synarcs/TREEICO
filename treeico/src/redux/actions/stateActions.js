import firebase from "firebase";
import bcrypt from "bcryptjs";

// redux
import { AddMainOwner, FetchAllData } from "../reducers/types";
// web3
import DeployContract from "../../ethereumconfig/DeployContract";

export const MainOwner = (address, tokenSale) => {
  return async (dispatch) => {
    const contract = await DeployContract("ERC", address, tokenSale);
    const addresses = await contract.options.address;
    const contractMethods = await contract.methods;
    localStorage.setItem(addresses, contract);
    firebase
      .firestore()
      .collection("MainIconOwners")
      .doc(addresses)
      .get()
      .then((data) => {
        if (data.exists) {
          // do nothing
        } else {
          firebase
            .firestore()
            .collection("MainIconOwners")
            .doc(addresses)
            .set({
              deployedAddress: addresses,
              ownerAddress: bcrypt.hashSync(address, 10),
              tokenSale,
              childDonars: [],
              // contractMethods,
            });
        }
      });
    dispatch({
      type: AddMainOwner,
      payload: {
        addresses,
        address,
        tokenSale,
        // contractMethods,
      },
    });
  };
};

export const fetcher = () => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("MainIconOwners")
      .get()
      .then((data) => {
        dispatch({
          type: FetchAllData,
          payload: data.docs,
        });
      });
  };
};
