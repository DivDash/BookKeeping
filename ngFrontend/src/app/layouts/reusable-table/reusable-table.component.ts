import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  Inject,
} from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MyserviceService } from 'src/app/services/myservice.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export interface DialogDataAccount {
  name: string;
  Bank: string;
  Balance: number;
  Remarks: string;
}
export interface DialogDataProfit {
  Client: string;
  Project: string;
  Receivable: number;
  Revenue: number;
  Expense: number;
  Date: string;
  Status: string;
}
export interface DialogDataNonProfit {
  Name: string;
  Expense: number;
  Remarks: string;
  Reason:string
}
export interface DialogDataJournal {
  project: string;
  client: string;
  receiver: string;
  amount: string;
  reason: string;
  method: string;
  remarks: string;
}

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.css'],
})
export class ReusableTableComponent implements OnChanges {
  @Input() tableData;
  @Input() columnHeader;
  objectKeys = Object.keys;
  info:string=" "
  object:any
  oldObject:any
  finalObject:any
  clients:string[]=[]
  clientsBank:string[]=[]
  ids:string[]=[]

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private myservice: MyserviceService,
    public dialog: MatDialog,
    private http: HttpClient,
    private toastr: ToastrService
  ) {

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

      },
      err =>  {
        console.log("resss")
        console.log( err )
      }
    )

  }
  // ngAfterViewInit() {
  //   this.matDataSource.paginator = this.paginator;
  //   this.matDataSource.sort = this.sort;
  //   this.matDataSource.data = this.GridData;
  // }
  ngOnChanges(changes: SimpleChanges): void {
    this.tableData = this.tableData['filteredData'];
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  modelChangeFn(value) {
    this.dataSource = value;
    console.log(this.dataSource, 'zainnn');
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.data = this.dataSource;
  }

  getData(data) {
    if (data.Bank) {
      console.log(data, 'from account');
      Swal.fire({
        title: 'Are you sure?',
        text: 'All the Projects associated to this account will get delete',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#32CD32',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.myservice.deleteAccount(data).subscribe(
            (res) => {
              console.log(res);
              if(res['message']==="account deleted"){
                Swal.fire('Deleted!', 'Your Account has been deleted.', 'success');
              }
              else{
                console.log(res)
                console.log(res['getRefrences'])
                this.object=res['getRefrences']
              for(let i=0;i<this.object.length;i++){
                this.info=this.info +this.object[i]+ " "
              }

              console.log(this.info)
              Swal.fire('Information', 'Account is Reffered in following -> '+ this.info ,'info');
              }

              this.info=" "

            },
            (error) => {
              console.error(error);
            }
          );

          
        }
      });
    }

    if (data.Status) {
      console.log(data, 'from profit costcenter');

      Swal.fire({
        title: 'Are you sure?',
        text: 'All the Entries associated to this Project will get delete',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#32CD32',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.myservice.deleteProfitProject(data).subscribe(
            (res) => {
              console.log(res);
            },
            (error) => {
              console.error(error);
            }
          );
          Swal.fire('Deleted!', 'Your Project has been deleted.', 'success');
        }
      });
    }

    if (data.receiver) {
      console.log(data, 'from journal entry');

      Swal.fire({
        title: 'Are you sure?',
        text: 'All the Entries associated to this Project will get delete',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#32CD32',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.myservice.deleteEntry(data).subscribe(
            (res) => {
              console.log(res);
            },
            (error) => {
              console.error(error);
            }
          );
          Swal.fire('Deleted!', 'Your Enty has been deleted.', 'success');
        }
      });
    }

    if (data.Name) {
      console.log(data, 'from nonProfits');

      Swal.fire({
        title: 'Are you sure?',
        text: 'All the Entries associated to this Project will get delete',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#32CD32',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.myservice.deleteNonProfit(data).subscribe(
            (res) => {
              console.log(res);
            },
            (error) => {
              console.error(error);
            }
          );
          Swal.fire('Deleted!', 'Your Non Profit has been deleted.', 'success');
        }
      });
    }
  }
  openDialog(data): void {
    console.log(data, 'from Account Dialog');
    if (data.Bank) {
      console.log(data, 'from account');
      this.oldObject=data
      const dialogRef = this.dialog.open(EditDialogAccount, {
        panelClass: 'custom-modalbox',
        height: '60%',
        width: '20%',
        disableClose: true,
        hasBackdrop: true,
        data: {
          name: data.name,
          Bank: data.Bank,
          Balance: data.Balance,
          Remarks: data.Remarks,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        data.name = result['name'];
        data.Bank = result['Bank'];
        data.Balance = result['Balance'];
        data.Remarks = result['Remarks'];

        console.log('BALANCE IS : ' + data.Balance);
        console.log(data);

        
        this.myservice.update_account(data).subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.error(error);
          }
        );
        Swal.fire('Updated!', 'Your file has been updated.', 'success');
      });
    }
    if (data.Status) {
      console.log(data, 'from profit costcenter');
      data.Client=this.clientsBank[this.ids.indexOf(data.idClient)]
      const dialogRef = this.dialog.open(EditDialogProfit, {
        panelClass: 'custom-modalbox',
        height: '70%',
        width: '25%',
        disableClose: true,
        hasBackdrop: true,
        data: {
          Client: data.Client,
          Project: data.Project,
          Receivable: data.Receivable,
          Revenue: data.Revenue,
          Expense: data.Expense,
          Date: data.Date,
          Status: data.Status,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        data.Client = result['Client']; 
        data.idClient=this.ids[this.clientsBank.indexOf(data.Client)]
        data.Client=data.Client.substr(0,data.Client.indexOf("-"))
        data.Project = result['Project'];
        data.Receivable = result['Receivable'];
        data.Revenue = result['Revenue'];
        data.Expense = result['Expense'];
        data.Date = result['Date'];
        data.Status = result['Status'];

        console.log('Revenue IS : ' + data.Revenue);
        console.log(data);
        this.myservice.update_profit_account(data).subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.error(error);
          }
        );
        Swal.fire('Updated!', 'Your file has been updated.', 'success');
      });
    }
    if (data.Name) {
      data.Name=this.clientsBank[this.ids.indexOf(data.idClient)]
      console.log(data, 'from nonProfits');
      const dialogRef = this.dialog.open(EditDialogNonprofit, {
        panelClass: 'custom-modalbox',
        height: '50%',
        width: '20%',
        disableClose: true,
        hasBackdrop: true,
        data: {
          Name: data.Name,
          Expense: data.Expense,
          Remarks: data.Remarks,
          Reason:data.Reason
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        data.Name = result['Name'];
        data.Expense = result['Expense'];
        data.Remarks = result['Remarks'];
        data.Reason=result['Reason']
        data.idClient=this.ids[this.clientsBank.indexOf(data.Name)]
        data.Name=data.Name.substr(0,data.Name.indexOf("-"))

        console.log('Revenue IS : ' + data.Expense);
        console.log(data,"data at non profittt");

        this.myservice.update_nonprofit_account(data).subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.error(error);
          }
        );
        Swal.fire('Updated!', 'Your file has been updated.', 'success');
      });
    }
    if (data.receiver) {

      data.client=this.clientsBank[this.ids.indexOf(data.idClient)]
      data.receiver=this.clientsBank[this.ids.indexOf(data.idRec)]
      console.log(data, 'from journal entry');
      const dialogRef = this.dialog.open(EditDialogJournal, {
        panelClass: 'custom-modalbox',
        height: '85%',
        width: '30%',
        disableClose: true,
        hasBackdrop: true,
        data: {
          client: data.client,
          project: data.project,
          amount: data.amount,
          receiver: data.receiver,
          reason: data.reason,
          method: data.method,
          remarks: data.remarks,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {


        data.project = result['project'];
        data.client = result['client'];
        data.idClient=this.ids[this.clientsBank.indexOf(data.client)]
        data.client=data.client.substr(0,data.client.indexOf("-"))
        data.amount = result['amount'];
        data.receiver = result['receiver'];
        data.idRec=this.ids[this.clientsBank.indexOf(data.receiver)]
        data.receiver=data.receiver.substr(0,data.receiver.indexOf("-"))
        data.reason = result['reason'];
        data.method = result['method'];
        data.remarks = result['remarks'];

        console.log('Revenue IS : ' + data.Revenue);
        console.log(data,"Jentry from update");
        this.myservice.update_journal_account(data).subscribe(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.error(error);
          }
        );
        Swal.fire('Updated!', 'Your file has been updated.', 'success');
      });
    }
  }
  showSuccess() {
    this.toastr.success('Successful!', 'Account Updated');
  }
}

