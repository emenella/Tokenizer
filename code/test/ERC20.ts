import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { ERC20 } from "../typechain-types";

describe("MyToken", function () {
	let token: ERC20;
	let owner: any;
	let addr1: any;
	let addr2: any;
	
	beforeEach(async function () {
		const TokenFactory = await ethers.getContractFactory("ERC20");
		token = await TokenFactory.deploy("MyToken", "MTK", 18, 10000);
		await token.deployed();
		
		[owner, addr1, addr2] = await ethers.getSigners();
	});
	
	describe("Deployment", function () {
		it("Should set the right owner", async function () {
			expect(await token.owner()).to.equal(await owner.getAddress());
		});
		
		it("Should assign the total supply of tokens to the owner", async function () {
			const ownerBalance = await token.balanceOf(await owner.getAddress());
			expect(await token.totalSupply()).to.equal(ownerBalance);
		});
	});
	
	describe("Transactions", function () {
		it("Should transfer tokens between accounts", async function () {
			await token.transfer(await addr1.getAddress(), 50);
			const addr1Balance = await token.balanceOf(await addr1.getAddress());
			expect(addr1Balance).to.equal(50);
			
			await token.connect(addr1).transfer(await addr2.getAddress(), 50);
			const addr2Balance = await token.balanceOf(await addr2.getAddress());
			expect(addr2Balance).to.equal(50);
		});
		
		it("Should fail if sender doesn’t have enough tokens", async function () {
			const initialOwnerBalance = await token.balanceOf(await owner.getAddress());
			
			await expect(
				token.connect(addr1).transfer(await owner.getAddress(), 1)
				).to.be.revertedWith("ERC20InsufficientBalance");
				
				expect(await token.balanceOf(await owner.getAddress())).to.equal(initialOwnerBalance);
			});
			
			it("Should update balances after transfers", async function () {
				const initialOwnerBalance = await token.balanceOf(await owner.getAddress());
				
				await token.transfer(await addr1.getAddress(), 100);
				await token.transfer(await addr2.getAddress(), 50);
				
				const finalOwnerBalance = await token.balanceOf(await owner.getAddress());
				expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));
				
				const addr1Balance = await token.balanceOf(await addr1.getAddress());
				expect(addr1Balance).to.equal(100);
				
				const addr2Balance = await token.balanceOf(await addr2.getAddress());
				expect(addr2Balance).to.equal(50);
			});
		});
	});
