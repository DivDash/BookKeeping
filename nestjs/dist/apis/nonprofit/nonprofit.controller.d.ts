import { NonprofitService } from './nonprofit.service';
import { CreateNonprofitDto } from './dto/create-nonprofit.dto';
export declare class NonprofitController {
    private readonly nonprofitService;
    constructor(nonprofitService: NonprofitService);
    createAccount(body: CreateNonprofitDto): Promise<"there is error cc" | {
        message: string;
    }>;
    viewAccount(): Promise<import("../../schemas/nonprofit.schema").NonProfitDocument[]>;
    deleteAccount(body: CreateNonprofitDto): Promise<any>;
    updateNonProfitAccount(body: CreateNonprofitDto): Promise<"there is error" | {
        message: string;
    }>;
}
