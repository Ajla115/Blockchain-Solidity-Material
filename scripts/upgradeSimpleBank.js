async function main() {
    const SimpleBank = await ethers.getContractFactory("SimpleBankV2");
    console.log("Upgrading SimpleBank...");
    const PROXY_ADDRESS = '0x95aE1787610306a34364748Bf8975AB3D95Cefd6';
    const bank = await upgrades.upgradeProxy(PROXY_ADDRESS, SimpleBank);
    await bank.waitForDeployment();


    console.log(
        "SimpleBankV2 (logic contract): ",
        await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS)
    );
}


main().then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exitCode = 1;
});