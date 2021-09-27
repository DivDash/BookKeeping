import { Request } from 'express';
import {
  Admins,
  AdminsDocument,
  AdminsSchema,
} from '../../schemas/admins.schema';
export interface IGetUserAuthInfoRequest extends Request {
  token: string;
  userID: number;
  rootuser: Admins; // or any other type
}
