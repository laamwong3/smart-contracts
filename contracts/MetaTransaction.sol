// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MockToken is ERC20("TEST", "TEST") {
    function mint(uint _amount) public {
        _mint(msg.sender, _amount);
    }
}

contract Relayer {
    using ECDSA for bytes32;

    function transfer(
        address _sender,
        uint _amount,
        address _recipient,
        address _contract,
        bytes memory _signature
    ) public {
        bytes32 messageHash = getHash(_sender, _amount, _recipient, _contract);
        bytes32 signedMessageHash = ECDSA.toEthSignedMessageHash(messageHash);

        address signer = ECDSA.recover(signedMessageHash, _signature);
        require(signer == _sender, "signature not from sender");

        bool sent = ERC20(_contract).transferFrom(_sender, _recipient, _amount);
        require(sent, "failed to send");
    }

    function getHash(
        address _sender,
        uint _amount,
        address _recipient,
        address _contract
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(_sender, _amount, _recipient, _contract)
            );
    }
}
