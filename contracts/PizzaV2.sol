// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import './Pizza.sol';

contract PizzaV2 is Pizza {

    function refillSlice() external {
        slices += 1;
    }

    function pizzaVersion() external pure returns (uint){
        return 2;
    }
}