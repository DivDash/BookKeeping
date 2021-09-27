import { Document } from 'mongoose';
export declare type AdminsDocument = Admins & Document;
export declare class Admins extends Document {
    name: string;
    email: string;
    password: string;
    confirm: string;
    phone: number;
    work: string;
    tokens: [{
        token: string;
    }];
    generateauthtoken: Function;
}
export declare const AdminsSchema: import("mongoose").Schema<Admins, import("mongoose").Model<Admins, any, any>, undefined, {}>;
