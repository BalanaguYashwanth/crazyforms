import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createSuiEscrow } from "../../../../chains/NonEVM/SUI/FormsEscrow";
import { FormBuilderContext } from "../../../../common/centralizeStore/FormBuilderContext/FormBuilderContext";
import { updateForms } from "../../../../common/api.service";
import { ObjectProps } from "../../../../common/types";
import { CHAINS } from "../../../../common/constants";
import { SUI_CONTRACT_ADDRESS } from "../../../../common/config";

const CustomSuiEscrowForm = ({ selectedWallet, accounts }: any) => {
    const { formId, formTitle } = useContext(FormBuilderContext) as unknown as ObjectProps;
    const [escrowId, setEscrowId] = useState('');
    const [form, setForm] = useState({ budget: 0, cpr: 0, coinAddress: "" });

    const getCampaignObjectAddress = (txArray: any[]) => {
        for (let i = 0; i < txArray.length; i++) {
            if (txArray[i]?.owner?.Shared) {
                return txArray[i]?.reference.objectId;
            }
        }
    }

    const handleSubmit = async () => {
        try {
            const escrowParams = {
                budget: form.budget * Math.pow(10, 9),
                formId: formId.toString(),
                formTitle,
                costPerResponse: form.cpr * Math.pow(10, 9),
                coinAddress: form.coinAddress,
                address: accounts[0].address,
                contractAddress: SUI_CONTRACT_ADDRESS,
            };
            const tx = await createSuiEscrow(selectedWallet, escrowParams);
            const escrowId = getCampaignObjectAddress(tx.effects?.created)
            setEscrowId(escrowId)
            await updateForms({ id: formId, type: CHAINS.SUI, escrowId, contractAddress: SUI_CONTRACT_ADDRESS })
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
                <p>Coin address</p>
                <input onChange={e => setForm({ ...form, coinAddress: e.target.value })} />
                <br />
            </form>
            <button className="submit-button" onClick={handleSubmit}>Create Escrow</button>
            {escrowId && <p className="m16">Escrow Tx Id - {escrowId} </p>}
        </main>
    )
}

export default CustomSuiEscrowForm;