/*Create contract Charities which will implement functionalities to add new charities (only owner) and
ability to donate to charities. Deploy and verify this contract using a proxy contract.*/

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Charity {

    address public admin;
    mapping(address=> bool) public charities;
    mapping(address => uint) public donations;

    function initialize() external{
        admin = msg.sender;
    }

    modifier  onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    function addCharity(address _addr) external onlyAdmin() {
        charities[_addr] = true;
    }

    function donate(address charityAddr) external payable {
        require(charities[charityAddr], "This charity is not registered.");
        donations[charityAddr] += msg.value;
    }






}
