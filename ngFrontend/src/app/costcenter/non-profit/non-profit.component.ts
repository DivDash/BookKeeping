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
import { ToastrService } from 'ngx-toastr';

export interface UserData {
  Name: string;
  Expense: number;
  Remarks: string;
  Reason:string;
}
export interface DialogData {
  Name: string;
  Expense: number;
  Remarks: string;
  Reason:string
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
  Reason:string
  object: any;
  idClient:any
  listData: MatTableDataSource<any>;
  NonProfitModel: NonProfitModel;
  clients: string[] = [];
  clientsBank:string[]=[]
  ids:string[]=[]

  displayedColumns: string[] = ['Name', 'Expense', 'Reason','Remarks'];
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private myservice: MyserviceService,
    private toastr: ToastrService
  ) {


    this.myservice.getLiveCollection('viewaccount').subscribe(
      (res) => {
        console.log('resss');
        this.object = res;
        for (let i = 0; i < this.object.length; i++) {

          this.clients.push(this.object[i]['name']);
          this.clientsBank.push(this.object[i]['name']+"-"+this.object[i]['Bank'])
          this.ids.push(this.object[i]['_id'])

        }
        console.log(this.clients, 'here at  non profittt');
      },
      (err) => {
        console.log('resss');
        console.log(err);
      }
    );


  }
  columnHeader2 = {
    Name: 'Name',
    Expense: 'Expense',
    Reason:'Reason',
    Remarks: 'Remarks',
    update: ' ',
    delete: ' ',
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
        Reason:this.Reason
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.Name = result['Name'];
      this.idClient=this.ids[this.clientsBank.indexOf(this.Name)]
      this.Name=this.Name.substr(0,this.Name.indexOf("-"))
      this.Expense = result['Expense'];
      this.Remarks = result['Remarks'];
      this.Reason=result['Reason']
      this.NonProfitModel = {
        Name: this.Name,
        Expense: this.Expense,
        Remarks: this.Remarks,
        Reason:this.Reason,
        idClient:this.idClient
      };
      
      console.log(this.NonProfitModel,"non profit modelllll")
      this.myservice.createAccountNonProfit(this.NonProfitModel).subscribe(
        (res) => {
          {
            if (res['message'] === 'Account Added') {
              this.showSuccess();
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
  ngOnInit() {
    console.log('ithayyyyyyyyyyy');
    const users: UserData[] = [];

    this.myservice.getLiveCollection('viewaccountnonprofit').subscribe(
      (res) => {
        // console.log(res)
        console.log(res);

        this.object = res;

        for (let i = 0; i < this.object.length; i++) {
          this.object[i].update = 'update';
          this.object[i].delete = 'delete';
        }

        this.listData = new MatTableDataSource(this.object);
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(users);
  }
  showSuccess() {
    this.toastr.success('Successful!', 'Entry Added');
  }
}
@Component({
  selector: 'dialog-non-profit',
  templateUrl: './dialog-non-profit.html',
})
export class DialogNonProfit {
  clients: string[] = [];
  object: any;
  clientsBank:string[]=[]
  ids:string[]=[]
  constructor(
    public dialogRef: MatDialogRef<DialogNonProfit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private myservice: MyserviceService
  ) {
    this.myservice.getLiveCollection('viewaccount').subscribe(
      (res) => {
        console.log('resss');
        this.object = res;
        for (let i = 0; i < this.object.length; i++) {

          this.clients.push(this.object[i]['name']);
          this.clientsBank.push(this.object[i]['name']+"-"+this.object[i]['Bank'])
          this.ids.push(this.object[i]['_id'])

        }
        console.log(this.clients, 'here at  non profittt');
      },
      (err) => {
        console.log('resss');
        console.log(err);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
