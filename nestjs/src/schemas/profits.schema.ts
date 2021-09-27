import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfitsDocument = Profits & Document;

@Schema()
export class Profits {
  @Prop({ required: true })
  Project: string;

  @Prop({ required: true })
  Client: string;

  @Prop({ required: true })
  Receivable: number;

  @Prop({ required: true })
  Revenue: number;

  @Prop({ required: true })
  Expense: number;

  @Prop({ required: true })
  Date: string;

  @Prop({ required: true })
  Status: string;

  @Prop({ required: true })
  idClient: string;
}

export const ProfitsSchema = SchemaFactory.createForClass(Profits);
