// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./ExamLedger.sol";

contract ExamLedgerV2 is  ExamLedger {
    
    function getTokenDrop(address _recipient) external {
    uint amount = ITokenDispenser(tokenDispenser).getTokenDrop(_recipient);
    holderTokens[_recipient] += amount;
}

function addHolderRecord(address _holder, string memory _ipfsCid) external {
    holderRecords[_holder] = _ipfsCid;
}

function getAssignedSigner() external view returns (IKeyGenerator.KeyPair memory) {
    return IKeyGenerator(keyGenerator).getSignerDetails();
}
}