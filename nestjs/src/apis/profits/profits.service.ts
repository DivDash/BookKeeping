import { Injectable } from '@nestjs/common';
import { CreateProfitDto } from './dto/create-profit.dto';
import { UpdateProfitDto } from './dto/update-profit.dto';
import { Profits, ProfitsDocument } from '../../schemas/profits.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfitsService {
  constructor(
    @InjectModel(Profits.name) private ProfitsModel: Model<ProfitsDocument>,
  ) {}
  async createProfitProject(body: any) {
    try {
      const {
        Project,
        Client,
        Receivable,
        Revenue,
        Expense,
        Date,
        Status,
        idClient,
      } = body;

      const newProfitProject = {
        Project,
        Client,
        Receivable,
        Revenue,
        Expense,
        Date,
        Status,
        idClient,
      };
      const saving = await new this.ProfitsModel(newProfitProject).save();
      return saving;
    } catch (error) {
      console.log(error);
    }
  }
  async getProfitProject() {
    try {
      let data = await this.ProfitsModel.find();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProject(data) {
    try {
      console.log(data, 'deleteee from profitt');

      const deleteProject = await this.ProfitsModel.deleteMany({
        Project: data.Project,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async update_profit_accounts(data) {
    try {
      const acc_id = data._id;
      console.log('updateAccounts temp: ' + acc_id);
      const findProject = await this.ProfitsModel.findOne({ _id: data._id });
      // console.log(findProject, 'old');
      const oldProject = findProject.Project;
      const oldClient = findProject.Client;
      // console.log(oldProject, 'oldName');
      const updated = await this.ProfitsModel.findOneAndUpdate(
        { _id: data._id },
        {
          Project: data.Project,
          Client: data.Client,
          Receivable: data.Receivable,
          Revenue: data.Revenue,
          Expense: data.Expense,
          Date: data.Date,
          Status: data.Status,
        },
      );
      // const updateEntries = await entries.updateMany(
      //   { project: oldProject },
      //   { project: data.Project },
      // );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async validateProfitProject(data: any) {
    try {
      const { Project } = data;

      const query = { Project: Project };
      const projectExist = await this.ProfitsModel.find(query);

      return projectExist;
    } catch (error) {
      console.log(error);
    }
  }
}
