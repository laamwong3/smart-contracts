// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTree is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    bytes32 public root;

    constructor(bytes32 _root) ERC721("MyToken", "MTK") {
        root = _root;
    }

    function safeMint(address to, bytes32[] memory _proof) public {
        require(
            isValid(_proof, keccak256(abi.encodePacked(msg.sender))),
            "Not in whitelist"
        );
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function isValid(bytes32[] memory _proof, bytes32 _leaf)
        public
        view
        returns (bool)
    {
        return MerkleProof.verify(_proof, root, _leaf);
    }
}
