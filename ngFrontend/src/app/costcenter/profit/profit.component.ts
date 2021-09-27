import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfitModel } from 'src/app/ProfitModel';
import { MyserviceService } from 'src/app/services/myservice.service';

export interface UserData {
  Client: string;
  Project: string;
  Receivable: number;
  Revenue: number;
  Expense: number;
  Date: string;
  Status: string;
}
export interface DialogData {
  Client: string;
  Project: string;
  Receivable: number;
  Revenue: number;
  Expense: number;
  Date: string;
  Status: string;
}

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.css'],
})
export class ProfitComponent implements OnInit {
  Client: string;
  idClient:string
  Project: string;
  Receivable: number;
  Revenue: number;
  Expense: number;
  Date: string;
  Status: string;
  object: any;
  listData: MatTableDataSource<any>;
  clients:string[]=[]
  clientsBank:string[]=[]
  ids:string[]=[]
  ProfitModel: ProfitModel;

  displayedColumns: string[] = [
    'Client',
    'Project',
    'Receivable',
    'Revenue',
    'Expense',
    'Date',
    'Status',
  ];


  showerror(message){
    console.log("here")
    this.toastr.error(message, 'Error!');
  }

  showsuccess(message){
    this.toastr.success(message, 'Success!');
  }


  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private myservice:MyserviceService,
    private toastr: ToastrService
  ) 
  {

    
    this.myservice.getLiveCollection('viewaccount')
    .subscribe(
      res => {
        this.object=res
        console.log(this.object,"accounts")
        for (let i=0;i<this.object.length;i++){
          this.clients.push(this.object[i]['name'])
          this.clientsBank.push(this.object[i]['name']+"-"+this.object[i]['Bank'])
          this.ids.push(this.object[i]['_id'])
        }
       
        console.log(this.clientsBank,"bankkk")
        console.log(this.ids,"idsss")
        // console.log(this.clients,"sas")
      },
      err =>  {
        console.log( err )
      }
    )
    
  }
  columnHeader2 = {
    Client: 'Client',
    Project: 'Project',
    Receivable: 'Receivable',
    Revenue: 'Revenue',
    Expense: 'Expense',
    Date: 'Date',
    Status: 'Status',
    update:' ',
    delete:' '
  };
  openDialog(): void {

      const dialogRef = this.dialog.open(DialogProfit, {
      // width: '60%'
      panelClass: 'custom-modalbox',
      height: '80%',
      width: '30%',
      disableClose: true,
      hasBackdrop: true,
      data: {
        Client: this.Client,
        Project: this.Project,
        Receivable: this.Receivable,
        Revenue: this.Revenue,
        Expense: this.Expense,
        Date: this.Date,
        Status: this.Status,
      },

    });

    dialogRef.afterClosed().subscribe((result) => {
      this.Client = result['Client'];
      console.log(this.Client,"clienttttt")
      this.idClient=this.ids[this.clientsBank.indexOf(this.Client)]
      console.log(this.idClient,"idddd")
      this.Client=this.Client.substr(0,this.Client.indexOf("-"))
      this.Project = result['Project'];
      this.Receivable = result['Receivable'];
      this.Revenue = result['Revenue'];
      this.Expense = result['Expense'];
      this.Date = result['Date'];
      this.Status = result['Status'];


      this.ProfitModel = {
        Client: this.Client,
        idClient:this.idClient,
        Project: this.Project,
        Receivable: this.Receivable,
        Revenue: 0,
        Expense: 0,
        Date: this.Date,
        Status: this.Status,
      };
      this.myservice.createProfitModel(this.ProfitModel)
        .subscribe(
          (res) => {
            {
              if(res['message']==='Project with Client Added'){
                this.showsuccess(res['message'])

              }
              else{
                this.showerror(res['message'])
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

    this.myservice.getLiveCollection('viewaccountprofit')
      .subscribe(
        (res) => {
          this.object = res;

          for(let i=0;i<this.object.length;i++){
            this.object[i].update="update"
            this.object[i].delete="delete"
          }

          this.listData = new MatTableDataSource(this.object);
        },
        (err) => {
          console.log(err);
        }
      );

  }
}
@Component({
  selector: 'dialog-profit',
  templateUrl: './dialog-profit.html',
})
export class DialogProfit{
  object:any
  clients:string[]=[]
  clients2:any 
  clientsBank:string[]=[]
  ids:string[]=[]

  constructor(
    public dialogRef: MatDialogRef<DialogProfit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private myservice:MyserviceService
  )
  {

    this.myservice.getLiveCollection('viewaccount')
    .subscribe(
      res => {
        console.log("resss")
        this.object=res
        for (let i=0;i<this.object.length;i++){
          this.clients.push(this.object[i]['name'])
          this.clientsBank.push(this.object[i]['name']+"-"+this.object[i]['Bank'])
          this.ids.push(this.object[i]['_id'])
        }

      console.log(this.clients,"clientssss")
      console.log(this.clientsBank,"clientssssBankkk")
      console.log(this.ids,"idddd")


        console.log(this.clients,"here at profittt")
         this.clients2= this.clients
        console.log(this.clients2)
      },
      err =>  {
        console.log("resss")
        console.log( err )
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export class clientsClass{
  clientsMsg:string
}
