const assert = require("assert");

// first is owner default web3 acc
function tester(contract, web3, acc) {
  it("the allowance issue", async () => {
    const val = await contract.methods.transferFrom(acc[0], acc[1], 100).send({
      from: acc[1],
      gas: "100000",
    });
    const event = val.events;
    console.log(events);
    const balance = await contract.methods
      .getCurreentTokensAvailable(acc[1])
      .call();
    console.log(balance);
    assert.ok(balance);
  });
}

module.exports.tester = tester;
