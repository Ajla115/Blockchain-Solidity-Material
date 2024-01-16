//For the following contract, create 5 tests 
//(at least one that includes payable, emit and revert):

const { expect } = require("chai");
const { ethers } = require("hardhat");


let Escrow; //calling contract Escrow.sol
let escrowInstance; //creating a contract instance

//Start test block
describe('Escrow', function() {
    beforeEach (async function() {
        Escrow = await ethers.getContractFactory("Escrow");
        escrowInstance = await Escrow.deploy();
    });

    //Test Case to test modifier, onlyAdmin - passes, bc output is failed result from reality
    //Only holder or escrow can create contract
    it("failed to create contract as admin", async function () {
        const[owner, otherAccount1, otherAccount2] = await ethers.getSigners();
        await expect(escrowInstance.createEscrowContract(otherAccount1, otherAccount2)).to.be.revertedWith("You are not permitted to call this function");
    });


    it("successfully create escrow contract", async function () {
        const[owner, otherAccount1, otherAccount2] = await ethers.getSigners();

        //forbids admin/owner to create a contract
        await expect(escrowInstance.createEscrowContract(otherAccount1, otherAccount2)).to.be.revertedWith("You are not permitted to call this function");

        //onnly holder or escrow can create a contract
        //I decided to go with holder
        let escrowInstance2 = escrowInstance.connect(otherAccount1);
    
        // Get the initial contract ID, 
        //it is a variable, so it doesn't need () at the end
        const initialContractId = await escrowInstance2.autoContractId; 

        //Whenever you send msg.value, this means you will have to send certain value
        const amountToSend = ethers.parseEther("1.0"); // Amount to send in wei

        //returns the actual balance of an Ethereum account (in Ether) 
        //on the blockchain, not the balance within your contract.
        const escrowInstance2Address = escrowInstance.address;
        console.log("escrowInstance2Address");
        const initialBalance = await ethers.provider.getBalance(escrowInstance2Address);

        //create the contract and emit an event
        await expect(escrowInstance2.createEscrowContract(otherAccount1, otherAccount2, { value: amountToSend })).to.emit(escrowInstance2, "EscrowCreated").withArgs(initialContractId, otherAccount1, otherAccount2);

        //Now, this is just comparison, to see if we created a contract in a correct way
        const escrowContractVar = await escrowInstance2.getEscrowContract(initialContractId);
        expect(escrowContractVar.contractId).to.equal(initialContractId);
        expect(escrowContractVar.holder).to.equal(otherAccount1);
        expect(escrowContractVar.escrow).to.equal(otherAccount2);
        expect(escrowContractVar.balance).to.equal(amountToSend);
        expect(escrowContractVar.unlocked).to.equal(false);

        // Check if the contract balance increased by the sent amount
        const finalBalance = await ethers.provider.getBalance(escrowInstance2);
        expect(finalBalance).to.equal(initialBalance.add(amountToSend));
  });
        
   

   
    //Test Case
   it("succesfully unlock funds", async function(){
        const[owner, otherAccount1, otherAccount2] = await ethers.getSigners();
        //otherAccount2 --> escrow

        //this has to be done by an escrow
        let escrowInstance3 = escrowInstance.connect(otherAccount2);

        await expect(escrowInstance3.unlockFunds(0)).to.be.revertedWith("You are not escrow agent");
        
        //await (escrowInstance3.unlockFunds(0).unlocked).to.be.true;

        // Change from false to true
        const escrowContract = await escrowInstance3.getEscrowContract(0);
        expect(escrowContract.unlocked).to.be.true;
        
    });

    


});







