import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC20, ERC20__factory } from "../typechain-types";

describe("Token contract", function () {

	let linkToken: ERC20;
	let owner: any;
	let addr1: any;
	let addr2: any
	let addrs: any[];

	beforeEach(async function () {

		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();

		const linkTokenFactory = (await ethers.getContractFactory(
			"ERC20", owner
		)) as ERC20__factory;
		const totalSupply = (10 ** 9).toString()
		linkToken = await linkTokenFactory.deploy("emenella", "EMN", 18, totalSupply);

	});

	describe("Deployment", function () {

		it("Should assign the total supply of tokens to the owner", async function () {
			const ownerBalance = await linkToken.balanceOf(owner.address);
			expect(await linkToken.totalSupply()).to.equal(ownerBalance);
		});
	});

	describe("Transactions", function () {
		it("Should transfer tokens between accounts", async function () {
			// Transfer 50 tokens from owner to addr1
			await linkToken.transfer(addr1.address, 50);
			const addr1Balance = await linkToken.balanceOf(addr1.address);
			expect(addr1Balance).to.equal(50);

			// Transfer 50 tokens from addr1 to addr2
			// We use .connect(signer) to send a transaction from another account
			await linkToken.connect(addr1).transfer(addr2.address, 50);
			const addr2Balance = await linkToken.balanceOf(addr2.address);
			expect(addr2Balance).to.equal(50);
		});

		it("Should fail if sender doesn’t have enough tokens", async function () {
			const initialOwnerBalance = await linkToken.balanceOf(owner.address);

			// Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
			// `require` will evaluate false and revert the transaction.
			await expect(
				linkToken.connect(addr1).transfer(owner.address, 1)
			).to.be.revertedWithCustomError(linkToken, 'ERC20InsufficientBalance');

			// Owner balance shouldn't have changed.
			expect(await linkToken.balanceOf(owner.address)).to.equal(
				initialOwnerBalance
			);
		});

		it("Should update balances after transfers", async function () {
			const initialOwnerBalance = await linkToken.balanceOf(owner.address);

			// Transfer 100 tokens from owner to addr1.
			await linkToken.transfer(addr1.address, 100);

			// Transfer another 50 tokens from owner to addr2.
			await linkToken.transfer(addr2.address, 50);

			// Check balances.
			const finalOwnerBalance = await linkToken.balanceOf(owner.address);
			expect(finalOwnerBalance).to.equal(initialOwnerBalance - BigInt(150));

			const addr1Balance = await linkToken.balanceOf(addr1.address);
			expect(addr1Balance).to.equal(100);

			const addr2Balance = await linkToken.balanceOf(addr2.address);
			expect(addr2Balance).to.equal(50);
		});
	});
});