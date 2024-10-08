import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
  clusterApiUrl,
} from '@solana/web3.js';
import idl from './idl.json';
import * as anchor from '@coral-xyz/anchor';

class NodeWallet {
  constructor(readonly payer) {}

  get publicKey() {
    return this.payer.publicKey;
  }

  async signTransaction(tx) {
    tx.partialSign(this.payer);
    return tx;
  }

  async signAllTransactions(txs) {
    return txs.map((tx) => {
      tx.partialSign(this.payer);
      return tx;
    });
  }
}

export class SolanaContract {
  private connection;

  constructor() {
    this.connection = new Connection(
      clusterApiUrl('devnet'),
      anchor.AnchorProvider.defaultOptions(),
    );
  }

  async getKeypairFromMnemonic() {
    const firstWinPrivKey = process.env.SOLANA_OWNER_PRIVATE_KEY.slice(
      0,
      32,
    ) as unknown as Array<any>;

    const firstWinWallet = Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));
    return firstWinWallet;
  }

  async reward({ escrowId, receiverAddress }) {
    try {
      const formEntryPublicKey = new PublicKey(escrowId);
      const userAddress = new PublicKey(receiverAddress);
      const onwerKeypair = await this.getKeypairFromMnemonic();

      const wallet = new NodeWallet(onwerKeypair);

      const provider = new anchor.AnchorProvider(this.connection, wallet, {
        preflightCommitment: 'processed',
      });

      const program = new anchor.Program(idl as any, provider) as any;

      const keypair = anchor.web3.Keypair.generate();
      const feePayer = onwerKeypair;
      const rewardTx = await program.methods
        .reward(new anchor.BN(0.001 * LAMPORTS_PER_SOL))
        .accounts({
          formEntry: formEntryPublicKey,
          owner: keypair.publicKey,
          user: userAddress,
        })
        .signers([keypair])
        .transaction();

      rewardTx.feePayer = feePayer.publicKey;

      const { blockhash } = await provider.connection.getLatestBlockhash();
      rewardTx.recentBlockhash = blockhash;

      rewardTx.partialSign(feePayer, keypair);

      const txSignature = await provider.connection.sendRawTransaction(
        rewardTx.serialize(),
        { skipPreflight: false },
      );

      console.log('Reward transaction signature:', txSignature);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  }
}
