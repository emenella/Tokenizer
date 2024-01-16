// import Web3 from "web3";
// import RegisteredSubscription from "web3"
import { Wallet } from "../context/wallet";

const detectEthereum: () => boolean = () => {
    if (typeof window.ethereum !== 'undefined') {
        return true;
    }
    return false;
}

const detectWeb3: () => boolean = () => {
    if (typeof window.web3 !== 'undefined') {
        return true;
    }
    return false;
}

const detectMetamask: () => boolean | undefined = () => {
    if (detectEthereum()) {
        return window.ethereum.isMetaMask;
    }
    return undefined;
}

const getBalance: (wallets: Wallet[], provider: any) => Promise<string[]> = async (wallets: Wallet[], provider: any) => {
    const result: Promise<string>[] = [];
    console.log(typeof(provider))
    wallets.forEach(wallet => {
        result.push(provider.eth.getBalance(wallet.address))
    });
    return Promise.all(result)
}

const handleConnectWallet: () => void = () =>
{

}

export { detectEthereum, detectWeb3, detectMetamask, getBalance, handleConnectWallet };