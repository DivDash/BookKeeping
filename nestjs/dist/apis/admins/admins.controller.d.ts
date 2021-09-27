import { AdminsService } from './admins.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Admins, AdminsDocument } from '../../schemas/admins.schema';
import { Response } from 'express';
import { Request } from 'express';
import { IGetUserAuthInfoRequest } from './definitionfile';
import { Model } from 'mongoose';
export declare class AdminsController {
    private readonly adminsService;
    private AdminsModel;
    constructor(adminsService: AdminsService, AdminsModel: Model<AdminsDocument>);
    create_admin(body: LoginAdminDto, res: Response): Promise<{
        message: string;
    }>;
    login_admin(body: LoginAdminDto, res: Response): Promise<{
        message: string;
    }>;
    getAdmin(token: string, request: IGetUserAuthInfoRequest, res: Response): Promise<Admins>;
    adminLogout(req: Request, res: Response): Promise<void>;
}
