export class EvmFormsEscrow {
    constructor(
            public formId: string, 
            public budget:number, 
            public cost_per_response: number, 
            public funds_to_distribute: number,
            public start_date: number,
            public end_date: number,
            public name: string, 
            public creator: string
        ){}
}