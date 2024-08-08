const hre = require("hardhat");

async function main() {
    const Lemonade = await ethers.getContractFactory("Lemonade");
    console.log("Deploying Lemonade contract...");
    const lemonade = await upgrades.deployProxy(Lemonade, [15], {initializer: "initialize", });
    //specify the contract, the constructor parameters in [ ], and the initializer function (bc, you
    //cannot use constructors, so we have to use a function to initialize a smart contract).

    await lemonade.waitForDeployment();
    console.log("Lemonade (proxy contract): ", lemonade.target);
    console.log("Lemonade  (logic contract): ", await upgrades.erc1967.getImplementationAddress(lemonade.target));
    console.log("Lemonade  (proxy admin contract): ", await upgrades.erc1967.getAdminAddress(lemonade.target));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});