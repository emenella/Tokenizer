import { useState, useEffect, useCallback, ReactNode, useContext } from 'react'
import { WalletContext, Wallet }  from './context/wallet'
import Web3  from 'web3-eth'
import { detectEthereum, detectMetamask, getBalance } from './utils/ether'
import "./global.css"
import { Button } from './components/ui/button'

interface AppProps {
  children?: ReactNode,
}

export default function App(props: AppProps): JSX.Element {
  
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isEthereumDetected, setIsEthereumDetected] = useState(false)
  const [typeOfWallet, setTypeOfWallet] = useState("")
  
  const { wallets, setWallets, provider, setProvider} = useContext(WalletContext);
  
  const refresh = useCallback(async (accounts: string[]) =>
  {
    if (provider !== undefined)
    {
      if ( accounts.length > 0)
      {
        const wallets: Wallet[] = accounts.map((account) => { return { address: account, balance: BigInt(0)}})
        const balances = await getBalance(wallets, provider);
        setWallets(wallets.map((wallet, index) => {
          const balance = balances.at(index) as bigint;
          wallet.balance = balance
          return wallet;
        }))
      }
      else {
        setWallets([])
        setIsWalletConnected(false)
      }
    }
  }, [provider, setWallets])
  
  useEffect(() => {
    
    const getInfo = async () => {
      if (provider !== undefined) {
        const wallets = (await provider.getAccounts()).map((value) => { return {address: value, balance: BigInt(0)}})
        const balances = await getBalance(wallets, provider)
        setWallets(wallets.map((wallet, index) => {
          const balance = balances.at(index) as bigint;
          wallet.balance = balance
          return wallet;
        }))
        if (wallets.length > 0)
        setIsWalletConnected(true)
      }
    }
    
    
    
    if (detectEthereum()) {
      setIsEthereumDetected(true)
      getInfo()
      if (provider === undefined)
      {
        setProvider(new Web3(window.ethereum))
        window.ethereum.on("accountsChanged", refresh);
      }
      setTypeOfWallet(detectMetamask() ? "Metamask" : "Other Wallet")
    }
    else {
      setIsEthereumDetected(false)
      setTypeOfWallet("no Wallet install")
    }
    
    return () => {
      window.ethereum.removeListener("accountsChanged", refresh);
    }
  }, [provider, refresh, setWallets, setProvider, wallets])
  
  const connectWallet = async () => {
    if (provider && isEthereumDetected) {
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
        setIsWalletConnected(true)
      }
    } 
  }
  
  const connectWalletButton: JSX.Element = <Button onClick={connectWallet}> Connect Wallet </Button>
  
  return (
    <>
    <h1> Welcome to Tokenizer </h1>
    <div>
    <p> isEthereumDetected: {isEthereumDetected ? "true" : "false"} </p>
    <p> Type of Wallet: {typeOfWallet} </p>
    <p> Address: {wallets.map((value, index) => { return `Wallet ${index}: ${value.address} `})} </p>
    <p> Balance: {wallets.map((value, index) => { return `Wallet ${index}: ${Number(value.balance) / Number(10 ** 18)} `})} </p>
    <p> isWalletConnected: {isWalletConnected ? "true" : "false"} </p>
    { !isWalletConnected ? (connectWalletButton) : (props.children) }
    </div>
    </>
    )
  }
