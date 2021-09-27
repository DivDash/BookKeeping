import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NonprofitService } from './nonprofit.service';
import { CreateNonprofitDto } from './dto/create-nonprofit.dto';
import { UpdateNonprofitDto } from './dto/update-nonprofit.dto';

@Controller('nonprofit')
export class NonprofitController {
  constructor(private readonly nonprofitService: NonprofitService) {}

  @Post()
  async createAccount(@Body() body: CreateNonprofitDto) {
    try {
      let check = false;
      console.log('fds');
      console.log(body);
      const { Name, Expense, Remarks, Reason, idClient } = body;
      if (!Name || !Expense || !Remarks || !Reason || !idClient) {
        check = true;
        return { message: 'Fill All The Fields' };
      }
      if (check === false) {
        const response = await this.nonprofitService.createAccountService(
          Name,
          Expense,
          Remarks,
          Reason,
          idClient,
        );

        return { message: 'Account Added' };
      }
    } catch (err) {
      console.log(err);
      return 'there is error cc';
    }
  }

  async viewAccount() {
    try {
      console.log('here at non profit');
      const data = await this.nonprofitService.viewAccount();
      return data;
    } catch (error) {
      const data = await this.nonprofitService.viewAccount();
      return data;
    }
  }

  async deleteAccount(@Body() body: CreateNonprofitDto) {
    try {
      console.log('here at non profit delete');
      const { Name, Expense, Remarks, idClient, Reason } = body;
      console.log(Name, Expense, Remarks, idClient, Reason, 'nonnn');
      const data = await this.nonprofitService.deleteAccountService(
        Name,
        Expense,
        Remarks,
        idClient,
        Reason,
      );
      return data;
    } catch (error) {
      return error;
    }
  }
  async updateNonProfitAccount(@Body() body: CreateNonprofitDto) {
    try {
      console.log('mubashir account update:');
      console.log(body);

      const updateAccounts =
        await this.nonprofitService.update_nonprofit_accounts(body);
      return { message: 'account updatedd' };
    } catch (error) {
      return 'there is error';
    }
  }
}
