import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.7" },
      { version: "0.8.0" },
      { version: "0.8.10" },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.MUMBAI_RPC ?? "",
      },
    },
  },
};

export default config;
