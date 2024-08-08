async function main() {

    const Timelock = await ethers.getContractFactory("Timelock");
    console.log("Deploying Timelock...");

    const MIN_DELAY = 10; // wait for 10 blocks before executing
    const PROPOSERS = [];
    const EXECUTORS = [];
    const TIMELOCK_ADMIN = "0x4A6D300C16fDbEc06AD04Bf56f79C69B82F7e191" // your Metamask account

    const timelock = await Timelock.deploy(MIN_DELAY, PROPOSERS, EXECUTORS, TIMELOCK_ADMIN)
    await timelock.waitForDeployment();

    console.log("Timelock address:", timelock.target);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });