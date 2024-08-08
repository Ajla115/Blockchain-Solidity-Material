const { ethers } = require("hardhat")

// student address
let studentAddress = "0x37688FF6D47192620BAae57d894d4ce91ed0ca93"
// Course list
let ipfs = 'QmdQNyBb2fhq9jqfGnhVfSsbtbtrzUGvoZ9tbkHDTJoYQG';

// Define the contract ABI interface
const abi = [
    "function addHolderRecord(address,string)"
]
const interface = new ethers.Interface(abi)

// Get the function signature by hashing it and retrieving the first 4 bytes
let fnSignature = interface.getFunction("addHolderRecord").selector
console.log("Function signature:", fnSignature);

// Encode the function parameters and generate the calldata
let fnParams = interface.encodeFunctionData("addHolderRecord", [studentAddress, ipfs])
console.log("Calldata:", fnParams);