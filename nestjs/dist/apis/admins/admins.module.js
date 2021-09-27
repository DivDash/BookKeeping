"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsModule = void 0;
const common_1 = require("@nestjs/common");
const admins_service_1 = require("./admins.service");
const admins_controller_1 = require("./admins.controller");
const admins_schema_1 = require("../../schemas/admins.schema");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt_1 = require("bcrypt");
let AdminsModule = class AdminsModule {
};
AdminsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: admins_schema_1.Admins.name, schema: admins_schema_1.AdminsSchema }]),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: admins_schema_1.Admins.name,
                    useFactory: () => {
                        const schema = admins_schema_1.AdminsSchema;
                        schema.pre('save', async function () {
                            if (this.isModified('password')) {
                                this.password = await bcrypt_1.default.hash(this.password, 10);
                                this.confirm = await bcrypt_1.default.hash(this.confirm, 10);
                            }
                        });
                        return schema;
                    },
                },
            ]),
        ],
        controllers: [admins_controller_1.AdminsController],
        providers: [admins_service_1.AdminsService],
    })
], AdminsModule);
exports.AdminsModule = AdminsModule;
//# sourceMappingURL=admins.module.js.map