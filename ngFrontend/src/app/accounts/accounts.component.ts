import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { AccountModel } from '../AccountModel';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface UserData {
  name: string;
  Bank: string;
  Balance: number;
  Remarks: string;
}
export interface DialogData {
  name: string;
  Bank: string;
  Balance: number;
  Remarks: string;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  name: string;
  Bank: string;
  Balance: number;
  Remarks: string;
  object: any;
  listData: MatTableDataSource<any>;
  AccountModel: AccountModel;
  displayedColumns: string[] = ['name', 'Bank', 'Balance', 'Remarks'];
  searchKey: string;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAccount, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '450px',
      width: '300px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        name: this.name,
        Bank: this.Bank,
        Balance: this.Balance,
        Remarks: this.Remarks,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.name = result['name'];
      this.Bank = result['Bank'];
      this.Balance = result['Balance'];
      this.Remarks = result['Remarks'];
      this.AccountModel = {
        name: this.name,
        Bank: this.Bank,
        Balance: this.Balance,
        Remarks: this.Remarks,
      };
      this.http
        .post('http://localhost:5000/account', this.AccountModel, {
          withCredentials: true,
        })
        .subscribe(
          (res) => {
            {
              console.log(res['message'] + 'MUBASHIR');
              if (res['message'] === 'Account Added') {
                this.showSuccess();
              }
              this.router
                .navigateByUrl('/accounts', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['/dashboard/accounts']);
                });
            }
          },
          (err) => {
            console.log(err);
            console.log(err['message']);
          }
        );
    });
  }
  columnHeader2 = {
    name: 'Account Holder',
    Bank: 'Bank',
    Balance: 'Balance',
    Remarks: 'Remarks',
    update:'Update',
    delete:'Delete'

  };
  ngOnInit() {
    console.log('ithayyyyyyyyyyy');
    const users: UserData[] = [];
    this.http
      .get('http://localhost:5000/ViewAccount', {
        withCredentials: true,
      })
      .subscribe(
        (res) => {
          this.object = res;
          console.log(this.object, 'dsdslkd');

          for(let i=0;i<this.object.length;i++){
            this.object[i].update="update"
            this.object[i].delete="delete"
          }

          console.log(this.object,"update")

          this.listData = new MatTableDataSource(this.object);
        
        },
        (err) => {
          console.log(err);
        }
      );
    console.log(users);
  }
  showSuccess() {
    this.toastr.success('Successfull!', 'Account Added');
  }
}
@Component({
  selector: 'dialog-account',
  templateUrl: './dialog-account.html',
})
export class DialogAccount {
  constructor(
    public dialogRef: MatDialogRef<DialogAccount>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}