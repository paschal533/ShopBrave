const CompanyFactoryContract = artifacts.require("CompanyFactory");
const CompanyContract = artifacts.require("Company");

contract("CompanyFactory: deployment", () => {
  it("has been deployed", async () => {
    const companyFactory = CompanyFactoryContract.deployed();
    assert(companyFactory, "company factory was not deployed");
  });
});

contract("CompanyFactory: createCompany", (accounts) => {
  let companyFactory;
  const name = "Company name";
  const beneficiary = accounts[1];

  it("increments the companysCount", async () => {
    companyFactory = await CompanyFactoryContract.deployed();
    const currentCompanysCount = await companyFactory.companiesCount();
    await companyFactory.createCompany(
      name,
      beneficiary,
    );
    const newCompanyCount = await companyFactory.companiesCount();

    assert.equal(
      newCompanyCount - currentCompanysCount,
      1,
      "should increment by 1"
    );
  });

  it("emits the CompanyCreated event", async () => {
    companyFactory = await CompanyFactoryContract.deployed();
    const tx = await companyFactory.createCompany(
      name,
      beneficiary
    );
    const expertedEvent = "CompanyCreated";
    const actualEvent = tx.logs[0].event;

    assert.equal(actualEvent, expertedEvent, "events should match");
  });
});

contract("CompanyFactory: buyProduct and confirm product", (accounts) => {
  let companyFactory;
  const name = "Company name";
  const beneficiary = accounts[1];
  const value = web3.utils.toWei("0.0209");
  const price = web3.utils.toWei("0.0309");
  const buyer = accounts[2];

  it("Buys a product", async () => {
    companyFactory = await CompanyFactoryContract.deployed();
    const company = await companyFactory.createCompany(
      name,
      beneficiary,
    );

    const tx = await companyFactory.buyProduct(company.logs[0].address, value, { from: buyer, value })

    //console.log(tx.logs[0].args.id)

  });

  it("confirms a product", async () => {
    companyFactory = await CompanyFactoryContract.deployed();
    const company = await companyFactory.createCompany(
      name,
      beneficiary,
    );

    await companyFactory.buyProduct(company.logs[0].address, value, { from: buyer, value : price })
    const tx = await companyFactory.confirmProduct(1, { from: buyer });

  });

  it("Buys a product : reverts when not enoungh fund is sent", async () => {
    companyFactory = await CompanyFactoryContract.deployed();
    const company = await companyFactory.createCompany(
      name,
      beneficiary,
    );

    try {
      await companyFactory.buyProduct(company.logs[0].address, value)
      assert.fail("error was not raised");
    } catch (err) {
      const expected = "not enoungh fund sent";
      assert.ok(err.message.includes(expected), `${err.message}`);
    }

  });

});

contract("CompanyFactory: company", (accounts) => {
  async function createCompanyFactory(companysCount, accounts) {
    const factory = await CompanyFactoryContract.new();
    await addCompanys(factory, companysCount, accounts);
    return factory;
  }

  async function addCompanys(factory, count, accounts) {
    const name = "Beneficiary";
    const beneficiary = accounts[1];

    for (let i = 0; i < count; i++) {
      await factory.createCompany(
        // create a series of CaddCompanys. the index will be used
        // to make them each unique
        `${name} ${i}`,
        beneficiary,
      );
    }
  }

  describe("when company collection is empty", () => {
    it("returns an empty collection", async () => {
      const factory = await createCompanyFactory(0, accounts);
      const companys = await factory.companys(10, 0);
      assert.equal(companys.length, 0, "colection should be empty");
    });
  });

  describe("varying limits", async () => {
    let factory;
    beforeEach(async () => {
      factory = await createCompanyFactory(30, accounts);
    });

    it("returns 10 results when limit requested is 10", async () => {
      const companys = await factory.companys(10, 0);
      assert.equal(companys.length, 10, "results size should be 10");
    });

    // xit marks the test as pending
    it("returns 20 results when limit requested is 20", async () => {
      const companys = await factory.companys(20, 0);
      assert.equal(companys.length, 20, "results size should be 20");
    });

    it("returns 20 results when limit requested is 30", async () => {
      const companys = await factory.companys(30, 0);
      assert.equal(companys.length, 20, "results size should be 20");
    });
  });

  describe("varying offset", () => {
    let factory;
    beforeEach(async () => {
      factory = await createCompanyFactory(10, accounts);
    });

    it("contains the company with the appropriate offset", async () => {
      const companys = await factory.companys(1, 0);
      const company = await CompanyContract.at(companys[0]);
      const name = await company.name();
      assert.ok(await name.includes(0), `${name} did not include the offset`);
    });

    it("contains the company with appropriate offset", async () => {
      const companys = await factory.companys(1, 7);
      const company = await CompanyContract.at(companys[0]);
      const name = await company.name();
      assert.ok(await name.includes(7), `${name} did not include the offset`);
    });
  });

  describe("boundary conditions", () => {
    let factory;
    beforeEach(async () => {
      factory = await createCompanyFactory(10, accounts);
    });

    it("raises out of bounds error", async () => {
      try {
        await factory.companys(1, 11);
        assert.fail("error was not raised");
      } catch (err) {
        const expected = "offset out of bounds";
        assert.ok(err.message.includes(expected), `${err.message}`);
      }
    });

    it("adjusts return size to prevent out of bounds error", async () => {
      try {
        const companys = await factory.companys(10, 5);
        assert.equal(companys.length, 5, "collection adjusted");
      } catch (err) {
        assert.fail("limit and offset exceeded bounds");
      }
    });
  });
});
