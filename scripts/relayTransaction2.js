async function main() {
    console.log("Accessing the relay...");

    // Your relay address
    const RELAY_ADDRESS = '0x911F4d1597Ca4d2a05636d400E707a27076fa4fF'

    // Raw meta transaction data
    // (supply your own calldata)
    const CALLDATA = '0x9c54a6b900000000000000000000000037688ff6d47192620baae57d894d4ce91ed0ca930000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002e516d64514e79426232666871396a7166476e685666537362746274727a5547766f5a3974626b4844544a6f595147000000000000000000000000000000000000';

    // Address of the elective course contract (or any other contract that we want to execute operations on)
    const CONTRACT_ADDRESS = '0xF3F5D8899d9f6a9762490277571EF2c1FE56d586';

    // Nonce (prevents transaction replays)
    // Will need to +1 for every next transaction by this user
    const NONCE = 1;

    // Meta transaction signature (supply the signature)
    const SIGNATURE = '0x7443aadafa389a5f1d1d3468847f2202a0cba07b37cb091e1ae1f1950eb09d606d00f485360ff4136ae8381dd3a08b799c9ed6aa2f82bafd170c074981e48c821b'

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