// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Pizza {
    uint internal slices;

    event slicesLeft(uint numLeft);

    function initialize(uint _slices) external {
        slices = _slices;
    }

    function eatSlice() external {
        require(slices >= 1, "No slices left.");
        slices -= 1;
        emit slicesLeft(slices);
    }

    function leftSlices() external view returns (uint){
        return slices;
    }
}