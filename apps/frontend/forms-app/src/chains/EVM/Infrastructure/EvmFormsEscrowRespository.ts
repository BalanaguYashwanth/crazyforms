import { ethers } from 'ethers';
import { ObjectProps } from '../../../common/types';

export class EvmFormsEscrowRespository {
    private contract: ethers.Contract;

    constructor(contract: ethers.Contract){
        this.contract = contract;
    }

    async create(props: ObjectProps) {
        try{
            const budgetWeiValue = ethers.parseEther((props.budget).toString())
            const cprWei =  ethers.parseEther((props.cpr).toString())
            const funds_to_distribute = ethers.parseEther((props.funds_to_distribute).toString());
            const tx = await this.contract.CreateEscrow(props.name, props.formId, cprWei, funds_to_distribute, props.endDate, props.startDate, props.creator, props.escrowId, {
                value: budgetWeiValue,
            })
            await tx.wait();
            console.log('Create escrow tx', tx);
        } catch (error){
            console.log('Error in creating escrow', error)
        }
    }

}