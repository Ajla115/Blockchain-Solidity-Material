// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BitcoinOracle {
    // Define the necessary storage variables
    uint moneyID;

    mapping(uint => uint) public moneyResults;

    // Mapping from moneyId => completion status for smart contract interactions to check
   mapping(uint => bool) public moneyStatus;

    // Define the necessary event(s)
    event getBitcoinPriceEvent(string currency, uint moneyID);

    // Define the constructor (if necessary)
    constructor(uint initialId) {
       moneyID = initialId;
   }


    // Call this method to pull the latest Bitcoin price for a given currency
    function getBitcoinPrice(string memory currency) public {

        emit getBitcoinPriceEvent(currency, moneyID);
        moneyID++;
    }

    function updateBitcoinPrice(uint newValue, uint _moneyId) public {
       // updateBitcoinPrice() is called by Node.js; upon API results, data is updated
       moneyResults[_moneyId] = newValue;
       moneyStatus[_moneyId] = true;
   }

   function getLatestCurrencyValue() external view returns (uint) {
       return moneyResults[moneyID - 1];
   }
        
}

   