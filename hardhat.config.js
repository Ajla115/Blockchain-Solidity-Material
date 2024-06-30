require("@nomicfoundation/hardhat-toolbox");


require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`,
      accounts: [process.env.SECRET_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API
  }
};


//npx hardhat run scripts/deployUUPSProxy.js --network sepolia