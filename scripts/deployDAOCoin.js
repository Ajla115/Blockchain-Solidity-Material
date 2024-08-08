const { ethers } = require("hardhat");

async function main() {
  
  const AjlaDAOCoin = await ethers.getContractFactory("AjlaDAOCoin");
  console.log("Deploying AjlaDAOCoin...");
  // Ethereum uses amount * 10^18 for token amounts
  // So, 1000000000000000000000 = 1000 000000000000000000 1000 * 10^18 = 1000 total tokens
  const token = await AjlaDAOCoin.deploy("1000000000000000000000")
  await token.waitForDeployment();

  console.log("AjlaDAOCoin address: ", token.target);
}

main().then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});