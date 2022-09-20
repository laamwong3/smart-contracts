import { ethers } from "hardhat";
import { expect } from "chai";
import {
  DAI,
  DAI_WHALE,
  POOL_ADDRESS_PROVIDER,
} from "../configs/simpleFlashloan";
import { impersonateAccount } from "@nomicfoundation/hardhat-network-helpers";

describe("Simple Flash Loan", () => {
  it("Should borrow a flash loan and return it", async () => {
    const SimpleFlashloan = await ethers.getContractFactory("SimpleFlashloan");
    const simpleFlashloan = await SimpleFlashloan.deploy(POOL_ADDRESS_PROVIDER);
    await simpleFlashloan.deployed();

    const token = await ethers.getContractAt("IERC20", DAI);
    const DAI_TRANSFER_AMOUNT = ethers.utils.parseEther("2000");

    await impersonateAccount(DAI_WHALE);
    const impersonatedSigner = await ethers.getSigner(DAI_WHALE);
    //pretent
    await token
      .connect(impersonatedSigner)
      .transfer(simpleFlashloan.address, DAI_TRANSFER_AMOUNT);

    const tx = await simpleFlashloan.createFlashloan(
      DAI,
      ethers.utils.parseEther("2000")
    );
    await tx.wait(1);

    const remainingBalance = await token.balanceOf(simpleFlashloan.address);
    console.log(remainingBalance);
    expect(remainingBalance).lt(DAI_TRANSFER_AMOUNT);
  });
});
