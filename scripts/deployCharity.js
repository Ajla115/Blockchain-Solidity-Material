const hre = require("hardhat");

async function main() {
    const Charity = await ethers.getContractFactory("Charity");
    console.log("Deploying Charity contract...");
    const charity = await upgrades.deployProxy(Charity, [], {initializer: "initialize", });
    //specify the contract, the constructor parameters in [ ], and the initializer function (bc, you
    //cannot use constructors, so we have to use a function to initialize a smart contract).

    await charity.waitForDeployment();
    console.log("Charity (proxy contract): ", charity.target);
    console.log("Charity  (logic contract): ", await upgrades.erc1967.getImplementationAddress(charity.target));
    console.log("Charity  (proxy admin contract): ", await upgrades.erc1967.getAdminAddress(charity.target));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});