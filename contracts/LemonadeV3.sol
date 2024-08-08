// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./LemonadeV2.sol";

contract LemonadeV3 is LemonadeV2 {

    function throwAwayLemons() external {
        pieces -= 5;
    }

    function calculatePrice(uint numberOfLemons) external pure returns (uint) {
        return 2* numberOfLemons;
    }

    function lemonadeVersion() external pure override returns (uint) {
        return 3;
    }

}