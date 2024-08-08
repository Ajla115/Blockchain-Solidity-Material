// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./SimpleBankUUPS.sol";
contract SimpleBankUUPSV2 is  SimpleBankUUPS {
    
    function version() external pure returns (uint) {
        return 2;
    }
}