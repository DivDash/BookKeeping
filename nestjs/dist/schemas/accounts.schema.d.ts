import { Document } from 'mongoose';
export declare type AccountsDocument = Accounts & Document;
export declare class Accounts {
    name: string;
    Bank: string;
    Balance: number;
    Remarks: string;
}
export declare const AccountsSchema: import("mongoose").Schema<Document<Accounts, any, any>, import("mongoose").Model<Document<Accounts, any, any>, any, any>, undefined, {}>;
