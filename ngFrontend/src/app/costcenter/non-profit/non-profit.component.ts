import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NonProfitModel } from 'src/app/NonProfitModel';
import { MyserviceService } from 'src/app/services/myservice.service';

export interface UserData {
  Name: string;
  Expense: number;
  Remarks: string;
}
export interface DialogData {
  Name: string;
  Expense: number;
  Remarks: string;
}

@Component({
  selector: 'app-non-profit',
  templateUrl: './non-profit.component.html',
  styleUrls: ['./non-profit.component.css'],
})
export class NonProfitComponent implements OnInit {
  Name: string;
  Expense: number;
  Remarks: string;
  object: any;
  listData: MatTableDataSource<any>;
  NonProfitModel: NonProfitModel;
  displayedColumns: string[] = ['Name', 'Expense', 'Remarks'];
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private myservice:MyserviceService
  ) {}
  columnHeader2 = {
    Name: 'Name',
    Expense: 'Expense',
    Remarks: 'Remarks',
  };
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNonProfit, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '400px',
      width: '300px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        Name: this.Name,
        Expense: this.Expense,
        Remarks: this.Remarks,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.Name = result['Name'];
      this.Expense = result['Expense'];
      this.Remarks = result['Remarks'];
      this.NonProfitModel = {
        Name: this.Name,
        Expense: this.Expense,
        Remarks: this.Remarks,
      };
      // this.http
      //   .post('http://localhost:5000/accountnonprofit', this.NonProfitModel, {
      //     withCredentials: true,
      //   })
        this.myservice.createAccountNonProfit(this.NonProfitModel)
        .subscribe(
          (res) => {
            {
              // console.log(res['message']);
              // this.router
              //   .navigateByUrl('/accounts', { skipLocationChange: true })
              //   .then(() => {
              //     this.router.navigate(['/dashboard/costcenter']);
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
  ngOnInit() {
    console.log('ithayyyyyyyyyyy');
    const users: UserData[] = [];
    // this.http
    //   .get('http://localhost:5000/ViewAccountNonProfit', {
    //     withCredentials: true,
    //   })
      this.myservice.viewAccountNonProfit()
      .subscribe(
        (res) => {
          // console.log(res)
          console.log(res);
          // console.log(res[0]['name'])
          // res.length
          users.push({
            Name: res[0]['Name'],
            Expense: res[0]['Expense'],
            Remarks: res[0]['Remarks'],
          });
          this.object = res;
          console.log(this.object, 'dsdslkd');
          console.log(this.object.length);
          console.log(users);
          this.listData = new MatTableDataSource(this.object);
        },
        (err) => {
          console.log(err);
        }
      );

    //socket
  //   this.myservice.getLiveCollection('viewAccountNonProfit').
  //   subscribe(
  //     (res) => {
  //       // console.log(res)
  //       console.log(res);
  //       // console.log(res[0]['name'])
  //       // res.length
  //       users.push({
  //         Name: res[0]['Name'],
  //         Expense: res[0]['Expense'],
  //         Remarks: res[0]['Remarks'],
  //       });
  //       this.object = res;
  //       console.log(this.object, 'dsdslkd');
  //       console.log(this.object.length);
  //       console.log(users);
  //       this.listData = new MatTableDataSource(this.object);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  //   console.log(users);
  }
}
@Component({
  selector: 'dialog-non-profit',
  templateUrl: './dialog-non-profit.html',
})
export class DialogNonProfit {
  constructor(
    public dialogRef: MatDialogRef<DialogNonProfit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
