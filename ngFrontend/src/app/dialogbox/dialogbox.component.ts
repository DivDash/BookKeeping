import { Component, Inject } from '@angular/core';
// import { DialogForm } from '../RegisterModel';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  AccountHolder: string;
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
  AccountHolder: string;
  Bank: string;
  Balance: number;
  Remarks: string;
  check: boolean;
  altermessage: string;
  // data: DialogForm = new DialogForm();

  constructor(public dialog: MatDialog, private http: HttpClient) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '450px',
      width: '300px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        AccountHolder: this.AccountHolder,
        Bank: this.Bank,
        Balance: this.Balance,
        Remarks: this.Remarks,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.AccountHolder = result['AccountHolder'];
      this.Bank = result['Bank'];
      this.Balance = result['Balance'];
      this.Remarks = result['Remarks'];
      console.log(this.Bank);
      this.http.post('http://localhost:5000/accounts', result, {}).subscribe(
        (res) => {
          {
            console.log(res['message']);
            if (res['message'] === 'Registered Sucessfully') {
              console.log('SUCCESSFULL');
              // this.login();
            } else {
              this.check = false;
              this.altermessage = res['message'];
            }
          }
        },
        (err) => {
          console.log(err);
          console.log(err['message']);
        }
      );
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
