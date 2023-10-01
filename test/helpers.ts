import { ethers } from "hardhat";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { EURMock } from "../typechain-types";
import { Contract } from "ethers";

// Generate a random Ethereum address
export const getRandomAddress = async () => {
  return ethers.Wallet.createRandom().address;
};

export const deployContractsFixture = async () => {
  const [alice, bob, recovery] = await ethers.getSigners();

  const EURMock = await ethers.getContractFactory("EURMock");
  const eur = await EURMock.deploy();
  await eur.deployed();

  const rate = 655957;

  const IdentityMock = await ethers.getContractFactory("IdentityMock");
  const identity = await IdentityMock.deploy();
  await identity.deployed();

  await identity.addWhitelisted(alice.address);

  const NameServiceMock = await ethers.getContractFactory("NameServiceMock");
  const nameService = await NameServiceMock.deploy(identity.address);
  await nameService.deployed();

  const gCFA = await ethers.getContractFactory("gCFA");
  const cfa = await gCFA.deploy(eur.address, recovery.address, rate, nameService.address);
  await cfa.deployed();

  return { cfa, eur, alice, bob, recovery, rate, nameService, identity };
}

export const assertDepositSuccessful = async (signer: SignerWithAddress, eur: EURMock, cfa: Contract) => {
  const startBalance = await cfa.balanceOf(signer.address);
  await eur.connect(signer).approve(cfa.address, parseEther("1"));
  await expect(cfa.connect(signer).depositFor(signer.address, 1000)).to.not.be.reverted;
  const endBalance = await cfa.balanceOf(signer.address);
  expect(ethers.BigNumber.from(endBalance).gt(startBalance)).to.be.true;
}

export const assertDepositFails = async (signer: SignerWithAddress, eur: EURMock, cfa: Contract, failureMsg: string?) => {
  const startBalance = await cfa.balanceOf(signer.address);
  await eur.connect(signer).approve(cfa.address, parseEther("1"));
  (failureMsg) ?
    await expect(cfa.connect(signer).depositFor(signer.address, 1000)).to.be.revertedWith(failureMsg) :
    await expect(cfa.connect(signer).depositFor(signer.address, 1000)).to.be.reverted;
  const endBalance = await cfa.balanceOf(signer.address);
  expect(endBalance).to.equal(startBalance);
}