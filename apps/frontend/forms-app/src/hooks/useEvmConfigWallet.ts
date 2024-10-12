import BASE_CONTRACT_ABI from '../chains/EVM/common/base.abi.json'
import KIICHAIN_CONTRACT_ABI from '../chains/EVM/common/kiichain.abi.json'
import { BASE_CHAIN_CONTRACT_ADDRESS, KII_CHAIN_CONTRACT_ADDRESS } from '../common/config';
import { BASE_CHAIN_PARAMS, CHAINS, KII_CHAIN_PARAMS } from "../common/constants";
import { useEvmConfigWalletOuputProps, useEvmConfigWalletProps } from "../common/types";

const useEvmConfigWallet = ({type}: useEvmConfigWalletProps): useEvmConfigWalletOuputProps => {
   if(type === CHAINS.BASE){
    return { CHAIN_CONFIG_PARAMS: BASE_CHAIN_PARAMS, CONTRACT_ADDRESS: BASE_CHAIN_CONTRACT_ADDRESS, CONTRACT_ABI: BASE_CONTRACT_ABI.abi,  }
   } else if(type === CHAINS.KIICHAIN){
    return { CHAIN_CONFIG_PARAMS: KII_CHAIN_PARAMS, CONTRACT_ADDRESS: KII_CHAIN_CONTRACT_ADDRESS, CONTRACT_ABI: KIICHAIN_CONTRACT_ABI.abi,  }
   } else {
    return { CHAIN_CONFIG_PARAMS: '', CONTRACT_ADDRESS: '', CONTRACT_ABI: ''}
   }
}

export default useEvmConfigWallet;