import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/helper-classes';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  email: string;
  username: string;
  passwordOne: string;
  passwordTwo: string;
  date: Date;
  role: string;

  model: any = { };

  constructor(
    private au: AuthenticationService,

  ) {
    // tslint:disable-next-line: new-parens
    this.date = new Date;
  }

  ngOnInit() {
  }

  register() {
    this.au.register(new User(this.email, this.username, this.passwordOne, this.passwordTwo, this.date, this.role));
  }


}

