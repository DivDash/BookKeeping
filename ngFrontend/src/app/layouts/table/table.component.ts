import { HttpClient } from '@angular/common/http';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private http: HttpClient) { }
  object:any
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','bank','balance','remarks'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  ngOnInit() {
    console.log("ithayyyyyyyyyyy")
    const users: UserData[] =[];
    this.http
      .get( "http://localhost:5000/ViewAccount",{
        withCredentials:true
      })
      .subscribe(
        res=> {
          // console.log(res)
          console.log(res)
          // console.log(res[0]['name'])
          // res.length
          users.push({name:res[0]['name'],bank:res[0]['Bank'],balance:res[0]['Balance'],remarks:res[0]['Remarks']})
          this.object=res
          console.log(this.object,"dsdslkd")
          console.log(this.object.length)
          console.log(users)
          this.listData = new MatTableDataSource(this.object)
        },
        err =>  {
          console.log( err )
        }
      );
    // for (let i = 0; i <=100; i++) { users.push(createNewUser(i)); }
    // this.listData = new MatTableDataSource(users)


           // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        //   });
        // };
    console.log(users)
    // this.service.getEmployees().subscribe(
    //   list => {
    //     let array = list.map(item => {
    //       let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
    //       return {
    //         $key: item.key,
    //         departmentName,
    //         ...item.payload.val()
    //       };
    //     });
    //     this.listData = new MatTableDataSource(array);
    //     this.listData.sort = this.sort;
    //     this.listData.paginator = this.paginator;
    //     this.listData.filterPredicate = (data, filter) => {
    //       return this.displayedColumns.some(ele => {
    //         return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
    //       });
    //     };
    //   });
  }

  onSearchClear() {
    this.searchKey = "";
    // this.applyFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim()

    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    name: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    bank: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    balance: Math.round(Math.random() * 100),
    remarks: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  name: string,
  bank: string,
  balance: number,
  remarks: string
}


