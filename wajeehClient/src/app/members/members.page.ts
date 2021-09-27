import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  pages = [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'analytics'
    },
    {
      title: 'Accounts',
      url: 'accounts',
      icon: 'wallet'
    },
    {
      title: 'Cost Center',
      url: 'cost-center',
      icon: 'today'
    },
    {
      title: 'Journal Entries',
      url: 'journal-entries',
      icon: 'journal'
    }
    // ,
    // {
    //   title: 'Sign Out',
    //   icon: 'log-out',
    //   url: 'member.page/logout();'
    // }
  ];

  constructor(
    public router: Router,
    private db: DatabaseService,
    private authService: AuthenticationService
  ) {
    // Load all data
    this.db.loadAccounts();
    this.db.loadCostCenter();
    this.db.loadJournalEntries();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  gotoUrl(url: string) {
    this.router.navigateByUrl(`/members/${url}`);
  }

}
