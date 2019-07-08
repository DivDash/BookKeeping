import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      title: 'Journal Entries',
      url: 'journal-entries',
      icon: 'journal'
    }
  ];

  constructor(
    public router: Router
  ) {
    if (router.url === '/members') {
      router.navigateByUrl('/members/dashboard');
    }
  }

  ngOnInit() {
  }

  gotoUrl(url: string) {
    this.router.navigateByUrl(`/members/${url}`);
  }

}
