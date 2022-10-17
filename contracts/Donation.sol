// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Donation is Ownable {
    event Deposited(uint amount);
    event Withdrawn(uint amount);

    receive() external payable {
        emit Deposited(msg.value);
    }

    function withdraw() external onlyOwner {
        emit Withdrawn(address(this).balance);
        selfdestruct(payable(msg.sender));
    }
}
