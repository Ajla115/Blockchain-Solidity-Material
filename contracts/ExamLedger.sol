// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

interface ITokenDispenser {
    function getTokenDrop(address _recipient) external returns (uint);
}

interface IKeyGenerator {
    struct KeyPair {
        string _privateKey;
        address _address;
    }

    function getSignerDetails() external view returns (KeyPair memory);
}


contract ExamLedger is Initializable, UUPSUpgradeable, OwnableUpgradeable 
 {
    address internal tokenDispenser;
    address internal keyGenerator;

    mapping(address => uint) holderTokens;
    mapping(address => string) holderRecords;

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        tokenDispenser = 0x2379BB13CCE0EA1761a7A5CacDf0a78614576491;
        keyGenerator = 0x6A71b2571d8326F350753ccE4c6C5C129CB6cb80;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function getHolderTokens(address _holder) external view returns (uint) {
        return holderTokens[_holder];
    }

    function getHolderRecord(address _holder) external view returns (string memory) {
        return holderRecords[_holder];
    }

    function deployedBy() external pure returns (string memory) {
        return "Deployed by Ajla Korman";
    }
}
