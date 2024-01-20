import { ReactNode, useState } from "react";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Wallet, WalletContext } from "@/context/wallet";
import Web3 from "web3-eth";

export default function Provider(props: {children: ReactNode})
{
    const [wallets, setWallets] = useState<Wallet[]>([])
    const [provider, setProvider] = useState<Web3 | undefined>(undefined)

    return (
        <ThemeProvider>
            <WalletContext.Provider value={{ wallets: wallets, setWallets: setWallets, provider: provider, setProvider: setProvider }}>
            {props.children}
            </WalletContext.Provider>
        </ThemeProvider>
    )
}