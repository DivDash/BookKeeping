"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const admins_module_1 = require("./apis/admins/admins.module");
const accounts_module_1 = require("./apis/accounts/accounts.module");
const mongoose_1 = require("@nestjs/mongoose");
const profits_module_1 = require("./apis/profits/profits.module");
const nonprofit_module_1 = require("./apis/nonprofit/nonprofit.module");
const journal_entries_module_1 = require("./apis/journal-entries/journal-entries.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admins_module_1.AdminsModule,
            accounts_module_1.AccountsModule,
            mongoose_1.MongooseModule.forRoot('mongodb+srv://dbUser:dbUser@cluster0.1vlv5.mongodb.net/BookKeeping?retryWrites=true'),
            profits_module_1.ProfitsModule,
            nonprofit_module_1.NonprofitModule,
            journal_entries_module_1.JournalEntriesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map