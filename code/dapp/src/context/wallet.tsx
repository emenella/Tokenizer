import { createContext } from "react";
import Web3 from "web3-eth"

export interface Wallet {
    address: string;
    ens?: string
    balance: BigInt;
}

interface WalletContextType {
    wallets: Wallet[];
    setWallets: (wallets: Wallet[]) => void;
    provider: Web3 | undefined;
    setProvider: (provider: Web3) => void;
}

const WalletContextDefaultValues: WalletContextType = {
    wallets: [],
    setWallets: () => {},
    provider: undefined,
    setProvider: () => {}
}

export const WalletContext = createContext<WalletContextType>(WalletContextDefaultValues)