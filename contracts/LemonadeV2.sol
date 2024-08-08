// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "./Lemonade.sol";

contract LemonadeV2 is Lemonade {

    function refillLemons() external {
        pieces += 1;
    }

    function lemonadeVersion() external pure virtual returns (uint) {
        return 2;
    }

}