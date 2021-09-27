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
exports.NonprofitService = void 0;
const common_1 = require("@nestjs/common");
const nonprofit_schema_1 = require("../../schemas/nonprofit.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const accounts_schema_1 = require("../../schemas/accounts.schema");
let NonprofitService = class NonprofitService {
    constructor(NonProfitModel, AccountsModel) {
        this.NonProfitModel = NonProfitModel;
        this.AccountsModel = AccountsModel;
    }
    async createAccountService(Name, Expense, Remarks, Reason, idClient) {
        try {
            console.log('create Non profit');
            const querryClient = await this.AccountsModel.findOneAndUpdate({ _id: idClient }, {
                $inc: { Balance: -Expense },
            }, { new: true });
            const saving = new this.NonProfitModel({
                Name,
                Expense,
                Remarks,
                Reason,
                idClient,
            });
            await saving.save();
        }
        catch (error) {
            console.log(error);
        }
    }
    async viewAccount() {
        try {
            const data = await this.NonProfitModel.find();
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteAccountService(Name, Expense, Remarks, idClient, Reason) {
        try {
            console.log('create Non profit delete');
            const querryClient = await this.AccountsModel.findOneAndUpdate({ _id: idClient }, {
                $inc: { Balance: Expense },
            }, { new: true });
            const deleteNonProfit = await this.NonProfitModel.deleteOne({
                idClient: idClient,
                Name: Name,
                Expense: Expense,
                Remarks: Remarks,
                Reason: Reason,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async update_nonprofit_accounts(data) {
        try {
            let acc_id = data._id;
            console.log('updateAccounts temp: ' + acc_id);
            const old = await this.NonProfitModel.findOne({ _id: data._id });
            const oldClient = await this.AccountsModel.findOneAndUpdate({ _id: old.idClient }, {
                $inc: { Balance: old.Expense },
            }, { new: true });
            const querryClient = await this.AccountsModel.findOneAndUpdate({ _id: data.idClient }, {
                $inc: { Balance: -data.Expense },
            }, { new: true });
            const updated = await this.NonProfitModel.findOneAndUpdate({ _id: data._id }, {
                Name: data.Name,
                Expense: data.Expense,
                Remarks: data.Remarks,
                idClient: data.idClient,
                Reason: data.Reason,
            });
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }
};
NonprofitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(nonprofit_schema_1.NonProfit.name)),
    __param(1, (0, mongoose_1.InjectModel)(accounts_schema_1.Accounts.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], NonprofitService);
exports.NonprofitService = NonprofitService;
//# sourceMappingURL=nonprofit.service.js.map