@Component({
  selector: 'edit-dialog-account',
  templateUrl: './edit-dialog-account.html',
})
export class EditDialogAccount {
  constructor(
    public dialogRef: MatDialogRef<EditDialogAccount>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataAccount,
    private myservice:MyserviceService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'edit-dialog-profit',
  templateUrl: './edit-dialog-profit.html',
})
export class EditDialogProfit {
  object:any
  clients:string[]=[]
  clients2:any
  clientsBank:string[]=[]
  ids:string[]=[]
  constructor(
    public dialogRef: MatDialogRef<EditDialogProfit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataProfit,
    private myservice:MyserviceService
  ) {
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
@Component({
  selector: 'edit-dialog-nonprofit',
  templateUrl: './edit-dialog-nonprofit.html',
})
export class EditDialogNonprofit {
  object:any
  clients:string[]=[]
  clientsBank:string[]=[]
  ids:string[]=[]
  clients2:any 
   constructor(
    public dialogRef: MatDialogRef<EditDialogNonprofit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataNonProfit,
    private myservice:MyserviceService
  ) {
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
@Component({
  selector: 'edit-dialog-joural',
  templateUrl: './edit-dialog-journal.html',
})
export class EditDialogJournal {
  object:any
  clients:string[]=[]
  clientsBank:string[]=[]
  ids:string[]=[]
  clients2:any
  reciever:any
  projects:string[] = []

  constructor(
    public dialogRef: MatDialogRef<EditDialogJournal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataJournal,
    private myservice:MyserviceService
  ) {

    this.myservice.getLiveCollection('viewaccountprofit')
    .subscribe(
      res => {
        this.object=res
        // console.log(this.object)
        for (let i=0;i<this.object.length;i++){
          this.projects.push(this.object[i]['Project'])
        }
        // console.log(this.projects)
      },
      err =>  {
        console.log( err )
      }
    )





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
