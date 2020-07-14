import Web3 from "web3";
import erc from "../../../ethereum/build/Erc.json";
import sale from "../../../ethereum/build/Sale.json";

const ganacheProvider = "http://127.0.0.1:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheProvider));

export const getAcc = async () => {
  const provider = await web3.eth.currentProvider;
  const acc = await web3.eth.getAccounts();
  return acc;
};

export const ContractData = () => {
  return {
    saleInterface: sale.interface,
    saleBytecode: sale.bytecode,
    Ercinterface: erc.interface,
    Ercbytecode: erc.bytecode,
  };
};

export default web3;
