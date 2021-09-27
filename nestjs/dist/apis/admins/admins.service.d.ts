import { Model } from 'mongoose';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AdminsDocument } from '../../schemas/admins.schema';
export declare class AdminsService {
    private AdminsModel;
    constructor(AdminsModel: Model<AdminsDocument>);
    createAdmin(data: LoginAdminDto): Promise<{
        message: string;
    }>;
    loginAdmin(Email: string, Password: string): Promise<{
        match: boolean;
        token: any;
    }>;
}
