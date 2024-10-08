import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import idl from '../../../../chains/NonEVM/Solana/common/sol_forms.json';
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { Program, BN, web3 } from "@coral-xyz/anchor";
import { FormBuilderContext } from "../../../../common/centralizeStore/FormBuilderContext/FormBuilderContext";
import { ObjectProps } from "../../../../common/types";
import * as anchor from "@coral-xyz/anchor";

import { SolFormsEscrow } from "../../../../chains/NonEVM/Solana/common/solFormEscrow";
import { updateForms } from "../../../../common/api.service";
import { CHAINS } from "../../../../common/constants";
import { shortAddress } from "../../../../common/helper";

window.Buffer = Buffer;
const idl_string = JSON.stringify(idl)
const idl_object = JSON.parse(idl_string)

const CustomSolanaEscrowForm = ({ accounts }: any) => {
    const connection = new Connection(clusterApiUrl('devnet'), anchor.AnchorProvider.defaultOptions());
    const provider = new anchor.AnchorProvider(connection, window?.solana, {
        preflightCommitment: 'processed'
    });
    const program = new Program<SolFormsEscrow>(idl_object, provider);
    const { formId, formTitle } = useContext(FormBuilderContext) as unknown as ObjectProps;
    const [form, setForm] = useState({ budget: 0.01, cpr: 0.001, coinAddress: "" });

    const handleSubmit = async () => {
        try {
            const formPublicKey = web3.Keypair.generate();

            const tx = await program.methods.createEntry(
                new BN(Number(form.budget) * web3.LAMPORTS_PER_SOL),
                new BN(Number(form.budget) * Math.pow(10, 9)),
                new BN(Number(form.cpr) * Math.pow(10, 9)),
                new BN(formId),
                formTitle,
                shortAddress(5, accounts[0].address.toString()),
            )
            .accounts({
                formEntry: formPublicKey.publicKey,
                owner: program.provider.publicKey,
            })
            .signers([formPublicKey])
            .rpc()
            await updateForms({ id: formId, type: CHAINS.SOLANA, escrowId: formPublicKey.publicKey.toString(), contractAddress: idl_object?.address, transaction: tx })
            toast.success('success')
        } catch (err) {
            console.error("Error creating entry:", err);
            toast.error("Failed to create escrow entry. See console for details.");
        }
    };

    return (
        <main>
            <Toaster />

            <>
                <form className="form">
                    <p>Add Budget</p>
                    <input
                        type="number"
                        value={form.budget}
                        onChange={e => setForm({ ...form, budget: Number(e.target.value) })}
                    />
                    <p>Cost per Response (CPR)</p>
                    <input
                        type="number"
                        value={form.cpr}
                        onChange={e => setForm({ ...form, cpr: Number(e.target.value) })}
                    />
                    <br />
                </form>
                <button className="submit-button" onClick={handleSubmit}>Create Escrow</button>
            </>
        </main>
    );
};

export default CustomSolanaEscrowForm;
