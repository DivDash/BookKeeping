import { ProfitsService } from './profits.service';
import { CreateProfitDto } from './dto/create-profit.dto';
import { JournalEntriesService } from '../journal-entries/journal-entries.service';
export declare class ProfitsController {
    private readonly profitsService;
    private readonly journalEntriesService;
    constructor(profitsService: ProfitsService, journalEntriesService: JournalEntriesService);
    createProfitProject(body: CreateProfitDto): Promise<"error" | {
        message: string;
    }>;
    getProfitProject(): Promise<any>;
    deleteProfitProject(body: CreateProfitDto): Promise<"there is error" | {
        message: string;
    }>;
    updateProfitAccount(body: CreateProfitDto): Promise<"there is error" | {
        message: string;
    }>;
}
