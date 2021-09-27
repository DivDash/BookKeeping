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
exports.JournalEntriesService = void 0;
const common_1 = require("@nestjs/common");
const journal_entries_schema_1 = require("../../schemas/journal_entries.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const accounts_service_1 = require("../accounts/accounts.service");
const profits_service_1 = require("../profits/profits.service");
const profits_schema_1 = require("../../schemas/profits.schema");
const accounts_schema_1 = require("../../schemas/accounts.schema");
let queryEntryGlobal;
let JournalEntriesService = class JournalEntriesService {
    constructor(JournalEntriesModel, ProfitsModel, AccountsModel, profitsService, accountsService) {
        this.JournalEntriesModel = JournalEntriesModel;
        this.ProfitsModel = ProfitsModel;
        this.AccountsModel = AccountsModel;
        this.profitsService = profitsService;
        this.accountsService = accountsService;
    }
    async validateProfitProject(data) {
        try {
            console.log('here at validate project');
            let project = data[0].project;
            const query = { Project: project };
            const projectExist = await this.ProfitsModel.find(query);
            console.log(projectExist, 'projService');
            return projectExist;
        }
        catch (error) {
            console.log(error);
        }
    }
    async validateProject(data) {
        try {
            console.log('here at validate project');
            console.log(data, 'qqqqqqqqqqqqqqq');
            const { project } = data;
            console.log(project);
            const query = { Project: project };
            const projectExist = await this.ProfitsModel.find(query);
            console.log(projectExist);
            return projectExist;
        }
        catch (error) {
            console.log(error);
        }
    }
    async validateAccount(data) {
        try {
            let client = data[0].idClient;
            const accountExist = await this.AccountsModel.findOne({ _id: client });
            return accountExist;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProfitProject(data, exp) {
        try {
            console.log('helllo');
            let project = data[0].project;
            const filter = { Project: project };
            const update = { Expense: exp };
            let doc = await this.ProfitsModel.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true,
                rawResult: true,
            });
        }
        catch (error) {
            console.log('update profit error', error);
        }
    }
    async updateClientProfitProject(data, rec, rev) {
        try {
            console.log('helllo');
            let project = data[0].project;
            const filter = { Project: project };
            const update = { Receivable: rec, Revenue: rev };
            let doc = await this.ProfitsModel.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true,
                rawResult: true,
            });
        }
        catch (error) {
            console.log('update profit error', error);
        }
    }
    async updateAccount(data, bal) {
        try {
            console.log('update account');
            let client = data[0].idClient;
            const filterAccount = { _id: client };
            const updateAccount = { Balance: bal };
            let docAcc = await this.AccountsModel.findOneAndUpdate(filterAccount, updateAccount, {
                new: true,
                upsert: true,
                rawResult: true,
            });
        }
        catch (error) {
            console.log('update account error');
            console.log(error);
        }
    }
    async createJournalEntries(data) {
        try {
            let saveEntries = await this.JournalEntriesModel.insertMany(data);
            return saveEntries;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getJournalEntries(data) {
        try {
            console.log(data, 'aaaa');
            const { project } = data;
            queryEntryGlobal = { project: project };
            const entryExist = await this.JournalEntriesModel.find(queryEntryGlobal);
            console.log(entryExist, 'entrieeeeeessssssss');
            return entryExist;
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateReceiverAccount(data) {
        try {
            console.log(data, 'updateRecieverAccount');
            for (let i = 0; i < data.length; i++) {
                const querry = await this.AccountsModel.findOneAndUpdate({ _id: data[i].idRec }, {
                    $inc: { Balance: data[i].amount },
                }, { new: true });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteEntry(object) {
        try {
            let data = object.entries;
            let option = object.option;
            console.log(data, 'deleteEntry');
            console.log(option, 'option');
            const querry = await this.AccountsModel.findOneAndUpdate({ _id: data.idRec }, {
                $inc: { Balance: -data.amount },
            }, { new: true });
            const querryClient = await this.AccountsModel.findOneAndUpdate({ _id: data.idClient }, {
                $inc: { Balance: data.amount },
            }, { new: true });
            if (option === 'non-client') {
                console.log('non-client service');
                const querryProfit = await this.ProfitsModel.findOneAndUpdate({ Project: data.project }, {
                    $inc: { Expense: -data.amount },
                }, { new: true });
            }
            if (option === 'client') {
                console.log('client service');
                const querryProfitRev = await this.ProfitsModel.findOneAndUpdate({ Project: data.project }, {
                    $inc: { Revenue: -data.amount },
                }, { new: true });
                const querryProfitRec = await this.ProfitsModel.findOneAndUpdate({ Project: data.project }, {
                    $inc: { Receivable: data.amount },
                }, { new: true });
            }
            const deleteEntries = await this.JournalEntriesModel.deleteOne({
                client: data.client,
                amount: data.amount,
                project: data.project,
                receiver: data.receiver,
                reason: data.reason,
                method: data.method,
                remarks: data.remarks,
                date: data.date,
            });
            return deleteEntries;
        }
        catch (error) {
            console.log(error);
        }
    }
    async update_journal_accounts(data) {
        try {
            let acc_id = data._id;
            console.log('updateAccounts tempING: ' + acc_id);
            const oldEntry = await this.JournalEntriesModel.findOne({
                _id: data._id,
            });
            const oldProject = await this.ProfitsModel.findOne({
                Project: oldEntry.project,
            });
            const diff = data.amount - oldEntry.amount;
            if (oldEntry.project === data.project) {
                if (data.idClient === oldProject.idClient) {
                    const querryProfitRev = await this.ProfitsModel.findOneAndUpdate({ Project: data.project }, {
                        $inc: { Revenue: diff },
                    }, { new: true });
                    const querryProfitRec = await this.ProfitsModel.findOneAndUpdate({ Project: data.project }, {
                        $inc: { Receivable: -diff },
                    }, { new: true });
                }
                else {
                    const querryProfit = await this.ProfitsModel.findOneAndUpdate({ Project: data.project }, {
                        $inc: { Expense: diff },
                    }, { new: true });
                }
            }
            if (oldEntry.project !== data.project) {
                const newProj = await this.ProfitsModel.findOne({
                    Project: data.project,
                });
                if (newProj.idClient === data.idClient) {
                    const querryProfitRevNew = await this.ProfitsModel.findOneAndUpdate({ Project: data.project }, {
                        $inc: { Revenue: data.amount },
                    }, { new: true });
                    const querryProfitRecNew = await this.ProfitsModel.findOneAndUpdate({ Project: data.project }, {
                        $inc: { Receivable: -data.amount },
                    }, { new: true });
                }
                if (newProj.idClient !== data.idClient) {
                    const querryProfitNew = await this.ProfitsModel.findOneAndUpdate({ Project: data.project }, {
                        $inc: { Expense: data.amount },
                    }, { new: true });
                }
                if (oldEntry.idClient === oldProject.idClient) {
                    const querryProfitRev = await this.ProfitsModel.findOneAndUpdate({ Project: oldProject.Project }, {
                        $inc: { Revenue: -oldEntry.amount },
                    }, { new: true });
                    const querryProfitRec = await this.ProfitsModel.findOneAndUpdate({ Project: oldProject.Project }, {
                        $inc: { Receivable: oldEntry.amount },
                    }, { new: true });
                }
                if (oldEntry.idClient !== oldProject.idClient) {
                    const querryProfit = await this.ProfitsModel.findOneAndUpdate({ Project: oldProject.Project }, {
                        $inc: { Expense: -oldEntry.amount },
                    }, { new: true });
                }
            }
            if (oldEntry.idClient === data.idClient) {
                const querryClient = await this.AccountsModel.findOneAndUpdate({ _id: data.idClient }, {
                    $inc: { Balance: -diff },
                }, { new: true });
            }
            if (oldEntry.idClient !== data.idClient) {
                const querryClientNew = await this.AccountsModel.findOneAndUpdate({ _id: data.idClient }, {
                    $inc: { Balance: -data.amount },
                }, { new: true });
                const querryClient = await this.AccountsModel.findOneAndUpdate({ _id: oldEntry.idClient }, {
                    $inc: { Balance: oldEntry.amount },
                }, { new: true });
            }
            if (oldEntry.idRec === data.idRec) {
                const querryClient = await this.AccountsModel.findOneAndUpdate({ _id: data.idRec }, {
                    $inc: { Balance: diff },
                }, { new: true });
            }
            if (oldEntry.idRec !== data.idRec) {
                const querryClientNew = await this.AccountsModel.findOneAndUpdate({ _id: data.idRec }, {
                    $inc: { Balance: data.amount },
                }, { new: true });
                const querryClient = await this.AccountsModel.findOneAndUpdate({ _id: oldEntry.idRec }, {
                    $inc: { Balance: -oldEntry.amount },
                }, { new: true });
            }
            const updated = await this.JournalEntriesModel.findOneAndUpdate({ _id: data._id }, {
                client: data.client,
                amount: data.amount,
                project: data.project,
                receiver: data.receiver,
                reason: data.reason,
                method: data.method,
                remarks: data.remarks,
                date: data.date,
                idClient: data.idClient,
                idRec: data.idRec,
            });
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    findAll() {
        return `This action returns all journalEntries`;
    }
    findOne(id) {
        return `This action returns a #${id} journalEntry`;
    }
    update(id, updateJournalEntryDto) {
        return `This action updates a #${id} journalEntry`;
    }
    remove(id) {
        return `This action removes a #${id} journalEntry`;
    }
};
JournalEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(journal_entries_schema_1.JournalEntries.name)),
    __param(1, (0, mongoose_1.InjectModel)(profits_schema_1.Profits.name)),
    __param(2, (0, mongoose_1.InjectModel)(accounts_schema_1.Accounts.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        profits_service_1.ProfitsService,
        accounts_service_1.AccountsService])
], JournalEntriesService);
exports.JournalEntriesService = JournalEntriesService;
//# sourceMappingURL=journal-entries.service.js.map