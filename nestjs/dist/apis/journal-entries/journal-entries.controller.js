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
exports.JournalEntriesController = void 0;
const common_1 = require("@nestjs/common");
const journal_entries_service_1 = require("./journal-entries.service");
const create_journal_entry_dto_1 = require("./dto/create-journal-entry.dto");
const update_journal_entry_dto_1 = require("./dto/update-journal-entry.dto");
let JournalEntriesController = class JournalEntriesController {
    constructor(journalEntriesService) {
        this.journalEntriesService = journalEntriesService;
    }
    async createJournalEntries(body) {
        try {
            console.log('1');
            console.log(body);
            console.log(body.newDivs, 'data');
            let data = body.newDivs;
            console.log(body.option, 'option');
            let option = body.option;
            let check = false;
            let projectExist = await this.journalEntriesService.validateProfitProject(data);
            console.log(projectExist, 'hellooo');
            if (projectExist.length === 0) {
                console.log('2');
                check = true;
                return { message: 'Project with This Client Dosent exist' };
            }
            if (check === false) {
                console.log('3');
                const accountExist = await this.journalEntriesService.validateAccount(data);
                let sum = 0;
                for (let i = 0; i < data.length; i++) {
                    sum = sum + data[i].amount;
                }
                let exp = projectExist[0].Expense + sum;
                let rec = projectExist[0].Receivable - sum;
                let rev = projectExist[0].Revenue + sum;
                console.log(exp, 'revExp');
                if (option === 'non-client') {
                    const updateProfit = await this.journalEntriesService.updateProfitProject(data, exp);
                }
                if (option === 'client') {
                    const updateProfit = await this.journalEntriesService.updateClientProfitProject(data, rec, rev);
                }
                let bal = accountExist.Balance - sum;
                let updateAccount = await this.journalEntriesService.updateAccount(data, bal);
                let awain = accountExist.Balance - 69;
                let updateRecieverAccount = await this.journalEntriesService.updateReceiverAccount(data);
                let awain2 = accountExist.Balance - 69;
                const saveEntries = await this.journalEntriesService.createJournalEntries(data);
                return { message: 'Entries are added' };
            }
        }
        catch (error) {
            console.log('4');
            return { message: 'error' };
        }
    }
    async getJournalEntries(body) {
        try {
            console.log('here at viewEntry');
            let check = false;
            let projectExist = await this.journalEntriesService.validateProject(body);
            if (projectExist.length === 0) {
                check = true;
                return { message: 'Project With The Non-Client Is Selected' };
            }
            if (check === false) {
                console.log(projectExist);
                let getEntries = await this.journalEntriesService.getJournalEntries(body);
                return { message: 'Success', getEntries };
            }
        }
        catch (error) {
            return 'error';
        }
    }
    async getJournalEntriesParams(project) {
        try {
            console.log('here at viewEntry');
            let check = false;
            let data = project;
            let projectExis = await this.journalEntriesService.validateProject(data);
            if (projectExis.length === 0) {
                check = true;
                return { message: 'Project With The Non-Client Is Selected' };
            }
            if (check === false) {
                console.log(projectExis);
                let getEntrie = await this.journalEntriesService.getJournalEntries(data);
                let objectEntries = {
                    getEntries: getEntrie,
                    projectExist: projectExis,
                };
                console.log(objectEntries, 'objectEntries');
                return objectEntries;
            }
        }
        catch (error) {
            return 'error';
        }
    }
    async deleteJournalEntry(body) {
        try {
            console.log('delete entryy');
            let data = [];
            let option;
            data[0] = body;
            const project = await this.journalEntriesService.validateProfitProject(data);
            console.log(project, 'project');
            console.log(project[0].Client, 'project.Client');
            console.log(body.client, 'body.client');
            let projClient = project[0].idClient;
            if (projClient === body.idClient) {
                option = 'client';
            }
            else {
                option = 'non-client';
            }
            let object = {
                entries: body,
                option: option,
            };
            const deleteEntry = await this.journalEntriesService.deleteEntry(object);
            return { message: 'Entry deleted' };
        }
        catch (error) {
            return 'there is error';
        }
    }
    async updateJournalEntries(body) {
        try {
            console.log('mubashir account updateING:');
            console.log(body, 'entryUpdate');
            const updateAccounts = await this.journalEntriesService.update_journal_accounts(body);
            return { message: 'account updatedd' };
        }
        catch (error) {
            return 'there is error';
        }
    }
    findAll() {
        return this.journalEntriesService.findAll();
    }
    findOne(id) {
        return this.journalEntriesService.findOne(+id);
    }
    update(id, updateJournalEntryDto) {
        return this.journalEntriesService.update(+id, updateJournalEntryDto);
    }
    remove(id) {
        return this.journalEntriesService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_journal_entry_dto_1.CreateJournalEntryDto]),
    __metadata("design:returntype", Promise)
], JournalEntriesController.prototype, "createJournalEntries", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_journal_entry_dto_1.CreateJournalEntryDto]),
    __metadata("design:returntype", Promise)
], JournalEntriesController.prototype, "getJournalEntries", null);
__decorate([
    __param(0, (0, common_1.Param)('project')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JournalEntriesController.prototype, "getJournalEntriesParams", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_journal_entry_dto_1.CreateJournalEntryDto]),
    __metadata("design:returntype", Promise)
], JournalEntriesController.prototype, "deleteJournalEntry", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_journal_entry_dto_1.CreateJournalEntryDto]),
    __metadata("design:returntype", Promise)
], JournalEntriesController.prototype, "updateJournalEntries", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JournalEntriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JournalEntriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_journal_entry_dto_1.UpdateJournalEntryDto]),
    __metadata("design:returntype", void 0)
], JournalEntriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JournalEntriesController.prototype, "remove", null);
JournalEntriesController = __decorate([
    (0, common_1.Controller)('journal-entries'),
    __metadata("design:paramtypes", [journal_entries_service_1.JournalEntriesService])
], JournalEntriesController);
exports.JournalEntriesController = JournalEntriesController;
//# sourceMappingURL=journal-entries.controller.js.map