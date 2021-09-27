import { Module } from '@nestjs/common';
import { NonprofitService } from './nonprofit.service';
import { NonprofitController } from './nonprofit.controller';
import { Profits, ProfitsSchema } from 'src/schemas/profits.schema';
import { Accounts, AccountsSchema } from 'src/schemas/accounts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  JournalEntries,
  JournalEntriesSchema,
} from 'src/schemas/journal_entries.schema';
import { JournalEntriesService } from '../journal-entries/journal-entries.service';
import { AccountsService } from '../accounts/accounts.service';
import { NonProfit, NonProfitSchema } from 'src/schemas/nonprofit.schema';
import { ProfitsService } from '../profits/profits.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NonProfit.name, schema: NonProfitSchema },
    ]),
    MongooseModule.forFeature([
      { name: Accounts.name, schema: AccountsSchema },
    ]),
    MongooseModule.forFeature([
      { name: JournalEntries.name, schema: JournalEntriesSchema },
    ]),
    MongooseModule.forFeature([{ name: Profits.name, schema: ProfitsSchema }]),
  ],
  controllers: [NonprofitController],
  providers: [
    NonprofitService,
    JournalEntriesService,
    AccountsService,
    ProfitsService,
  ],
})
export class NonprofitModule {}
