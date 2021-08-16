import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#141c2e';
  }
  register() {
    this.router.navigateByUrl('register');
  }
  login() {
    this.router.navigateByUrl('dashboard');
  }

}
