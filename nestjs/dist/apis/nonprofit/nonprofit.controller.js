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
exports.NonprofitController = void 0;
const common_1 = require("@nestjs/common");
const nonprofit_service_1 = require("./nonprofit.service");
const create_nonprofit_dto_1 = require("./dto/create-nonprofit.dto");
let NonprofitController = class NonprofitController {
    constructor(nonprofitService) {
        this.nonprofitService = nonprofitService;
    }
    async createAccount(body) {
        try {
            let check = false;
            console.log('fds');
            console.log(body);
            const { Name, Expense, Remarks, Reason, idClient } = body;
            if (!Name || !Expense || !Remarks || !Reason || !idClient) {
                check = true;
                return { message: 'Fill All The Fields' };
            }
            if (check === false) {
                const response = await this.nonprofitService.createAccountService(Name, Expense, Remarks, Reason, idClient);
                return { message: 'Account Added' };
            }
        }
        catch (err) {
            console.log(err);
            return 'there is error cc';
        }
    }
    async viewAccount() {
        try {
            console.log('here at non profit');
            const data = await this.nonprofitService.viewAccount();
            return data;
        }
        catch (error) {
            const data = await this.nonprofitService.viewAccount();
            return data;
        }
    }
    async deleteAccount(body) {
        try {
            console.log('here at non profit delete');
            const { Name, Expense, Remarks, idClient, Reason } = body;
            console.log(Name, Expense, Remarks, idClient, Reason, 'nonnn');
            const data = await this.nonprofitService.deleteAccountService(Name, Expense, Remarks, idClient, Reason);
            return data;
        }
        catch (error) {
            return error;
        }
    }
    async updateNonProfitAccount(body) {
        try {
            console.log('mubashir account update:');
            console.log(body);
            const updateAccounts = await this.nonprofitService.update_nonprofit_accounts(body);
            return { message: 'account updatedd' };
        }
        catch (error) {
            return 'there is error';
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nonprofit_dto_1.CreateNonprofitDto]),
    __metadata("design:returntype", Promise)
], NonprofitController.prototype, "createAccount", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nonprofit_dto_1.CreateNonprofitDto]),
    __metadata("design:returntype", Promise)
], NonprofitController.prototype, "deleteAccount", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nonprofit_dto_1.CreateNonprofitDto]),
    __metadata("design:returntype", Promise)
], NonprofitController.prototype, "updateNonProfitAccount", null);
NonprofitController = __decorate([
    (0, common_1.Controller)('nonprofit'),
    __metadata("design:paramtypes", [nonprofit_service_1.NonprofitService])
], NonprofitController);
exports.NonprofitController = NonprofitController;
//# sourceMappingURL=nonprofit.controller.js.map