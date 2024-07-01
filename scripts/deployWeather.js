async function main() {
    const WeatherOracle = await ethers.getContractFactory("WeatherOracle");
    console.log("Deploying WeatherOracle...");
 
 
    const weather = await WeatherOracle.deploy(0)
    await weather.deployed();
 
 
    console.log("WeatherOracle address:", weather.address);
 }
 
 
 main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
 