import { useNonEvmWallet } from "../../../../hooks/useNonEvmWallet";
import CustomSuiEscrowForm from "../CustomSuiEscrowForm/CustomSuiEscrowForm";

const CustomNonEvmWrapper = () => {
    const { wallets, selectedWallet, accounts, connectWallet } = useNonEvmWallet();

    return (
        <main>
             <select onChange={(e) => connectWallet(wallets[+e.target.value])}>
                {wallets.map((wallet: { name: string }, index) => (
                  <option key={index} value={index}>
                    {wallet.name}
                  </option>
                ))}
              </select>
            <CustomSuiEscrowForm selectedWallet={selectedWallet} accounts={accounts}  />
        </main>
    )
}

export default CustomNonEvmWrapper;