import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../LoginModel';
import { respond } from '../respond';



@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
} )



export class LoginComponent implements OnInit {
  email: string;
  password: string
  data: LoginModel
  check: boolean
  altermessage: string
  resp: respond = new respond();


  constructor( private router: Router, private http: HttpClient ,private elementRef: ElementRef) { }
  Onsubmit() {
    console.log( "here at submit" )
    this.data = {
      email: this.email,
      password: this.password,
    }


    console.log( this.data )
    this.http
      .post( "http://localhost:5000/signin", this.data, {
        withCredentials: true
      } )
      .subscribe(
        res => {
          {
            console.log(res)
            console.log( res["message"] )
            if ( res["message"] === "loggin succesfully" ) {
              console.log("here at iff condition")
              this.login()
            }
            else {
              this.check = false
              this.altermessage = res["message"]

            }
          }
        },
        err => {
          console.log( err )
          console.log( err["message"] )
        }
      );
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#141c2e';
  }
  register() {
    this.router.navigateByUrl('register');
  }
  login() {
    this.router.navigateByUrl( 'dashboard' );
  }

}
