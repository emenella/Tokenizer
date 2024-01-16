import { useState, useEffect } from 'react'
import { WalletContext, Wallet }  from './context/wallet'
import Web3  from 'web3-eth'
import { detectMetamask, getBalance } from './utils/ethereumDetection'


function App() {

  const [wallets, setWallets] = useState<Wallet[]>([])
  const [provider, setProvider] = useState<Web3>()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isEthereumDetected, setIsEthereumDetected] = useState(false)
  const [typeOfWallet, setTypeOfWallet] = useState("")

  useEffect(() => {
    const ethereumDetected = detectMetamask()
    if (ethereumDetected) {
      setIsEthereumDetected(true)
      setProvider(new Web3(window.ethereum))
      setTypeOfWallet(ethereumDetected ? "Metamask" : "Other Wallet")
    }
    else {
      setIsEthereumDetected(false)
      setTypeOfWallet("no Wallet install")
    }
  }, [])

  const connectWallet = async () => {
    if (isEthereumDetected) {
      try {
        const accounts = await provider?.requestAccounts();
        if (typeof accounts !== "undefined")
        {
          setWallets([])
          const balance = await getBalance(accounts, provider);
          console.log(balance);
          setIsWalletConnected(true)
        }
      } 
      catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <WalletContext.Provider value={{ wallets: wallets, setWallets: setWallets, isWalletConnected: isWalletConnected, setIsWalletConnected: setIsWalletConnected }}>
        <h1> Welcome to Tokenizer </h1>
        <div>
          <p> isEthereumDetected: {isEthereumDetected ? "true" : "false"} </p>
          <p> Type of Wallet: {typeOfWallet} </p>
          <p> Address: {wallets.map((value, index) => { return `Wallet ${index}: ${value.address}`})} </p>
          <p> Balance: {wallets.map((value, index) => { return `Wallet ${index}: ${value.balance}`})} </p>
          <p> isWalletConnected: {isWalletConnected ? "true" : "false"} </p>
          <button onClick={connectWallet}> Connect Wallet </button>
        </div>
      </WalletContext.Provider>
    </>
  )
}

export default App
