// Raw meta transaction data
const { ethers } = require("hardhat");

// (supply your own calldata)
const CALLDATA = '0x9c54a6b900000000000000000000000037688ff6d47192620baae57d894d4ce91ed0ca930000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002e516d64514e79426232666871396a7166476e685666537362746274727a5547766f5a3974626b4844544a6f595147000000000000000000000000000000000000';

// Address of the elective course contract (or any other contract that we want to execute operations on)
const CONTRACT_ADDRESS = '0x37eb7a818EDcaD4be80c6ab32cCfAaD153584940';

// Nonce (prevents transaction replays)
// Will need to +1 for every next transaction by this user
const NONCE = 1;

// Encode the relay transaction
const abiCoder = new ethers.AbiCoder();
let rawData = abiCoder.encode(
   ["address", "bytes", "uint256"],
   [CONTRACT_ADDRESS, CALLDATA, NONCE]
)
console.log("Relay data:", rawData);

// Hash the data
let hash = ethers.solidityPackedKeccak256(["bytes"], [rawData])
console.log("Data hash:", hash)

// Sign the message
async function sign() {
   const provider = new ethers.AlchemyProvider(network = "sepolia", process.env.ALCHEMY_API_KEY);
   const signer = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY2, provider);
  
   let signature = await signer.signMessage(ethers.getBytes(hash))
   console.log("Signature:", signature)
}
sign();