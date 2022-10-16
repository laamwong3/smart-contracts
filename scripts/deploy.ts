import fs from "fs";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import { whitelist } from "../constants/whitelist";
import keccak256 from "keccak256";

const main = async () => {
  const [owner, user1, user2] = await ethers.getSigners();
  const CreatorNFT = await ethers.getContractFactory("CreatorNFT");
  const creatorNFT = await CreatorNFT.deploy(
    "0xe641074132318ffc4aa8587B75b70B66fBb1B816",
    "4",
    "5"
  );

  console.log(`Contract deployed to ${creatorNFT.address}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
