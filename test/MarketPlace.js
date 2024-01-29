const { expect } = require("chai");
const { ethers } = require("hardhat");


let MarketPlace; //calling contract MarketPlace.sol
let marketPlaceInstance; //creating a contract instance

//First test block
describe('Listing, purchasing and updating item on the market place', function() {

    beforeEach (async function() {
        MarketPlace = await ethers.getContractFactory("Marketplace"); //ovdje, ide naziv kao i u sol fileu
        marketPlaceInstance = await MarketPlace.deploy();
    });

    it("List an item on the market", async() => {
        const [seller] = await ethers.getSigners();

        let item_name = "Blueberries";
        let item_description = "Fruit";
        let item_price = "5";
        let itemId = 0;

        expect (await marketPlaceInstance.listItem(item_name, item_description, item_price)).to.be.emit(marketPlaceInstance, "ListItemEvent").withArgs(itemId, item_name, seller);

        itemId++;
        console.log("The new item ID will be: %d", itemId);
    });

     it("MOD_1: List and purchase an item on the market", async() => {
        const [seller, buyer ] = await ethers.getSigners();

        let item_name = "Blueberries";
        let item_description = "Fruit";
        let item_price = "5";
        let itemId = 0;

        expect (await marketPlaceInstance.listItem(item_name, item_description, item_price)).to.be.emit(marketPlaceInstance, "ListItemEvent").withArgs(itemId, item_name, seller);

        let marketPlaceInstance2 = await marketPlaceInstance.connect(buyer);

        const initialBuyerBalance = await ethers.provider.getBalance(buyer);
        console.log("Buyer balance before transaction 1: ", initialBuyerBalance); 
        //accounts are preloaded with Ether by default, so no need for prior deposting

        const payedPrice = ethers.parseEther("7.0"); //amount will be sent in wei 

        expect (await marketPlaceInstance2.purchaseItem(0, {value: payedPrice})).to.be.revertedWith("Seller can't buy its own product.");

        //it is enough to just write this, 
        //there is no need to write subtraction logic because network takes care of that for us
        let BuyerBalance2 = await ethers.provider.getBalance(buyer);
        console.log("Buyer's balance after transaction 1:", BuyerBalance2); 

        const boughtItem = await marketPlaceInstance2.getItem(0);
        expect (boughtItem.existence).to.equal(false);

    });

    it("MOD_2: List and purchase an item on the market", async() => {
        const [seller, buyer ] = await ethers.getSigners();

        let item_name = "Blueberries";
        let item_description = "Fruit";
        let item_price = "5";
        let itemId = 0;

        expect (await marketPlaceInstance.listItem(item_name, item_description, item_price)).to.be.emit(marketPlaceInstance, "ListItemEvent").withArgs(itemId, item_name, seller);

        let marketPlaceInstance2 = await marketPlaceInstance.connect(buyer);

        const initialBuyerBalance = await ethers.provider.getBalance(buyer);
        console.log("Buyer balance before transaction 2: ", initialBuyerBalance); 
        //accounts are preloaded with Ether by default, so no need for prior deposting

        const payedPrice = ethers.parseEther("7.0"); //amount will be sent in wei 

        expect (await marketPlaceInstance2.purchaseItem(0, {value: payedPrice})).to.be.revertedWith("You need to pass the exact amount of the money for the price.");

        //it is enough to just write this, 
        //there is no need to write subtraction logic because network takes care of that for us
        BuyerBalance2 = await ethers.provider.getBalance(buyer);
        console.log("Buyer's balance after transaction 2:", BuyerBalance2); 

        const boughtItem = await marketPlaceInstance2.getItem(0);
        expect (boughtItem.existence).to.equal(false);

    });

    it("EMIT: List and purchase an item on the market", async() => {
        const [seller, buyer ] = await ethers.getSigners();

        let item_name = "Blueberries";
        let item_description = "Fruit";
        let item_price = "5";
        let itemId = 0;

        expect (await marketPlaceInstance.listItem(item_name, item_description, item_price)).to.be.emit(marketPlaceInstance, "ListItemEvent").withArgs(itemId, item_name, seller);

        let marketPlaceInstance2 = await marketPlaceInstance.connect(buyer);

        const initialBuyerBalance = await ethers.provider.getBalance(buyer);
        console.log("Buyer balance before transaction 3: ", initialBuyerBalance); 
        //accounts are preloaded with Ether by default, so no need for prior deposting

        const payedPrice = ethers.parseEther("7.0"); //amount will be sent in wei 

        expect (await marketPlaceInstance2.purchaseItem(0, {value: payedPrice})).to.be.emit(marketPlaceInstance2, "PurchaseItemEvent").withArgs(itemId, buyer);

        //it is enough to just write this, 
        //there is no need to write subtraction logic because network takes care of that for us
        BuyerBalance2 = await ethers.provider.getBalance(buyer);
        console.log("Buyer's balance after transaction 3:", BuyerBalance2); 

        const boughtItem = await marketPlaceInstance2.getItem(0);
        expect (boughtItem.existence).to.equal(false);

    });

    it("Update Name of Product", async() => {

        const [seller] = await ethers.getSigners();

        let item_name = "Blueberries";
        let item_description = "Fruit";
        let item_price = "5";
        let itemId = 0;

        expect (await marketPlaceInstance.listItem(item_name, item_description, item_price)).to.be.emit(marketPlaceInstance, "ListItemEvent").withArgs(itemId, item_name, seller);

        expect (await marketPlaceInstance.updateName(0, "Strawberries")).to.be.revertedWith("You need to be the seller of this item in order to change it.");

        const updatedItem = await marketPlaceInstance.getItem(0);

        expect(updatedItem.name).to.equal("Strawberries");
        console.log("New item name is:", updatedItem.name);
    });

    it("Update Description of Product", async() => {

        const [seller] = await ethers.getSigners();

        let item_name = "Blueberries";
        let item_description = "Fruit";
        let item_price = "5";
        let itemId = 0;

        expect (await marketPlaceInstance.listItem(item_name, item_description, item_price)).to.be.emit(marketPlaceInstance, "ListItemEvent").withArgs(itemId, item_name, seller);

        expect (await marketPlaceInstance.updateDescription(0, "Seeds")).to.be.revertedWith("You need to be the seller of this item in order to change it.");

        const updatedItem = await marketPlaceInstance.getItem(0);

        expect(updatedItem.description).to.equal("Seeds");
        console.log("New item description is:", updatedItem.description);
    });

    it("Update Price of Product", async() => {

        const [seller] = await ethers.getSigners();

        let item_name = "Blueberries";
        let item_description = "Fruit";
        let item_price = "5";
        let itemId = 0;

        expect (await marketPlaceInstance.listItem(item_name, item_description, item_price)).to.be.emit(marketPlaceInstance, "ListItemEvent").withArgs(itemId, item_name, seller);

        expect (await marketPlaceInstance.updatePrice(0, "9")).to.be.revertedWith("You need to be the seller of this item in order to change it.");

        const updatedItem = await marketPlaceInstance.getItem(0);

        expect(updatedItem.price).to.equal("9");
        console.log("New item price is:", updatedItem.price);
    });

    it("Delete Product", async() => {

        const [seller] = await ethers.getSigners();

        let item_name = "Blueberries";
        let item_description = "Fruit";
        let item_price = "5";
        let itemId = 0;

        expect (await marketPlaceInstance.listItem(item_name, item_description, item_price)).to.be.emit(marketPlaceInstance, "ListItemEvent").withArgs(itemId, item_name, seller);

        expect (await marketPlaceInstance.deleteItem(0)).to.be.revertedWith("You need to be the seller of this item in order to change it.");

        const deletedItem = await marketPlaceInstance.getItem(0);

        expect(deletedItem.existence).to.equal(false);
        console.log("Does item still exist:", deletedItem.existence);
    });











});