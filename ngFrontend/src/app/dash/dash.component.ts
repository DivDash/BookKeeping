import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit {
  sideBarOpen = true;
  constructor(private cookieService: CookieService, private router: Router) {
    let token_value = cookieService.get('Book');
    console.log('VALUEE:', token_value);
    if (!token_value) {
      this.router.navigateByUrl('login');
    }
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngOnInit() {
    let token_value = this.cookieService.get('Book');
    console.log('VALUEE:', token_value);
    if (!token_value) {
      this.router.navigateByUrl('login');
    }
  }
}
