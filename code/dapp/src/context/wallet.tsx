import { createContext } from "react";

export interface Wallet {
    address: string;
    balance: number;
    isConnected: boolean;
}

interface WalletContextType {
    wallets: Wallet[];
    setWallets: (wallet: Wallet[]) => void;
    isWalletConnected: boolean;
    setIsWalletConnected: (isWalletConnected: boolean) => void;
}

const WalletContextDefaultValues: WalletContextType = {
    wallets: [],
    setWallets: () => {},
    isWalletConnected: false,
    setIsWalletConnected: () => {}
}

export const WalletContext = createContext<WalletContextType>(WalletContextDefaultValues)