// npx hardhat run scripts/deploy.ts --network optimism-goerli
import hre, { ethers, network, artifacts } from "hardhat";
import fs from "fs";
const color = require("cli-color");
var msg = color.xterm(39).bgXterm(128);
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("\nDeployment in progress...");

  if (network.name  == "alfajores" || network.name  == "goerli") {

    // deploy EUR
    const EUR = await ethers.getContractFactory("EURMock");
    const eur = await EUR.deploy();
    await eur.deployed();
    console.log("\nEURMock contract deployed at", msg(eur.address), "✅");
    const receipt = await ethers.provider.getTransactionReceipt(
      eur.deployTransaction.hash
    );
    console.log("\nBlock number:", msg(receipt.blockNumber));

    // deploy CFA
    const GCFA = await ethers.getContractFactory("gCFA");
    const rate = 655957;
    const [recovery] = await ethers.getSigners();
    const gcfa = await GCFA.deploy(eur.address, recovery.address, rate);
    await gcfa.deployed();
    console.log("\ngCFA contract deployed at", msg(gcfa.address), "✅");
    const receipt2 = await ethers.provider.getTransactionReceipt(
      gcfa.deployTransaction.hash
    );
    console.log("\nBlock number:", msg(receipt2.blockNumber));

    try {
      console.log("\nEURMock contract Etherscan verification in progress...");
      await eur.deployTransaction.wait(6);
      await hre.run("verify:verify", {
        network: network.name,
        address: eur.address,
        constructorArguments: [],
        contract: "contracts/EURMock.sol:EURMock",
      });
      console.log("Etherscan verification done. ✅");

      console.log("\n gCFA contract Etherscan verification in progress...");
      await gcfa.deployTransaction.wait(6);
      await hre.run("verify:verify", {
        network: network.name,
        address: gcfa.address,
        constructorArguments: [eur.address, recovery.address, rate],
        contract: "contracts/gCFA.sol:gCFA",
      });
      console.log("Etherscan verification done. ✅");
    } catch (error) {
      console.error(error);
    }

  } else {
    try {
      // deploy CFA
      const cEUR = process.env.CEUR_CONTRACT_ADDRESS
      const GCFA = await ethers.getContractFactory("gCFA");
      const rate = 655957;
      const [recovery] = await ethers.getSigners();
      const gcfa = await GCFA.deploy(cEUR, recovery.address, rate);
      await gcfa.deployed();
      console.log("\ngCFA contract deployed at", msg(gcfa.address), "✅");
      console.log("\n gCFA contract Etherscan verification in progress...");
      await gcfa.deployTransaction.wait(6);
      await hre.run("verify:verify", {
        network: network.name,
        address: gcfa.address,
        constructorArguments: [cEUR, recovery.address, rate],
        contract: "contracts/gCFA.sol:gCFA",
      });
      console.log("Etherscan verification done. ✅");
    } catch (error) {
      console.error(error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
