require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    // ... rest of network config
    // goerli: {
    //   url: `https://goerli.infura.io/v3/89eb20eec19b430b97d4597a4f607c7d`,
    //   accounts: [GOERLI_PRIVATE_KEY]
    // },

    'truffle-dashboard': {
      url: "http://localhost:24012/rpc"
    }

}};
