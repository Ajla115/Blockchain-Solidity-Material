const hre = require("hardhat");

async function main() {
    const joint = await hre.ethers.deployContract("Joint");
    await joint.waitForDeployment();
    console.log(`Joint deployed at: ${joint.target}`);
    }
    // We recommend this pattern to be able to use async/await everywhere
    // and properly handle errors.
    main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  