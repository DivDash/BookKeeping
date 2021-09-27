import { ProfitsDocument } from '../../schemas/profits.schema';
import { Model } from 'mongoose';
export declare class ProfitsService {
    private ProfitsModel;
    constructor(ProfitsModel: Model<ProfitsDocument>);
    createProfitProject(body: any): Promise<ProfitsDocument>;
    getProfitProject(): Promise<ProfitsDocument[]>;
    deleteProject(data: any): Promise<any>;
    update_profit_accounts(data: any): Promise<void>;
    validateProfitProject(data: any): Promise<ProfitsDocument[]>;
}
