const solc = require("solc");
const path = require("path");
const fs = require("fs-extra");

const { buildpath } = require("./buildconfig");

const contractPath = path.resolve(__dirname, "./contracts/Erc.sol");

const contractData = fs.readFileSync(contractPath, "utf-8");

let compiled = solc.compile(contractData, 1).contracts;

fs.ensureDirSync(buildpath);

for (let contract in compiled) {
  fs.outputJSONSync(
    path.resolve(buildpath, contract.replace(":", "").trim() + ".json"),
    compiled[contract]
  );
}
