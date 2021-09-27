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
exports.AdminsController = void 0;
const common_1 = require("@nestjs/common");
const admins_service_1 = require("./admins.service");
const login_admin_dto_1 = require("./dto/login-admin.dto");
const jsonwebtoken_1 = require("jsonwebtoken");
const cookies_1 = require("../../middlewares/cookies");
const admins_schema_1 = require("../../schemas/admins.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AdminsController = class AdminsController {
    constructor(adminsService, AdminsModel) {
        this.adminsService = adminsService;
        this.AdminsModel = AdminsModel;
    }
    async create_admin(body, res) {
        try {
            console.log(body);
            console.log('body');
            let check = false;
            const { name, email, password, confirm, phone, work } = body;
            if (!name || !email || !password || !confirm || !phone || !work) {
                check = true;
                return { message: 'Fill The Full Form' };
            }
            if (password !== confirm) {
                check = true;
                return { message: "Confirm Password Dosen't Match" };
            }
            if (check === false) {
                console.log('here at saving');
                const createdAdmin = await this.adminsService.createAdmin(body);
                console.log(createdAdmin, 'adminnnn');
                res.json(createdAdmin);
            }
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async login_admin(body, res) {
        try {
            let { email, password } = body;
            console.log(email, password);
            if (!email || !password) {
                return { message: 'Fill The Full Form' };
            }
            else {
                const { match, token } = await this.adminsService.loginAdmin(email, password);
                console.log('after service', match, token);
                if (match) {
                    console.log('after service3');
                    res.cookie('Book', token, {
                        expires: new Date(Date.now() + 864000000),
                        httpOnly: false,
                    });
                    console.log('here at sucess');
                    res.json({ message: 'loggin succesfully' });
                }
                console.log('after service2');
                if (!match) {
                    res.json({ message: 'Invalid Credentials' });
                }
            }
        }
        catch (error) {
            console.log('here at error');
            res.status(500).json({ error: error });
        }
    }
    async getAdmin(token, request, res) {
        try {
            try {
                const rootuser = await this.AdminsModel.findOne({
                    _id: jsonwebtoken_1.default.verify(token, 'Book'),
                    'tokens.token': token,
                });
                if (!rootuser) {
                    res.status(422).json({ error: 'error' });
                }
                request.token = token;
                request.rootuser = rootuser;
                request.userID = rootuser._id;
            }
            catch (error) {
                console.log(error);
                res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({ error: 'error' });
            }
            console.log(request.rootuser, 'hello');
            return request.rootuser;
        }
        catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async adminLogout(req, res) {
        res.clearCookie('Book', { path: '/' });
        res.status(200).json({ message: 'success' });
    }
};
__decorate([
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_admin_dto_1.LoginAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "create_admin", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_admin_dto_1.LoginAdminDto, Object]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "login_admin", null);
__decorate([
    __param(0, (0, cookies_1.Cookies)('Book')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Get)('Logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "adminLogout", null);
AdminsController = __decorate([
    (0, common_1.Controller)('admins'),
    __param(1, (0, mongoose_1.InjectModel)(admins_schema_1.Admins.name)),
    __metadata("design:paramtypes", [admins_service_1.AdminsService,
        mongoose_2.Model])
], AdminsController);
exports.AdminsController = AdminsController;
//# sourceMappingURL=admins.controller.js.map