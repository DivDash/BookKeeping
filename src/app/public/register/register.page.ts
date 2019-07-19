import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/services/helper-classes';

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

  constructor(
    private db: DatabaseService,

  ) { }

  ngOnInit() {
  }

  register() {
    this.db.register(new User(this.email, this.username, this.passwordOne, this.passwordTwo, this.date, this.role));
  }


}
