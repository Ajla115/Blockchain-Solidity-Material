const hre = require("hardhat");

async function main() {

    /*const LemonadeV2 = await ethers.getContractFactory("LemonadeV2");
    console.log("Upgrading Lemonade...");
    const PROXY_ADDRESS = "0xfeF21d9E82d0c8Bd3f17EaD91c3C65693Ee7fFB1"; 
    //ovo se mijenja za svaki zadatak, na osnovu podataka sa EtherScana
    const lemonadev2 = await upgrades.upgradeProxy(PROXY_ADDRESS, LemonadeV2);
    await lemonadev2.waitForDeployment();
    console.log("Lemonade V2 (logic contract)", await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS));*/

    const LemonadeV3 = await ethers.getContractFactory("LemonadeV3");
    console.log("Upgrading Lemonade second time...");
    const PROXY_ADDRESS = "0xfeF21d9E82d0c8Bd3f17EaD91c3C65693Ee7fFB1"; 
    //ovo se mijenja za svaki zadatak, na osnovu podataka sa EtherScana
    const lemonadev3 = await upgrades.upgradeProxy(PROXY_ADDRESS, LemonadeV3);
    await lemonadev3.waitForDeployment();
    console.log("Lemonade V3 (logic contract)", await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS));
    
}

//0x854C7C3df45625d92073A98b09581D6F56cB7fd3 -> logic contract for V2

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
