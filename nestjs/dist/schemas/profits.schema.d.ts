import { Document } from 'mongoose';
export declare type ProfitsDocument = Profits & Document;
export declare class Profits {
    Project: string;
    Client: string;
    Receivable: number;
    Revenue: number;
    Expense: number;
    Date: string;
    Status: string;
    idClient: string;
}
export declare const ProfitsSchema: import("mongoose").Schema<Document<Profits, any, any>, import("mongoose").Model<Document<Profits, any, any>, any, any>, undefined, {}>;
