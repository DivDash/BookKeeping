import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-costcenter',
  templateUrl: './costcenter.component.html',
  styleUrls: ['./costcenter.component.css'],
})
export class CostcenterComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {
    let token_value = cookieService.get('Book');
    console.log('VALUEE:', token_value);
    if (!token_value) {
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit() {
    let token_value = this.cookieService.get('Book');
    console.log('VALUEE:', token_value);
    if (!token_value) {
      this.router.navigateByUrl('login');
    }
  }
}
