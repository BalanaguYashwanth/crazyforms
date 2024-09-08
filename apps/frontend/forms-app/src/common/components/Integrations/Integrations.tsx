import { useEffect, useState } from 'react';
import { getWallets } from '@wallet-standard/app';
import { IntegrationsProps, ObjectProps } from '../../types';
import { shortAddress } from '../../helper';
// import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
// import { TransactionBlock } from "@mysten/sui.js/transactions";
import './Integrations.scss'
import { TransactionBlock } from '@mysten/sui.js/transactions';
// import SUI from '../../chains/SUI';

const Integrations = () => {

  const [multiChainWallets, setMultiChainWallets] = useState<any>();
  const [selectedWallet, setSelectedWallet] = useState<IntegrationsProps>();
  const [accounts, setAccounts] = useState<ObjectProps[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [amount, setAmount] = useState('0');

  useEffect(() => {
    const initializeWallets = async () => {
      const walletApi = getWallets();  // Initialize Wallet Standard API
      const availableWallets = walletApi.get();
      setMultiChainWallets(availableWallets);
    };
    initializeWallets();
  }, []);


  const connectWallet = async () => {
    if (!selectedWallet) return;
    try {
      if (selectedWallet.disconnect) {
        selectedWallet.disconnect();
      }
      console.log('selectedWallet.features--->', selectedWallet.features)
      selectedWallet.features["standard:connect"].connect().then(() => {
        setAccounts(selectedWallet.accounts)
      })
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const handleAddress = (text: string) => {
    setSelectedAddress(text)
  }
  // const account = useCurrentAccount();
  // const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const createEscrow = async ({ budget, formId, costPerResponse, coinAddress, endDate = '12345', name = 'test', status = 1 }: any) => {
    // const signAndExecute = await selectedWallet.features["sui:signAndExecuteTransactionBlock"].signAndExecuteTransactionBlock()
    // console.log('---->', signAndExecute)

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
        txb.pure.address('0xcf927346c3b6d1d26586d6ab9508710dc0b7656ebe19ff8d56be4b5d8bcbbc59'),
      ],
      target: `${'0xa93c09ef153ecfb7353c7a2e3059f769711a04fc63f8cbc64d23dccab1bacf1a'}::forms_escrow::create`,
    });

    const output = await selectedWallet.features["sui:signAndExecuteTransactionBlock"].signAndExecuteTransactionBlock({
      transactionBlock: txb,
      // account: this.state.account.value,
      options: {
        showEffects: true,
      },
      // requestType
    })

    console.log('----->', output)

    //     signAndExecute(
    //         {
    //             transactionBlock: txb,
    //             options: {
    //                 showEffects: true,
    //             },
    //         },
    //         {
    //             onSuccess: (tx: any) => {
    //                console.log('tx--->', tx)
    //             },
    //             onError: (error: { message: string; }) => {
    //                 console.log('error--->', error.message)
    //             }
    //     })
  }

  const handleSubmit = () => {
    // console.log('-handleSubmit--->', selectedWallet.features["sui:signAndExecuteTransactionBlock"]);
    //   const { mutate: signAndExecute } = selectedWallet.features["sui:signAndExecuteTransactionBlock"].signAndExecuteTransactionBlock()
    //   const txb = new TransactionBlock();
    //   txb.moveCall({
    //       arguments: [
    //           txb.pure.u64(budget),
    //           txb.pure.string(formId),
    //           txb.pure.u64(costPerResponse),
    //           txb.object(coinAddress),
    //           txb.pure.u64(endDate),
    //           txb.pure.string(name),
    //           txb.pure.u64(status),
    //           txb.pure.address(account?.address),
    //       ],
    //       target: `${'0xa93c09ef153ecfb7353c7a2e3059f769711a04fc63f8cbc64d23dccab1bacf1a'}::forms_escrow::create`,
    //   });
    //   signAndExecute(
    //     {
    //         transactionBlock: txb,
    //         options: {
    //             showEffects: true,
    //         },
    //     },
    //     {
    //         onSuccess: (tx: any) => {
    //            console.log('tx--->', tx)
    //         },
    //         onError: (error: { message: string; }) => {
    //             console.log('error--->', error.message)
    //         }
    // })
    createEscrow({
      budget: "100000000",
      formId: '2',
      costPerResponse: '1000000000',
      coinAddress: '0x16abeda3e728f213bbfea06f4a70d1b2be48ec1ef105be4d5bdda6ac1ab71d36',
    })
    console.log('amount--->', amount)
  }

  return (
    <main className='integrations-container'>
      <p>Connect to Wallet</p>
      <select onChange={(e) => {
        setSelectedWallet(multiChainWallets && multiChainWallets[e.target.value as never])
      }
      }>
        {multiChainWallets?.length && multiChainWallets?.map((wallet: ObjectProps, index: number) => (
          <option key={wallet.name} value={index}>
            {wallet.name} - {Array.isArray(wallet.chains) ? wallet.chains.join(', ') : wallet.chains}
          </option>
        ))}
      </select>
      <button onClick={connectWallet}>Connect Wallet</button>
      {accounts?.length > 0 && (
        <article>
          <p>Address </p>
          <select onChange={(e) => handleAddress(e.target.value)}>
            {
              accounts.map((account, index) => (
                <option value={account?.address} key={`accounts-${index}`}>
                  {shortAddress(5, account?.address)}
                </option>
              ))
            }
          </select>
        </article>
      )}
      <article>
        {selectedAddress && <p>Selected address - {selectedAddress ? <p> {shortAddress(5, selectedAddress)} </p> : 'NA'}</p>}
      </article>

      <article>
        <p>Add amount</p>
        <input onChange={e => setAmount(parseFloat(e.target.value) as unknown as string)} />
        <p>Cost per response</p>
        <input onChange={e => setAmount(parseFloat(e.target.value) as unknown as string)} />
        <p>Coin address</p>
        <input onChange={e => setAmount(parseFloat(e.target.value) as unknown as string)} />
        <br />
        <button onClick={handleSubmit}>submit</button>
      </article>
      <p>Side Note - As of now its supports only SUI</p>
    </main>
  );
};

export default Integrations;
