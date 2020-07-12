const fs = require("fs-extra");
const { metamaskSeed } = require("./config");
const hdwallet = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const { interface, bytecode } = require("../build/ICO.json");

const provider = new hdwallet(
  metamaskSeed,
  "https://rinkeby.infura.io/v3/10679b6ae6214c0f90cddc3632ad14d3"
);

const web3 = new Web3(provider);

let acc = [];

async function User() {
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];
  const balance = await web3.eth.getBalance(web3.eth.defaultAccount);
  console.log(web3.utils.fromWei(balance, "ether"));
}

User();
