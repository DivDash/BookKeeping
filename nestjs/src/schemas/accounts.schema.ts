import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountsDocument = Accounts & Document;

@Schema()
export class Accounts {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  Bank: string;

  @Prop({ required: true })
  Balance: number;

  @Prop({ required: true })
  Remarks: string;
}

export const AccountsSchema = SchemaFactory.createForClass(Accounts);
