import { Button } from "./ui/button";
import { useState, useContext, useEffect, useCallback } from "react";
import { Wallet, WalletContext } from "@/context/wallet"
import { getBalance } from "@/utils/ether";
import { getEnsName } from "@/utils/ens";
import InfoWallet from "./InfoWallet";

export default function ConnectWallet()
{
    const { wallets, setWallets, provider} = useContext(WalletContext);
    const [isConnected, setIsConnected] = useState<boolean>(wallets.length > 0 ? true : false);

    
    const connectWallet = async () => {
        if (provider) {
            const accounts = await provider?.requestAccounts();
            if (typeof accounts !== "undefined" && !isConnected)
            {
                const wallet: Wallet[] = accounts.map((value) => { return {address: value, balance: BigInt(0)}})
                if (wallet.length > 0)
                {
                    setIsConnected(true)
                    const balances = await getBalance(wallet, provider);
                    const ens = await getEnsName(wallet.map((value) => value.address as `0x${string}` ))
                    console.log("setWallets in connectWallet")
                    setWallets(wallet.map((wallet, index) => {
                        const balance = balances.at(index) as bigint;
                        wallet.balance = balance
                        wallet.ens = ens[wallet.address]
                        return wallet;
                    }))
                }
        }
    } 
}

const getInfo = useCallback(async () => {
    if (provider !== undefined) {
        const wallet: Wallet[] = (await provider.getAccounts()).map((value) => { return {address: value, balance: BigInt(0)}})
        if (wallet.length > 0) {
            setIsConnected(true);
            const balances = await getBalance(wallet, provider)
            const ens = await getEnsName(wallet.map((value) => value.address as `0x${string}` ))
            console.log("setWallets in getInfo")
            setWallets(wallet.map((wallet, index) => {
                const balance = balances.at(index) as bigint;
                wallet.balance = balance
                wallet.ens = ens[wallet.address]
                return wallet;
            }))
        }
        else {
            console.log("disconnect")
            setIsConnected(false);
        }
    }
}, [provider, setWallets])

useEffect(() =>
{
    if (wallets.length === 0) {
        getInfo();
    }
}, [provider, getInfo, wallets])

const connectWalletButton: JSX.Element = <Button onClick={connectWallet}> Connect Wallet </Button>
const buttonInstall: JSX.Element = <Button> Install </Button>

const renderContent = () => {
    if (provider !== undefined) {
        if (!isConnected) {
            return connectWalletButton;
        } else {
            return <InfoWallet />;
        }
    } else {
        return buttonInstall;
    }
};

    return renderContent();
}