import { Component, Inject } from '@angular/core';
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

  constructor(public dialog: MatDialog) {}

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
      console.log('The dialog was closed');
      this.AccountHolder = result;
      this.Bank = result;
      this.Balance = result;
      this.Remarks = result;
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
