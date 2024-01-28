// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
 

 contract Charity {

    address public owner; //this is the admin
    uint baseAmount;
    bool paused;

    address[] addedCharities; //array of added charities
    mapping (address => bool) private existingCharities; 
    mapping (address => uint) private balances;


    constructor (uint _baseAmount){
        owner = msg.sender;
        baseAmount = _baseAmount; //this needs to be sent through msg.value
        paused = false; //set originally to false, needed because of modifiers with donate
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "You have to be admin/owner for this to work.");
        _;
    }

    modifier notPaused(){
        require(paused == false,"Donation functionality is currently paused");
        _;
    }

    modifier checkMinAmount(){
        require(msg.value >= baseAmount, "Donation amount is less than the specified minimum");
        _;
    }

    function addCharity(address _addr1) external onlyOwner {
        addedCharities.push(_addr1);
        existingCharities[_addr1] = true;
    }

    //Cim ima connect to other address, tu ne treba modifier onlyAdmin
    function isCharity(address addr1) external view onlyOwner returns (bool) {
        return existingCharities[addr1]; 
    }

    function donate(address charityAddr) external payable notPaused checkMinAmount {
        require (existingCharities[charityAddr], "This address is not registered as a charity address.");
        //require(msg.value >= baseAmount, "You can't donate less than the base amount.");

        balances[charityAddr] += msg.value;
    }

    function viewCharityBalance(address _charityAddr) external view returns (uint) {
        return balances[_charityAddr];
    }

    function withdrawDonations() external payable {
        require (existingCharities[msg.sender], "Only owner of their own charity can withdraw their own funds.");

        uint totalAmount = balances[msg.sender];
        (bool sent, ) = msg.sender.call{value: totalAmount}(""); 
        require(sent, "Failed to sent ether");

        balances[msg.sender] = 0;
        
    }

    //cim nema connect to other address, znaci moze samo owner to raditi i niko vise
    function toggleCircuitBreaker() external onlyOwner {
        if(paused == false){
            paused = true;
        } else {
            paused = false;
        }
    }



 }

