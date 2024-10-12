import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CustomKiiEscrowFormProps, ObjectProps } from "../../../../common/types";
import { updateForms } from "../../../../common/api.service";
import { FormBuilderContext } from "../../../../common/centralizeStore/FormBuilderContext/FormBuilderContext";
import { EvmFormsEscrowRespository } from "../../../../chains/EVM/Infrastructure/EvmFormsEscrowRespository";
import { generateRandomAddress } from "../../../../common/helper";

const CustomEvmEscrowForm = ({ chainType, contract, contractAddress ,walletAddress }: CustomKiiEscrowFormProps) => {
    const initalForm = { budget: 0, cpr: 0, coinAddress: "" }
    const { formId, formTitle } = useContext(FormBuilderContext) as unknown as ObjectProps;
    const [escrowId, setEscrowId] = useState('');
    const [form, setForm] = useState({...initalForm});

    const handleSubmit = async () => {
        toast.loading('Loading')
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
                contractAddress,
                escrowId,
            };
            const escrowRef = new EvmFormsEscrowRespository(contract);
            await escrowRef.create(escrowParams);
            await updateForms({ id: formId, type: chainType, escrowId, contractAddress })
            setEscrowId(escrowId)
            toast.dismiss();
            toast.success('success')
            setForm(initalForm)
        } catch (err) {
            toast.dismiss();
            if (err instanceof Error)
                toast.success(`error occured ${err?.message}`)
        }
    };

    return (
        <main>
            <Toaster />
            <form className="form">
                <p>Add budget</p>
                <input value={form.budget} onChange={e => setForm({ ...form, budget: Number(e.target.value) })} type="number"/>
                <p>Cost per response</p>
                <input value={form.cpr} onChange={e => setForm({ ...form, cpr: Number(e.target.value) })} type="number"/>
                <br />
            </form>
            <button className="submit-button" onClick={handleSubmit}>Create Escrow</button>
            {escrowId && <p className="m16">Escrow Tx Id - {escrowId} </p>}
        </main>
    )
}

export default CustomEvmEscrowForm;