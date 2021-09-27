import { Module } from '@nestjs/common';
import { ProfitsService } from './profits.service';
import { ProfitsController } from './profits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profits, ProfitsSchema } from '../../schemas/profits.schema';
import {
  JournalEntries,
  JournalEntriesSchema,
} from 'src/schemas/journal_entries.schema';
import { JournalEntriesService } from '../journal-entries/journal-entries.service';
import { Accounts, AccountsSchema } from 'src/schemas/accounts.schema';
import { AccountsService } from '../accounts/accounts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profits.name, schema: ProfitsSchema }]),
    MongooseModule.forFeature([
      { name: Accounts.name, schema: AccountsSchema },
    ]),
    MongooseModule.forFeature([
      { name: JournalEntries.name, schema: JournalEntriesSchema },
    ]),
  ],
  controllers: [ProfitsController],
  providers: [ProfitsService, JournalEntriesService, AccountsService],
})
export class ProfitsModule {}
