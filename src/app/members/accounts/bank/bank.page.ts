import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { BankAccount, EntryType } from 'src/app/services/helper-classes';
import { PopoverController } from '@ionic/angular';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.page.html',
  styleUrls: ['./bank.page.scss'],
})
export class BankPage implements OnInit {

  // For form submission purposes only (new entries)
  bankName: string;
  accountHolder: string;
  currentBalance: number;

  constructor(
    private db: DatabaseService,
    private poc: PopoverController
  ) { }

  ngOnInit() {
  }

  get bankAccounts() {
    return this.db.bankAccounts;
  }

  addBankAccount() {
    this.db.bankAccounts.push(new BankAccount(this.bankName, this.accountHolder, this.currentBalance));
  }

  editBankAccount() {

  }

  get entryTypes() {
    return this.db.entryTypes;
  }

  async presentPopover(bankAccount: BankAccount) {
    const popover = await this.poc.create({
      component: EditComponent,
      componentProps: {
        bankAccount
      }
    });
    return await popover.present();
  }

}
