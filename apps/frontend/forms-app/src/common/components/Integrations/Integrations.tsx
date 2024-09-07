import { useEffect, useState } from 'react';
import { getWallets } from '@wallet-standard/app';
import { IntegrationsProps, ObjectProps } from '../../types';
import { shortAddress } from '../../helper';

const Integrations = () => {

  const [multiChainWallets, setMultiChainWallets] = useState<any>();
  const [selectedWallet, setSelectedWallet] = useState<IntegrationsProps>();
  const [accounts, setAccounts] = useState<ObjectProps[]>();

  useEffect(() => {
    const initializeWallets = async () => {
      const walletApi = getWallets();  // Initialize Wallet Standard API
      const availableWallets = walletApi.get();
      setMultiChainWallets(availableWallets);
    };
    
    initializeWallets();
  }, []);


  const connectWallet = async () => {
    if (!selectedWallet) return;
    try {
        if(selectedWallet.disconnect){
            selectedWallet.disconnect();
        }
        selectedWallet.features["standard:connect"].connect().then(()=>{
            setAccounts(selectedWallet.accounts)
        })
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };
  
  return (
    <div>
      <h2>Connect to Wallet</h2>
      <select onChange={(e) => {
            setSelectedWallet(multiChainWallets && multiChainWallets[e.target.value as never])}
        }>
        {multiChainWallets?.length && multiChainWallets?.map((wallet: ObjectProps, index: number) => (
          <option key={wallet.name} value={index}>
             {wallet.name} - {Array.isArray(wallet.chains) ? wallet.chains.join(', ') : wallet.chains}
          </option>
        ))}
      </select>
      <button onClick={connectWallet}>Connect Wallet</button>
      
      {accounts && <p>Connected Account: {shortAddress(5, accounts[0]?.address)}</p>}
    </div>
  );
};

export default Integrations;
