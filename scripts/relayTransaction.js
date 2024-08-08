async function main() {
    console.log("Accessing the relay...");

    // Your relay address
    const RELAY_ADDRESS = '0x2Ebd055C9294Bdc2217C1BE6F08AcE82338Cd44C'

    // Raw meta transaction data
    // (supply your own calldata)
    const CALLDATA = '0x9c54a6b900000000000000000000000037688ff6d47192620baae57d894d4ce91ed0ca930000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002e516d62336653683936627948753436504e58786d5370633933426378614b6135464d4c31764e545a76586b747a7a000000000000000000000000000000000000';

    // Address of the elective course contract (or any other contract that we want to execute operations on)
    const CONTRACT_ADDRESS = '0x37eb7a818EDcaD4be80c6ab32cCfAaD153584940';

    // Nonce (prevents transaction replays)
    // Will need to +1 for every next transaction by this user
    const NONCE = 1;

    // Meta transaction signature (supply the signature)
    const SIGNATURE = '0x5aabc1b183dbe201bfe49b19e22d74152d45a66eade72709ff7759fa159f66dd505bd3de261c559d54e20eb21a2ddfcd07412662944e757dbbcda335d7e70ec21c'

    const relay = await ethers.getContractAt("Relay", RELAY_ADDRESS);

    const relayTx = await relay.forward(CONTRACT_ADDRESS, CALLDATA, NONCE, SIGNATURE)
    await relayTx.wait()

    console.log("Transaction successfully relayed.");
    console.log(relayTx)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });