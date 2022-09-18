import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("Meta Transaction Test", () => {
  it("Should let user transfer tokens through a relayer", async () => {
    const MockToken = await ethers.getContractFactory("MockToken");
    const mockToken = await MockToken.deploy();
    await mockToken.deployed();

    const Relayer = await ethers.getContractFactory("Relayer");
    const relayer = await Relayer.deploy();
    await relayer.deployed();

    const [_, userAddress, relayerAddress, recipientAddress] =
      await ethers.getSigners();

    const mintAmount = parseEther("10");
    console.log(mintAmount);
  });
});
