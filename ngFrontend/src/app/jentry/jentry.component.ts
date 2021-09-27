import { Component, OnInit } from '@angular/core';
import { FormsComponent } from '../forms/forms.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jentry',
  templateUrl: './jentry.component.html',
  styleUrls: ['./jentry.component.css'],
})
export class JentryComponent implements OnInit {
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
