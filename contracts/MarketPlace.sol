// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;


contract Marketplace {
    /*struct definition: Define a struct named MarketItem to represent each item, with the following properties:
    uint256 itemId: Unique identifier for the item
    string name: Name of the item.
    string description: Description of the item.
    uint256 price: Price of the item in Ether.
    address seller: the address of the person who posted the item*/

    struct MarketItem {
        uint itemId;
        string name;
        string description;
        uint price; //price will be in the ether
        address seller;
        bool existence;
    }

    /*Use a mapping to store the MarketItem structs, with the itemId as the key. 
    The item ID should increment for every new item.*/
    mapping(uint => MarketItem) public items;
    uint private itemId; //-->this is a private counter ID variable used to keep track of the ID value, and update appropriately

    event ListItemEvent (uint itemId, string name, address seller);
    event PurchaseItemEvent(uint itemId, address buyer);
    /*Implement a function named listItem() that allows a user to list a new item on the marketplace. 
    The function should take parameters for name, description, and price, and should emit an event with 
    the item ID, name and seller, indicating the successful listing of the item.
    The function should return the item’s ID.*/

    modifier autoIncrement(){
        _;
        itemId += 1;
    }

    modifier onlySeller(uint _id){
        require(items[_id].seller == msg.sender, "You need to be the seller of this item in order to change it.");
        _;
    }

     modifier onlyBuyer(uint _id){
        require(items[_id].seller != msg.sender, "Seller can't buy its own product.");
        _;
    }

    function listItem(string memory _name, string memory _description, uint _price) external autoIncrement returns(uint){
        items[itemId] = MarketItem(itemId, _name, _description, _price, msg.sender, true);
        emit ListItemEvent(itemId, _name, msg.sender);
        return itemId;
    }

    /*Implement a payable function named purchaseItem() that allows users to purchase a listed item by sending enough Ether 
    to cover the item's price. 
    Deduct the item's price from the buyer's balance - not enough Ether should throw an error.
    Emit an event indicating the purchase - item ID and buyer address. 
    Transfer the Ether to the seller.
    Remove the item from the listing.*/

    function purchaseItem(uint _id) external onlyBuyer(_id) payable {
        require (items[_id].price * 10 ** 18 <= msg.value, "You need to pass more or the exact amount of the money for the price.");
        emit PurchaseItemEvent(_id, msg.sender);
        (bool sent, ) = items[_id].seller.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
       // Instead of deleting the item, set its existence to false
        items[_id].existence = false;
    }

    // Function to check if an item exists
    function doesItemExist(uint _id) external view returns (bool) {
        return items[_id].existence;
    }

    /*Add functions for sellers to update the item’s name, description and price, as well as the ability to remove an item. 
    These actions should only be available to the seller who listed the item, not other sellers.*/

    function updateName(uint _id, string memory _newName) external onlySeller(_id){
        items[_id].name = _newName;
    }

    function updateDescription(uint _id, string memory _newDescription) external onlySeller(_id){
        items[_id].description = _newDescription;
    }
    function updatePrice(uint _id, uint _newPrice) external onlySeller(_id){
        items[_id].price = _newPrice;
    }
    function deleteItem(uint _id) external onlySeller(_id){
        items[_id].existence = false;
    }


    //added addtionaly
    function getItem(uint _id) external view returns (MarketItem memory){
        return items[_id];
    }




     

}