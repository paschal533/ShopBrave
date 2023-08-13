const CompanyContract = artifacts.require("Company");

contract("Company", (accounts) => {
  let company;
  const id = 0;
  const name = "custodian name";
  const owner = accounts[0];
  const beneficiary = accounts[1];

  beforeEach(async () => {
    company = await CompanyContract.new(
      id,
      name,
      owner,
      beneficiary,
    );
  });

  describe("initialization", () => {
    it("gets the company name", async () => {
      const actaul = await company.name();
      assert.equal(actaul, name, "name should match");
    });

    it("gets the beneficiary", async () => {
      const actaul = await company.beneficiary();
      assert.equal(actaul, beneficiary, "beneficiary should match");
    });
  });

  describe("setBeneficiary", () => {
    const newBeneficiary = accounts[2];

    it("update beneficiary when called by owner account", async () => {
      await company.setBeneficiary(newBeneficiary, { from: owner });
      const actualBeneficiary = await company.beneficiary();
      assert.equal(
        actualBeneficiary,
        newBeneficiary,
        "beneficiary should match"
      );
    });

    it("throws an error when called from a non-owner account", async () => {
      try {
        await company.setBeneficiary(newBeneficiary, { from: accounts[3] });
        assert.fail("withdraw was not restricted to owners");
      } catch (err) {
        const expectedError = "Ownable: caller is not the owner";
        const actualError = err.reason;
        assert.equal(actualError, expectedError, "should not be permitted");
      }
    });
  });

  describe("withdrawing funds", () => {
    beforeEach(async () => {
      const value = web3.utils.toWei("0.0209");
      await web3.eth.sendTransaction({
        to: company.address,
        from: accounts[9],
        value,
      });
    });

    describe("access controls", () => {
      it("throws an error when called from a non-onwer account", async () => {
        try {
          await company.withdraw({ from: accounts[3] });
          assert.fail("withdraw was not restricted to owner");
        } catch (err) {
          const expectedError = "Ownable: caller is not the owner";
          const actualError = err.reason;
          assert.equal(actualError, expectedError, "should not be permitted");
        }
      });

      it("permits the owner to call the funtion", async () => {
        try {
          await company.withdraw({ from: owner });
          assert(true, "no errors were thrown");
        } catch (err) {
          assert.fail("should not have thrown an error");
        }
      });

      it("transfer balance to beneficiary", async () => {
        const currentContractBalance = await web3.eth.getBalance(
          company.address
        );
        const currentBeneficiaryBalance = await web3.eth.getBalance(
          beneficiary
        );

        await company.withdraw({ from: owner });

        const newContractBalance = await web3.eth.getBalance(
          company.address
        );
        const newBeneficiaryBalance = await web3.eth.getBalance(beneficiary);
        const beneficiaryDifference =
          newBeneficiaryBalance - currentBeneficiaryBalance;

        assert.equal(
          beneficiaryDifference,
          currentContractBalance,
          "beneficiary should receive all the funds"
        );
      });

      it("emits withdraw event", async () => {
        const tx = await company.withdraw({ from: owner });
        const expertedEvent = "Withdraw";
        const actualEvent = tx.logs[0].event;

        assert.equal(actualEvent, expertedEvent, "events should match");
      });
    });
  });

  describe("fallback function", () => {
    const value = web3.utils.toWei("0.0209");

    it("increases the totalDonations amount", async () => {
      const currentTotalFunds = await company.totalFunds();
      await web3.eth.sendTransaction({
        to: company.address,
        from: accounts[9],
        value,
      });
      const newTotalFunds = await company.totalFunds();

      const diff = newTotalFunds - currentTotalFunds;

      assert.equal(diff, value, "difference should match the value");
    });

    it("increases dontionsCount", async () => {
      const currentTotalFunds = await company.totalFundsCount();
      await web3.eth.sendTransaction({
        to: company.address,
        from: accounts[9],
        value,
      });
      const newTotalFunds = await company.totalFundsCount();

      assert.equal(
        1,
        newTotalFunds - currentTotalFunds,
        "donationsCount should increment by 1"
      );
    });
  });
});
