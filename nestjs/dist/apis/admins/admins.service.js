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
exports.AdminsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const admins_schema_1 = require("../../schemas/admins.schema");
const mongoose_2 = require("@nestjs/mongoose");
let AdminsService = class AdminsService {
    constructor(AdminsModel) {
        this.AdminsModel = AdminsModel;
    }
    async createAdmin(data) {
        try {
            console.log(data);
            const userexist = await this.AdminsModel.findOne({ email: data.email });
            if (userexist) {
                console.log('here at email exist');
                return { message: 'Email Already Exist' };
            }
            const newAdmin = {
                name: data.name,
                email: data.email,
                password: data.password,
                confirm: data.confirm,
                phone: data.phone,
                work: data.work,
            };
            const response = await new this.AdminsModel(newAdmin).save();
            return { message: 'Registered Sucessfully' };
        }
        catch (error) {
            console.log(error);
        }
    }
    async loginAdmin(Email, Password) {
        try {
            console.log('jere');
            const response = await this.AdminsModel.findOne({ email: Email });
            let match = false;
            if (Password === response.password) {
                match = true;
            }
            const token = await response.generateauthtoken();
            return { match, token };
        }
        catch (error) {
            console.log(`user not found. ${error}`);
        }
    }
};
AdminsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(admins_schema_1.Admins.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AdminsService);
exports.AdminsService = AdminsService;
//# sourceMappingURL=admins.service.js.map