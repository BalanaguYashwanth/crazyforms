import { useState } from "react";
import { useNonEvmWallet } from "../../../../hooks/useNonEvmWallet";
import CustomSuiEscrowForm from "../CustomSuiEscrowForm/CustomSuiEscrowForm";
import CustomSolanaEscrowForm from "../CustomSolanaEscrowForm/CustomSolanaEscrowForm";

const CustomNonEvmWrapper = () => {
    const { wallets, selectedWallet, accounts, connectWallet } = useNonEvmWallet();
    const [chainType, setChainType] = useState('');

    const formatChains = (chains) => {
      return chains?.length > 0 ? chains[0]?.split(':')[0] : 'No chains available'
    }

    const walletChainType = (wallet) => {
      setChainType(formatChains(wallet?.chains))
    }

    return (
        <main>
             <select onChange={(e) => { connectWallet(wallets[+e.target.value]); walletChainType(wallets[+e.target.value])}}>
                {wallets.map((wallet: { name: string, chains: Array<any> }, index) => (
                  <option key={index} value={index}>
                    {wallet.name} - {formatChains(wallet?.chains)}
                  </option>
                ))}
              </select>
            {!chainType && <p>Please connect to wallet</p>}
            {chainType === 'solana' &&  <CustomSolanaEscrowForm selectedWallet={selectedWallet} accounts={accounts}  /> }
            {chainType === 'sui' && <CustomSuiEscrowForm selectedWallet={selectedWallet} accounts={accounts}  />}
        </main>
    )
}

export default CustomNonEvmWrapper;