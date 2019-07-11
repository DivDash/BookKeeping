import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

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
      icon: 'contacts'
    },
    {
      title: 'Projects',
      url: 'projects',
      icon: 'today'
    },
    {
      title: 'Journal Entries',
      url: 'journal-entries',
      icon: 'journal'
    }
  ];

  constructor(
    public router: Router,
    private db: DatabaseService
  ) {
    // Load all data
    this.db.loadAccounts();
    this.db.loadProjects();
    this.db.loadJournalEntries();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.router.url === '/members') {
      this.router.navigateByUrl('/members/dashboard');
    }
  }

  gotoUrl(url: string) {
    this.router.navigateByUrl(`/members/${url}`);
  }

}
