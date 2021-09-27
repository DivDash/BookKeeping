import { Model } from 'mongoose';
import { AccountsDocument } from 'src/schemas/accounts.schema';
import { JournalEntriesDocument } from 'src/schemas/journal_entries.schema';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsService {
    private JournalEntriesModel;
    private AccountsModel;
    constructor(JournalEntriesModel: Model<JournalEntriesDocument>, AccountsModel: Model<AccountsDocument>);
    createAccountService(name: string, Bank: string, Balance: number, Remarks: string): Promise<void>;
    viewAccount(): Promise<AccountsDocument[]>;
    deleteAccount(data: any): Promise<any>;
    updateAccounts(data: any): Promise<JournalEntriesDocument[]>;
    create(createAccountDto: CreateAccountDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAccountDto: UpdateAccountDto): string;
    remove(id: number): string;
}
