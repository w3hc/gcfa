import hre, { ethers, network, artifacts } from "hardhat";
import fs from "fs";
const color = require("cli-color");
var msg = color.xterm(39).bgXterm(128);
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("\nDeployment in progress...");

  let euroAddress;

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
    euroAddress = eur.address;

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
    } catch (error) {
      console.error(error);
    }
  } else {
    euroAddress = process.env.CEUR_CONTRACT_ADDRESS
  }

  // deploy CFA
  const GCFA = await ethers.getContractFactory("gCFA");
  const rate = 655957;
  const [recovery] = await ethers.getSigners();
  const gcfa = await GCFA.deploy(euroAddress, recovery.address, rate);
  await gcfa.deployed();
  console.log("\ngCFA contract deployed at", msg(gcfa.address), "✅");

  try {
    console.log("\ngCFA contract Etherscan verification in progress...");
    await gcfa.deployTransaction.wait(6);
    await hre.run("verify:verify", {
      network: network.name,
      address: gcfa.address,
      constructorArguments: [euroAddress, recovery.address, rate],
      contract: "contracts/gCFA.sol:gCFA",
    });
    console.log("Etherscan verification done. ✅");
  } catch (error) {
    console.error(error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
