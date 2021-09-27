import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './apis/admins/admins.module';
import { AccountsModule } from './apis/accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfitsModule } from './apis/profits/profits.module';
import { NonprofitModule } from './apis/nonprofit/nonprofit.module';
import { JournalEntriesModule } from './apis/journal-entries/journal-entries.module';

@Module({
  imports: [
    AdminsModule,
    AccountsModule,
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:dbUser@cluster0.1vlv5.mongodb.net/BookKeeping?retryWrites=true',
    ),
    ProfitsModule,
    NonprofitModule,
    JournalEntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
