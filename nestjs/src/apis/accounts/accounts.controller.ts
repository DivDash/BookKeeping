import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('createaccount')
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    try {
      let check = false;
      const { name, Bank, Balance, Remarks } = createAccountDto;
      if (!name || !Bank || !Balance || !Remarks) {
        check = true;
        return { message: 'Fill All The Fields' };
      }
      if (check === false) {
        const response = await this.accountsService.createAccountService(
          name,
          Bank,
          Balance,
          Remarks,
        );
        //   const saving = new AccountModel({ name, Bank, Balance, Remarks });
        //   await saving.save();
        return { message: 'Account Added' };
      }
    } catch (err) {
      console.log(err);
      return 'there is error';
    }
  }
  @Get('viewaccount')
  async viewAccount() {
    try {
      const data = await this.accountsService.viewAccount();
      console.log('data', data);
      return data;
    } catch (error) {
      return 'there is error';
    }
  }

  // @Delete('deleteaccount')
  // async deleteAccount(@Body() createAccountDto: CreateAccountDto) {
  //   try {
  //     // const projects = await AccountService.getProjects(createAccountDto);
  //     // console.log(projects);

  //     // for (let i = 0; i < projects.length; i++) {
  //     //   const updateAccounts = await AccountService.updateAccounts(projects[i]);
  //     // }

  //     const getRefrences = await this.accountsService.getRefrences(
  //       createAccountDto,
  //     );

  //     // const deleteAccount = await AccountService.deleteAccount(createAccountDto);

  //     console.log(getRefrences);

  //     if (getRefrences.length === 0) {
  //       const deleteAccount = await this.accountsService.deleteAccount(
  //         createAccountDto,
  //       );
  //       return { message: 'account deleted' };
  //     } else {
  //       return {
  //         message: 'account not deleted',
  //         getRefrences: getRefrences,
  //       };
  //     }
  //   } catch (error) {
  //     return 'there is error';
  //   }
  // }

  // @Post('updateaccount')
  // async updateAccount(@Body() createAccountDto: CreateAccountDto) {
  //   try {
  //     console.log('mubashir account update:');
  //     console.log(createAccountDto);

  //     const updateAccounts = await this.accountsService.update_accounts(
  //       createAccountDto,
  //     );
  //     return { message: 'account updatedd' };
  //   } catch (error) {
  //     return 'there is error';
  //   }
  // }
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
