import { Component, OnInit } from '@angular/core';
import { JournalEntry, BankAccount, CashAccount } from 'src/app/services/helper-classes';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.page.html',
  styleUrls: ['./journal-entries.page.scss'],
})
export class JournalEntriesPage implements OnInit {

  particulars: string;
  project: string; // Project ID
  receivingAccount: string; // Account ID
  sendingAccount: string; // Account ID
  creditedAmount: number;
  debitedAmount: number;
  typeOfEntry: string;

  constructor(
    private db: DatabaseService
  ) {
  }

  ngOnInit() {
  }

  addJournalEntry() {
    this.db.addJournalEntry(
      new JournalEntry(
        this.particulars, this.project, this.receivingAccount,
        this.sendingAccount, this.creditedAmount, this.debitedAmount,
        this.typeOfEntry, new Date()
      )
    );
  }

  get journalEntries() {
    return this.db.journalEntries;
  }

  get projects() {
    return this.db.projects;
  }

  get accounts(): {
    bankAccounts: Array<BankAccount>,
    cashAccounts: Array<CashAccount>
  } {
    return {
      bankAccounts: this.db.bankAccounts,
      cashAccounts: this.db.cashAccounts
    };
  }

  get entryTypes() {
    return this.db.entryTypes;
  }

}
