import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage {

  constructor(
    private db: DatabaseService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.router.navigateByUrl('/members/accounts/bank');
  }

}
