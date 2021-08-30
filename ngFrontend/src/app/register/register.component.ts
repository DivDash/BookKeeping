import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../RegisterModel';
import { Router } from '@angular/router';
import { Component, OnInit,ElementRef } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:string
  email:string
  password:string
  confirm:string
  phone:number
  work:string
  altermessage: string
  check:boolean
  data:RegisterModel=new RegisterModel();


  constructor(private router: Router,private http: HttpClient,private elementRef: ElementRef) { }

  Onsubmit(){
    this.data={
    name:this.name,
    email:this.email,
    password:this.password,
    confirm:this.confirm,
    phone:this.phone,
    work:this.work
  }
  console.log(this.data)
  this.http
  .post("http://localhost:5000/registration",this.data,{
  })
    .subscribe(
      res => {
        {
          console.log( res["message"] )
          if ( res["message"] === "Registered Sucessfully" ) {
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

login() {
  this.router.navigateByUrl( 'login' );
}

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#141c2e';
  }

}
