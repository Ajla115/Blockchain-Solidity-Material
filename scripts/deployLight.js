async function main(){
    const Lightsaber = await ethers.getContractFactory("Lightsaber"); //here, we are fetching the contract
    console.log("Deploying Lightsaber....");
    const lightsaber = await upgrades.deployProxy(Lightsaber, [100], {initializer : 'initialize'});
    //we specify the initializor (that is constructor in proxy) parameters in []
    //There are no custom parameters, it is predefined
    //deployProxy is OpenZepellin method
    await lightsaber.waitForDeployment();

    console.log("Lightsaber (proxy contract):", lightsaber.target); //contract with which users interact 
    console.log("Lightsaber (logic contract):", await upgrades.erc1967.getImplementationAddress(lightsaber.target)); //the actual backend code
    console.log("Lightsaber (proxy admin contract):", await upgrades.erc1967.getAdminAddress(lightsaber.target)); // admin and upgrade capabilities

}

main().then(() => process.exit(0))
    .catch(error => { 
    console.error(error);
    process.exitCode = 1;
  });
  