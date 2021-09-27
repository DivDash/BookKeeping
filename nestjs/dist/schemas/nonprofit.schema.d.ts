import { Document } from 'mongoose';
export declare type NonProfitDocument = NonProfit & Document;
export declare class NonProfit {
    Name: string;
    Expense: number;
    Remarks: string;
    Reason: string;
    idClient: string;
}
export declare const NonProfitSchema: import("mongoose").Schema<Document<NonProfit, any, any>, import("mongoose").Model<Document<NonProfit, any, any>, any, any>, undefined, {}>;
