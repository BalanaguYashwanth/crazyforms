import {
  Account,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  Network,
} from '@aptos-labs/ts-sdk';

const config = new AptosConfig({ network: Network.MAINNET });
const aptos = new Aptos(config);

export class AptosContract {
  keyPair;
  constructor() {
    const privateKey = new Ed25519PrivateKey(process.env.APTOS_PRIVATE_KEY);
    this.keyPair = Account.fromPrivateKey({
      privateKey,
    });
  }

  reward = async ({
    formId,
    escrowId,
    receiverAddress,
  }: {
    formId: string;
    escrowId: string;
    receiverAddress: string;
  }) => {
    if (!receiverAddress) {
      return;
    }
    const escrowAddrString = escrowId.toString();
    const formIdString = formId.toString();
    const receiverAddrString = receiverAddress.toString();
    try {
      const transaction = await aptos.transaction.build.simple({
        sender: this.keyPair.accountAddress,
        withFeePayer: true,
        data: {
          // All transactions on Aptos are implemented via smart contracts.
          function: `${process.env.APTOS_PACKAGE_ID}::escrow::reward`,
          functionArguments: [
            escrowAddrString,
            formIdString,
            receiverAddrString,
          ],
        },
      });

      const senderAuthTx = await aptos.transaction.sign({
        signer: this.keyPair,
        transaction,
      });

      const feePayerAuth = aptos.transaction.signAsFeePayer({
        signer: this.keyPair,
        transaction,
      });

      const committedTransaction = await aptos.transaction.submit.simple({
        transaction,
        senderAuthenticator: senderAuthTx,
        feePayerAuthenticator: feePayerAuth,
      });

      const executedTransaction = await aptos.waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      console.log('Reward transaction', executedTransaction);
    } catch (error) {
      console.log('Reward error====>', error);
      throw error;
    }
  };
}
