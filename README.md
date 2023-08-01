
# Tokenizer Project

Tokenizer is a project that aims to deploy a custom ERC20-compliant token on the Binance Smart Chain (BNB). This README provides an overview of the project and its setup instructions.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Deployment](#deployment)
- [Smart Contract](#smart-contract)
- [Contact](#contact)

## Introduction

The Tokenizer project allows you to create and deploy a custom token on the Binance Smart Chain. The token will adhere to the ERC20 standard, enabling it to be compatible with various decentralized applications (DApps) and cryptocurrency exchanges.

## Prerequisites

Before you start working with the Tokenizer project, ensure you have the following prerequisites installed:

- Node.js (>=14.x)
- npm (Node Package Manager)
- HardHat (a development environment for Ethereum-like networks)

## Installation

1. Clone the Tokenizer repository from GitHub:` 

git clone [https://github.com/emenella/tokenizer.git](https://github.com/emenella/tokenizer.git)

 `2. Navigate to the project directory:` 

`cd tokenizer`

 `3. Install the required dependencies:` 

`npm install`

 ## Deployment

To deploy the ERC20 token on the Binance Smart Chain, follow these steps:

1. Configure HardHat:

Modify the `hardhat.config.js` file to set up your Binance Smart Chain network, accounts, and other configurations.

2. Write the Smart Contract:

Implement your ERC20 token smart contract in Solidity. You can find the template for the ERC20 contract in the `contracts` directory.

3. Compile the Smart Contract:

Compile the Solidity smart contract using HardHat:

`npx hardhat compile`

 4. Deploy the Smart Contract:

Deploy the compiled contract to the Binance Smart Chain network:` 

`npx hardhat run scripts/deploy.js --network bsc`

5. Verify the Smart Contract (optional):

You may choose to verify the deployed contract on Binance Smart Chain explorers like BscScan for transparency and trust.

## Smart Contract

The `contracts` directory contains the template for the ERC20 token smart contract. You can modify it according to your token's specifications before deployment.

Please ensure that you thoroughly test your smart contract and perform security audits before deploying it to the live network.

## Contact

If you have any questions, feedback, or need support, you can reach out to the project maintainers at:

- Email: emenella@student.42lyon.fr
