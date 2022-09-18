import fs from "fs";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import { whitelist } from "../constants/whitelist";

const {
  utils: { keccak256, toUtf8Bytes, solidityKeccak256 },
} = ethers;

const main = async () => {
  // let wallets: string[] = [];
  // for (let i = 0; i < 100; i++) {
  //   let wallet = ethers.Wallet.createRandom();
  //   wallets.push(wallet.address);
  // }
  // fs.writeFileSync("./constants/whitelist.ts", JSON.stringify(wallets));

  const leaves = whitelist.map((list) => keccak256(toUtf8Bytes(list)));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  //root
  console.log("root is ", tree.getHexRoot());

  const leaf = keccak256(
    toUtf8Bytes("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")
  );
  const proof = tree.getHexProof(leaf);

  console.log("leaf is ", leaf);
  console.log("proof is ", proof);
  // console.log(tree.verify(proof, leaf, tree.getHexRoot()));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
