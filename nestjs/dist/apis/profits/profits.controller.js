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
exports.ProfitsController = void 0;
const common_1 = require("@nestjs/common");
const profits_service_1 = require("./profits.service");
const create_profit_dto_1 = require("./dto/create-profit.dto");
const journal_entries_service_1 = require("../journal-entries/journal-entries.service");
let ProfitsController = class ProfitsController {
    constructor(profitsService, journalEntriesService) {
        this.profitsService = profitsService;
        this.journalEntriesService = journalEntriesService;
    }
    async createProfitProject(body) {
        try {
            console.log('here at profitt');
            let check = false;
            const { Project, idClient, Client, Receivable, Revenue, Expense, Date, Status, } = body;
            console.log(Project, idClient, Client, Receivable, Revenue, Expense, Date, Status, 'projecttt');
            if (!Project || !Client || !Receivable || !Date || !Status || !idClient) {
                check = true;
                return { message: 'Fill The Full Form' };
            }
            const projectExist = await this.profitsService.validateProfitProject(body);
            console.log(projectExist, 'nestttt');
            if (projectExist.length !== 0) {
                check = true;
                return { message: 'Project Exist Change The Name' };
            }
            if (check === false) {
                let createProfit = await this.profitsService.createProfitProject(body);
                return { message: 'Project with Client Added' };
            }
        }
        catch (error) {
            console.log('here at error');
            return 'error';
        }
    }
    async getProfitProject() {
        try {
            let getProjects = await this.profitsService.getProfitProject();
            return getProjects;
        }
        catch (error) {
            return error;
        }
    }
    async deleteProfitProject(body) {
        try {
            console.log('delete profittt');
            let option;
            let projObject = {
                project: body.Project,
            };
            const entries = await this.journalEntriesService.getJournalEntries(projObject);
            console.log(entries, 'entries');
            for (let i = 0; i < entries.length; i++) {
                console.log('for loop');
                if (entries[i].client === body.Client) {
                    console.log('clientt');
                    option = 'client';
                }
                else {
                    console.log('non-clientt');
                    option = 'non-client';
                }
                console.log('profitttt');
                let object = {
                    entries: entries[i],
                    option: option,
                };
                console.log('profitttt2222');
                console.log(object, 'objectt');
                const deleteEntry = await this.journalEntriesService.deleteEntry(object);
            }
            const deleteAccount = await this.profitsService.deleteProject(body);
            return { message: 'account deleted' };
        }
        catch (error) {
            return 'there is error';
        }
    }
    async updateProfitAccount(body) {
        try {
            console.log('mubashir account update:');
            console.log(body);
            const updateAccounts = await this.profitsService.update_profit_accounts(body);
            return { message: 'account updatedd' };
        }
        catch (error) {
            return 'there is error';
        }
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profit_dto_1.CreateProfitDto]),
    __metadata("design:returntype", Promise)
], ProfitsController.prototype, "createProfitProject", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profit_dto_1.CreateProfitDto]),
    __metadata("design:returntype", Promise)
], ProfitsController.prototype, "deleteProfitProject", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profit_dto_1.CreateProfitDto]),
    __metadata("design:returntype", Promise)
], ProfitsController.prototype, "updateProfitAccount", null);
ProfitsController = __decorate([
    (0, common_1.Controller)('profits'),
    __metadata("design:paramtypes", [profits_service_1.ProfitsService,
        journal_entries_service_1.JournalEntriesService])
], ProfitsController);
exports.ProfitsController = ProfitsController;
//# sourceMappingURL=profits.controller.js.map