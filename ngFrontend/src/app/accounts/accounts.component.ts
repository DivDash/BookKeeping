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
import { MyserviceService } from 'src/app/services/myservice.service';

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
    private toastr: ToastrService,
    private myservice: MyserviceService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAccount, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '60%',
      width: '25%',
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
        .post('http://localhost:5000/createaccount', this.AccountModel, {
          withCredentials: true,
        })
        .subscribe(
          (res) => {
            {
              console.log(res['message'] + 'MUBASHIR');
              if (res['message'] === 'Account Added') {
                this.showSuccess();
              }
              // this.router
              //   .navigateByUrl('/accounts', { skipLocationChange: true })
              //   .then(() => {
              //     this.router.navigate(['/dashboard/accounts']);
              //   });
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
  };
  ngOnInit() {
    console.log('ithayyyyyyyyyyy');
    const users: UserData[] = [];
    // this.http
    //   .get('http://localhost:5000/ViewAccount', {
    //     withCredentials: true,
    //   })
    this.myservice.getLiveCollection('viewaccount').subscribe(
      (res) => {
        // console.log(res)
        console.log('account' + res);
        console.log(res);
        // console.log(res[0]['name'])
        // res.length
        users.push({
          name: res[0]['name'],
          Bank: res[0]['Bank'],
          Balance: res[0]['Balance'],
          Remarks: res[0]['Remarks'],
        });
        this.object = res;
        console.log(this.object, 'dsdslkd');
        console.log(this.object.length);
        console.log(users);
        this.listData = new MatTableDataSource(this.object);
      },
      (err) => {
        console.log('accountError');

        console.log(err);
      }
    );
    console.log(users);
  }
  showSuccess() {
    this.toastr.success('Successful!', 'Account Added');
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
