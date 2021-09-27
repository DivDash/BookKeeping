"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("./accounts.service");
const accounts_controller_1 = require("./accounts.controller");
const mongoose_1 = require("@nestjs/mongoose");
const profits_schema_1 = require("../../schemas/profits.schema");
const accounts_schema_1 = require("../../schemas/accounts.schema");
const journal_entries_schema_1 = require("../../schemas/journal_entries.schema");
const profits_service_1 = require("../profits/profits.service");
const journal_entries_service_1 = require("../journal-entries/journal-entries.service");
let AccountsModule = class AccountsModule {
};
AccountsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: profits_schema_1.Profits.name, schema: profits_schema_1.ProfitsSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: accounts_schema_1.Accounts.name, schema: accounts_schema_1.AccountsSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: journal_entries_schema_1.JournalEntries.name, schema: journal_entries_schema_1.JournalEntriesSchema },
            ]),
        ],
        controllers: [accounts_controller_1.AccountsController],
        providers: [journal_entries_service_1.JournalEntriesService, profits_service_1.ProfitsService, accounts_service_1.AccountsService],
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;
//# sourceMappingURL=accounts.module.js.map