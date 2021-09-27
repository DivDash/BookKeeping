import { UpdateJournalEntryDto } from './dto/update-journal-entry.dto';
import { JournalEntriesDocument } from '../../schemas/journal_entries.schema';
import { Model } from 'mongoose';
import { AccountsService } from '../accounts/accounts.service';
import { ProfitsService } from '../profits/profits.service';
import { ProfitsDocument } from 'src/schemas/profits.schema';
import { AccountsDocument } from 'src/schemas/accounts.schema';
export declare class JournalEntriesService {
    private JournalEntriesModel;
    private ProfitsModel;
    private AccountsModel;
    private readonly profitsService;
    private readonly accountsService;
    constructor(JournalEntriesModel: Model<JournalEntriesDocument>, ProfitsModel: Model<ProfitsDocument>, AccountsModel: Model<AccountsDocument>, profitsService: ProfitsService, accountsService: AccountsService);
    validateProfitProject(data: any): Promise<ProfitsDocument[]>;
    validateProject(data: any): Promise<ProfitsDocument[]>;
    validateAccount(data: any): Promise<AccountsDocument>;
    updateProfitProject(data: any, exp: any): Promise<void>;
    updateClientProfitProject(data: any, rec: any, rev: any): Promise<void>;
    updateAccount(data: any, bal: any): Promise<void>;
    createJournalEntries(data: any): Promise<JournalEntriesDocument[]>;
    getJournalEntries(data: any): Promise<JournalEntriesDocument[]>;
    updateReceiverAccount(data: any): Promise<void>;
    deleteEntry(object: any): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
    update_journal_accounts(data: any): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateJournalEntryDto: UpdateJournalEntryDto): string;
    remove(id: number): string;
}
