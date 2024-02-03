import { useEffect, useCallback, ReactNode, useContext } from 'react'
import { WalletContext, Wallet }  from './context/wallet'
import Web3  from 'web3-eth'
import { detectEthereum, getBalance } from './utils/ether'
import { getEnsName } from './utils/ens'

interface AppProps {
  children?: ReactNode,
}

export default function App(props: AppProps): JSX.Element {
  
  const { wallets, setWallets, provider, setProvider} = useContext(WalletContext);
  
  const refresh = useCallback(async (accounts: string[]) =>
  {
    if (provider !== undefined)
    {
      if ( accounts.length > 0)
      {
        const wallet: Wallet[] = accounts.map((account) => { return { address: account, balance: BigInt(0)}})
        const balances = await getBalance(wallet, provider);
        const ens = await getEnsName(wallets.map((value) => value.address as `0x${string}` ))
        console.log("setWallets in refresh")
        setWallets(wallet.map((wallet, index) => {
          const balance = balances.at(index) as bigint;
          wallet.ens = ens[wallet.address]
          wallet.balance = balance
          return wallet;
        }))
      }
      else {
        console.log("No accounts")
        setWallets([])
      }
    }
  }, [provider, setWallets])
  
  useEffect(() => {

  if (detectEthereum()) {
      if (provider === undefined)
        setProvider(new Web3(window.ethereum))
      window.ethereum.on("accountsChanged", refresh);
    }
    
    return () => {
      window.ethereum.removeListener("accountsChanged", refresh);
    }
  }, [provider, refresh, setWallets, setProvider, wallets])
  
  return (
    <>
    {props.children}
    </>
    )
}