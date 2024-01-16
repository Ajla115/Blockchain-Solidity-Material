const { setBalance } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");


let Bank; //calling contract Bank.sol
let bankInstance; //creating a contract instance

//Start test block
describe('Bank', function() {
    beforeEach (async function() {
        Bank = await ethers.getContractFactory("Bank");
        bankInstance = await Bank.deploy();
    });


    //Test Case
    it('successfully deposits', async function () {
        //creates an array of addresses connected to this ethereum node
        //usually the first one is the default one
        const [owner] = await ethers.getSigners();

        /*ethers.parseEther('1.0') converts 1 Ether into its Wei equivalent 
        (since Ethereum transactions are usually 
        denoted in Wei, which is a smaller denomination of Ether)*/

        await bankInstance.deposit({value: ethers.parseEther('1.0')});
        expect(await bankInstance.getBalance({from: owner})).to.equal( ethers.parseEther('1.0'));
    });

    it("succesfully check balance", async function () {
        const[owner, otherAccount] = await ethers.getSigners();

        let bankInstance2 = bankInstance.connect(otherAccount);
        expect(await bankInstance2.getBalance({from: otherAccount})).to.equal("0");

        await bankInstance.deposit({value : ethers.parseEther("0.51")});
        expect(await bankInstance.getBalance({from : owner})).to.equal(ethers.parseEther("0.51"));
    });

    it("successfully withdrawn money", async function () {

        const[owner, otherAccount] = await ethers.getSigners();
        let amount = ethers.parseEther("0.1"); //decided on the ether amount for withdrawal and sending

        let bankInstance2 = bankInstance.connect(otherAccount);

        //handling the require from backend, that is now called Revert here
        await expect (bankInstance.withdraw(otherAccount, amount)).to.be.revertedWith("Not enough balance.");

        await bankInstance.deposit({value: ethers.parseEther("0.5")});
        await expect(bankInstance.withdraw(otherAccount, amount)).to.emit(bankInstance, "Withdrawal").withArgs(ethers.parseEther("0.1"));

        expect (await bankInstance.getBalance({from : owner})).to.equal(ethers.parseEther("0.4"));
        //expect (await bankInstance2.getBalance({from : otherAccount})).to.equal(ethers.parseEther("0.1"));
        expect (await ethers.provider.getBalance(otherAccount)).to.equal("10000100000000000000000");

        /*ethers.provider.getBalance(account) returns the actual balance of an Ethereum account (in Ether) 
        on the blockchain, not the balance within your Bank contract.*/
    });


    
});

