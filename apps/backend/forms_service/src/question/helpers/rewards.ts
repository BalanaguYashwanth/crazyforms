import { CHAINS } from '../constants';
import { KiiChainContract } from '../contracts/KiiChain/kiiChainContract';
import { SolanaContract } from '../contracts/Solana/SolanaContract';
import { SUIContract } from '../contracts/suiContract';

export const triggerRewards = async ({
  escrowId,
  receiverAddress,
  chainType,
}) => {
  try {
    if (chainType === CHAINS.SUI) {
      const suiContract = new SUIContract();
      await suiContract.reward({ escrowId, receiverAddress });
    } else if (chainType == CHAINS.KIICHAIN) {
      const kiiContract = new KiiChainContract();
      await kiiContract.reward({ escrowId, receiverAddress });
    } else if (chainType == CHAINS.SOLANA) {
      const solanaContract = new SolanaContract();
      await solanaContract.reward({ escrowId, receiverAddress });
    }
  } catch (error) {
    throw new Error(error);
  }
};
