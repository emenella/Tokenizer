import { Button } from "./ui/button";
import { useState, useContext, useEffect } from "react";
import { WalletContext } from "@/context/wallet"
import { getBalance } from "@/utils/ether";






export default function ConnectWallet()
{
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const { wallets, setWallets, provider} = useContext(WalletContext);
    
    const connectWallet = async () => {
        if (provider) {
            const accounts = await provider?.requestAccounts();
            if (typeof accounts !== "undefined")
            {
                const wallet = accounts.map((value) => { return {address: value, balance: BigInt(0)}})
                const balances = await getBalance(wallet, provider);
                setWallets(wallets.map((wallet, index) => {
                    const balance = balances.at(index) as bigint;
                    wallet.balance = balance
                    return wallet;
                }))
                if (wallet.length >= 1)
                    setIsConnected(true)
            }
        } 
    }
    
    const connectWalletButton: JSX.Element = <Button onClick={connectWallet}> Connect Wallet </Button>
    const buttonInstall: JSX.Element = <Button> Install </Button>

    console.log(provider)

    return provider !== undefined ? (!isConnected ? connectWalletButton : null) : buttonInstall;
}