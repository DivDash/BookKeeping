"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const accounts_schema_1 = require("../../schemas/accounts.schema");
const journal_entries_schema_1 = require("../../schemas/journal_entries.schema");
let AccountsService = class AccountsService {
    constructor(JournalEntriesModel, AccountsModel) {
        this.JournalEntriesModel = JournalEntriesModel;
        this.AccountsModel = AccountsModel;
    }
    async createAccountService(name, Bank, Balance, Remarks) {
        try {
            console.log('error');
            const saving = new this.AccountsModel({ name, Bank, Balance, Remarks });
            await saving.save();
        }
        catch (error) {
            console.log(error);
        }
    }
    async viewAccount() {
        const data = await this.AccountsModel.find();
        return data;
    }
    async deleteAccount(data) {
        try {
            console.log(data, 'deleteee');
            const deleteAccount = await this.AccountsModel.deleteMany({
                name: data.name,
            });
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateAccounts(data) {
        try {
            console.log('updateAccounts', data);
            let project = data.Project;
            let client = data.Client;
            const queryEntry = { $and: [{ project: project }, { client: client }] };
            const entryExist = await this.JournalEntriesModel.find(queryEntry);
            console.log(data, 'updateRecieverAccount');
            let sum = 0;
            for (let i = 0; i < entryExist.length; i++) {
                sum = sum + entryExist[i].amount;
                const querry = await this.AccountsModel.findOneAndUpdate({ name: entryExist[i].receiver }, {
                    $inc: { Balance: -entryExist[i].amount },
                }, { new: true });
            }
            const querryClient = await this.AccountsModel.findOneAndUpdate({ name: client }, {
                $inc: { Balance: sum },
            }, { new: true });
            return entryExist;
        }
        catch (error) {
            console.log(error);
        }
    }
    create(createAccountDto) {
        return 'This action adds a new account';
    }
    findAll() {
        return `This action returns all accounts`;
    }
    findOne(id) {
        return `This action returns a #${id} account`;
    }
    update(id, updateAccountDto) {
        return `This action updates a #${id} account`;
    }
    remove(id) {
        return `This action removes a #${id} account`;
    }
};
AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(journal_entries_schema_1.JournalEntries.name)),
    __param(1, (0, mongoose_1.InjectModel)(accounts_schema_1.Accounts.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map