import { useState } from "react";
import { useEVMWallet } from "../../../../hooks/useEvmWallet";

import { CHAINS } from "../../../../common/constants";
import useEvmConfigWallet from "../../../../hooks/useEvmConfigWallet";
import CustomEvmEscrowForm from "../CustomEvmEscrowForm/CustomEvmEscrowForm";

const CustomEvmWrapper = () => {
    const [selectedWallet, setSelectedWallet] = useState(CHAINS.BASE);
    const { CHAIN_CONFIG_PARAMS, CONTRACT_ADDRESS, CONTRACT_ABI  } = useEvmConfigWallet({type: selectedWallet})
    const { connectEVMWallet, contract, walletAddress } = useEVMWallet({ CHAIN_CONFIG_PARAMS, CONTRACT_ADDRESS, CONTRACT_ABI });

    return (
        <main>
            <select onChange={(e)=>setSelectedWallet(e.target.value)}>
                <option value={''}> Select EVM Chain</option>
                <option value={CHAINS.BASE}> BASE </option>
                <option value={CHAINS.KIICHAIN}> KIICHAIN </option>
            </select>
            <br/>
            {walletAddress ? <p>connected -  {walletAddress}</p> : <button onClick={connectEVMWallet}>Connect Wallet</button>}
            <CustomEvmEscrowForm
                chainType={selectedWallet}
                contract={contract}
                contractAddress={CONTRACT_ADDRESS}
                walletAddress={walletAddress}
            />
        </main>
    )
}

export default CustomEvmWrapper;