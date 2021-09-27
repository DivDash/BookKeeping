import { Component, OnInit, Input } from '@angular/core';
import { CashAccount } from 'src/app/services/helper-classes';
import { PopoverController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'cash-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  // Coming from cash accounts page
  @Input() cashAccount: CashAccount;
  // For local form usage
  localCashAccount: CashAccount;
  constructor(
    private db: DatabaseService,
    private poc: PopoverController,
    private as: AlertService
  ) { }

  ngOnInit() {
    // Creating a deep copy for local use
    this.localCashAccount = JSON.parse(JSON.stringify(this.cashAccount));
  }

  updateAccount() {
    this.cashAccount.accountHolder = this.localCashAccount.accountHolder;
    this.cashAccount.particulars = this.localCashAccount.particulars;
    this.db.updateAccount(this.cashAccount);
    this.poc.dismiss();
  }

  deleteAccount() {
    this.as.confirmation(
      'Are you sure you want to delete this account?',
      // Confirmation handler
      () => {
        this.db.deleteAccount(this.cashAccount);
        this.poc.dismiss();
      }
    );
  }

  editFormChanged() {
    return this.localCashAccount.particulars !== this.cashAccount.particulars
        || this.localCashAccount.accountHolder !== this.cashAccount.accountHolder ;
  }

}
