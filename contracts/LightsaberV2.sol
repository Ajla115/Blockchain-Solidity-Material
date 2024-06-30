/*external function version() that will return the integer 2.
external function upgraded_NzYzYmZh() that will return the string "Upgraded by Ajla Korman."*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './Lightsaber.sol';

contract LightsaberV2 is Lightsaber {
    
    function version() external pure returns (uint){
        return 2;
    }

    function upgraded_NzYzYmZh() external pure returns (string memory){
        return "Upgraded by Ajla Korman.";
    }
}
