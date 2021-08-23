import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { TableComponent } from '../layouts/table/table.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountModel } from '../AccountModel';

export interface DialogData {
  name: string;
  Bank: string;
  Balance: number;
  Remarks: string;
}
@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css'],
})
export class DialogboxComponent {
  name: string;
  Bank: string;
  Balance: number;
  Remarks: string;
  AccountModel:AccountModel
  location: any;
  tableclass:TableComponent


  constructor(public dialog: MatDialog,private http: HttpClient, private router:Router) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      panelClass: 'my-dialog',
      data: {
        name: this.name,
        Bank: this.Bank,
        Balance: this.Balance,
        Remarks: this.Remarks,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result)
      this.name = result['name'];
      this.Bank = result['Bank'];
      this.Balance = result['Balance'];
      this.Remarks = result['Remarks'];
      this.AccountModel={
        name: this.name,
        Bank: this.Bank,
        Balance: this.Balance,
        Remarks: this.Remarks
      }
      this.http
      .post( "http://localhost:5000/account",this.AccountModel, {
        withCredentials: true
      } )
      .subscribe(
        res => {
          {
            console.log( res["message"] )
            this.router.navigateByUrl('/accounts', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/dashboard/accounts']);
          }); 
          }; 
          
        },
        err => {
          console.log( err )
          console.log( err["message"] )
        }
      )
    });
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
