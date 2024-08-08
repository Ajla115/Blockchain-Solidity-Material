async function main() {
    const AjlaDAOGovernor = await ethers.getContractFactory("AjlaDAOGovernor");
    console.log("Deploying AjlaDAOGovernor...");
  
    //vote token address je adresa coina
    const VOTE_TOKEN_ADDRESS = '0xe7A84B356de461bac51827b0a2A3e6ecd04E0730'
    const TIMELOCK_ADDRESS = '0x490C3a72DADE622Be9547457065f64a572bE2909'


    const governor = await AjlaDAOGovernor.deploy(VOTE_TOKEN_ADDRESS, TIMELOCK_ADDRESS)
    await governor.waitForDeployment();
 
    console.log("AjlaDAOGovernor address:", governor.target);
 }
  
 main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
 
    //AjlaDAOGovernor address: 0x63B13142AB1591109D7AAcb1f24b921BcD72Ef49