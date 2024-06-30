// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

//this inheritance here is a must
contract SimpleBankUUPS is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    mapping(address => uint256) balances;

    //a must
     function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    // a must
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance.");
        
        (bool sent,) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether.");

        balances[msg.sender] -= amount;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}