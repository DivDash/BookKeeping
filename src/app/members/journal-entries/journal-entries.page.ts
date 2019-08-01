import { Component, OnInit } from '@angular/core';
import { JournalEntry, BankAccount, CashAccount, Project, NonProfit, Voucher } from 'src/app/services/helper-classes';
import { DatabaseService } from 'src/app/services/database.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.page.html',
  styleUrls: ['./journal-entries.page.scss'],
})
export class JournalEntriesPage implements OnInit {

  journalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.journalForm = this.fb.group({
      debit: this.createDebitField(),
      credit: this.fb.array([this.createCreditField()])
    });

    this.journalForm.valueChanges.subscribe(console.log);
  }

  createDebitField() {
    return this.fb.group({
      costCenter: ['', Validators.required],
      account: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  createCreditField() {
    return this.fb.group({
      account: ['', Validators.required],
      amount: ['', Validators.required],
      entryType: ['', Validators.required],
      particulars: ['']
    });
  }

  addCreditField() {
    this.credit.push(this.createCreditField());
  }

  removeCreditField(index: number) {
    this.credit.removeAt(index);
  }

  addJournalEntries() {
    const journalEntryIds = [];
    this.credit.value.forEach(async credit => {
      const journalEntryId = await this.addJournalEntry(
        this.debit.get('costCenter').value, this.debit.get('account').value,
        credit.account, credit.amount, credit.entryType, credit.particulars,
      );
      journalEntryIds.push(journalEntryId);
    });
    this.db.addVoucher(new Voucher(journalEntryIds));
  }

  // After breaking down into individual entries
  // Transferred amount = creditAmount[i]
  async addJournalEntry(costCenterId: string, debitAccountId: string, creditAccountId: string,
                        amount: number, entryType: string, particulars: string) {
    // TODO: Show loading screen
    // ENTRY
    const journalEntry = await this.db.addJournalEntry(new JournalEntry(
      costCenterId, debitAccountId, creditAccountId, amount, entryType, particulars
    ));
    // MATHEMATICAL CHANGES
    // The three places for change
    const sendingAccount = this.getAccountById(journalEntry.debitAccountId);
    const receivingAccount = this.getAccountById(journalEntry.creditAccountId);
    const costCenter = this.getCostCenterById(journalEntry.costCenterId);
    // Subtract from sending account
    sendingAccount.currentBalance -= journalEntry.amount;
    // Add to receiving account
    receivingAccount.currentBalance += journalEntry.amount;
    // If cost center is project
    if (costCenter instanceof Project) {
      // If money is sent from client
      if (sendingAccount.id === costCenter.clientAccountId) {
        // Transfer from unearned to revenue
        costCenter.unearnedRevenue -= journalEntry.amount;
        costCenter.revenue += journalEntry.amount;
      } else { // Else spent by self
        // Add to expenses
        costCenter.expenses += journalEntry.amount;
      }
    } else if (costCenter instanceof NonProfit) {
      // Else spent on non profit, add to expenses
      costCenter.expenses += journalEntry.amount;
    }
    // Update on server and cache
    await this.db.updateAccount(sendingAccount);
    await this.db.updateAccount(receivingAccount);
    await this.db.updateCostCenter(costCenter);
    return journalEntry.id;
  }

  getCostCenterById(projectId: string) {
    return this.db.getCostCenterById(projectId);
  }

  getAccountById(accountId: string) {
    return this.db.getAccountById(accountId);
  }

  get debit() {
    return this.journalForm.get('debit') as FormGroup;
  }

  get debitAmount() {
    return Number(this.debit.get('amount').value);
  }

  get credit() {
    return this.journalForm.get('credit') as FormArray;
  }

  get creditAmount() {
    let sum = 0;
    this.credit.value.forEach(credit => sum += Number(credit.amount));
    return sum;
  }

  get balanced() {
    return this.debitAmount === this.creditAmount;
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
