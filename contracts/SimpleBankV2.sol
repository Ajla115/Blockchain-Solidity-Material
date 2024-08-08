// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./SimpleBank.sol";

contract SimpleBankV2 is SimpleBank  {

    function version() external pure returns (uint) {
        return 2;
    }
}
