// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Bank {
    address owner;

    constructor(){
        owner = msg.sender;
    }

    mapping (address => uint) balances;
    event Withdrawal(uint amount);

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance() external view returns (uint) {
        return balances[msg.sender];
    }

    function withdraw(address _to, uint amount) external payable {
        require( amount <= balances[msg.sender], "Not enough balance");
        balances[msg.sender] -= amount;
        (bool sent, ) = _to.call{value: amount}("");
        require(sent, "Failed to send Ethereum");
        emit Withdrawal(amount);

    }
}