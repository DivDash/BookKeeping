import { Component, OnInit } from '@angular/core';
import { NonProfit, EntryType } from 'src/app/services/helper-classes';
import { DatabaseService } from 'src/app/services/database.service';
import { PopoverController } from '@ionic/angular';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-non-profit',
  templateUrl: './non-profit.page.html',
  styleUrls: ['./non-profit.page.scss'],
})
export class NonProfitPage implements OnInit {

  name: string;
  particulars: string;

  constructor(
    private db: DatabaseService,
    private poc: PopoverController
  ) {}

  ngOnInit() {
  }

  addNonProfit() {
    this.db.addCostCenter(
      new NonProfit(this.name, this.particulars)
    );
  }

  getAccountById(accountId: string) {
    return this.db.getAccountById(accountId);
  }

  get accounts() {
    return this.db.accounts;
  }

  get entryTypes() {
    return this.db.entryTypes;
  }

  get nonProfits() {
    return this.db.nonProfits;
  }

  async presentPopover(nonProfit: NonProfit) {
    // console.log(nonProfit);
    const popover = await this.poc.create({
      component: EditComponent,
      componentProps: {
        nonProfit
      }
    });

    return await popover.present();
  }

  trackById(item: object, index: number) {
    return item['id'];
  }

}
