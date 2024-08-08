const hre = require("hardhat");

async function main() {

    const CharityV3 = await ethers.getContractFactory("CharityV3");
    console.log("Upgrading charity to version 3...");
    const PROXY_ADDRESS = "0x97cE79e3e63D286A7f954628EeCaaf9b3Da1399a"; 
    //ovo se mijenja za svaki zadatak, na osnovu podataka sa EtherScana
    const charityV3 = await upgrades.upgradeProxy(PROXY_ADDRESS, CharityV3);
    await charityV3.waitForDeployment();
    console.log("CharityV3 (logic contract)", await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS));
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
