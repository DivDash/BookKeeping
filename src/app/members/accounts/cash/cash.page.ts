import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.page.html',
  styleUrls: ['./cash.page.scss'],
})
export class CashPage implements OnInit {

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
  }

  get cashAccounts() {
    return this.db.cashAccounts;
  }

}
