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
  name: string;
  passwordOne: string;
  passwordTwo: string;
  date: Date;
  role: string;

  model: any = { };

  constructor(
    private au: AuthenticationService,

  ) {
    this.date = new Date();
  }

  ngOnInit() {
  }

  register() {
    this.au.register(new User(this.email, this.name, this.role), this.passwordOne);
  }


}

