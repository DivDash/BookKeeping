import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { DatabaseService } from '../../services/database.service';
import { BankAccount } from 'src/app/services/helper-classes';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string ;
  password: string ;


  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }

}
