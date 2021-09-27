import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NonProfitDocument = NonProfit & Document;

@Schema()
export class NonProfit {
  @Prop({ required: true })
  Name: string;

  @Prop({ required: true })
  Expense: number;

  @Prop({ required: true })
  Remarks: string;

  @Prop({ required: true })
  Reason: string;

  @Prop({ required: true })
  idClient: string;
}

export const NonProfitSchema = SchemaFactory.createForClass(NonProfit);
