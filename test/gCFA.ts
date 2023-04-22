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
    it("Should set the right registrar", async function () {
      const { eur, gcfa } = await loadFixture(deployContractsFixture)
      expect(await gcfa.underlying()).to.equal(eur.address)
    })
  })

  describe("Interactions", function () {

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
  })
})