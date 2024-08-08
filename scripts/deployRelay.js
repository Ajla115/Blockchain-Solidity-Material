const { ethers } = require("hardhat");

async function main() {
    const Relay = await ethers.getContractFactory("Relay");
    console.log("Deploying Relay...");
    const contract = await Relay.deploy();
    await contract.waitForDeployment();

    console.log("Relay address: ", contract.target);
}

main().then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });

    //await relay.addToWhitelist("0x37688FF6D47192620BAae57d894d4ce91ed0ca93")
    //await relay.addHolderRecord("")
   
    const relay = await Relay.attach("0x2Ebd055C9294Bdc2217C1BE6F08AcE82338Cd44C")

    await relay.addToWhitelist("0x37688FF6D47192620BAae57d894d4ce91ed0ca93")