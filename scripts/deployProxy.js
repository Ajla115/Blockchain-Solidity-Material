async function main(){
    const Pizza = await ethers.getContractFactory("Pizza"); //here, we are fetching the contract
    console.log("Deploying Pizza....");
    const pizza = await upgrades.deployProxy(Pizza, [8], {initializer : 'initialize'});
    //we specify the initializor (that is constructor in proxy) parameters in []
    //deployProxy is OpenZepellin method
    await pizza.waitForDeployment();

    console.log("Pizza (proxy contract):", pizza.target); //contract with which users interact 
    console.log("Pizza (logic contract):", await upgrades.erc1967.getImplementationAddress(pizza.target)); //the actual backend code
    console.log("Pizza (proxy admin contract):", await upgrades.erc1967.getAdminAddress(pizza.target)); // admin and upgrade capabilities

}

main().then(() => process.exit(0))
    .catch(error => { 
    console.error(error);
    process.exitCode = 1;
  });
  