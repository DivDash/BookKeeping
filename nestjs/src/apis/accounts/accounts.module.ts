import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profits, ProfitsSchema } from 'src/schemas/profits.schema';
import { Accounts, AccountsSchema } from 'src/schemas/accounts.schema';
import {
  JournalEntries,
  JournalEntriesSchema,
} from 'src/schemas/journal_entries.schema';
import { ProfitsService } from '../profits/profits.service';
import { JournalEntriesService } from '../journal-entries/journal-entries.service';
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
  controllers: [AccountsController],
  providers: [JournalEntriesService, ProfitsService, AccountsService],
})
export class AccountsModule {}
