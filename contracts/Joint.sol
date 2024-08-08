// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Joint {
    address owner;

    constructor(){
        owner = msg.sender;
    }

    struct Account {
        uint id;
        address accAddr1;
        address accAddr2;
    }

    uint _id = 0;
    Account[] public accountArr;
    mapping(uint => Account) public accountMapping;
    mapping(uint => uint) public balancePerAccount; //id, money
    event AccountCreated(uint accid, address account1, address aacount2);

    modifier notOwner(){
        require(msg.sender != owner, "You are not permitted to call this function");
        _;
    }

    modifier incrementID(){
        _;
        _id++;
    }

    function createAccount(address addr1, address addr2) external notOwner incrementID {
        Account memory newAccount = Account(_id, addr1, addr2);
        accountArr.push(newAccount);
        accountMapping[_id] = newAccount;
        emit AccountCreated(_id, addr1, addr2);
    }

    function balance(uint accID) external view returns (uint) {
        return balancePerAccount[accID];
    }

    function deposit(uint _accID) external payable {
        require(msg.value > 0, "You have to donate more than zero.");
        balancePerAccount[_accID] += msg.value;
    }
}