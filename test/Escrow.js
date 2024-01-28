//For the following contract, create 5 tests 
//(at least one that includes payable, emit and revert):

const { expect } = require("chai");
const { ethers } = require("hardhat");


let Escrow; //calling contract Escrow.sol
let escrowInstance; //creating a contract instance

//First test block
describe('Creating of Escrow Contract', function() {


    beforeEach (async function() {
        Escrow = await ethers.getContractFactory("Escrow");
        escrowInstance = await Escrow.deploy();
    });

    
    it("Creating a contract - testing the structure with right parameters, so emit should be the final result", async () => {

        let autoContractId = 0; //every contract has its one contract ID, so I don't get confused, bc with this I could easily get confused

        const[ holder, escrow ] = await ethers.getSigners();
        //since holder's address is the first one in the row, he is also an admin

        const amountToSend =  ethers.parseEther("5.0"); // Amount to send in wei

       expect ( await escrowInstance.createEscrowContract(holder, escrow, { value: amountToSend })).to.emit(escrowInstance, "EscrowCreated").withArgs(autoContractId, holder, escrow);
       console.log("Id of the current created contract: %d", autoContractId);
        autoContractId++;
       console.log("Id has been successfully incremented: %d", autoContractId);

       //This increment works only inside of the same test, with tests one below the another
       //The increment does not work when we restart the same test all over again
       //Because we are deleting previous work and then running again

       const amountToSend2 =  ethers.parseEther("2.0"); // Amount to send in wei
       expect ( await escrowInstance.createEscrowContract(holder, escrow, { value: amountToSend2 })).to.emit(escrowInstance, "EscrowCreated").withArgs(autoContractId, holder, escrow);
       console.log("Id of the current created contract: %d", autoContractId);
        autoContractId++;
       console.log("Id has been successfully incremented again: %d", autoContractId);
    });

    //Same test as the one above, but this is whole package;
    //It includes at the same time emit, revert and is payable
    it("Creating a contract - full package", async () => {

        let autoContractId = 0; //every contract has its one contract ID, so I don't get confused, bc with this I could easily get confused

        const[ holder, escrow ] = await ethers.getSigners();
        //since holder's address is the first one in the row, he is also an admin

        const amountToSend =  ethers.parseEther("5.0"); // Amount to send in wei

        expect ( await escrowInstance.createEscrowContract(holder, escrow, { value: amountToSend })).to.be.revertedWith("You are not permitted to call this function");

        expect ( await escrowInstance.createEscrowContract(holder, escrow, { value: amountToSend })).to.emit(escrowInstance, "EscrowCreated").withArgs(autoContractId, holder, escrow);
        
        console.log("Id of the current created contract: %d", autoContractId);
        autoContractId++;
        console.log("Id has been successfully incremented: %d", autoContractId);
    });

    //Reverts succesfully
    it("Creating a contract - testing the modifier onlyOwner", async () => {
        let autoContractId = 0;

        const[holder, escrow, otherAccount ] = await ethers.getSigners();
        //contract should revert when it is being called from the third address

        let escrowInstance2 = escrowInstance.connect(otherAccount);

        const amountToSend =  ethers.parseEther("5.0"); // Amount to send in wei

       await expect (escrowInstance2.createEscrowContract(holder, escrow, { value: amountToSend })).to.be.revertedWith("You are not permitted to call this function");
       autoContractId++;
       console.log("Id has been successfully incremented: %d", autoContractId);
    });
});


