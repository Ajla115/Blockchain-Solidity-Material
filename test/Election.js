const { expect } = require("chai");
const { ethers } = require("hardhat");

/*Modifiers treba provjeriti, ali ne i require jer je requiere u sklopu koda te funkcije !!!!!!*/

let Election; //calling contract Election.sol
let electionInstance; //creating a contract instance

//trebala sam dodati vise opcih varijabli jer su testovi povezani kao finalBalance, itd itd'
//First test block
describe('Election process', function() {
    let superowner;
    let owner1;
    let owner2;
    let nonOwner;
    let user;
    let electionInstance;
    //let inProgress = false;
    let stoppedOnce = false;
    let finalBalance = 0;
    let  numOwners = 0;
    let cost = 2;
    let candidate = "0xf47bC986343F454742f242a3Fb4Fc5cA2E952B6F";
    let candidate2 = "0x29faF3eB2AAc9FBBeAa52033670aFfd66d673dD8";


    beforeEach(async function() {
        const Election = await ethers.getContractFactory("Election");
        const [superowner, owner1, owner2] = await ethers.getSigners();
        electionInstance = await Election.deploy(superowner); 
        //there is no need to put superowner as parameter in the brackets, since this is the first msg.sender anyways
        //I put it just because we have too many owner addresses, so we know which one is for what
        //if it was anything else, we would write it

        await electionInstance.addOwner(owner1);
        await electionInstance.addOwner(owner2);
    });

    //Both actions can only be performed by the superowner
    //When I tried to do this from another account besides superowner, I got an error message:
    //Contract runner does not support following transaction
    //This means that I don't have to explicitly test modifiers and requires, they will be tested through code
    //Only if I want to explicitly test them, then I would create a seperate test to see if they're working as intended
    it("Add, and then remove an owner", async() => {
        
        let owner3 = "0xf47bC986343F454742f242a3Fb4Fc5cA2E952B6F";

        await electionInstance.addOwner(owner3);

        //Since I have two reverts two times same function will be called, therefore it will execute twice
        expect (await electionInstance.getNumberOfOwners()).to.equal(3);

        console.log("Owner has been successfully added: ", owner3);

        await electionInstance.removeOwner(owner3);

        //Since I have two reverts two times same function will be called, therefore it will execute twice
        expect (await electionInstance.getNumberOfOwners()).to.equal(2);

        console.log("Owner has been successfully removed: ", owner3);
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

    //This is more than enough to test to see that candidate has been added
    it("Add a candidate", async() => {

        await electionInstance.addCandidate(candidate);

        let addedCandidate = await electionInstance.getCandidate(candidate);

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

        await electionInstance.addCandidate(candidate2);

        let addedCandidate = await electionInstance.getCandidate(candidate2);

        expect (addedCandidate).to.equal(true);
        console.log("Candidate has been succesfully added.");

        let retrievedCandidate = await electionInstance.getCandidate(candidate2);
        expect(retrievedCandidate).to.equal(true);
        console.log("Candidate has been succesfully retrieved.");
    });

    it("should approve user", async() => {

        const [ user2 ] = await ethers.getSigners();

        //let electionInstance2 = electionInstance.connect(nonOwner);
        //this one fails because modifier only allows any type of owner to approve users

        await electionInstance.approveUser(user2);
    });

    /*function setVotingCost(uint _cost) external isSuperowner {
        require(!inProgress, "You cannot modify this while voting is in progress.");
        require(_cost >= 0, "The voting cost has to be non-zero.");
        votingCost = 10**18 * _cost;
    }*/

    it("should set voting cost", async() => {
        
        expect (await electionInstance.setVotingCost(cost)).to.be.revertedWith("The voting cost has to be non-zero.");
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
        //user, and candidate1 are global variables so I just call them
        //also, I set the conditions for requieres here to be correct so there won't be any revert

        //Fist added a candidate
        await electionInstance.addCandidate(candidate);
        
        const [ user2 ] = await ethers.getSigners();

        //Then approved a user
        await electionInstance.approveUser(user2);

        //Disable what could cause requiers
        await electionInstance.startVoting();

        let amountToSend = ethers.parseEther("2.0")

        let electionInstance2 = electionInstance.connect(user2);

        await electionInstance2.vote(candidate, {value: amountToSend});
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

        await electionInstance.stopVoting();
        await electionInstance.withdraw();
    })

 


















});