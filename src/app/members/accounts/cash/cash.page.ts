import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { CashAccount, BankAccount } from 'src/app/services/helper-classes';
import { PopoverController } from '@ionic/angular';
import { EditComponent } from '../bank/edit/edit.component';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.page.html',
  styleUrls: ['./cash.page.scss'],
})
export class CashPage implements OnInit {

  // For from submission purposes only (new entries)
  particulars: string;
  currentBalance: number;
  
  constructor(
    private db: DatabaseService,
    private poc: PopoverController
  ) { }

  ngOnInit() {
  }

  get cashAccounts() {
    return this.db.cashAccounts;
  }

  addCashAccount() {
    this.db.cashAccounts.push(new CashAccount(this.particulars, this.currentBalance));
  }

  editCashAccount() {

  }

  get entryTypes() {
    return this.db.entryTypes;
  }

  async presentPopover(cashAccount: CashAccount) {
    const popover = await this.poc.create({
      component: EditComponent,
      componentProps: {
        cashAccount
      }
    });
    return await popover.present();
  }

}

