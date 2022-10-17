// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MyWallet is Ownable {
    // anyone can send ether to this contract
    receive() external payable {}

    // only owner can withdraw
    function withdraw() external onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "fail to transfer");
    }
}