//Second test block
describe('Unlock and withdraw funds from PREVIOUSLY CREATED accounts', function() {

    beforeEach (async function() {
        Escrow = await ethers.getContractFactory("Escrow");
        escrowInstance = await Escrow.deploy();

    });

    it("Create a contract, unlock funds and withdraw funds", async () => {

        let autoContractId = 0; //every contract has its one contract ID, so I don't get confused, bc with this I could easily get confused

        [holder, escrow, recipient] = await ethers.getSigners(); 
        const amountToSend =  ethers.parseEther("15.0"); // Amount to send in wei

       expect ( await escrowInstance.createEscrowContract(holder, escrow, { value: amountToSend })).to.emit(escrowInstance, "EscrowCreated").withArgs(autoContractId, holder, escrow);
       console.log("Id of contract whose unlocked status will change: %d", autoContractId);
       
       

       //only escrow can unlock funds, so I am switching to that account
       let escrowInstance2 = escrowInstance.connect(escrow);

       expect ( await escrowInstance2.unlockFunds(autoContractId)).to.be.revertedWith("You are not escrow agent");

       let updatedEscrowContract = await escrowInstance2.getEscrowContract(0);

       expect (updatedEscrowContract.unlocked).to.equal(true);
       console.log("The new value of unlocked state is: ", updatedEscrowContract.unlocked);


       const amountToSend3 = ethers.parseEther("2.0");
    
        // Connect as the holder
        let holderInstance = escrowInstance.connect(holder);

        const changedContract = await holderInstance.getEscrowContract(0);
        console.log("Balance of contract before calling withdraw function: ", changedContract.balance);
    
        // Attempt to withdraw funds - ensure the right contract ID and recipient address is used
        expect( await holderInstance.withdraw(0, amountToSend3, recipient.address)).to.be.revertedWith("You are not holder of this contract");
    
        console.log("Balance of contract after first withdraw call function: ", changedContract.balance);

        //HIGHLY IMPORTANT
        //Paziti gdje ide prvo expect pa await; a gdje ide prvo await pa expect, malo koristiti logiku
        //Kad ima jos parametera poslije msg.value, ne moze se koristiti {value: amounToSend3} vec to mora ovako kako je dolje ispod
        //Takoder, ako sam bila na holder nodeu, pa presla na escrow node, moram napraviti novu TRECU instancu opet za holdera
        //Bar je ovdje to bio problem

        //the unlocked feature has to be previously set to true, otherwise this revert will happen
        expect( await holderInstance.withdraw(0, amountToSend3, recipient.address)).to.be.revertedWith("This contract is locked");
    
        console.log("Balance of contract after second withdraw call function: ", changedContract.balance);

        //there should be more money in the wallet, than you're trying to withdraw. If not, revert will happen
        expect(await holderInstance.withdraw(0, amountToSend3, recipient.address)).to.be.revertedWith("Not enough ether in your balance");
    
        console.log("Balance of contract after third withdraw call function: ", changedContract.balance);

        autoContractId++;
        console.log("Id of next contract will be: %d", autoContractId);
    });

    it("Create a contract,  and unlock funds", async () => {

        let autoContractId = 0; //every contract has its one contract ID, so I don't get confused, bc with this I could easily get confused

        [holder, escrow] = await ethers.getSigners(); 
        console.log("Holder address:", holder.address);
        console.log("Escrow address:", escrow.address);

        const amountToSend =  ethers.parseEther("5.0"); // Amount to send in wei

       expect ( await escrowInstance.createEscrowContract(holder, escrow, { value: amountToSend })).to.emit(escrowInstance, "EscrowCreated").withArgs(autoContractId, holder, escrow);
       console.log("Id of contract whose unlocked status will change: %d", autoContractId);
       
       //only escrow can unlock funds, so I am switching to that account
       let escrowInstance2 = escrowInstance.connect(escrow);
       console.log("Current address calling the contract:", escrow.address);

       expect ( await escrowInstance2.unlockFunds(autoContractId)).to.be.revertedWith("You are not escrow agent");

       let updatedEscrowContract = await escrowInstance2.getEscrowContract(autoContractId);
       //it does not make any difference, if I use autoContractId here or just the number, because I always start from 0
       //and the increment happens later
       //and the ID will restart everytime, I rerun the test, but it is good to use numbers
       //when I create multiple contracts in one test, and want to do different things with each

       expect (updatedEscrowContract.unlocked).to.equal(true);
       console.log("The new value of unlocked state is: ", updatedEscrowContract.unlocked);

       autoContractId++;
       console.log("Id of next contract will be: %d", autoContractId);
    });


    //This test fails on purpose, it disables to unlock funds from holder account
    it("Create a contract, and unlock funds - testing the modifier", async () => {
        let autoContractId = 0;

        const[ holder, escrow ] = await ethers.getSigners();
        //since holder's address is the first one in the row, he is also an admin

        const amountToSend =  ethers.parseEther("5.0"); // Amount to send in wei

       expect ( await escrowInstance.createEscrowContract(holder, escrow, { value: amountToSend })).to.emit(escrowInstance, "EscrowCreated").withArgs(autoContractId, holder, escrow);
       autoContractId++;
       console.log("Id of contract whose unlocked status will change: %d", autoContractId);

       //only escrow can unlock funds, so I am switching to that account
       //let escrowInstance2 = escrowInstance.connect(escrow);

       //Now, I am trying to call the same function with holder address, so I get revert on purpose
       await expect (escrowInstance.unlockFunds(0)).to.be.revertedWith("You are not escrow agent");
       //ovo succesfully reverts
       //kad npr izazivam namjerno revert i hocu da prode succesfully onda stavljam await except
       //a kad se moze dogoditi revert ali nece jer samo pravilno sve poredala onda ide expect await
       //kao ovdje dole ispod sa escrowInstance2

       //ali da bi se fkt unlockes, potrebno je napraviti novu instancu i to po escrowu sad unlock
       let escrowInstance2 = escrowInstance.connect(escrow);
       expect ( await escrowInstance2.unlockFunds(0)).to.be.revertedWith("You are not escrow agent");

       let updatedEscrowContract = await escrowInstance2.getEscrowContract(0);

       expect (updatedEscrowContract.unlocked).to.equal(true);
       console.log(updatedEscrowContract.unlocked);
    });





    



});







