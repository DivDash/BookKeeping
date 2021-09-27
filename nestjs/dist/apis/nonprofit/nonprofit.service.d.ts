import { NonProfitDocument } from '../../schemas/nonprofit.schema';
import { Model } from 'mongoose';
import { AccountsDocument } from 'src/schemas/accounts.schema';
export declare class NonprofitService {
    private NonProfitModel;
    private AccountsModel;
    constructor(NonProfitModel: Model<NonProfitDocument>, AccountsModel: Model<AccountsDocument>);
    createAccountService(Name: any, Expense: any, Remarks: any, Reason: any, idClient: any): Promise<void>;
    viewAccount(): Promise<NonProfitDocument[]>;
    deleteAccountService(Name: any, Expense: any, Remarks: any, idClient: any, Reason: any): Promise<void>;
    update_nonprofit_accounts(data: any): Promise<void>;
}
