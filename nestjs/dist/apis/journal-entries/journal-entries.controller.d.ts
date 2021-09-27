import { JournalEntriesService } from './journal-entries.service';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { UpdateJournalEntryDto } from './dto/update-journal-entry.dto';
export declare class JournalEntriesController {
    private readonly journalEntriesService;
    constructor(journalEntriesService: JournalEntriesService);
    createJournalEntries(body: CreateJournalEntryDto): Promise<{
        message: string;
    }>;
    getJournalEntries(body: CreateJournalEntryDto): Promise<"error" | {
        message: string;
        getEntries?: undefined;
    } | {
        message: string;
        getEntries: import("../../schemas/journal_entries.schema").JournalEntriesDocument[];
    }>;
    getJournalEntriesParams(project: string): Promise<"error" | {
        getEntries: import("../../schemas/journal_entries.schema").JournalEntriesDocument[];
        projectExist: import("../../schemas/profits.schema").ProfitsDocument[];
    } | {
        message: string;
    }>;
    deleteJournalEntry(body: CreateJournalEntryDto): Promise<"there is error" | {
        message: string;
    }>;
    updateJournalEntries(body: CreateJournalEntryDto): Promise<"there is error" | {
        message: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateJournalEntryDto: UpdateJournalEntryDto): string;
    remove(id: string): string;
}
