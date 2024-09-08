import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createSuiEscrow } from "../../contracts/sui/suiContract";
import { updateForms } from "../../api.service";
import { useWallet } from "../../hooks/useWallet";
import { IntegrationsProps } from "../../types";
import './Integrations.scss'

const Integrations = ({ formId, formTitle }: IntegrationsProps) => {
  const [form, setForm] = useState({ budget: 0, cpr: 0, coinAddress: "" });
  const { wallets, selectedWallet, accounts, connectWallet } = useWallet();

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
        contractAddress: '0xa93c09ef153ecfb7353c7a2e3059f769711a04fc63f8cbc64d23dccab1bacf1a',
      };
      const tx = await createSuiEscrow(selectedWallet, escrowParams);
      const escrowId = getCampaignObjectAddress(tx.effects?.created)
      await updateForms({ id: formId, escrowId })
      toast.success('success')
    } catch (err) {
      console.log('err---->', err)
      toast.success('error occured')
    }
  };

  return (
    <div className="integrations-container">
      <Toaster />
      <select onChange={(e) => connectWallet(wallets[+e.target.value])}>
        {wallets.map((wallet:{name: string}, index) => (
          <option key={index} value={index}>
            {wallet.name}
          </option>
        ))}
      </select>
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
    </div>
  );
};

export default Integrations;
