import {
    InputTransactionData,
  } from "@aptos-labs/wallet-adapter-react";
import { APTOS_CONTRACT_ADDRESS } from "../../../common/config";

export const createAptosEscrow = async (signAndSubmitTransaction: any, params: any) => {

  const transaction:InputTransactionData = {
    data: {
      function:`${APTOS_CONTRACT_ADDRESS}::escrow::create`,
      functionArguments:[
        params.budget,
        params.formId,
        params.costPerResponse,
        params.formTitle,
        0
      ]
    }
  }

  const result = await signAndSubmitTransaction(transaction);
  return result;
};