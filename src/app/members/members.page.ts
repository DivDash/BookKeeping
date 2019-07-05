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
      url: 'dashboard'
    },
    {
      title: 'Accounts',
      url: 'accounts'
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
    this.router.navigateByUrl(`members/${url}`);
  }

}
