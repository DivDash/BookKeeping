import { Module } from '@nestjs/common';
import { JournalEntriesService } from './journal-entries.service';
import { JournalEntriesController } from './journal-entries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profits, ProfitsSchema } from 'src/schemas/profits.schema';
import { Accounts, AccountsSchema } from 'src/schemas/accounts.schema';
import {
  JournalEntries,
  JournalEntriesSchema,
} from 'src/schemas/journal_entries.schema';
import { ProfitsService } from '../profits/profits.service';
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
  controllers: [JournalEntriesController],
  providers: [JournalEntriesService, ProfitsService, AccountsService],
})
export class JournalEntriesModule {}
