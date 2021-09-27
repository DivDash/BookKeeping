import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
export type AdminsDocument = Admins & Document;

@Schema()
export class Admins extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  confirm: string;

  @Prop()
  phone: number;

  @Prop({ required: true })
  work: string;

  @Prop({ required: true })
  tokens: [{ token: string }];

  // tokens: [
  //   {
  //     token: { type: string };
  //   },
  // ];

  generateauthtoken: Function;
}

export const AdminsSchema = SchemaFactory.createForClass(Admins);

// AdminsSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//     this.confirm = await bcrypt.hash(this.confirm, 10);
//   }
//   next();
// });
// Admin.methods.generateauthtoken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, 'Book');
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (err) {
//     consol.log(err);
//   }
// };

AdminsSchema.methods.generateauthtoken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, 'Book');
    this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
