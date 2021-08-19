import { Component, OnInit } from '@angular/core';

export interface UserData {
  accountHolder: string;
  bank: string;
  balance: number;
  remarks: string;
}
const field = [
  { id: '101', name: 'A', email: 'abc.com', website: 'pk.com' },
  { id: '102', name: 'B', email: 'xyz.com', website: 'fb.com' },
  { id: '101', name: 'A', email: 'abc.com', website: 'pk.com' },
];

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  constructor() {}

  griddata: any[];
  isEdit: boolean;
  coldata = [
    { field: 'id', header: 'Sr No' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'phone' },
    { field: 'website', header: 'bank' },
  ];

  ngOnInit() {
    this.loaddata();
  }
  loaddata() {
    this.griddata = field;
  }
}
