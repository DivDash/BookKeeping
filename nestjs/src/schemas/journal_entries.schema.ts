import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JournalEntriesDocument = JournalEntries & Document;

@Schema()
export class JournalEntries {
  @Prop({ required: true })
  project: string;

  @Prop({ required: true })
  client: string;

  @Prop({ required: true })
  receiver: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  reason: number;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  remarks: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  idClient: string;

  @Prop({ required: true })
  idRec: string;
}

export const JournalEntriesSchema =
  SchemaFactory.createForClass(JournalEntries);
