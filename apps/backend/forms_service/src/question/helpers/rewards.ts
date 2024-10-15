import KII_CHAIN_ABI from '../contracts/EvmChain/kiichain.abi.json';
import BASE_CHAIN_ABI from '../contracts/EvmChain/base.abi.json';
import { CHAINS, EVM_CHAIN_RPC_CONFIG, EVM_CHAIN_RPC } from '../constants';
import { EvmChainContract } from '../contracts/EvmChain/EvmChainContract';
import { SolanaContract } from '../contracts/Solana/SolanaContract';
import { SUIContract } from '../contracts/suiContract';
import { AptosContract } from '../contracts/aptosContract';

export const triggerRewards = async ({
  escrowId,
  receiverAddress,
  chainType,
  formId,
}) => {
  try {
    if (chainType === CHAINS.SUI) {
      const suiContract = new SUIContract();
      await suiContract.reward({ escrowId, receiverAddress });
    } else if (chainType == CHAINS.KIICHAIN) {
      const params = {
        CONTRACT_ABI: KII_CHAIN_ABI.abi,
        CONTRACT_ADDRESS: process.env.KII_PACKAGE_ID,
        CHAIN_RPC_URL: EVM_CHAIN_RPC.KIICHAIN,
        CHAIN_RPC_CONFIG: EVM_CHAIN_RPC_CONFIG.KIICHAIN,
        WALLET_MNEMONIC: process.env.EVM_OWNER_MNEMONIC_KEY,
      };
      const kiiContract = new EvmChainContract(params);
      await kiiContract.reward({ escrowId, receiverAddress });
    } else if (chainType == CHAINS.BASE) {
      const params = {
        CONTRACT_ABI: BASE_CHAIN_ABI.abi,
        CONTRACT_ADDRESS: process.env.BASE_PACKAGE_ID,
        CHAIN_RPC_URL: EVM_CHAIN_RPC.BASE,
        CHAIN_RPC_CONFIG: EVM_CHAIN_RPC_CONFIG.BASE,
        WALLET_MNEMONIC: process.env.EVM_OWNER_MNEMONIC_KEY,
      };
      const baseContract = new EvmChainContract(params);
      await baseContract.reward({ escrowId, receiverAddress });
    } else if (chainType == CHAINS.SOLANA) {
      const solanaContract = new SolanaContract();
      await solanaContract.reward({ escrowId, receiverAddress });
    } else if (chainType == CHAINS.APTOS) {
      const aptosContract = new AptosContract();
      aptosContract.reward({ escrowId, formId, receiverAddress });
    }
  } catch (error) {
    throw new Error(error);
  }
};
