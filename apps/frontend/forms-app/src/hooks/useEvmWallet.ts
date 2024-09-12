import { ethers, BrowserProvider, JsonRpcSigner, Contract } from 'ethers';
import { useState } from 'react';
import { KII_CHAIN_PARAMS } from '../common/constants';
import { UseEVMWalletProps, UseEVMWalletReturn } from '../common/types';

export const useEVMWallet = ({
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
}: UseEVMWalletProps): UseEVMWalletReturn => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');

  const connectEVMWallet = async () => {
    if (window?.ethereum) {
      try {
        const accounts: string[] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [KII_CHAIN_PARAMS],
        });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        setWalletAddress(accounts[0]);

        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(contractInstance);

        console.log('Wallet connected and contract instance set up!');
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    }
  };

  return { connectEVMWallet, contract, provider, signer, walletAddress };
};
