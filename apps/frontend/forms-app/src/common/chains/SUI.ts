import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { TransactionBlock } from "@mysten/sui.js/transactions";

const SUI = ({budget, formId, costPerResponse, coinAddress, endDate = '12345', name = 'test', status = 1}: any) => {
    const account = useCurrentAccount();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();
    
    const createEscrow = () => {

        const txb = new TransactionBlock();
            txb.moveCall({
                arguments: [
                    txb.pure.u64(budget),
                    txb.pure.string(formId),
                    txb.pure.u64(costPerResponse),
                    txb.object(coinAddress),
                    txb.pure.u64(endDate),
                    txb.pure.string(name),
                    txb.pure.u64(status),
                    txb.pure.address(account?.address),
                ],
                target: `${'0xa93c09ef153ecfb7353c7a2e3059f769711a04fc63f8cbc64d23dccab1bacf1a'}::forms_escrow::create`,
            });

            signAndExecute(
                {
                    transactionBlock: txb,
                    options: {
                        showEffects: true,
                    },
                },
                {
                    onSuccess: (tx: any) => {
                       console.log('tx--->', tx)
                    },
                    onError: (error: { message: string; }) => {
                        console.log('error--->', error.message)
                    }
            })
    }
    return {
        createEscrow,
        
    }
}

export default SUI