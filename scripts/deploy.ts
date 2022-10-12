import fs from "fs";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import { whitelist } from "../constants/whitelist";
import keccak256 from "keccak256";

const main = async () => {
  const [owner, user1, user2] = await ethers.getSigners();
  const CreatorNFT = await ethers.getContractFactory("CreatorNFT");
  const creatorNFT = await CreatorNFT.deploy(
    "0xdc02ef723E6Ff66FB2Bfd46389Bf398DFB4eBF93",
    "2",
    "3"
  );

  console.log(`Contract deployed to ${creatorNFT.address}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
