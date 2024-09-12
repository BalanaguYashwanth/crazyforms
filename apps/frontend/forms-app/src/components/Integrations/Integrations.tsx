import CustomNonEvmWrapper from "../Chains/NonEvm/CustomNonEvmWrapper/CustomNonEvmWrapper";
import CustomEvmWrapper from "../Chains/Evm/CustomEvmWrapper/CustomEvmWrapper";
import './Integrations.scss'

const Integrations = () => {
  return (
    <div className="integrations-container">
      <table>
        <thead>
          <tr>
            <th>EVM</th>
            <th>Non EVM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <CustomEvmWrapper />
            </td>
            <td>
                <CustomNonEvmWrapper />
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};

export default Integrations;
