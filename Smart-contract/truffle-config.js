const path = require("path");
const HDWalletProviderV2 = require("@truffle/hdwallet-provider");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  compilers: {
    solc: {
      version: "0.8.0",
      parser: "solcjs",
    },
  },
  contracts_build_directory: path.join(__dirname, "../frontend/contracts"),
  networks: {
    develop: {
      port: 8545,
    },
    goerli: {
      networkCheckTimeout: 10000,
      provider: function () {
        return new HDWalletProviderV2({
          privateKeys: [process.env.PrivateKey], // Adding the account private key used for sending transactions
          providerOrUrl: `https://goerli-rollup.arbitrum.io/rpc`, //Arbitrum goeli rpc
        });
      },
      network_id: 421613, // Arbitrum Goerli testnet networkId is 421613
      timeoutBlocks: 200,
      gas: 20000000,
    },
  },
};