import { Request } from 'express';
import { Admins } from '../../schemas/admins.schema';
export interface IGetUserAuthInfoRequest extends Request {
    token: string;
    userID: number;
    rootuser: Admins;
}
