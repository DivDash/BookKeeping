import { Component, OnInit } from '@angular/core';
import { JournalEntry, BankAccount, CashAccount, Project, NonProfit } from 'src/app/services/helper-classes';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.page.html',
  styleUrls: ['./journal-entries.page.scss'],
})
export class JournalEntriesPage implements OnInit {

  particulars: string;
  costCenterId: string; // Project ID
  receivingAccountId: string; // Account ID
  sendingAccountId: string; // Account ID
  transferredAmount: number;
  typeOfEntry: string;

  constructor(
    private db: DatabaseService
  ) {
  }

  ngOnInit() {
  }

  async addJournalEntry() {
    // TODO: Show loading screen
    // ENTRY
    const journalEntry = await this.db.addJournalEntry(new JournalEntry(
      this.particulars, this.costCenterId, this.receivingAccountId,
      this.sendingAccountId, this.transferredAmount,
      this.typeOfEntry, new Date()
    ));
    // MATHEMATICAL CHANGES
    // The three places for change
    const sendingAccount = this.getAccountById(journalEntry.sendingAccountId);
    const receivingAccount = this.getAccountById(journalEntry.receivingAccountId);
    const costCenter = this.getCostCenterById(journalEntry.costCenterId);
    // Subtract from sending account
    sendingAccount.currentBalance -= journalEntry.transferredAmount;
    // Add to receiving account
    receivingAccount.currentBalance += journalEntry.transferredAmount;
    // If cost center is project
    if (costCenter instanceof Project) {
      // If money is sent from client
      if (sendingAccount.id === costCenter.clientAccountId) {
        // Transfer from unearned to revenue
        costCenter.unearnedRevenue -= journalEntry.transferredAmount;
        costCenter.revenue += journalEntry.transferredAmount;
      } else { // Else spent by self
        // Add to expenses
        costCenter.expenses += journalEntry.transferredAmount;
      }
    } else if (costCenter instanceof NonProfit) {
      // Else spent on non profit, add to expenses
      costCenter.expenses += journalEntry.transferredAmount;
    }
  }

  getCostCenterById(projectId: string) {
    return this.db.getCostCenterById(projectId);
  }

  getAccountById(accountId: string) {
    return this.db.getAccountById(accountId);
  }

  get journalEntries() {
    return this.db.journalEntries;
  }

  get costCenter() {
    return this.db.costCenter;
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
