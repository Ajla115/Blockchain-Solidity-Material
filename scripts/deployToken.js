const { ethers } = require("hardhat");

async function main() {
  
  const Token = await ethers.getContractFactory("AjlaCoin");
  console.log("Deploying Token...");

  const token = await Token.deploy()
  await token.waitForDeployment();

  console.log("Token address: ", token.target);
}



main().then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});