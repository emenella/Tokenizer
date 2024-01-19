import { useState, useEffect, useCallback } from 'react'
import { WalletContext, Wallet }  from './context/wallet'
import Web3  from 'web3-eth'
import { detectEthereum, detectMetamask, getBalance } from './utils/ethereumDetection'


function App() {
  
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [provider, setProvider] = useState<Web3 | undefined>(undefined)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isEthereumDetected, setIsEthereumDetected] = useState(false)
  const [typeOfWallet, setTypeOfWallet] = useState("")
  
  const refresh = useCallback(async (accounts: string[]) =>
  {
    if (provider !== undefined)
    {
      if ( accounts.length > 0)
      {
        const wallets: Wallet[] = accounts.map((account) => { return { address: account, balance: "0"}})
        const balance = await getBalance(wallets, provider);
        setWallets(wallets.map((wallet, index) => { wallet.balance = balance.at(index) as string; return wallet}))
      }
      else {
        setWallets([])
        setIsWalletConnected(false)
      }
    }
  }, [provider])
  
  useEffect(() => {
    
    const getInfo = async () => {
      if (provider !== undefined) {
        const wallets = (await provider.getAccounts()).map((value) => { return {address: value, balance: "0"}})
        const balances = await getBalance(wallets, provider)
        setWallets(wallets.map((value, index) => {
          value.balance = balances.at(index) as string
          return value
        }))
        if (wallets.length > 0)
        setIsWalletConnected(true)
      }
    }
    
    if (provider === undefined)
    setProvider(new Web3(window.ethereum))
    
    
    if (detectEthereum()) {
      setIsEthereumDetected(true)
      getInfo()
      window.ethereum.on("accountsChanged", refresh)
      setTypeOfWallet(detectMetamask() ? "Metamask" : "Other Wallet")
    }
    else {
      setIsEthereumDetected(false)
      setTypeOfWallet("no Wallet install")
    }
  }, [provider, refresh])
  
  const connectWallet = async () => {
    if (provider && isEthereumDetected) {
      const accounts = await provider?.requestAccounts();
      if (typeof accounts !== "undefined")
      {
        const wallet = accounts.map((value) => { return {address: value, balance: "0"}})
        const balances = await getBalance(wallet, provider);
        setWallets(wallet.map((value, index) => {
          const balance = balances.at(index)
          value.balance = balance as string
          return value
        }))
        if (wallet.length >= 1)
        setIsWalletConnected(true)
      }
    } 
  }
  
  return (
    <>
      <WalletContext.Provider value={{ wallets: wallets, provider: provider }}>
        <h1> Welcome to Tokenizer </h1>
        <div>
          <p> isEthereumDetected: {isEthereumDetected ? "true" : "false"} </p>
          <p> Type of Wallet: {typeOfWallet} </p>
          <p> Address: {wallets.map((value, index) => { return `Wallet ${index}: ${value.address} `})} </p>
          <p> Balance: {wallets.map((value, index) => { return `Wallet ${index}: ${value.balance} `})} </p>
          <p> isWalletConnected: {isWalletConnected ? "true" : "false"} </p>
          { !isWalletConnected && <button onClick={connectWallet}> Connect Wallet </button> }
        </div>
      </WalletContext.Provider>
    </>
    )
  }
  
  export default App
