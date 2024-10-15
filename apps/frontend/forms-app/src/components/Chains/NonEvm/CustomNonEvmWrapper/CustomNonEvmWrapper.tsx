import { useState } from "react";
import { useNonEvmWallet } from "../../../../hooks/useNonEvmWallet";
import CustomSuiEscrowForm from "../CustomSuiEscrowForm/CustomSuiEscrowForm";
import CustomSolanaEscrowForm from "../CustomSolanaEscrowForm/CustomSolanaEscrowForm";
import CustomAptosEscrowForm from "../CustomAptosEscrowForm/CustomAptosEscrowForm";
import { CHAINS } from "../../../../common/constants";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

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
            {chainType === (CHAINS.SOLANA).toLocaleLowerCase() &&  <CustomSolanaEscrowForm accounts={accounts}  /> }
            {chainType === (CHAINS.SUI).toLocaleLowerCase() && <CustomSuiEscrowForm selectedWallet={selectedWallet} accounts={accounts}  />}
            {chainType === (CHAINS.APTOS).toLocaleLowerCase() && <CustomAptosEscrowForm />}
            {!chainType && <p>Please connect to wallet</p>}
        </main>
    )
}

export default CustomNonEvmWrapper;