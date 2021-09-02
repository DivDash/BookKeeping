import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import Swal from 'sweetalert2'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MyserviceService } from 'src/app/services/myservice.service';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  // @Input() GridData: any;
  // @Input() ColData: any;

  // @Input() tableTemplate: TemplateRef<any>;

  // matDataSource = new MatTableDataSource<any>();

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  constructor(private myservice :MyserviceService) {

  }
  // ngAfterViewInit() {
  //   this.matDataSource.paginator = this.paginator;
  //   this.matDataSource.sort = this.sort;
  //   this.matDataSource.data = this.GridData;
  // }
  ngOnChanges(changes: SimpleChanges): void {
    this.tableData=this.tableData['filteredData']
    this.dataSource = new MatTableDataSource(this.tableData);
    // this.dataSource.sort = this.sort
    
  }

  modelChangeFn(value){
    
    this.dataSource=value
    console.log(this.dataSource,"zainnn")

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

  
  getData(data){
 
    if(data.Bank){


    console.log(data,"from account")
    Swal.fire({
      title: 'Are you sure?',
      text: "All the Projects associated to this account will get delete",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#32CD32',
      confirmButtonText: 'Yes, delete it!'
  
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.myservice.deleteAccount(data).subscribe(
          res=>{
            console.log(res)
          },
          error=>{
          console.error(error);
          }
          
        )


        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

    }

    if(data.Status){

      console.log(data,"from profit costcenter")

      Swal.fire({
        title: 'Are you sure?',
        text: "All the Entries associated to this Project will get delete",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#32CD32',
        confirmButtonText: 'Yes, delete it!'
    
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.myservice.deleteProfitProject(data).subscribe(
            res=>{
              console.log(res)
            },
            error=>{
            console.error(error);
            }
            
          )
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    }

    if(data.receiver){
      console.log(data,"from journal entry")

      
      Swal.fire({
        title: 'Are you sure?',
        text: "All the Entries associated to this Project will get delete",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#32CD32',
        confirmButtonText: 'Yes, delete it!'
    
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.myservice.deleteEntry(data).subscribe(
            res=>{
              console.log(res)
            },
            error=>{
            console.error(error);
            }
            
          )
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    }
  



  }
}
