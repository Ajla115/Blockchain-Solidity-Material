const hre = require("hardhat");

async function main() {
    const LightsaberV2 = await ethers.getContractFactory("LightsaberV2");
    console.log("Upgrading Lightsaber ...");
    const PROXY_ADDRESS = "0x288EE2cA46fb521e59bBBC33EDD5CE4737739368"; //TRANSPARENT UPGRADABLE PROXY ADDRESS
    const lightsaberV2 = await upgrades.upgradeProxy(PROXY_ADDRESS, LightsaberV2);
    await lightsaberV2.waitForDeployment();
    console.log("LightsaberV2 (logic contract)", await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS));
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0))
    .catch(error => { 
    console.error(error);
    process.exitCode = 1;
  });
  