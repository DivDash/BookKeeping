import { Injectable } from '@nestjs/common';
import { CreateNonprofitDto } from './dto/create-nonprofit.dto';
import { UpdateNonprofitDto } from './dto/update-nonprofit.dto';
import { NonProfit, NonProfitDocument } from '../../schemas/nonprofit.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Accounts, AccountsDocument } from 'src/schemas/accounts.schema';
@Injectable()
export class NonprofitService {
  constructor(
    @InjectModel(NonProfit.name)
    private NonProfitModel: Model<NonProfitDocument>,
    @InjectModel(Accounts.name)
    private AccountsModel: Model<AccountsDocument>,
  ) {}
  async createAccountService(Name, Expense, Remarks, Reason, idClient) {
    try {
      console.log('create Non profit');

      const querryClient = await this.AccountsModel.findOneAndUpdate(
        { _id: idClient },
        {
          $inc: { Balance: -Expense },
        },
        { new: true },
      );

      const saving = new this.NonProfitModel({
        Name,
        Expense,
        Remarks,
        Reason,
        idClient,
      });
      await saving.save();
    } catch (error) {
      console.log(error);
    }
  }
  async viewAccount() {
    try {
      const data = await this.NonProfitModel.find();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAccountService(Name, Expense, Remarks, idClient, Reason) {
    try {
      console.log('create Non profit delete');

      const querryClient = await this.AccountsModel.findOneAndUpdate(
        { _id: idClient },
        {
          $inc: { Balance: Expense },
        },
        { new: true },
      );

      const deleteNonProfit = await this.NonProfitModel.deleteOne({
        idClient: idClient,
        Name: Name,
        Expense: Expense,
        Remarks: Remarks,
        Reason: Reason,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async update_nonprofit_accounts(data) {
    try {
      let acc_id = data._id;
      console.log('updateAccounts temp: ' + acc_id);

      const old = await this.NonProfitModel.findOne({ _id: data._id });

      const oldClient = await this.AccountsModel.findOneAndUpdate(
        { _id: old.idClient },
        {
          $inc: { Balance: old.Expense },
        },
        { new: true },
      );

      const querryClient = await this.AccountsModel.findOneAndUpdate(
        { _id: data.idClient },
        {
          $inc: { Balance: -data.Expense },
        },
        { new: true },
      );

      const updated = await this.NonProfitModel.findOneAndUpdate(
        { _id: data._id },
        {
          Name: data.Name,
          Expense: data.Expense,
          Remarks: data.Remarks,
          idClient: data.idClient,
          Reason: data.Reason,
        },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
