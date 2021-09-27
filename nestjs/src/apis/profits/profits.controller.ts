import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfitsService } from './profits.service';
import { CreateProfitDto } from './dto/create-profit.dto';
import { UpdateProfitDto } from './dto/update-profit.dto';
import { JournalEntriesService } from '../journal-entries/journal-entries.service';

@Controller('profits')
export class ProfitsController {
  constructor(
    private readonly profitsService: ProfitsService,
    private readonly journalEntriesService: JournalEntriesService,
  ) {}

  @Post('create')
  async createProfitProject(@Body() body: CreateProfitDto) {
    try {
      console.log('here at profitt');
      let check = false;
      const {
        Project,
        idClient,
        Client,
        Receivable,
        Revenue,
        Expense,
        Date,
        Status,
      } = body;
      console.log(
        Project,
        idClient,
        Client,
        Receivable,
        Revenue,
        Expense,
        Date,
        Status,
        'projecttt',
      );

      if (!Project || !Client || !Receivable || !Date || !Status || !idClient) {
        check = true;
        return { message: 'Fill The Full Form' };
      }

      const projectExist = await this.profitsService.validateProfitProject(
        body,
      );
      console.log(projectExist, 'nestttt');
      if (projectExist.length !== 0) {
        check = true;
        return { message: 'Project Exist Change The Name' };
      }

      if (check === false) {
        let createProfit = await this.profitsService.createProfitProject(body);
        return { message: 'Project with Client Added' };
      }
    } catch (error) {
      console.log('here at error');
      return 'error';
    }
  }

  async getProfitProject() {
    try {
      let getProjects = await this.profitsService.getProfitProject();
      return getProjects;
    } catch (error) {
      return error;
    }
  }

  async deleteProfitProject(@Body() body: CreateProfitDto) {
    try {
      console.log('delete profittt');
      let option;
      let projObject = {
        project: body.Project,
      };
      const entries = await this.journalEntriesService.getJournalEntries(
        projObject,
      );
      console.log(entries, 'entries');

      for (let i = 0; i < entries.length; i++) {
        console.log('for loop');

        if (entries[i].client === body.Client) {
          console.log('clientt');
          option = 'client';
        } else {
          console.log('non-clientt');
          option = 'non-client';
        }
        console.log('profitttt');
        let object = {
          entries: entries[i],
          option: option,
        };
        console.log('profitttt2222');
        console.log(object, 'objectt');

        const deleteEntry = await this.journalEntriesService.deleteEntry(
          object,
        );
      }

      const deleteAccount = await this.profitsService.deleteProject(body);

      return { message: 'account deleted' };
    } catch (error) {
      return 'there is error';
    }
  }

  async updateProfitAccount(@Body() body: CreateProfitDto) {
    try {
      console.log('mubashir account update:');
      console.log(body);

      const updateAccounts = await this.profitsService.update_profit_accounts(
        body,
      );
      return { message: 'account updatedd' };
    } catch (error) {
      return 'there is error';
    }
  }
}
