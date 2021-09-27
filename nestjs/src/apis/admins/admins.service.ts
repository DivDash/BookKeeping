import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { LoginAdminDto } from './dto/login-admin.dto';
import jwt from 'jsonwebtoken';

import {
  Admins,
  AdminsDocument,
  AdminsSchema,
} from '../../schemas/admins.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admins.name) private AdminsModel: Model<AdminsDocument>,
  ) {}

  // async create(createAdminDto: CreateAdminDto): Promise<Admins> {
  //   return new this.AdminModel(createAdminDto).save();
  // }
  async createAdmin(data: LoginAdminDto) {
    try {
      console.log(data);
      const userexist = await this.AdminsModel.findOne({ email: data.email });
      if (userexist) {
        console.log('here at email exist');
        return { message: 'Email Already Exist' };
      }
      const newAdmin = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirm: data.confirm,
        phone: data.phone,
        work: data.work,
      };

      const response = await new this.AdminsModel(newAdmin).save();
      // await saving.save();
      // res.json({ message: "Registered Sucessfully" });
      return { message: 'Registered Sucessfully' };
      //    const response = await new Admin(newAdmin).save();
    } catch (error) {
      console.log(error);
    }
  }

  async loginAdmin(Email: string, Password: string) {
    try {
      console.log('jere');
      // let match, token: string;
      const response = await this.AdminsModel.findOne({ email: Email });
      // async function (err: Error, user: Admins) {
      // if (response) {
      //     match = await bcrypt.compare(Password, response.password);

      //     try {
      //       token = jwt.sign({ _id: this._id }, 'Book');
      //       this.tokens.concat({ token: token });
      //       await this.save();
      //     } catch (err) {
      //       console.log(err);
      //     }
      // console.log('here', Password, response.password);
      let match = false;
      if (Password === response.password) {
        match = true;
      }
      const token = await response.generateauthtoken();
      return { match, token };
      // const match = await bcrypt.compare(Password, response.password);
    } catch (error) {
      console.log(`user not found. ${error}`);
    }
  }
}
