import { ethers } from 'ethers';

export class EvmChainContract {
  private provider: ethers.JsonRpcProvider;
  private contract;
  private wallet;
  private signer: ethers.Wallet;
  private CONTRACT_ADDRESS;
  private CONTRACT_ABI;
  private WALLET_MNEMONIC;

  constructor({
    CONTRACT_ABI,
    CONTRACT_ADDRESS,
    CHAIN_RPC_URL,
    CHAIN_RPC_CONFIG,
    WALLET_MNEMONIC,
  }) {
    this.CONTRACT_ADDRESS = CONTRACT_ADDRESS;
    this.CONTRACT_ABI = CONTRACT_ABI;
    this.WALLET_MNEMONIC = WALLET_MNEMONIC;
    this.provider = this.getProvider({ CHAIN_RPC_URL, CHAIN_RPC_CONFIG });
    this.wallet = ethers.Wallet.fromPhrase(this.WALLET_MNEMONIC!);
    this.signer = this.wallet.connect(this.provider);
    this.contract = new ethers.BaseContract(
      this.CONTRACT_ADDRESS,
      this.CONTRACT_ABI,
      this.signer,
    );
  }

  getProvider({ CHAIN_RPC_URL, CHAIN_RPC_CONFIG }): ethers.JsonRpcProvider {
    try {
      const provider = new ethers.JsonRpcProvider(CHAIN_RPC_URL);
      return provider;
    } catch (err) {
      console.log('GetProvider error', err);
    }
  }

  async reward(props: { receiverAddress: string; escrowId: number }) {
    try {
      const tx = await this.contract.reward(
        props.receiverAddress,
        props.escrowId,
      );
      await tx.wait();
    } catch (err) {
      console.error('Error tx rewards', err);
    }
  }
}
