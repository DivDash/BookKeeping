import { Document } from 'mongoose';
export declare type JournalEntriesDocument = JournalEntries & Document;
export declare class JournalEntries {
    project: string;
    client: string;
    receiver: string;
    amount: number;
    reason: number;
    method: string;
    remarks: string;
    date: string;
    idClient: string;
    idRec: string;
}
export declare const JournalEntriesSchema: import("mongoose").Schema<Document<JournalEntries, any, any>, import("mongoose").Model<Document<JournalEntries, any, any>, any, any>, undefined, {}>;
