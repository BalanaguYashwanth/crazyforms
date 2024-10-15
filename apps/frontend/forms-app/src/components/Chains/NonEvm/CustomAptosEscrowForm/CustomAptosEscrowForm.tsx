import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { FormBuilderContext } from "../../../../common/centralizeStore/FormBuilderContext/FormBuilderContext";
import { updateForms } from "../../../../common/api.service";
import { ObjectProps } from "../../../../common/types";
import { CHAINS } from "../../../../common/constants";
import { APTOS_CONTRACT_ADDRESS } from "../../../../common/config";
import { createAptosEscrow } from "../../../../chains/NonEVM/Aptos/AptosFormEscrow";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const CustomAptosEscrowForm = () => {
    const { account, signAndSubmitTransaction } = useWallet();
    const { formId, formTitle } = useContext(FormBuilderContext) as unknown as ObjectProps;
    const [transaction, setTransaction] = useState('');
    const [form, setForm] = useState({ budget: 0, cpr: 0 });

    const handleSubmit = async () => {
        try {
            const escrowParams = {
                budget: form.budget * Math.pow(10, 8),
                formId: formId.toString(),
                formTitle,
                costPerResponse: form.cpr * Math.pow(10, 8),
                address: account?.address,
                contractAddress: APTOS_CONTRACT_ADDRESS,
            };
            const tx = await createAptosEscrow(signAndSubmitTransaction, escrowParams);
            setTransaction(tx?.hash)
            await updateForms({ id: formId, type: CHAINS.APTOS, escrowId: account?.address, contractAddress: APTOS_CONTRACT_ADDRESS })
            toast.success('success')
        } catch (err) {
            if (err instanceof Error)
                toast.error(`error occured ${err?.message}`)
        }
    };

    return (
        <main>
            <Toaster />
            <WalletSelector />
            <form className="form">
                <p>Add budget</p>
                <input onChange={e => setForm({ ...form, budget: Number(e.target.value) })} />
                <p>Cost per response</p>
                <input onChange={e => setForm({ ...form, cpr: Number(e.target.value) })} />
                <br />
            </form>
            <button className="submit-button" onClick={handleSubmit}>Create Escrow</button>
            {transaction && <p className="m16"> Tx Id - {transaction} </p>}
        </main>
    )
}

export default CustomAptosEscrowForm;