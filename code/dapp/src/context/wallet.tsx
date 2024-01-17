import { createContext } from "react";
import Web3 from "web3-eth"

export interface Wallet {
    address: string;
    balance: string;
}

interface WalletContextType {
    wallets: Wallet[];
    provider: Web3 | undefined;
}

const WalletContextDefaultValues: WalletContextType = {
    wallets: [],
    provider: undefined
}

export const WalletContext = createContext<WalletContextType>(WalletContextDefaultValues)