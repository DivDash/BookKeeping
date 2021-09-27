import { Component, OnInit, Input } from '@angular/core';
import { BankAccount } from 'src/app/services/helper-classes';
import { PopoverController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'bank-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  // Coming from bank accounts page
  @Input() bankAccount: BankAccount;
  // For local form usage
  localBankAccount: BankAccount;

  constructor(
    private db: DatabaseService,
    private poc: PopoverController,
    private as: AlertService
  ) { }

  ngOnInit() {
    // Creating a deep copy for local use
    this.localBankAccount = JSON.parse(JSON.stringify(this.bankAccount));
  }

  updateAccount() {
    this.bankAccount.accountHolder = this.localBankAccount.accountHolder;
    this.bankAccount.bankName = this.localBankAccount.bankName;
    this.db.updateAccount(this.bankAccount).then(console.log);
    this.poc.dismiss();
  }

  deleteAccount() {
    this.as.confirmation(
      'Are you sure you want to delete this account?',
      // Confirmation handler
      () => {
        this.db.deleteAccount(this.bankAccount);
        this.poc.dismiss();
      }
    );
  }

  editFormChanged() {
    return this.localBankAccount.bankName !== this.bankAccount.bankName
        || this.localBankAccount.accountHolder !== this.bankAccount.accountHolder;
  }

}
