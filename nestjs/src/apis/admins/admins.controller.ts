import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import jwt from 'jsonwebtoken';
import { Cookies } from 'src/middlewares/cookies';
import {
  Admins,
  AdminsDocument,
  AdminsSchema,
} from '../../schemas/admins.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Request } from 'express';

import { IGetUserAuthInfoRequest } from './definitionfile';
import { Model } from 'mongoose';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    @InjectModel(Admins.name) private AdminsModel: Model<AdminsDocument>,
  ) {}

  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminsService.create(createAdminDto);
  // }
  @Post('registration')
  async create_admin(@Body() body: LoginAdminDto, @Res() res: Response) {
    try {
      console.log(body);
      console.log('body');

      let check = false;
      const { name, email, password, confirm, phone, work } = body;

      if (!name || !email || !password || !confirm || !phone || !work) {
        check = true;
        return { message: 'Fill The Full Form' };
      }
      if (password !== confirm) {
        check = true;
        return { message: "Confirm Password Dosen't Match" };
      }

      if (check === false) {
        console.log('here at saving');
        const createdAdmin = await this.adminsService.createAdmin(body);
        console.log(createdAdmin, 'adminnnn');
        res.json(createdAdmin);
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  @Post('signin')
  async login_admin(@Body() body: LoginAdminDto, @Res() res: Response) {
    try {
      let { email, password } = body;
      console.log(email, password);
      if (!email || !password) {
        return { message: 'Fill The Full Form' };
      } else {
        const { match, token } = await this.adminsService.loginAdmin(
          email,
          password,
        );
        console.log('after service', match, token);
        if (match) {
          console.log('after service3');

          res.cookie('Book', token, {
            expires: new Date(Date.now() + 864000000),
            httpOnly: false,
          });
          console.log('here at sucess');
          res.json({ message: 'loggin succesfully' });
        }
        console.log('after service2');

        if (!match) {
          res.json({ message: 'Invalid Credentials' });
        }
      }
    } catch (error) {
      console.log('here at error');
      res.status(500).json({ error: error });
    }
  }

  async getAdmin(
    @Cookies('Book') token: string,
    request: IGetUserAuthInfoRequest,
    @Res() res: Response,
  ) {
    try {
      // Authenticate;
      try {
        // const token = request.cookies.Book;
        // const infos = jwt.verify(token, 'Book');
        // const id = infos._id;
        const rootuser = await this.AdminsModel.findOne({
          _id: jwt.verify(token, 'Book'),
          'tokens.token': token,
        });
        if (!rootuser) {
          res.status(422).json({ error: 'error' });
        }
        // request = {token, rootuser, rootuser._id}
        request.token = token;
        request.rootuser = rootuser;
        request.userID = rootuser._id;
      } catch (error) {
        console.log(error);
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error: 'error' });
      }
      console.log(request.rootuser, 'hello');
      return request.rootuser;
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  // async adminLogout(@Res({ passthrough: true }) response: Response) {
  //   response.clearCookie('Book', { path: '/' });
  //   response.status(200).json({ message: 'success' });
  // }
  @Get('Logout')
  async adminLogout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('Book', { path: '/' });
    res.status(200).json({ message: 'success' });
  }
}
