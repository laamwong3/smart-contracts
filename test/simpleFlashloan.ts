import { ethers } from "hardhat";
import { expect } from "chai";
import { DAI, POOL_ADDRESS_PROVIDER } from "../configs/simpleFlashloan";
import { impersonateAccount } from "@nomicfoundation/hardhat-network-helpers";

describe("Simple Flash Loan", () => {
  it("Should borrow a flash loan and return it", async () => {
    const SimpleFlashloan = await ethers.getContractFactory("SimpleFlashloan");
    const simpleFlashloan = await SimpleFlashloan.deploy(POOL_ADDRESS_PROVIDER);
    await simpleFlashloan.deployed();

    const token = await ethers.getContractAt("IERC20", DAI);
    const DAI_BALANCE = ethers.utils.parseEther("2000");
  });
});
