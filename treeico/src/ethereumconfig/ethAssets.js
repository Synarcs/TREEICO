import web3 from "./web3eth";
import { ContractData } from "./web3eth";

// deploy an existing asset
export const getSaleContractByAddress = async (deployedAddresss) => {
  const { saleInterface } = ContractData;
  const SaleInstanceCOntract = await web3.eth.Contract(
    JSON.parse(saleInterface),
    deployByAddress.toString()
  );
  return SaleInstanceCOntract;
};

export const DeployNewSaleContract = async (deployerAddress, pricePerToken) => {
  const { saleInterface, saleBytecode } = ContractData;
  const newSaleContractByAdmin = await new web3.eth.Contract(
    JSON.parse(saleInterface)
  )
    .deploy({
      data: saleBytecode,
      arguments: [deployerAddress, pricePerToken],
    })
    .send({
      from: deployerAddress,
      gas: "1000000",
    });
  return newSaleContractByAdmin;
};
