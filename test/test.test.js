const fs = require("fs-extra");
const Web3 = require("web3");
const ganache = require("ganache-cli");
const assert = require("assert");

const { buildpath } = require("../ethereum/buildconfig");
const { interface, bytecode } = require("../ethereum/build/Erc.json");
const {
  interface: itr,
  bytecode: byt,
} = require("../ethereum/build/Sale.json");

const web3 = new Web3(ganache.provider());
const { tester } = require("./allowance.test");

// config
let acc = [];
let contract, sale;
let events = [];

beforeEach(async () => {
  acc = await web3.eth.getAccounts();
  contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [100000],
    })
    .send({
      from: acc[0],
      gas: "1000000",
    });
  sale = await new web3.eth.Contract(JSON.parse(itr))
    .deploy({
      data: byt,
      arguments: [contract.options.address],
    })
    .send({
      from: acc[3],
      gas: "1000000",
    });
});

describe("check for balance", async () => {
  it("balance", async () => {
    if (acc.length > 0) {
      let balance = await web3.eth.getBalance(acc[0]);
      balance = web3.utils.fromWei(balance, "ether");
      assert(balance, 100);
    }
  });
  it("check init condition", async () => {
    const ownerAddress = await contract.methods.ownerContract().call();
    assert.ok(ownerAddress);
    assert.ok(contract.options.address);
  });
  it("check total token explodes", async () => {
    let totalSupply = await contract.methods.totalSypply().call();
    assert.equal(100000, totalSupply);
  });
  it("check name and symbol", async () => {
    let name = await contract.methods.name().call();
    let symbol = await contract.methods.symbol().call();
    assert.equal(name, "ICO20");
    assert.equal(symbol, "ICO");
  });
  it("transferr token", async () => {
    const recipt = await contract.methods.transfer(acc[1], 100).send({
      from: acc[0],
      gas: "1000000",
    });
    const balance = await contract.methods.getCurreentTokensAvailable().call({
      from: acc[1],
    });
    const result = await contract.getPastEvents("Transfer", {
      filter: {
        value: 100,
        // add the super functions passed value to get the signed event by the private transaction hash
      },
      fromBlock: 0,
    });
    assert.notEqual(await web3.eth.getBalance(acc[0]), 100);
    assert.ok(result);
  });
  it("check approved value", async () => {
    // first approve
    // get the approved count
    // transfer amout
    const app = await contract.methods.approve(acc[1], 2000).send({
      from: acc[0],
      gas: "1000000",
    });
    console.log(app.events);
    const value = await contract.methods.allowance(acc[0], acc[1]).call();
    console.log(value);
    assert.equal(value, 2000);
  });
  it("allowance", () => {
    tester(contract, web3, acc);
  });
  it("the check for sale contract", async () => {
    const addr = await sale.methods.SystemAdmin().call();
    const addr1 = await sale.methods.tokenContract().call();
    console.log(addr1);
    console.log(addr);
    assert.ok(addr1);
    assert.ok(addr);
  });
  it("check for mul", async () => {});
});
