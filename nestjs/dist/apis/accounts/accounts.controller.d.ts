import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    createAccount(createAccountDto: CreateAccountDto): Promise<"there is error" | {
        message: string;
    }>;
    viewAccount(): Promise<import("../../schemas/accounts.schema").AccountsDocument[] | "there is error">;
    create(createAccountDto: CreateAccountDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAccountDto: UpdateAccountDto): string;
    remove(id: string): string;
}
