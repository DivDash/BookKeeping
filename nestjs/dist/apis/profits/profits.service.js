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
exports.ProfitsService = void 0;
const common_1 = require("@nestjs/common");
const profits_schema_1 = require("../../schemas/profits.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProfitsService = class ProfitsService {
    constructor(ProfitsModel) {
        this.ProfitsModel = ProfitsModel;
    }
    async createProfitProject(body) {
        try {
            const { Project, Client, Receivable, Revenue, Expense, Date, Status, idClient, } = body;
            const newProfitProject = {
                Project,
                Client,
                Receivable,
                Revenue,
                Expense,
                Date,
                Status,
                idClient,
            };
            const saving = await new this.ProfitsModel(newProfitProject).save();
            return saving;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getProfitProject() {
        try {
            let data = await this.ProfitsModel.find();
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteProject(data) {
        try {
            console.log(data, 'deleteee from profitt');
            const deleteProject = await this.ProfitsModel.deleteMany({
                Project: data.Project,
            });
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    async update_profit_accounts(data) {
        try {
            const acc_id = data._id;
            console.log('updateAccounts temp: ' + acc_id);
            const findProject = await this.ProfitsModel.findOne({ _id: data._id });
            const oldProject = findProject.Project;
            const oldClient = findProject.Client;
            const updated = await this.ProfitsModel.findOneAndUpdate({ _id: data._id }, {
                Project: data.Project,
                Client: data.Client,
                Receivable: data.Receivable,
                Revenue: data.Revenue,
                Expense: data.Expense,
                Date: data.Date,
                Status: data.Status,
            });
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    async validateProfitProject(data) {
        try {
            const { Project } = data;
            const query = { Project: Project };
            const projectExist = await this.ProfitsModel.find(query);
            return projectExist;
        }
        catch (error) {
            console.log(error);
        }
    }
};
ProfitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(profits_schema_1.Profits.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProfitsService);
exports.ProfitsService = ProfitsService;
//# sourceMappingURL=profits.service.js.map