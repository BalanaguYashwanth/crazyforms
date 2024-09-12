import { KII_CHAIN_CONTRACT_ADDRESS } from "../../../../common/config";
import { useEVMWallet } from "../../../../hooks/useEvmWallet";
import KIICHAIN_CONTRACT_ABI from '../../../../chains/EVM/KiiChain/common/abi.json'
import CustomKiiEscrowForm from "../CustomKiiEscrowForm/CustomKiiEscrowForm";

const CustomEvmWrapper = () => {

    const { connectEVMWallet, contract, provider, signer, walletAddress } = useEVMWallet({ CONTRACT_ADDRESS: KII_CHAIN_CONTRACT_ADDRESS, CONTRACT_ABI: KIICHAIN_CONTRACT_ABI.abi });

    return (
        <main>
            {walletAddress ? <p>connected -  {walletAddress}</p> : <button onClick={connectEVMWallet}>Connect Wallet</button>}
            <CustomKiiEscrowForm
                contract={contract}
                provider={provider}
                signer={signer}
                walletAddress={walletAddress}
            />
        </main>
    )
}

export default CustomEvmWrapper;