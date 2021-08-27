import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
 
  attribute() {
    this.router.navigateByUrl('dashboard/attribute');
  }
  account() {
    this.router.navigateByUrl('dashboard/accounts');
  }
  costcenter() {
    this.router.navigateByUrl('dashboard/costcenter');
  }
  journal() {
    this.router.navigateByUrl('dashboard/journal');
  }

}
