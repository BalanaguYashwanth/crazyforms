import { TransactionBlock } from '@mysten/sui.js/transactions';

export const createSuiEscrow = async (selectedWallet: string, params: any) => {
  const epochTimeSec = Math.floor(Date.now() / 1000);
  const txb = new TransactionBlock();
  txb.moveCall({
    arguments: [
      txb.pure.u64(params.budget),
      txb.pure.string(params.formId),
      txb.pure.u64(params.costPerResponse),
      txb.object(params.coinAddress),
      txb.pure.u64(epochTimeSec),
      txb.pure.string(params.formTitle),
      txb.pure.u64(params.status || 1),
      txb.pure.address(params.address),
    ],
    target: `${params.contractAddress}::forms_escrow::create`,
  });
  
  const result = await selectedWallet.features["sui:signAndExecuteTransactionBlock"]
    .signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: { showEffects: true },
    });
  
  return result;
};
