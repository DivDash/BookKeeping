"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonprofitModule = void 0;
const common_1 = require("@nestjs/common");
const nonprofit_service_1 = require("./nonprofit.service");
const nonprofit_controller_1 = require("./nonprofit.controller");
const profits_schema_1 = require("../../schemas/profits.schema");
const accounts_schema_1 = require("../../schemas/accounts.schema");
const mongoose_1 = require("@nestjs/mongoose");
const journal_entries_schema_1 = require("../../schemas/journal_entries.schema");
const journal_entries_service_1 = require("../journal-entries/journal-entries.service");
const accounts_service_1 = require("../accounts/accounts.service");
const nonprofit_schema_1 = require("../../schemas/nonprofit.schema");
const profits_service_1 = require("../profits/profits.service");
let NonprofitModule = class NonprofitModule {
};
NonprofitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: nonprofit_schema_1.NonProfit.name, schema: nonprofit_schema_1.NonProfitSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: accounts_schema_1.Accounts.name, schema: accounts_schema_1.AccountsSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: journal_entries_schema_1.JournalEntries.name, schema: journal_entries_schema_1.JournalEntriesSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: profits_schema_1.Profits.name, schema: profits_schema_1.ProfitsSchema }]),
        ],
        controllers: [nonprofit_controller_1.NonprofitController],
        providers: [
            nonprofit_service_1.NonprofitService,
            journal_entries_service_1.JournalEntriesService,
            accounts_service_1.AccountsService,
            profits_service_1.ProfitsService,
        ],
    })
], NonprofitModule);
exports.NonprofitModule = NonprofitModule;
//# sourceMappingURL=nonprofit.module.js.map