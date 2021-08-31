import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProfitModel } from 'src/app/ProfitModel';

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
  Project: string;
  Receivable: number;
  Revenue: number;
  Expense: number;
  Date: string;
  Status: string;
  object: any;
  listData: MatTableDataSource<any>;
  clients:string[]=[]
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
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {
    
    this.http
    .get( "http://localhost:5000/ViewAccount",{
      withCredentials:true
    })
    .subscribe(
      
      res => {
        console.log("resss")
        this.object=res
        for (let i=0;i<this.object.length;i++){
          this.clients.push(this.object[i]['name'])
        }
        console.log(this.clients,"here at profittt")
        let clients2= this.clients
        console.log(clients2)
      },
      err =>  {
        console.log("resss")
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
      this.Project = result['Project'];
      this.Receivable = result['Receivable'];
      this.Revenue = result['Revenue'];
      this.Expense = result['Expense'];
      this.Date = result['Date'];
      this.Status = result['Status'];
      this.ProfitModel = {
        Client: this.Client,
        Project: this.Project,
        Receivable: this.Receivable,
        Revenue: 0,
        Expense: 0,
        Date: this.Date,
        Status: this.Status,
      };
      this.http
        .post('http://localhost:5000/Profit', this.ProfitModel, {
          withCredentials: true,
        })
        .subscribe(
          (res) => {
            {
              console.log(res['message']);
              this.router
                .navigateByUrl('/accounts', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['/dashboard/costcenter']);
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
  ngOnInit() {
    console.log('ithayyyyyyyyyyy');
    const users: UserData[] = [];
    this.http
      .get('http://localhost:5000/ViewProfit', {
        withCredentials: true,
      })
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
  constructor(
    public dialogRef: MatDialogRef<DialogProfit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient
  ) 
  {
    this.http
    .get( "http://localhost:5000/ViewAccount",{
      withCredentials:true
    })
    .subscribe(
      
      res => {
        console.log("resss")
        this.object=res
        for (let i=0;i<this.object.length;i++){
          this.clients.push(this.object[i]['name'])
        }
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