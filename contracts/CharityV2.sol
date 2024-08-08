/*Upgrade this contract so it gives the ability to charities to look how much of the balance on their
donations they have. Deploy this upgrade onto the blockchain.*/

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./Charity.sol";

contract CharityV2 is Charity {

    function viewBalance() external view returns (uint){
        require(charities[msg.sender], "You are not registered charity.");
        return donations[msg.sender];
    }
}