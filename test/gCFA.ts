import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";

describe("gCFA", function () {
  async function deployContractsFixture() {
    const [alice, bob, recovery] = await ethers.getSigners();

    const EURMock = await ethers.getContractFactory("EURMock");
    const eur = await EURMock.deploy();
    await eur.deployed();

    const rate = 655957;

    const gCFA = await ethers.getContractFactory("gCFA");
    const cfa = await gCFA.deploy(eur.address, recovery.address, rate);
    await cfa.deployed();

    return { cfa, eur, alice, bob, recovery, rate };
  }

  describe("Deployment", function () {
    it("Should set the right underlying asset", async function () {
      const { cfa, eur } = await loadFixture(deployContractsFixture);
      expect(await cfa.underlying()).to.equal(eur.address);
    });

    it("Should set the right recovery address", async function () {
      const { cfa, recovery } = await loadFixture(deployContractsFixture);
      expect(await cfa.recoveryAddress()).to.equal(recovery.address);
    });

    it("Should set the right rate", async function () {
      const { cfa, rate } = await loadFixture(deployContractsFixture);
      expect(await cfa.rate()).to.equal(rate);
    });
  });

  describe("Interactions", function () {
    it("Should mint 1 unit", async function () {
      const { eur, alice } = await loadFixture(deployContractsFixture);
      expect(await eur.balanceOf(alice.address)).to.equal(parseEther("1"));
      await eur.mint();
      expect(await eur.balanceOf(alice.address)).to.equal(parseEther("2"));
    });

    it("Should approve gCFA contract", async function () {
      const { eur, cfa, alice } = await loadFixture(deployContractsFixture);
      expect(await eur.approve(cfa.address, parseEther("10000")));
      expect(await eur.allowance(alice.address, cfa.address)).to.equal(
        parseEther("10000")
      );
    });

    it("Should deposit EUR", async function () {
      const { eur, cfa, alice, rate } = await loadFixture(deployContractsFixture);

      // deposit
      expect(await eur.approve(cfa.address, parseEther("1")));
      expect(await eur.allowance(alice.address, cfa.address)).to.equal(
        parseEther("1")
      );
      expect(await cfa.depositFor(alice.address, 1000));
      expect(await eur.balanceOf(alice.address)).to.equal(999999999999999000n);
      expect(await cfa.balanceOf(alice.address)).to.equal(rate.toString());
    });

    it("Should withdraw EUR", async function () {
      const { eur, cfa, alice, rate } = await loadFixture(deployContractsFixture);

      // deposit
      expect(await eur.approve(cfa.address, parseEther("1")));
      expect(await eur.allowance(alice.address, cfa.address)).to.equal(
        parseEther("1")
      );
      expect(await cfa.depositFor(alice.address, 1000));
      expect(await eur.balanceOf(alice.address)).to.equal(999999999999999000n);
      expect(await cfa.balanceOf(alice.address)).to.equal(rate.toString());

      // withdraw
      const currentBalance = await cfa.balanceOf(alice.address);
      expect(await eur.allowance(alice.address, cfa.address)).to.equal(999999999999999000n);
      expect(await cfa.withdrawTo(alice.address, currentBalance));
      expect(await eur.balanceOf(alice.address)).to.equal(parseEther("1"));
    });

    it("Should recover lost EUR", async function () {
      const { eur, cfa, alice, recovery } = await loadFixture(
        deployContractsFixture
      );
      expect(cfa.recoverEUR()).to.be.revertedWith("Nothing to recover");
      expect(await eur.transfer(cfa.address, parseEther("1")));
      expect(await eur.balanceOf(alice.address)).to.equal(parseEther("0"));
      expect(await cfa.recoverEUR());
      expect(await cfa.balanceOf(recovery.address)).to.equal(
        parseEther("655.957")
      );
    });

    it("Should recover lost CFA", async function () {
      const { eur, cfa, alice, recovery, rate } = await loadFixture(
        deployContractsFixture
      );
      expect(cfa.recoverCFA()).to.be.revertedWith("Nothing to recover");
      expect(eur.approve(cfa.address, parseEther("1")));
      expect(await cfa.depositFor(alice.address, 1000));
      expect(await eur.allowance(alice.address, cfa.address)).to.equal(999999999999999000n);
      expect(await eur.balanceOf(alice.address)).to.equal(999999999999999000n);
      expect(await cfa.transfer(cfa.address, 655957));
      expect(await cfa.balanceOf(alice.address)).to.equal(
        parseEther("0")
      );
      expect(await cfa.balanceOf(cfa.address)).to.equal(655957);
      expect(await eur.balanceOf(recovery.address)).to.equal(0);
      expect(await cfa.recoverCFA());
      expect(await cfa.balanceOf(cfa.address)).to.equal(parseEther("0"));
      expect(await eur.balanceOf(recovery.address)).to.equal(1000);
    });
  });
});
