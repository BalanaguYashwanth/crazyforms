import { useState, useEffect } from 'react';
import { getWallets } from '@wallet-standard/app';

export const useNonEvmWallet = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const initializeWallets = async () => {
      const walletApi = getWallets();
      setWallets(walletApi.get());
    };
    initializeWallets();
  }, []);

  const connectWallet = async (wallet) => {
    try {
      await wallet.features["standard:connect"].connect();
      setAccounts(wallet.accounts);
      setSelectedWallet(wallet);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return { wallets, selectedWallet, accounts, connectWallet };
};
