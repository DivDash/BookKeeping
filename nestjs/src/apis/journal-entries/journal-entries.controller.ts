import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JournalEntriesService } from './journal-entries.service';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { UpdateJournalEntryDto } from './dto/update-journal-entry.dto';

@Controller('journal-entries')
export class JournalEntriesController {
  constructor(private readonly journalEntriesService: JournalEntriesService) {}

  @Post()
  async createJournalEntries(@Body() body: CreateJournalEntryDto) {
    //non-client

    try {
      console.log('1');
      console.log(body);
      console.log(body.newDivs, 'data');
      let data = body.newDivs;
      console.log(body.option, 'option');
      let option = body.option;

      let check = false;
      let projectExist = await this.journalEntriesService.validateProfitProject(
        data,
      );
      console.log(projectExist, 'hellooo');

      if (projectExist.length === 0) {
        console.log('2');
        check = true;
        return { message: 'Project with This Client Dosent exist' };
      }

      if (check === false) {
        console.log('3');
        const accountExist = await this.journalEntriesService.validateAccount(
          data,
        );

        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum = sum + data[i].amount;
        }
        let exp = projectExist[0].Expense + sum;
        let rec = projectExist[0].Receivable - sum;
        let rev = projectExist[0].Revenue + sum;

        console.log(exp, 'revExp');

        if (option === 'non-client') {
          const updateProfit =
            await this.journalEntriesService.updateProfitProject(data, exp);
        }

        if (option === 'client') {
          const updateProfit =
            await this.journalEntriesService.updateClientProfitProject(
              data,
              rec,
              rev,
            );
        }

        let bal = accountExist.Balance - sum;

        let updateAccount = await this.journalEntriesService.updateAccount(
          data,
          bal,
        );

        let awain = accountExist.Balance - 69;

        let updateRecieverAccount =
          await this.journalEntriesService.updateReceiverAccount(data);

        let awain2 = accountExist.Balance - 69;

        const saveEntries =
          await this.journalEntriesService.createJournalEntries(data);

        return { message: 'Entries are added' };
      }
    } catch (error) {
      console.log('4');
      return { message: 'error' };
    }
  }

  async getJournalEntries(@Body() body: CreateJournalEntryDto) {
    try {
      console.log('here at viewEntry');
      let check = false;
      // let data = {client:"Zain",project:"FinalProj"}

      let projectExist = await this.journalEntriesService.validateProject(body);

      if (projectExist.length === 0) {
        check = true;
        return { message: 'Project With The Non-Client Is Selected' };
      }

      if (check === false) {
        console.log(projectExist);

        let getEntries = await this.journalEntriesService.getJournalEntries(
          body,
        );

        return { message: 'Success', getEntries };
      }
    } catch (error) {
      return 'error';
    }
  }
  async getJournalEntriesParams(@Param('project') project: string) {
    try {
      console.log('here at viewEntry');
      let check = false;
      // console.log(req.query.project);
      // let data = { project: req.query.project };
      let data = project;
      let projectExis = await this.journalEntriesService.validateProject(data);

      if (projectExis.length === 0) {
        check = true;
        return { message: 'Project With The Non-Client Is Selected' };
      }

      if (check === false) {
        console.log(projectExis);

        let getEntrie = await this.journalEntriesService.getJournalEntries(
          data,
        );

        let objectEntries = {
          getEntries: getEntrie,
          projectExist: projectExis,
        };

        //  return({message:"Success",getEntries})
        console.log(objectEntries, 'objectEntries');
        return objectEntries;
      }
    } catch (error) {
      return 'error';
    }
  }

  async deleteJournalEntry(@Body() body: CreateJournalEntryDto) {
    try {
      console.log('delete entryy');
      let data = [];
      let option;
      data[0] = body;
      const project = await this.journalEntriesService.validateProfitProject(
        data,
      );
      console.log(project, 'project');
      console.log(project[0].Client, 'project.Client');
      console.log(body.client, 'body.client');
      let projClient = project[0].idClient;

      if (projClient === body.idClient) {
        option = 'client';
      } else {
        option = 'non-client';
      }

      let object = {
        entries: body,
        option: option,
      };

      const deleteEntry = await this.journalEntriesService.deleteEntry(object);

      return { message: 'Entry deleted' };
    } catch (error) {
      return 'there is error';
    }
  }

  async updateJournalEntries(@Body() body: CreateJournalEntryDto) {
    try {
      console.log('mubashir account updateING:');
      console.log(body, 'entryUpdate');

      const updateAccounts =
        await this.journalEntriesService.update_journal_accounts(body);
      return { message: 'account updatedd' };
    } catch (error) {
      return 'there is error';
    }
  }
  @Get()
  findAll() {
    return this.journalEntriesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journalEntriesService.findOne(+id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJournalEntryDto: UpdateJournalEntryDto,
  ) {
    return this.journalEntriesService.update(+id, updateJournalEntryDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalEntriesService.remove(+id);
  }
}
