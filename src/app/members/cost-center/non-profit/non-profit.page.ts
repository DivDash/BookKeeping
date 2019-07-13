import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { NonProfit } from 'src/app/services/helper-classes';

@Component({
  selector: 'app-non-profit',
  templateUrl: './non-profit.page.html',
  styleUrls: ['./non-profit.page.scss'],
})
export class NonProfitPage implements OnInit {

  name: string;
  particulars: string;

  constructor(
    private db: DatabaseService
  ) {}

  ngOnInit() {
  }

  addNonProfit() {
    this.db.addCostCenter(
      new NonProfit(this.name, this.particulars)
    );
  }

  get nonProfits() {
    return this.db.nonProfits;
  }

}
