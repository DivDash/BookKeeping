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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private myservice: MyserviceService,
    public dialog: MatDialog,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
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
            },
            (error) => {
              console.error(error);
            }
          );

          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
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
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
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
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
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
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        }
      });
    }
  }
  openDialog(data): void {
    console.log(data, 'from Account Dialog');
    if (data.Bank) {
      console.log(data, 'from account');
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
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        data.Name = result['Name'];
        data.Expense = result['Expense'];
        data.Remarks = result['Remarks'];

        console.log('Revenue IS : ' + data.Expense);
        console.log(data);

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
        data.amount = result['amount'];
        data.receiver = result['receiver'];
        data.reason = result['reason'];
        data.method = result['method'];
        data.remarks = result['remarks'];

        console.log('Revenue IS : ' + data.Revenue);
        console.log(data);
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
    @Inject(MAT_DIALOG_DATA) public data: DialogDataAccount
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
  constructor(
    public dialogRef: MatDialogRef<EditDialogProfit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataProfit
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'edit-dialog-nonprofit',
  templateUrl: './edit-dialog-nonprofit.html',
})
export class EditDialogNonprofit {
  constructor(
    public dialogRef: MatDialogRef<EditDialogNonprofit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataNonProfit
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'edit-dialog-joural',
  templateUrl: './edit-dialog-journal.html',
})
export class EditDialogJournal {
  constructor(
    public dialogRef: MatDialogRef<EditDialogJournal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataJournal
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
