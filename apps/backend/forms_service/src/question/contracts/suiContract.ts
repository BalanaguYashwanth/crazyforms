import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';

const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

export class SUIContract {
  keyPair: Ed25519Keypair;
  constructor() {
    this.keyPair = Ed25519Keypair.deriveKeypair(process.env.OWNER_MNEMONIC_KEY);
  }

  reward = async ({
    escrowId,
    receiverAddress,
  }: {
    escrowId: string;
    receiverAddress: string;
  }) => {
    try {
      const epochTimeSec = Math.floor(Date.now() / 1000);
      const txb = new TransactionBlock();
      txb.moveCall({
        arguments: [
          txb.pure.u64(epochTimeSec),
          txb.object(escrowId),
          txb.pure.address(receiverAddress),
        ],
        target: `${process.env.PACKAGE_ID}::forms_escrow::reward`,
      });

      const txResponse = await suiClient.signAndExecuteTransactionBlock({
        transactionBlock: txb,
        signer: this.keyPair,
        requestType: 'WaitForLocalExecution',
        options: {
          showEffects: true,
        },
      });
      await txResponse;
    } catch (error) {
      console.log('updateClickCount error====>', error);
      throw error;
    }
  };
}
