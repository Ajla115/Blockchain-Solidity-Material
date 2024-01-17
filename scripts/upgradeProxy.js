const hre = require("hardhat");

async function main() {
    const PizzaV2 = await ethers.getContractFactory("PizzaV2");
    console.log("Upgrading Pizza...");
    const PROXY_ADDRESS = "0xb87736CCFACa3238d1749072bb64eFdB5B51d8eE"; //TRANSPARENT UPGRADABLE PROXY ADDRESS
    const pizzav2 = await upgrades.upgradeProxy(PROXY_ADDRESS, PizzaV2);
    await pizzav2.waitForDeployment();
    console.log("Pizza V2 (logic contract)", await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS));
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0))
    .catch(error => { 
    console.error(error);
    process.exitCode = 1;
  });
  