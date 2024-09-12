import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { KII_CHAIN_CONTRACT_ADDRESS } from "../../../../common/config";
import { ObjectProps } from "../../../../common/types";
import { FormBuilderContext } from "../../../../common/centralizeStore/FormBuilderContext/FormBuilderContext";
import { updateForms } from "../../../../common/api.service";
import { CHAINS } from "../../../../common/constants";
import { KiiFormsEscrowRespository } from "../../../../chains/EVM/KiiChain/Infrastructure/KiiFormsEscrowRespository";
import { generateRandomAddress } from "../../../../common/helper";

const CustomKiiEscrowForm = ({ contract, walletAddress }: any) => {
    const { formId, formTitle } = useContext(FormBuilderContext) as unknown as ObjectProps;
    const [escrowId, setEscrowId] = useState('');
    const [form, setForm] = useState({ budget: 0, cpr: 0, coinAddress: "" });

    const handleSubmit = async () => {
        if (!walletAddress) {
            toast.error('Please connect to your wallet address')
            return;
        }
        if (!formTitle && !formId) {
            toast.error('Step1 - Please fill form and save it')
            return;
        }
        const escrowId = generateRandomAddress();
        try {
            const escrowParams = {
                budget: form.budget,
                formId: formId.toString(),
                name: formTitle,
                cpr: form.cpr,
                endDate: 3223,
                startDate: 222,
                funds_to_distribute: form.budget,
                creator: walletAddress,
                contractAddress: KII_CHAIN_CONTRACT_ADDRESS,
                escrowId,
            };
            const escrowRef = new KiiFormsEscrowRespository(contract);
            await escrowRef.create(escrowParams);
            await updateForms({ id: formId, type: CHAINS.KIICHAIN, escrowId, contractAddress: KII_CHAIN_CONTRACT_ADDRESS })
            setEscrowId(escrowId)
            toast.success('success')
        } catch (err) {
            if (err instanceof Error)
                toast.success(`error occured ${err?.message}`)
        }
    };

    return (
        <main>
            <Toaster />
            <form className="form">
                <p>Add budget</p>
                <input onChange={e => setForm({ ...form, budget: Number(e.target.value) })} />
                <p>Cost per response</p>
                <input onChange={e => setForm({ ...form, cpr: Number(e.target.value) })} />
                <br />
            </form>
            <button className="submit-button" onClick={handleSubmit}>Create Escrow</button>
            {escrowId && <p className="m16">Escrow Tx Id - {escrowId} </p>}
        </main>
    )
}

export default CustomKiiEscrowForm;