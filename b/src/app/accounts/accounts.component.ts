import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
// export interface UserData {
//   accountHolder: string;
//   bank: string;
//   balance: number;
//   remarks: string;
// }
const field = [
  { id: '101', name: 'A', email: 'abc.com', website: 'pk.com' },
  { id: '102', name: 'B', email: 'xyz.com', website: 'fb.com' },
  { id: '101', name: 'A', email: 'abc.com', website: 'pk.com' },
];

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  object:any
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','bank','balance','remarks'];
  searchKey: string;
  constructor(private http: HttpClient) {}

  // griddata: any[];
  // isEdit: boolean;
  // coldata = [
  //   { field: 'id', header: 'Sr No' },
  //   { field: 'name', header: 'Name' },
  //   { field: 'email', header: 'Email' },
  //   { field: 'website', header: 'bank' },
  // ];

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

  // loaddata() {
  //   this.griddata = field;
  // }
  

  // tableData1: any[] = [
  //   { studentID1: 1, fname1: 'Hydrogen' },
  //   { studentID1: 2, fname1: 'Helium' },
  //   { studentID1: 3, fname1: 'Lithium' },
  //   { studentID1: 4, fname1: 'Beryllium' },
  //   { studentID1: 5, fname1: 'Boron' },
  //   { studentID1: 6, fname1: 'Carbon' },
  //   { studentID1: 7, fname1: 'Nitrogen' },
  //   { studentID1: 8, fname1: 'Oxygen' },
  //   { studentID1: 9, fname1: 'Fluorine' },
  //   { studentID1: 10, fname1: 'Neon' },
  // ];

  columnHeader2 = {
    name: 'Account Holder',
    Bank: 'Bank',
    Balance: 'Balance',
    Remarks: 'Remarks',
  };

  tableData2: any[] = [
    { studentID2: 1, fname2: 'Hydrogen', weight2: 1.0079, symbol2: 'H' },
    { studentID2: 2, fname2: 'Helium', weight2: 4.0026, symbol2: 'He' },
    { studentID2: 3, fname2: 'Lithium', weight2: 6.941, symbol2: 'Li' },
    { studentID2: 4, fname2: 'Beryllium', weight2: 9.0122, symbol2: 'Be' },
    { studentID2: 5, fname2: 'Boron', weight2: 10.811, symbol2: 'B' },
    { studentID2: 6, fname2: 'Carbon', weight2: 12.0107, symbol2: 'C' },
    { studentID2: 7, fname2: 'Nitrogen', weight2: 14.0067, symbol2: 'N' },
    { studentID2: 8, fname2: 'Oxygen', weight2: 15.9994, symbol2: 'O' },
    { studentID2: 9, fname2: 'Fluorine', weight2: 18.9984, symbol2: 'F' },
    { studentID2: 10, fname2: 'Neon', weight2: 20.1797, symbol2: 'Ne' },
  ];
}


export interface UserData {
  name: string,
  bank: string,
  balance: number,
  remarks: string
}