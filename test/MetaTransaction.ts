import { expect } from "chai";
import { BigNumber } from "ethers";
import { arrayify, formatEther, parseEther } from "ethers/lib/utils";
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

    const mintAmount = parseEther("10000");
    // console.log(mintAmount);
    const userTokenInstance = mockToken.connect(userAddress);
    const mintTx = await userTokenInstance.mint(mintAmount);
    await mintTx.wait(1);

    const approveTx = await userTokenInstance.approve(
      relayer.address,
      BigNumber.from(
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      )
    );
    await approveTx.wait(1);

    const transferAmount = parseEther("10");
    const messageHash = await relayer.getHash(
      userAddress.address,
      transferAmount,
      recipientAddress.address,
      mockToken.address
    );
    // console.log(messageHash);
    const signature = await userAddress.signMessage(arrayify(messageHash));
    // console.log(signature);

    const replayContractInstance = relayer.connect(relayerAddress);
    const metaTx = await replayContractInstance.transfer(
      userAddress.address,
      transferAmount,
      recipientAddress.address,
      mockToken.address,
      signature
    );
    await metaTx.wait(1);

    const userBalance = await mockToken.balanceOf(userAddress.address);
    const recipientBalance = await mockToken.balanceOf(
      recipientAddress.address
    );

    // console.log(formatEther(userBalance));
    // console.log(formatEther(recipientBalance));

    expect(userBalance).lt(mintAmount);
    expect(recipientBalance).gt(BigNumber.from(0));
  });
});
