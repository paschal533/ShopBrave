const CompanyFactoryContract = artifacts.require("CompanyFactory");

module.exports = async function (deployer) {
  deployer.deploy(CompanyFactoryContract);
};
