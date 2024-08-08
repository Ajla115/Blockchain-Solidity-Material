/*Implement a new version where you will give ability to charities to withdraw funds but also you will
give ability to owner to lock all functionalities and also remove charities if they have 0 as their
balance.*/

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./CharityV2.sol";

contract CharityV3 is CharityV2 {

    bool public isLocked;

    modifier notLocked() {
        require(!isLocked, "Contract is locked.");
        _;
    }
    //ovo !isLocked, ovdje ne gleda kao negacija trenutno vrijednosti kao npr F(T), 
    //daju false ili npr F(F), vec ! oznacava samo uvijek false vrijednost vrijednost

    function lockContract() external onlyAdmin{
        isLocked = true;
    }

    function unlockContract() external onlyAdmin {
        isLocked = false;
    }

    function removeCharity(address _addr) external onlyAdmin notLocked {
        require(donations[_addr] == 0, "Charity still has balance.");
        delete charities[_addr];
    }

    function withdraw() external {
        require(charities[msg.sender], "You are not a registered charity.");
        require(donations[msg.sender] > 0, "No balance to withdraw.");
        uint balance = donations[msg.sender];
        donations[msg.sender] = 0;
        payable(msg.sender).transfer(balance);
    }
}



