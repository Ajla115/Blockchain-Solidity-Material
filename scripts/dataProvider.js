const axios = require("axios");

console.log("Setting up data provider...");

// Your deployed oracle address
const ORACLE_ADDRESS = "0xDc9e56C3c843542d44517Cc88e814dec62982a7f";

// The Bitcoin price API call
const callAPI = async () => {
  return await axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json`);
};

main = async () => {
  // Set up the correct event listener

  // Inside the event listener, you can use the following code snippet to get the price data
  // Connect to the deployed contract
  const bitcoinOracle = await ethers.getContractAt(
    "BitcoinOracle",
    ORACLE_ADDRESS
  );
  console.log("Listening for events...");

  bitcoinOracle.on("getBitcoinPriceEvent", async (currency, moneyID) => {
    const {
      data: { bpi },
    } = await callAPI();
    const price = bpi[currency.toUpperCase()].rate_float.toFixed(0);

    console.log(`Bitcoinm update request received. Money: ${price}`);

    if (bpi) {
      await bitcoinOracle.updateBitcoinPrice(newValue, moneyID);
      console.log("Data successfully updated.");
    }
  });
};

main();
