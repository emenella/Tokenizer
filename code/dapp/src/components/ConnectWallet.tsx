import { Button } from "./ui/button";
import { useState, useContext, useEffect, useCallback } from "react";
import { Wallet, WalletContext } from "@/context/wallet"
import { getBalance } from "@/utils/ether";
import { getEnsName } from "@/utils/ens";
import InfoWallet from "./InfoWallet";

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

const getInfo = useCallback(async () => {
    if (provider !== undefined) {
    const wallets: Wallet[] = (await provider.getAccounts()).map((value) => { return {address: value, balance: BigInt(0)}})
    const balances = await getBalance(wallets, provider)
    const ens = await getEnsName(wallets.map((value) => value.address as `0x${string}` ))
    setWallets(wallets.map((wallet, index) => {
        const balance = balances.at(index) as bigint;
        wallet.balance = balance
        wallet.ens = ens[wallet.address]
        return wallet;
    }))
    if (wallets.length > 0)
        setIsConnected(true)
    }
}, [provider, setWallets])

useEffect(() =>
{
    getInfo()
}, [provider, getInfo])

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