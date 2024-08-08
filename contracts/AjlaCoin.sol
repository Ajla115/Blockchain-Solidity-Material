// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AjlaCoin is ERC20, Ownable(msg.sender) {
    constructor() ERC20("AjlaKormanMidtermCoin", "AKMC") {
        _mint(msg.sender, 1631000 * 10 ** 18);
    }

    function mint(uint256 amount, address receiver) public onlyOwner {
        _mint(receiver, amount * 10 ** 18);
    }
}

//0xc4a0E1cE01163eDB6c2B70463dC1F4ddd1e531b6

