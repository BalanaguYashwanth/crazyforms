import { ethers } from 'ethers';
import { KII_CHAIN_RPC_CONFIG, KII_CHAIN_RPC_URL } from '../../constants';
import * as contractAbi from './abi.json';

export class KiiChainContract {
  private provider: ethers.JsonRpcProvider;
  private contract;
  private wallet;
  private signer: ethers.Wallet;
  private CONTRACT_ADDRESS;
  private CONTRACT_ABI;
  private WALLET_MNEMONIC;

  constructor() {
    this.CONTRACT_ADDRESS = process.env.KII_PACKAGE_ID;
    this.CONTRACT_ABI = contractAbi.abi;
    this.WALLET_MNEMONIC = process.env.KII_OWNER_MNEMONIC_KEY;
    this.provider = this.getProvider();
    this.wallet = ethers.Wallet.fromPhrase(this.WALLET_MNEMONIC!);
    this.signer = this.wallet.connect(this.provider);
    this.contract = new ethers.BaseContract(
      this.CONTRACT_ADDRESS,
      this.CONTRACT_ABI,
      this.signer,
    );
  }

  getProvider(): ethers.JsonRpcProvider {
    const provider = new ethers.JsonRpcProvider(
      KII_CHAIN_RPC_URL,
      KII_CHAIN_RPC_CONFIG,
    );
    return provider;
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
