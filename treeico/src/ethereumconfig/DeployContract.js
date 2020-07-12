import web3 from "./web3eth";
import { getAcc, ContractData } from "./web3eth";

async function DeployContract(type, address, tokenSaleAmount) {
  // handle sale else where
  const { Ercbytecode, Ercinterface } = ContractData();
  switch (type) {
    case "ERC":
      const contract = await new web3.eth.Contract(JSON.parse(Ercinterface))
        .deploy({
          data: Ercbytecode,
          arguments: [tokenSaleAmount],
        })
        .send({
          from: address,
          gas: "1000000",
        });
      return contract;
    default:
      return null;
  }
}

export default DeployContract;
