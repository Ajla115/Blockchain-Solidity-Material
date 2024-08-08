// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Lemonade {
    uint internal pieces;
    event LemonsLeft(uint numLeft);

    function initialize(uint _pieces) external {
        pieces = _pieces;
    }

    function squizeLemon() external {
        require(pieces >= 1, "No lemons left.");
        pieces -= 1;
        emit LemonsLeft(pieces);
    }

    function piecesLeft() external view returns (uint) {
        return pieces;
    }
}