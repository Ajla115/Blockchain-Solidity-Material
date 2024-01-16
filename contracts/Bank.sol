// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Bank {
    mapping(address => uint) balances;

    event Withdrawal ( uint amount);

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance() external view returns (uint) {
        return balances[msg.sender];
    }

    function withdraw(address _to, uint _amount) external {
        require (_amount < balances[msg.sender], "Not enough balance.");

        balances[msg.sender] -= _amount; //one address is msg.sender
        (bool sent, ) = _to.call{value: _amount}(""); //this _to is the second address
        require(sent, "Failed to sent ether");
        emit Withdrawal(  _amount);
    }
}