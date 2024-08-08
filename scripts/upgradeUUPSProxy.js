async function main() {
    const ExamLedger = await ethers.getContractFactory("ExamLedgerV2");
    console.log("Upgrading ExamLedger...");
    const PROXY_ADDRESS = '0x37eb7a818EDcaD4be80c6ab32cCfAaD153584940';
    const examLedger = await upgrades.upgradeProxy(PROXY_ADDRESS, ExamLedger);
    await examLedger.waitForDeployment();


    console.log(
        "ExamLedgerV2 (logic contract): ",
        await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS)
    );
}


main().then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exitCode = 1;
});