import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accounts, AccountsDocument } from 'src/schemas/accounts.schema';
import {
  JournalEntries,
  JournalEntriesDocument,
} from 'src/schemas/journal_entries.schema';
// import { Profits, ProfitsDocument } from 'src/schemas/profits.schema';
// import { ProfitsService } from '../profits/profits.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(JournalEntries.name)
    private JournalEntriesModel: Model<JournalEntriesDocument>,
    // @InjectModel(Profits.name)
    // private ProfitsModel: Model<ProfitsDocument>,
    @InjectModel(Accounts.name)
    private AccountsModel: Model<AccountsDocument>, // private readonly profitsService: ProfitsService
  ) {}
  async createAccountService(
    name: string,
    Bank: string,
    Balance: number,
    Remarks: string,
  ) {
    try {
      console.log('error');
      const saving = new this.AccountsModel({ name, Bank, Balance, Remarks });
      await saving.save();
    } catch (error) {
      console.log(error);
    }
  }
  async viewAccount() {
    const data = await this.AccountsModel.find();
    //   res.send(data);
    return data;
  }
  // async getRefrences(data: any) {
  //   try {
  //     console.log('at refrence');
  //     let ref = [];
  //     const projects = await this.ProfitsModel.find({ Client: data.name });
  //     const entry = await this.JournalEntriesModel.find({
  //       $or: [{ client: data.name }, { receiver: data.name }],
  //     });
  //     for (let i = 0; i < projects.length; i++) {
  //       if (ref.includes(projects[i].Project) === false) {
  //         ref.push(projects[i].Project);
  //       }
  //     }
  //     for (let i = 0; i < entry.length; i++) {
  //       if (ref.includes(entry[i].project) === false) {
  //         ref.push(entry[i].project);
  //       }
  //     }
  //     return ref;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // async update_accounts(data: any) {
  //   try {
  //     let acc_id = data._id;
  //     console.log('updateAccounts temp: ' + acc_id);
  //     const findAccount = await this.AccountsModel.findOne({ _id: data._id });
  //     console.log(findAccount, 'old');
  //     let oldName = findAccount.name;
  //     console.log(oldName, 'oldName');
  //     const updated = await this.AccountsModel.findOneAndUpdate(
  //       { _id: data._id },
  //       {
  //         name: data.name,
  //         Bank: data.Bank,
  //         Balance: data.Balance,
  //         Remarks: data.Remarks,
  //       },
  //     );
  //     const updateProfit = await this.ProfitsModel.updateMany(
  //       { Client: oldName },
  //       { Client: data.name },
  //     );
  //     const updateEntries = await this.JournalEntriesModel.updateMany(
  //       { client: oldName },
  //       { client: data.name },
  //     );
  //     const updateEntriesRec = await this.JournalEntriesModel.updateMany(
  //       { receiver: oldName },
  //       { receiver: data.name },
  //     );
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async deleteAccount(data: any) {
    try {
      console.log(data, 'deleteee');
      // const deleteEntries = await this.JournalEntriesModel.deleteMany({ client: data.name });
      // const deleteProjects = await this.ProfitsModel.deleteMany({ Client: data.name });
      const deleteAccount = await this.AccountsModel.deleteMany({
        name: data.name,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async updateAccounts(data) {
    try {
      console.log('updateAccounts', data);
      let project = data.Project;
      let client = data.Client;
      const queryEntry = { $and: [{ project: project }, { client: client }] };
      const entryExist = await this.JournalEntriesModel.find(queryEntry);
      console.log(data, 'updateRecieverAccount');
      let sum = 0;
      for (let i = 0; i < entryExist.length; i++) {
        sum = sum + entryExist[i].amount;
        const querry = await this.AccountsModel.findOneAndUpdate(
          { name: entryExist[i].receiver },
          {
            $inc: { Balance: -entryExist[i].amount },
          },
          { new: true },
        );
      }
      const querryClient = await this.AccountsModel.findOneAndUpdate(
        { name: client },
        {
          $inc: { Balance: sum },
        },
        { new: true },
      );
      return entryExist;
    } catch (error) {
      console.log(error);
    }
  }
  // async getProjects(data) {
  //   try {
  //     console.log('error');
  //     const projects = await this.ProfitsModel.find({ Client: data.name });
  //     return projects;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }
  findAll() {
    return `This action returns all accounts`;
  }
  findOne(id: number) {
    return `This action returns a #${id} account`;
  }
  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }
  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
