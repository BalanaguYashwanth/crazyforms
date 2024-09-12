import { ethers } from 'ethers';
import { KII_CHAIN_RPC_CONFIG, KII_CHAIN_RPC_URL } from '../../../../common/constants';

export class KiiFormsEscrowRespository {
    private contract: ethers.Contract;

    constructor(contract: ethers.Contract){
        this.contract = contract;
    }

    getProvider(): ethers.JsonRpcProvider {
        const url = KII_CHAIN_RPC_URL;
        const provider = new ethers.JsonRpcProvider(url, KII_CHAIN_RPC_CONFIG);
        return provider;
    }

    async create(props: any) {
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

    async reward(props: any){
        try{
            const tx = await this.contract.reward(props.receiverAddress, props.escrowId);
            await tx.wait();
            console.log('Rewards tx', tx)
        } catch(err){
            console.log('Error tx rewards', err)
        }
    }
}