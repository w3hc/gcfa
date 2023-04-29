import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from 'ethers/lib/utils';

describe("gCFA", function () {

  async function deployContractsFixture() {
    const [bank, alice, bob] = await ethers.getSigners()

    const gEUR = await ethers.getContractFactory("gEUR")
    const eur = await gEUR.deploy()
    await eur.deployed()

    const gCFA = await ethers.getContractFactory("gCFA")
    const gcfa = await gCFA.deploy(eur.address)
    await gcfa.deployed()

    return { gcfa, bank, eur, alice, bob }
  }

  describe("Deployment", function () {
    it("Should set the right underlying asset", async function () {
      const { eur, gcfa } = await loadFixture(deployContractsFixture)
      expect(await gcfa.underlying()).to.equal(eur.address)
    })
  })

  describe("Interactions", function () {

    it("Should revert when Alice sends ETH to gCFA ", async function () {
      const { alice, gcfa } = await loadFixture(deployContractsFixture)
      await expect( alice.sendTransaction({
        to: gcfa.address,
        value: ethers.utils.parseEther('0.0001')
      })).to.be.reverted
    })

    xit("Should withdraw when Alice sends gCFA to gCFA ", async function () {
    })

    xit("Should deposit when Alice sends EUR to gCFA ", async function () {
    })

    xit("Should revert when Alice sends an NFT to gCFA", async function () {
    })

    it("Should mint 10,000 units", async function () {
      const { eur, bank } = await loadFixture(deployContractsFixture)
      expect(await eur.balanceOf(bank.address)).to.equal(parseEther('10000'))
    })

    it("Should allow", async function () {
      const { eur, gcfa, bank} = await loadFixture(deployContractsFixture)
      expect(await eur.connect(bank).approve(gcfa.address, parseEther('10000')))
      expect(await eur.allowance(bank.address, gcfa.address)).to.equal(parseEther('10000'))
    })

    it("Should deposit", async function () {
      const { eur, gcfa, bank} = await loadFixture(deployContractsFixture)
      expect(await eur.connect(bank).approve(gcfa.address, parseEther('10000')))
      expect(await eur.allowance(bank.address, gcfa.address)).to.equal(parseEther('10000'))
      expect(await gcfa.connect(bank).depositFor(bank.address, parseEther('100')))
      expect(await eur.balanceOf(bank.address)).to.equal(parseEther('9900'))
    })

    it("Should withdraw", async function () {
      const { eur, gcfa, bank } = await loadFixture(deployContractsFixture)
      expect(await eur.connect(bank).approve(gcfa.address, parseEther('10000')))
      expect(await gcfa.connect(bank).depositFor(bank.address, parseEther('100')))
      expect(await eur.allowance(bank.address, gcfa.address)).to.equal(parseEther('9900'))
      expect(await gcfa.connect(bank).withdrawTo(bank.address, parseEther('65500')))
      expect(await eur.balanceOf(bank.address)).to.equal(parseEther('10000'))
    })

    it("Should recover EUR", async function () {
      const { eur, gcfa, bank } = await loadFixture(deployContractsFixture)
      expect(await eur.connect(bank).approve(gcfa.address, parseEther('10000')))
      expect(await gcfa.connect(bank).depositFor(bank.address, parseEther('100')))
      expect(await eur.allowance(bank.address, gcfa.address)).to.equal(parseEther('9900'))
      expect(await eur.connect(bank).transfer(gcfa.address, parseEther('100')))
      expect(await eur.balanceOf(bank.address)).to.equal(parseEther('9800'))
      expect(await gcfa.recoverEUR())
      expect(await gcfa.balanceOf(bank.address)).to.equal(parseEther('131000'))
    })

    it("Should recover CFA", async function () {
      const { eur, gcfa, bank } = await loadFixture(deployContractsFixture)
      expect(await eur.connect(bank).approve(gcfa.address, parseEther('10000')))
      expect(await gcfa.connect(bank).depositFor(bank.address, parseEther('100')))
      expect(await eur.allowance(bank.address, gcfa.address)).to.equal(parseEther('9900'))
      expect(await gcfa.connect(bank).transfer(gcfa.address, parseEther('65500')))
      expect(await gcfa.balanceOf(bank.address)).to.equal(0)
      expect(await gcfa.recoverCFA())
      expect(await eur.balanceOf(bank.address)).to.equal(parseEther('10000'))
      expect(await gcfa.balanceOf(bank.address)).to.equal(parseEther('0'))
    })
  })
})