import Web3 from "web3-eth";
import { Wallet } from "../context/wallet";

function detectEthereum(): boolean {
    if (typeof window.ethereum !== 'undefined') {
        return true;
    }
    return false;
}

function detectWeb3(): boolean {
    if (typeof window.web3 !== 'undefined') {
        return true;
    }
    return false;
}

function detectMetamask(): boolean | undefined {
    if (detectEthereum()) {
        return window.ethereum.isMetaMask;
    }
    return undefined;
}

function getBalance(wallets: Wallet[], provider: Web3): Promise<BigInt[]> {
    const result: Promise<BigInt>[] = [];
    wallets.forEach(wallet => {
        result.push(provider.getBalance(wallet.address))
    });
    return Promise.all(result)
}

function displayBalance(balance: BigInt): number
{
    return Number(balance) / Number(10 ** 18)
}

export { detectEthereum, detectWeb3, detectMetamask, getBalance, displayBalance };