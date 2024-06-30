// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SimpleBank.sol";

contract SimpleBankV2 is SimpleBank {
    


    function version() external pure returns (uint) {
        return 2;
    }
}

