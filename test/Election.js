const { expect } = require("chai");
const { ethers } = require("hardhat");

/*Modifiers treba provjeriti, ali ne i require jer je requiere u sklopu koda te funkcije !!!!!!*/

let Election; //calling contract Election.sol
let electionInstance; //creating a contract instance

//trebala sam dodati vise opcih varijabli jer su testovi povezani kao finalBalance, itd itd'
//First test block
describe('Election process', function() {
    let superowner;
    let electionInstance;
    //let inProgress = false;
    let stoppedOnce = false;
    let finalBalance = 0;
    let  numOwners = 0;
    let cost = 2;


    beforeEach(async function() {
        const Election = await ethers.getContractFactory("Election");
        const [superowner] = await ethers.getSigners();
        electionInstance = await Election.deploy(); 
        //there is no need to put superowner as parameter in the brackets, since this is the first msg.sender anyways
        //if it was anything else, we would write it
    });

    it("Should add owner", async() => {
        
        let newOwner = "0xf47bC986343F454742f242a3Fb4Fc5cA2E952B6F";

        await electionInstance.addOwner(newOwner);
        
        //Since I have two reverts two times same function will be called, therefore it will execute twice
        expect (await electionInstance.getNumberOfOwners()).to.equal(1);
    });
 
    //Reverts as it should
   /* it("MOD1: Fails as intended, should add owner", async() => {
        const [superowner, otherAccount] = await ethers.getSigners();
        
        let newOwner = "0xf47bC986343F454742f242a3Fb4Fc5cA2E952B6F";

       let electionInstance2 = electionInstance.connect(otherAccount);
        
       //It should get reverted here
        expect  (await electionInstance2.addOwner(newOwner)).to.be.revertedWith("Not a superowner.");
    });*/

    //Reverts as it should
   /* it("REQ: Fails as intended, should add owner", async() => {

        let newOwner = "0xf47bC986343F454742f242a3Fb4Fc5cA2E952B6F";

       await electionInstance.setInProgress();
        
       //It should get reverted here
       expect (await electionInstance.addOwner(newOwner)).to.be.revertedWith("You cannot modify this while voting is in progress.");

    });*/

    it("Add, and then remove an owner", async() => {
        
        let newOwner = "0xf47bC986343F454742f242a3Fb4Fc5cA2E952B6F";

        await electionInstance.addOwner(newOwner);

        //Since I have two reverts two times same function will be called, therefore it will execute twice
        expect (await electionInstance.getNumberOfOwners()).to.equal(1);

        console.log("Owner has been successfully added: ", newOwner);

        await electionInstance.removeOwner(newOwner);

        //Since I have two reverts two times same function will be called, therefore it will execute twice
        expect (await electionInstance.getNumberOfOwners()).to.equal(0);

        console.log("Owner has been successfully removed: ", newOwner);
    });

     //Reverts as it should
    /*it("MOD1: Fails as intended, should remove owner", async() => {
        const [superowner, otherAccount] = await ethers.getSigners();
        
        let newOwner = "0xf47bC986343F454742f242a3Fb4Fc5cA2E952B6F";

        await electionInstance.addOwner(newOwner);

       let electionInstance2 = electionInstance.connect(otherAccount);
        
       //It should get reverted here
        expect  (await electionInstance2.removeOwner(newOwner)).to.be.revertedWith("Not a superowner.");
    });*/

    /*    function addCandidate(address _address) external isAnyOwner {
        require(!inProgress, "You cannot modify this while voting is in progress.");
        candidates[_address] = true;
    }
    */

    it("Add a candidate", async() => {
        let newCandidate = "0x29faF3eB2AAc9FBBeAa52033670aFfd66d673dD8";

        await electionInstance.addCandidate(newCandidate);

        let addedCandidate = await electionInstance.getCandidate(newCandidate);

        expect (addedCandidate).to.equal(true);

    });

    //Reverts as it should
    /*it("REQ:Fails because inProgress equals true", async() => {

        let newCandidate = "0x29faF3eB2AAc9FBBeAa52033670aFfd66d673dD8";

       await electionInstance.setInProgress();
        
       //It should get reverted here
       expect (await electionInstance.addCandidate(newCandidate)).to.be.revertedWith("You cannot modify this while voting is in progress.");

    });*/

    //Reverts as it should
   /* it("MOD: Fails because the account is not any owner", async() => {

        const [ randomAddress ] = await ethers.getSigners();

        let electionInstance3 = electionInstance.connect(randomAddress);

        let result = await electionInstance3.getOwner(randomAddress);

        expect (result).to.equal(false);

        let newCandidate = "0x29faF3eB2AAc9FBBeAa52033670aFfd66d673dD8";

        //Nekada treba malo logike koristiti i shvatiti, sta prvo zelim
        //Je li await ili expect; ovdje kad je islo expect (await ) nije bio revert a trebao je biti 
        //Ali sada kad sam ih zamijenila, sada je dobro
        //Znaci treba samo logiku ukljuciti i koristiti
        await expect (electionInstance3.addCandidate(newCandidate)).to.be.revertedWith("Not a superowner nor an owner.");
    });*/


    /*    function removeCandidate(address _address) external isAnyOwner {
        require(!inProgress, "You cannot modify this while voting is in progress.");
        delete candidates[_address];
    }*/

    it("Add, and remove a candidate", async() => {
        let newCandidate = "0x29faF3eB2AAc9FBBeAa52033670aFfd66d673dD8";

        await electionInstance.addCandidate(newCandidate);

        let addedCandidate = await electionInstance.getCandidate(newCandidate);

        expect (addedCandidate).to.equal(true);
        console.log("A new candidate has been successfully added");

        await electionInstance.removeCandidate(newCandidate);

        addedCandidate = await electionInstance.getCandidate(newCandidate);

        expect (addedCandidate).to.equal(false);
        console.log("A new candidate has been successfully removed");
    });

    it("should add, and then retrieve candidate", async() => {

        let newCandidate = "0x29faF3eB2AAc9FBBeAa52033670aFfd66d673dD8";

        await electionInstance.addCandidate(newCandidate);

        let addedCandidate = await electionInstance.getCandidate(newCandidate);

        expect (addedCandidate).to.equal(true);
        console.log("Candidate has been succesfully added.");

        let retrievedCandidate = await electionInstance.getCandidate(newCandidate);
        expect(retrievedCandidate).to.equal(true);
        console.log("Candidate has been succesfully retrieved.");
    });

    it("should approve user", async() => {

        const [superowner, owner, randomAccount] = await ethers.getSigners();

        await electionInstance.addOwner(owner);  //added second owner

        let electionInstance2 = electionInstance.connect(owner);

        let newUser = "0x29faF3eB2AAc9FBBeAa52033670aFfd66d673dD8";

        await electionInstance2.approveUser(newUser); //second owner doing its thing xD
    });


    //Fails as it should, when a third person who is not owner at all, tries to approve a user
   /* it("MOD: should approve user", async() => {

        const [superowner, owner, randomAccount] = await ethers.getSigners();

        await electionInstance.addOwner(owner);  //added second owner

        let electionInstance2 = electionInstance.connect(owner);

        let newUser = "0x29faF3eB2AAc9FBBeAa52033670aFfd66d673dD8";

        await electionInstance2.approveUser(newUser); //second owner doing its thing xD

        let electionInstance3 = electionInstance.connect(randomAccount);

        let newUser2 = "0xf47bC986343F454742f242a3Fb4Fc5cA2E952B6F";

        expect ( await electionInstance3.approveUser(newUser2)).to.be.revertedWith("Not a superowner nor an owner.");
    });*/

    /*function setVotingCost(uint _cost) external isSuperowner {
        require(!inProgress, "You cannot modify this while voting is in progress.");
        require(_cost >= 0, "The voting cost has to be non-zero.");
        votingCost = 10**18 * _cost;
    }*/

    it("should set voting cost", async() => {
        
        let result = await electionInstance.setVotingCost(cost);
        expect (result).to.be.revertedWith("The voting cost has to be non-zero.");
        //console.log(result);


    });

   /* function vote(address _address) external payable {
        require(inProgress, "The voting has not started.");
        require(msg.value == votingCost, "You need to send the proper Ether amount to vote.");
        require(candidates[_address], "This candidate does not exist.");
        require(users[msg.sender], "You are not approved to vote / you have already voted.");
 
        votes[_address] += 1;
        delete users[msg.sender];
    }*/
    
    //Ne treba provjeravati requieres vec samo treba obezbijediti sve uslove da requieres budu tacni
    //Bingo ***shinyy allert***
    it("voting when all conditions are met", async() => {
        const [owner] = await ethers.getSigners();

        let newCandidate = "0x29faF3eB2AAc9FBBeAa52033670aFfd66d673dD8";

        await electionInstance.addCandidate(newCandidate);

        let addedCandidate = await electionInstance.getCandidate(newCandidate);

        expect (addedCandidate).to.equal(true);

        await electionInstance.approveUser(owner);

        await electionInstance.startVoting();

        let electionInstance2 = electionInstance.connect(owner);

        await electionInstance2.vote(newCandidate);
    });

    /*  function withdraw() external isAnyOwner {
        require(!inProgress, "You cannot withdraw Ether while voting is in progress.");
        require(!hasWithdrawn[msg.sender], "You have already withdrawn your payout.");
 
        hasWithdrawn[msg.sender] = true;
        if (msg.sender == superowner) {
            (bool sent, ) = msg.sender.call{value: finalBalance / 2}("");
            require(sent, "Failed to send Ether");
        } else {
            (bool sent, ) = msg.sender.call{value: (finalBalance / 2) / numOwners}("");
            require(sent, "Failed to send Ether");
        }
    }*/

    it("should withdraw", async() => {
        
        

        await electionInstance.withdraw();
    })

 


















});