async function main() {
    const ExamLedger = await ethers.getContractFactory("ExamLedger");
    console.log("Deploying ExamLedger...");
    const ledger = await upgrades.deployProxy(ExamLedger, [], {
        initializer: 'initialize',
    });
    await ledger.waitForDeployment();

    console.log("ExamLedger (proxy contract): ", ledger.target);
    console.log(
        "ExamLedger (logic contract): ",
        await upgrades.erc1967.getImplementationAddress(ledger.target)
    );
}

//here, we have no proxy admin

main().then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

//npx hardhat run scripts/deployUUPSProxy.js --network sepolia
//npx hardhat console --network sepolia
//const bank = await ethers.getContractFactory("ExamLedger")
//const bankProxy  = await bank.attach("0x37eb7a818EDcaD4be80c6ab32cCfAaD153584940")
// npx hardhat run scripts/upgradeUUPSProxy.js --network sepolia


//Deploying ExamLedger...
/*ExamLedger (proxy contract):  0x37eb7a818EDcaD4be80c6ab32cCfAaD153584940
ExamLedger (logic contract):  0xc8f7946869436e611d1E41763d1Db384e7231a0C
ExamLedgerV2 (logic contract):  0xc8f7946869436e611d1E41763d1Db384e7231a0C*/

//